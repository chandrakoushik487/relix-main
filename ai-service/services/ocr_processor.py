"""
OCR Processor Service — Google Gemini Vision API
=================================================
Processes civic issue images and extracts structured JSON data.

FALLBACK BEHAVIOUR (local dev)
-------------------------------
If GOOGLE_AI_STUDIO_API_KEY is not set OR the Gemini API call fails,
process_image() and process_ocr_text() both return a mock/fail-safe
result (success=True, fail_safe_triggered=True) instead of crashing.
This keeps every other part of the pipeline testable without a live key.
"""

import base64
import json
import logging
import os
import uuid
from datetime import datetime
from pathlib import Path
from typing import Optional, Tuple

logger = logging.getLogger(__name__)


# ── Prompt template ───────────────────────────────────────────────────────────
CIVIC_PROMPT_TEMPLATE = """# CIVIC ISSUE OCR → JSON ENGINE
# Schema Version: 2.0 | Production-Safe | Firestore-Ready

---

## IDENTITY
You are a deterministic OCR-to-structured-JSON transformation engine for a civic issue reporting platform.
Pure function. No explanations. No chat. No preamble. Input → Output only.
Output is inserted directly into Firestore. Zero post-processing tolerance.
Schema version: 2.0

---

## PRIMARY OUTPUT CONTRACT

Return exactly this JSON structure. No extra fields. No missing fields. No trailing commas. No comments.

{
  "schema_version":        "2.0",
  "issue_id":              string,            // UUID v4
  "area":                  string | null,
  "location_raw": {
    "street":              string | null,
    "landmark":            string | null,
    "locality":            string | null,
    "city":                string | null,
    "state":               string | null
  },
  "issue_description":     string | null,     // 1–2 sentences, max 280 chars
  "latitude":              number | null,
  "longitude":             number | null,
  "pincode":               string | null,
  "problem_type":          "sanitation" | "roads" | "water" | "electricity" | "infrastructure" | "other",
  "secondary_problem_type": string | null,    // same enum as problem_type, or null
  "multi_issue_detected":  boolean,
  "status":                "pending",
  "severity_score":        number | null,     // integer 1–10 or null
  "upload_date":           string,            // injected: {CURRENT_DATE}
  "incident_date_estimate": string | null,    // ISO 8601 if extractable, else null
  "urgency_level":         "low" | "medium" | "high" | "critical" | null,
  "repeat_complaint":      boolean | null,
  "_meta": {
    "ocr_quality":          "clean" | "noisy" | "garbled",
    "source_language":      string,           // ISO 639-1 code, e.g. "en", "hi", "ta"
    "extraction_confidence": "high" | "medium" | "low",
    "fields_extracted":     string[],         // field names where data was found
    "fields_nulled":        string[],         // field names set to null due to absence/ambiguity
    "translation_applied":  boolean,
    "fail_safe_triggered":  boolean,
    "processing_notes":     string | null     // brief note on any edge case, else null
  }
}

## CLASSIFICATION RULES

### problem_type
Classify into exactly one value using this priority-ordered keyword table:

| Signals in OCR (translated to English)                         | → problem_type   |
|----------------------------------------------------------------|-----------------|
| garbage, trash, waste, sewage, dumping, open defecation, smell | sanitation      |
| pothole, road damage, broken road, pavement, asphalt, crater  | roads           |
| water leak, pipe burst, no water, pipeline, water supply      | water           |
| power cut, no electricity, transformer, outage, live wire     | electricity     |
| drainage, flood, broken structure, bridge, wall, building     | infrastructure  |
| anything else or no match                                     | other           |

### severity_score (integer 1–10)
ESCALATION SIGNALS:
- 1–3: Minor inconvenience ("slight", "small", cosmetic)
- 4–6: Moderate disruption (daily life affected)
- 7–8: Serious problem ("dangerous", injury risk, large area)
- 9–10: Critical/urgent ("accident", "death", "collapse", disease risk)

AMPLIFIERS (add 1–2):
- Scale: "entire area", "whole street", "many people"
- Duration: "weeks", "months", "since last year"
- Vulnerability: "school", "hospital", "children", "elderly"
- Recurrence: "third time", "still not fixed", "nobody responded"

### urgency_level (derived from severity_score)
- 1–3 → "low"
- 4–6 → "medium"
- 7–8 → "high"
- 9–10 → "critical"
- null → null

### repeat_complaint
true if OCR signals: "again", "still", "third time", "previously reported", "nobody came", "no response"
false if explicitly new/first report
null otherwise

## ANTI-HALLUCINATION RULES

NEVER infer, guess, or fabricate:
- GPS coordinates from place names
- Pincodes from city/locality names
- Names of people or officials
- Dates not present in OCR
- Details not explicitly in OCR text

If ambiguous, incomplete, or conflicting → null.

## LANGUAGE HANDLING

OCR may arrive in English or Indian regional languages (Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, etc.).

Rules:
1. Detect the primary language first
2. Translate meaning internally (do not output translation)
3. Apply all extraction rules post-translation
4. Record ISO 639-1 language code in _meta.source_language
5. Set _meta.translation_applied = true if translation was performed

## FAIL-SAFE OUTPUT

Trigger only when 2 correction passes have failed. Return exactly:

{
  "schema_version": "2.0",
  "issue_id": "<generated-uuid-v4>",
  "area": null,
  "location_raw": {
    "street": null, "landmark": null, "locality": null, "city": null, "state": null
  },
  "issue_description": null,
  "latitude": null,
  "longitude": null,
  "pincode": null,
  "problem_type": "other",
  "secondary_problem_type": null,
  "multi_issue_detected": false,
  "status": "pending",
  "severity_score": null,
  "upload_date": "{CURRENT_DATE}",
  "incident_date_estimate": null,
  "urgency_level": null,
  "repeat_complaint": null,
  "_meta": {
    "ocr_quality": "garbled",
    "source_language": "en",
    "extraction_confidence": "low",
    "fields_extracted": [],
    "fields_nulled": ["area","issue_description","latitude","longitude","pincode","incident_date_estimate","repeat_complaint"],
    "translation_applied": false,
    "fail_safe_triggered": true,
    "processing_notes": "Fail-safe triggered after 2 failed validation correction attempts."
  }
}

Now process the following OCR input from a civic issue image.
Return ONLY the JSON object, no explanations.

OCR_TEXT:
{ocr_text}
"""


# ── Mock / fail-safe result ───────────────────────────────────────────────────
def _mock_result(reason: str) -> dict:
    """Return a structurally valid fail-safe result for local dev / API outages."""
    current_date = datetime.utcnow().strftime("%Y-%m-%d")
    return {
        "schema_version": "2.0",
        "issue_id": str(uuid.uuid4()),
        "area": None,
        "location_raw": {
            "street": None, "landmark": None,
            "locality": None, "city": None, "state": None,
        },
        "issue_description": None,
        "latitude": None,
        "longitude": None,
        "pincode": None,
        "problem_type": "other",
        "secondary_problem_type": None,
        "multi_issue_detected": False,
        "status": "pending",
        "severity_score": None,
        "upload_date": current_date,
        "incident_date_estimate": None,
        "urgency_level": None,
        "repeat_complaint": None,
        "_meta": {
            "ocr_quality": "garbled",
            "source_language": "en",
            "extraction_confidence": "low",
            "fields_extracted": [],
            "fields_nulled": [
                "area", "issue_description", "latitude", "longitude",
                "pincode", "incident_date_estimate", "repeat_complaint",
            ],
            "translation_applied": False,
            "fail_safe_triggered": True,
            "processing_notes": f"Local fallback triggered: {reason}",
        },
    }


# ── OCRProcessor ──────────────────────────────────────────────────────────────
class OCRProcessor:
    """Processes civic issue images using Google Gemini Vision API.

    Falls back to a mock result (not a crash) if:
    - GOOGLE_AI_STUDIO_API_KEY is not set
    - google-generativeai is not installed
    - The Gemini API returns an error
    """

    def __init__(self, api_key: Optional[str] = None):
        self._ready = False
        self.model = None

        # Allow passing key explicitly OR reading from env at construction time
        key = api_key or os.getenv("GOOGLE_AI_STUDIO_API_KEY", "").strip()

        if not key:
            logger.warning(
                "[OCRProcessor] GOOGLE_AI_STUDIO_API_KEY is not set. "
                "OCR calls will return mock/fail-safe results. "
                "Add the key to ai-service/.env to enable real processing."
            )
            return

        try:
            import google.generativeai as genai

            genai.configure(api_key=key)
            self.model = genai.GenerativeModel("gemini-1.5-flash")
            self._ready = True
            logger.info("[OCRProcessor] Gemini Vision API initialized ✓")
        except ImportError:
            logger.warning(
                "[OCRProcessor] google-generativeai not installed. "
                "Run: pip install google-generativeai"
            )
        except Exception as e:
            logger.error(f"[OCRProcessor] Failed to configure Gemini: {e}", exc_info=True)

    # ── process_image ─────────────────────────────────────────────────────────
    def process_image(self, image_path: str) -> Tuple[dict, bool]:
        """
        Process a local image file with Gemini Vision.

        Returns:
            (structured_data, success_flag)
            On any failure returns a mock fail-safe dict with success=True
            so the rest of the pipeline keeps running.
        """
        if not self._ready:
            logger.warning("[OCRProcessor] API not ready — returning mock result.")
            return _mock_result("Gemini API not configured"), True

        try:
            current_date = datetime.utcnow().strftime("%Y-%m-%d")
            system_prompt = CIVIC_PROMPT_TEMPLATE.replace("{CURRENT_DATE}", current_date)

            if image_path.startswith("gs://"):
                # GCS URI — pass as text reference (Vision API handles fetch)
                content_list = [
                    system_prompt,
                    "Extract the civic issue data from this image and return ONLY the JSON object.",
                    {"mime_type": "image/jpeg", "data": image_path},
                ]
            else:
                # Local file — encode to base64 then PIL
                try:
                    from PIL import Image
                    import io

                    with open(image_path, "rb") as f:
                        raw = f.read()

                    image_obj = Image.open(io.BytesIO(raw))
                    content_list = [
                        system_prompt,
                        "Extract the civic issue data from this image and return ONLY the JSON object.",
                        image_obj,
                    ]
                except ImportError:
                    logger.warning(
                        "[OCRProcessor] Pillow not installed. Falling back to base64 inline. "
                        "Run: pip install Pillow"
                    )
                    ext = Path(image_path).suffix.lower()
                    media_map = {
                        ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
                        ".png": "image/png", ".gif": "image/gif",
                        ".webp": "image/webp",
                    }
                    mime = media_map.get(ext, "image/jpeg")
                    with open(image_path, "rb") as f:
                        b64 = base64.standard_b64encode(f.read()).decode("utf-8")
                    content_list = [
                        system_prompt,
                        "Extract the civic issue data from this image and return ONLY the JSON object.",
                        {"mime_type": mime, "data": b64},
                    ]

            response = self.model.generate_content(content_list)
            return self._parse_response(response)

        except Exception as e:
            logger.error(f"[OCRProcessor] process_image error: {e}", exc_info=True)
            return _mock_result(str(e)), True

    # ── process_ocr_text ──────────────────────────────────────────────────────
    def process_ocr_text(self, ocr_text: str) -> Tuple[dict, bool]:
        """
        Structure raw OCR text using Gemini.

        Returns:
            (structured_data, success_flag)
            Falls back to mock on any error.
        """
        if not self._ready:
            logger.warning("[OCRProcessor] API not ready — returning mock result.")
            return _mock_result("Gemini API not configured"), True

        try:
            current_date = datetime.utcnow().strftime("%Y-%m-%d")
            system_prompt = CIVIC_PROMPT_TEMPLATE.replace("{CURRENT_DATE}", current_date)

            response = self.model.generate_content([
                system_prompt,
                f"Extract civic issue data from this OCR text and return ONLY the JSON object:\n\n{ocr_text}",
            ])

            return self._parse_response(response)

        except Exception as e:
            logger.error(f"[OCRProcessor] process_ocr_text error: {e}", exc_info=True)
            return _mock_result(str(e)), True

    # ── _parse_response ───────────────────────────────────────────────────────
    def _parse_response(self, response) -> Tuple[dict, bool]:
        """Extract and parse JSON from a Gemini GenerateContentResponse."""
        try:
            response_text = response.text if response else ""
        except Exception:
            response_text = ""

        if not response_text:
            logger.error("[OCRProcessor] Empty response from Gemini.")
            return _mock_result("Empty API response"), True

        json_start = response_text.find("{")
        json_end = response_text.rfind("}") + 1

        if json_start < 0 or json_end <= json_start:
            logger.error("[OCRProcessor] No JSON block found in Gemini response.")
            logger.debug(f"Response preview: {response_text[:300]}")
            return _mock_result("No JSON in response"), True

        try:
            structured_data = json.loads(response_text[json_start:json_end])
            logger.info("[OCRProcessor] Successfully extracted structured JSON ✓")
            return structured_data, True
        except json.JSONDecodeError as e:
            logger.error(f"[OCRProcessor] JSON parse error: {e}")
            logger.debug(f"Raw JSON string: {response_text[json_start:json_end][:300]}")
            return _mock_result(f"JSON parse error: {e}"), True
