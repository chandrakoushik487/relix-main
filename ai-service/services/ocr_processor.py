"""
OCR Processor Service using Google AI Studio (Gemini Vision API)
Processes civic issue images and extracts structured JSON data
"""

import base64
import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Optional, Tuple
import google.generativeai as genai

logger = logging.getLogger(__name__)


# Load the civic OCR prompt template
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

## VALIDATION CHECKLIST

- [ ] schema_version === "2.0"
- [ ] issue_id is valid UUID v4
- [ ] All top-level fields present (no missing keys)
- [ ] All location_raw sub-fields present
- [ ] All _meta sub-fields present
- [ ] No field has wrong type
- [ ] status === "pending"
- [ ] severity_score is integer 1–10 or null
- [ ] urgency_level is consistent with severity_score mapping
- [ ] repeat_complaint is boolean or null
- [ ] multi_issue_detected is boolean
- [ ] issue_description ≤ 280 characters (if not null)
- [ ] pincode is exactly 6 numeric digits or null
- [ ] secondary_problem_type ≠ problem_type (if not null)
- [ ] JSON is syntactically valid

## SELF-CORRECTION LOOP

If validation fails:
1. Identify failing fields
2. Correct them without modifying passing fields
3. Re-validate
Maximum 2 correction passes. If still invalid → trigger FAIL-SAFE.

## FAIL-SAFE OUTPUT

Trigger only when 2 correction passes have failed. Return exactly:

{
  "schema_version": "2.0",
  "issue_id": "<generated-uuid-v4>",
  "area": null,
  "location_raw": {
    "street": null,
    "landmark": null,
    "locality": null,
    "city": null,
    "state": null
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
    "fields_nulled": ["area", "issue_description", "latitude", "longitude", "pincode", "incident_date_estimate", "repeat_complaint"],
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


class OCRProcessor:
    """Processes civic issue images using Google Gemini Vision API."""

    def __init__(self, api_key: Optional[str] = None):
        """Initialize OCR processor with Google AI API key."""
        if api_key:
            genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    def process_image(self, image_path: str) -> Tuple[dict, bool]:
        """
        Process an image and extract structured civic issue data.
        
        Args:
            image_path: Path to image file or GCS URI (gs://...)
            
        Returns:
            Tuple of (structured_data, success_flag)
        """
        try:
            # Read and encode image
            if image_path.startswith("gs://"):
                logger.warning(
                    "GCS URI provided; ensure image can be fetched. Using direct URL."
                )
                image_data = None
                image_url = image_path
            else:
                with open(image_path, "rb") as f:
                    image_data = base64.standard_b64encode(f.read()).decode("utf-8")
                    image_url = None

            # Determine media type from file extension
            ext = Path(image_path).suffix.lower() if not image_path.startswith("gs://") else ".jpg"
            media_type_map = {
                ".jpg": "image/jpeg",
                ".jpeg": "image/jpeg",
                ".png": "image/png",
                ".gif": "image/gif",
                ".webp": "image/webp",
            }
            media_type = media_type_map.get(ext, "image/jpeg")

            # Get current date
            current_date = datetime.utcnow().strftime("%Y-%m-%d")

            # Prepare system prompt with current date injected
            system_prompt = CIVIC_PROMPT_TEMPLATE.replace("{CURRENT_DATE}", current_date)

            # Build message content
            content = []

            if image_data:
                # Use base64 encoded image
                content.append(
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": image_data,
                        },
                    }
                )
            elif image_url:
                # Use direct URL (GCS)
                content.append(
                    {
                        "type": "image",
                        "source": {
                            "type": "url",
                            "url": image_url,
                        },
                    }
                )

            content_list = [system_prompt]
            
            if image_data:
                # Use base64 encoded image with MIME type
                from PIL import Image
                import io
                
                image_binary = base64.standard_b64decode(image_data)
                image_obj = Image.open(io.BytesIO(image_binary))
                
                content_list.extend([
                    "Extract the civic issue data from this image and return ONLY the JSON object.",
                    image_obj
                ])
                
            elif image_url:
                # For GCS URIs, include the URL
                content_list.extend([
                    "Extract the civic issue data from this image and return ONLY the JSON object.",
                    {"mime_type": media_type, "data": image_url}
                ])

            # Call Gemini Vision API
            response = self.model.generate_content(content_list)

            # Extract response text
            response_text = response.text if response else ""

            # Parse JSON response
            try:
                # Try to extract JSON from response
                json_start = response_text.find("{")
                json_end = response_text.rfind("}") + 1
                if json_start >= 0 and json_end > json_start:
                    json_str = response_text[json_start:json_end]
                    structured_data = json.loads(json_str)
                    logger.info(f"Successfully extracted civic issue data from image")
                    return structured_data, True
                else:
                    logger.error("No JSON found in Gemini response")
                    logger.debug(f"Response was: {response_text[:500]}")
                    return {}, False

            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON from Gemini response: {e}")
                logger.debug(f"Response was: {response_text[:500]}")
                return {}, False

        except Exception as e:
            logger.error(f"Gemini API error: {e}")
            return {}, False
        except Exception as e:
            logger.error(f"Unexpected error processing image: {e}")
            return {}, False

    def process_ocr_text(self, ocr_text: str) -> Tuple[dict, bool]:
        """
        Process raw OCR text (from Google Vision or similar).
        
        Args:
            ocr_text: Raw OCR-extracted text from an image
            
        Returns:
            Tuple of (structured_data, success_flag)
        """
        try:
            current_date = datetime.utcnow().strftime("%Y-%m-%d")
            system_prompt = CIVIC_PROMPT_TEMPLATE.replace("{CURRENT_DATE}", current_date)
            
            response = self.model.generate_content([
                system_prompt,
                f"Extract civic issue data from this OCR text and return ONLY the JSON object:\n\n{ocr_text}"
            ])

            response_text = response.text if response else ""

            # Parse JSON response
            try:
                json_start = response_text.find("{")
                json_end = response_text.rfind("}") + 1
                if json_start >= 0 and json_end > json_start:
                    json_str = response_text[json_start:json_end]
                    structured_data = json.loads(json_str)
                    logger.info("Successfully structured OCR text to JSON")
                    return structured_data, True
                else:
                    logger.error("No JSON found in Gemini response")
                    return {}, False

            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON: {e}")
                return {}, False

        except Exception as e:
            logger.error(f"Error processing OCR text: {e}")
            return {}, False
