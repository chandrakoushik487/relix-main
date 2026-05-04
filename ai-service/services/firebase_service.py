"""
Firebase / Firestore Integration Service
=========================================
Handles persistence and retrieval of structured civic issue data.

LOCAL DEVELOPMENT NOTES
-----------------------
* Credentials are loaded EXPLICITLY from a JSON service-account file.
* We do NOT rely on Application Default Credentials (ADC) so the
  "default credentials not found" error cannot occur.
* The JSON path is resolved relative to this file so it works
  regardless of which directory uvicorn is launched from.
* If the JSON file is missing the service degrades gracefully —
  the app still starts, OCR still works, Firestore calls are skipped.
"""

import json
import logging
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

logger = logging.getLogger(__name__)

# ── Credential path resolution ────────────────────────────────────────────────
#
# Priority order:
#   1. FIREBASE_CREDENTIALS_PATH env var (absolute or relative to cwd)
#   2. ../server/config/firebase-adminsdk.json  (relative to this file)
#   3. ./config/firebase-adminsdk.json          (fallback legacy path)
#
def _resolve_credentials_path() -> Optional[Path]:
    candidates: List[Path] = []

    env_val = os.getenv("FIREBASE_CREDENTIALS_PATH", "").strip()
    if env_val:
        # Try as absolute first, then relative to cwd
        p = Path(env_val)
        candidates.append(p if p.is_absolute() else Path.cwd() / p)

    # Relative to THIS file  (ai-service/services/ → relix-main/server/config/)
    this_dir = Path(__file__).resolve().parent
    candidates.append(this_dir.parent.parent / "server" / "config" / "firebase-adminsdk.json")
    candidates.append(this_dir.parent / "config" / "firebase-adminsdk.json")

    for path in candidates:
        if path.exists():
            logger.info(f"[FirebaseService] Using credentials: {path}")
            return path

    logger.warning(
        "[FirebaseService] No credentials JSON found. Tried:\n"
        + "\n".join(f"  • {p}" for p in candidates)
        + "\nSet FIREBASE_CREDENTIALS_PATH in ai-service/.env to fix this."
    )
    return None


class FirebaseService:
    """Service for Firebase / Firestore operations.

    Degrades gracefully if credentials are unavailable — all methods
    return safe empty values instead of raising.
    """

    def __init__(self):
        self.initialized = False
        self.db = None
        self._init_firebase()

    # ── Initialisation ────────────────────────────────────────────────────────
    def _init_firebase(self) -> None:
        try:
            import firebase_admin
            from firebase_admin import credentials, firestore
        except ImportError:
            logger.warning(
                "[FirebaseService] firebase-admin not installed. "
                "Run: pip install firebase-admin"
            )
            return

        try:
            cred_path = _resolve_credentials_path()
            if cred_path is None:
                return  # warning already logged

            # Validate the JSON before passing to Firebase SDK
            try:
                with open(cred_path, "r", encoding="utf-8") as f:
                    cred_data = json.load(f)

                required_keys = {"type", "project_id", "private_key", "client_email"}
                missing = required_keys - cred_data.keys()
                if missing:
                    logger.error(
                        f"[FirebaseService] Credentials JSON is missing keys: {missing}. "
                        "Make sure you downloaded the full service-account JSON from Firebase Console."
                    )
                    return
            except (json.JSONDecodeError, OSError) as e:
                logger.error(f"[FirebaseService] Cannot read credentials file: {e}")
                return

            # Initialise only once (uvicorn --reload safe)
            if not firebase_admin._apps:
                # ── EXPLICIT credential loading — no ADC, no gcloud ──────────
                cred = credentials.Certificate(str(cred_path))
                firebase_admin.initialize_app(cred)
                logger.info(
                    f"[FirebaseService] Initialized for project: {cred_data.get('project_id')}"
                )
            else:
                logger.info("[FirebaseService] App already initialized — reusing.")

            self.db = firestore.client()
            self.initialized = True

        except Exception as e:
            logger.error(f"[FirebaseService] Initialization failed: {e}", exc_info=True)

    # ── Store ─────────────────────────────────────────────────────────────────
    def store_civic_issue(
        self, issue_data: dict, gcs_uri: Optional[str] = None
    ) -> Optional[str]:
        """Store structured civic issue data to Firestore.

        Returns document ID on success, None if Firebase is unavailable.
        """
        if not self.initialized:
            logger.warning("[FirebaseService] Skipping store — Firebase not initialized.")
            return None

        try:
            doc_data = {
                **issue_data,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
            }
            if gcs_uri:
                doc_data["gcs_uri"] = gcs_uri

            doc_ref = self.db.collection("incidents").document()
            doc_ref.set(doc_data)
            logger.info(f"[FirebaseService] Stored issue: {doc_ref.id}")
            return doc_ref.id

        except Exception as e:
            logger.error(f"[FirebaseService] store_civic_issue failed: {e}", exc_info=True)
            return None

    # ── Retrieve ──────────────────────────────────────────────────────────────
    def get_civic_issue(self, issue_id: str) -> Optional[dict]:
        """Retrieve a civic issue by Firestore document ID."""
        if not self.initialized:
            logger.warning("[FirebaseService] Skipping get — Firebase not initialized.")
            return None

        try:
            doc = self.db.collection("incidents").document(issue_id).get()
            if doc.exists:
                return doc.to_dict()
            logger.warning(f"[FirebaseService] Issue {issue_id} not found.")
            return None

        except Exception as e:
            logger.error(f"[FirebaseService] get_civic_issue failed: {e}", exc_info=True)
            return None

    # ── Query ─────────────────────────────────────────────────────────────────
    def query_civic_issues(
        self,
        problem_type: Optional[str] = None,
        urgency_level: Optional[str] = None,
        status: Optional[str] = None,
        limit: int = 50,
    ) -> List[dict]:
        """Query civic issues with optional field filters."""
        if not self.initialized:
            logger.warning("[FirebaseService] Skipping query — Firebase not initialized.")
            return []

        try:
            query = self.db.collection("incidents")

            if problem_type:
                query = query.where("problem_type", "==", problem_type)
            if urgency_level:
                query = query.where("urgency_level", "==", urgency_level)
            if status:
                query = query.where("status", "==", status)

            results = (
                query.order_by("created_at", direction="DESCENDING")
                .limit(limit)
                .stream()
            )

            issues = []
            for doc in results:
                issue = doc.to_dict()
                issue["_id"] = doc.id
                issues.append(issue)

            return issues

        except Exception as e:
            logger.error(f"[FirebaseService] query_civic_issues failed: {e}", exc_info=True)
            return []

    # ── Update ────────────────────────────────────────────────────────────────
    def update_civic_issue(self, issue_id: str, updates: dict) -> bool:
        """Update specific fields of a civic issue."""
        if not self.initialized:
            logger.warning("[FirebaseService] Skipping update — Firebase not initialized.")
            return False

        try:
            updates["updated_at"] = datetime.utcnow()
            self.db.collection("incidents").document(issue_id).update(updates)
            logger.info(f"[FirebaseService] Issue {issue_id} updated.")
            return True

        except Exception as e:
            logger.error(f"[FirebaseService] update_civic_issue failed: {e}", exc_info=True)
            return False

    # ── Delete ────────────────────────────────────────────────────────────────
    def delete_civic_issue(self, issue_id: str) -> bool:
        """Delete a civic issue document."""
        if not self.initialized:
            logger.warning("[FirebaseService] Skipping delete — Firebase not initialized.")
            return False

        try:
            self.db.collection("incidents").document(issue_id).delete()
            logger.info(f"[FirebaseService] Issue {issue_id} deleted.")
            return True

        except Exception as e:
            logger.error(f"[FirebaseService] delete_civic_issue failed: {e}", exc_info=True)
            return False

    # ── Batch store ───────────────────────────────────────────────────────────
    def batch_store_issues(self, issues: List[dict]) -> List[str]:
        """Store multiple civic issues in a single Firestore batch write."""
        if not self.initialized:
            logger.warning("[FirebaseService] Skipping batch — Firebase not initialized.")
            return []

        try:
            batch = self.db.batch()
            doc_ids = []

            for issue_data in issues:
                doc_ref = self.db.collection("incidents").document()
                doc_data = {
                    **issue_data,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow(),
                }
                batch.set(doc_ref, doc_data)
                doc_ids.append(doc_ref.id)

            batch.commit()
            logger.info(f"[FirebaseService] Batch stored {len(doc_ids)} issues.")
            return doc_ids

        except Exception as e:
            logger.error(f"[FirebaseService] batch_store_issues failed: {e}", exc_info=True)
            return []
