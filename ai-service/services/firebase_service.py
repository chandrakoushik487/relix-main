"""
Firebase/Firestore Integration Service
Handles persistence and retrieval of structured civic issue data
"""

import logging
import os
from typing import Optional, Dict, List
from datetime import datetime

logger = logging.getLogger(__name__)


class FirebaseService:
    """Service for Firebase/Firestore operations."""

    def __init__(self):
        """Initialize Firebase service."""
        self.initialized = False
        try:
            # Import Firebase Admin SDK
            import firebase_admin
            from firebase_admin import credentials, firestore

            self.firebase_admin = firebase_admin
            self.firestore = firestore

            # Initialize if not already done
            if not firebase_admin._apps:
                credentials_path = os.getenv(
                    "FIREBASE_CREDENTIALS_PATH",
                    "./config/firebase-adminsdk.json",
                )
                if os.path.exists(credentials_path):
                    cred = credentials.Certificate(credentials_path)
                    firebase_admin.initialize_app(cred)
                    self.db = firestore.client()
                    self.initialized = True
                    logger.info("Firebase initialized successfully")
                else:
                    logger.warning(
                        f"Firebase credentials not found at {credentials_path}"
                    )
            else:
                self.db = firestore.client()
                self.initialized = True
                logger.info("Firebase already initialized")

        except ImportError:
            logger.warning("Firebase Admin SDK not installed")
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {e}")

    def store_civic_issue(self, issue_data: dict, gcs_uri: Optional[str] = None) -> Optional[str]:
        """
        Store structured civic issue data to Firestore.
        
        Args:
            issue_data: Structured civic issue JSON
            gcs_uri: Optional GCS URI of source image
            
        Returns:
            Document ID if successful, None otherwise
        """
        if not self.initialized:
            logger.error("Firebase not initialized")
            return None

        try:
            # Add metadata
            doc_data = {
                **issue_data,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
            }

            if gcs_uri:
                doc_data["gcs_uri"] = gcs_uri

            # Store in "incidents" collection
            doc_ref = self.db.collection("incidents").document()
            doc_ref.set(doc_data)

            logger.info(f"Civic issue stored with ID: {doc_ref.id}")
            return doc_ref.id

        except Exception as e:
            logger.error(f"Failed to store civic issue: {e}")
            return None

    def get_civic_issue(self, issue_id: str) -> Optional[dict]:
        """Retrieve a civic issue by ID."""
        if not self.initialized:
            logger.error("Firebase not initialized")
            return None

        try:
            doc = self.db.collection("incidents").document(issue_id).get()
            if doc.exists:
                return doc.to_dict()
            else:
                logger.warning(f"Issue {issue_id} not found")
                return None

        except Exception as e:
            logger.error(f"Failed to retrieve issue: {e}")
            return None

    def query_civic_issues(
        self,
        problem_type: Optional[str] = None,
        urgency_level: Optional[str] = None,
        status: Optional[str] = None,
        limit: int = 50,
    ) -> List[dict]:
        """
        Query civic issues by criteria.
        
        Args:
            problem_type: Filter by problem type
            urgency_level: Filter by urgency level
            status: Filter by status
            limit: Maximum results to return
            
        Returns:
            List of matching issue documents
        """
        if not self.initialized:
            logger.error("Firebase not initialized")
            return []

        try:
            query = self.db.collection("incidents")

            if problem_type:
                query = query.where("problem_type", "==", problem_type)

            if urgency_level:
                query = query.where("urgency_level", "==", urgency_level)

            if status:
                query = query.where("status", "==", status)

            results = query.order_by("created_at", direction="DESCENDING").limit(
                limit
            ).stream()

            issues = []
            for doc in results:
                issue = doc.to_dict()
                issue["_id"] = doc.id
                issues.append(issue)

            return issues

        except Exception as e:
            logger.error(f"Failed to query issues: {e}")
            return []

    def update_civic_issue(self, issue_id: str, updates: dict) -> bool:
        """Update specific fields of a civic issue."""
        if not self.initialized:
            logger.error("Firebase not initialized")
            return False

        try:
            updates["updated_at"] = datetime.utcnow()
            self.db.collection("incidents").document(issue_id).update(updates)
            logger.info(f"Issue {issue_id} updated")
            return True

        except Exception as e:
            logger.error(f"Failed to update issue: {e}")
            return False

    def delete_civic_issue(self, issue_id: str) -> bool:
        """Delete a civic issue document."""
        if not self.initialized:
            logger.error("Firebase not initialized")
            return False

        try:
            self.db.collection("incidents").document(issue_id).delete()
            logger.info(f"Issue {issue_id} deleted")
            return True

        except Exception as e:
            logger.error(f"Failed to delete issue: {e}")
            return False

    def batch_store_issues(self, issues: List[dict]) -> List[str]:
        """
        Store multiple issues in a batch operation.
        
        Args:
            issues: List of civic issue data
            
        Returns:
            List of stored document IDs
        """
        if not self.initialized:
            logger.error("Firebase not initialized")
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
            logger.info(f"Batch stored {len(doc_ids)} civic issues")
            return doc_ids

        except Exception as e:
            logger.error(f"Batch store failed: {e}")
            return []

    def create_indexes(self) -> None:
        """Create recommended Firestore indexes for civic issues."""
        if not self.initialized:
            logger.error("Firebase not initialized")
            return

        logger.info(
            "Firestore indexes should be created via Firebase Console or gcloud CLI:"
        )
        logger.info("  - (problem_type, urgency_level, upload_date)")
        logger.info("  - (area, status, severity_score)")
        logger.info("  - (repeat_complaint, urgency_level)")
        logger.info("  - (_meta.extraction_confidence, _meta.fail_safe_triggered)")
