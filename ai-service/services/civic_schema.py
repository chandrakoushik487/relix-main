"""
Civic Issue OCR JSON Schema Validation & Generation
Schema version: 2.0 | Production-Safe | Firestore-Ready
"""

from pydantic import BaseModel, Field, validator, root_validator
from typing import Optional, List
import uuid
import json
from enum import Enum
from datetime import datetime


class ProblemTypeEnum(str, Enum):
    """Valid problem types for civic issues."""
    SANITATION = "sanitation"
    ROADS = "roads"
    WATER = "water"
    ELECTRICITY = "electricity"
    INFRASTRUCTURE = "infrastructure"
    OTHER = "other"


class OcrQualityEnum(str, Enum):
    """OCR quality assessment."""
    CLEAN = "clean"
    NOISY = "noisy"
    GARBLED = "garbled"


class ConfidenceEnum(str, Enum):
    """Extraction confidence level."""
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class UrgencyEnum(str, Enum):
    """Urgency level derived from severity score."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class LocationRaw(BaseModel):
    """Structured location decomposition."""
    street: Optional[str] = None
    landmark: Optional[str] = None
    locality: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None


class MetaBlock(BaseModel):
    """Metadata about OCR processing."""
    ocr_quality: OcrQualityEnum
    source_language: str = "en"  # ISO 639-1 code
    extraction_confidence: ConfidenceEnum
    fields_extracted: List[str] = Field(default_factory=list)
    fields_nulled: List[str] = Field(default_factory=list)
    translation_applied: bool = False
    fail_safe_triggered: bool = False
    processing_notes: Optional[str] = None


class CivicIssueSchema(BaseModel):
    """Complete civic issue OCR output schema (v2.0)."""
    
    schema_version: str = "2.0"
    issue_id: str
    area: Optional[str] = None
    location_raw: LocationRaw
    issue_description: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    pincode: Optional[str] = None
    problem_type: ProblemTypeEnum
    secondary_problem_type: Optional[ProblemTypeEnum] = None
    multi_issue_detected: bool = False
    status: str = "pending"
    severity_score: Optional[int] = None
    upload_date: str  # YYYY-MM-DD
    incident_date_estimate: Optional[str] = None  # ISO 8601
    urgency_level: Optional[UrgencyEnum] = None
    repeat_complaint: Optional[bool] = None
    _meta: MetaBlock

    class Config:
        use_enum_values = True

    @validator("schema_version")
    def validate_schema_version(cls, v):
        if v != "2.0":
            raise ValueError("schema_version must be '2.0'")
        return v

    @validator("issue_id")
    def validate_issue_id(cls, v):
        """Validate UUID v4 format."""
        try:
            parsed = uuid.UUID(v)
            # Check if it's version 4
            if parsed.version != 4:
                raise ValueError("issue_id must be UUID v4")
            return v
        except ValueError:
            raise ValueError("Invalid UUID v4 format")

    @validator("pincode")
    def validate_pincode(cls, v):
        if v is None:
            return v
        if not (isinstance(v, str) and len(v) == 6 and v.isdigit()):
            raise ValueError("pincode must be exactly 6 numeric digits")
        return v

    @validator("latitude")
    def validate_latitude(cls, v):
        if v is None:
            return v
        if not (-90.0 <= v <= 90.0):
            raise ValueError("latitude must be between -90 and 90")
        return v

    @validator("longitude")
    def validate_longitude(cls, v):
        if v is None:
            return v
        if not (-180.0 <= v <= 180.0):
            raise ValueError("longitude must be between -180 and 180")
        return v

    @validator("severity_score")
    def validate_severity_score(cls, v):
        if v is None:
            return v
        if not isinstance(v, int) or not (1 <= v <= 10):
            raise ValueError("severity_score must be integer 1-10 or null")
        return v

    @validator("issue_description")
    def validate_description_length(cls, v):
        if v is None:
            return v
        if len(v) > 280:
            # Truncate at sentence boundary
            truncated = v[:280]
            last_period = truncated.rfind(".")
            if last_period > 0:
                return truncated[:last_period + 1]
            return truncated
        return v

    @root_validator(skip_on_failure=True)
    def validate_consistency(cls, values):
        """Cross-field validations."""
        # Check status is always pending
        if values.get("status") != "pending":
            raise ValueError("status must always be 'pending'")

        # Check multi_issue_detected is boolean
        if not isinstance(values.get("multi_issue_detected"), bool):
            raise ValueError("multi_issue_detected must be boolean")

        # Check secondary_problem_type != problem_type
        if (
            values.get("secondary_problem_type")
            and values.get("problem_type")
            and values["secondary_problem_type"] == values["problem_type"]
        ):
            raise ValueError(
                "secondary_problem_type must differ from problem_type"
            )

        # Check urgency_level is consistent with severity_score
        severity = values.get("severity_score")
        urgency = values.get("urgency_level")
        if severity is not None and urgency is not None:
            expected_urgency = cls._map_severity_to_urgency(severity)
            if urgency != expected_urgency:
                raise ValueError(
                    f"urgency_level {urgency} inconsistent with severity_score {severity}"
                )
        elif severity is None and urgency is not None:
            raise ValueError("urgency_level must be null if severity_score is null")

        # Check fail_safe_triggered is false in normal output
        if values.get("_meta", {}).get("fail_safe_triggered") is True:
            # This is only allowed in fail-safe scenarios
            pass

        return values

    @staticmethod
    def _map_severity_to_urgency(severity_score: int) -> str:
        """Map severity score to urgency level."""
        if 1 <= severity_score <= 3:
            return "low"
        elif 4 <= severity_score <= 6:
            return "medium"
        elif 7 <= severity_score <= 8:
            return "high"
        elif 9 <= severity_score <= 10:
            return "critical"
        return None


def generate_civic_issue_id() -> str:
    """Generate a valid UUID v4 for issue tracking."""
    return str(uuid.uuid4())


def create_fail_safe_output(current_date: str) -> dict:
    """Create fail-safe output when processing fails."""
    return {
        "schema_version": "2.0",
        "issue_id": generate_civic_issue_id(),
        "area": None,
        "location_raw": {
            "street": None,
            "landmark": None,
            "locality": None,
            "city": None,
            "state": None,
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
                "area",
                "issue_description",
                "latitude",
                "longitude",
                "pincode",
                "incident_date_estimate",
                "repeat_complaint",
            ],
            "translation_applied": False,
            "fail_safe_triggered": True,
            "processing_notes": "Fail-safe triggered after 2 failed validation correction attempts.",
        },
    }


def validate_and_correct(data: dict, max_passes: int = 2) -> tuple[dict, bool]:
    """
    Validate civic issue data and attempt correction.
    
    Returns:
        (validated_data, is_valid): Tuple of corrected data and validation status
    """
    current_data = data.copy()
    
    for pass_num in range(max_passes):
        try:
            # Try to create and validate the schema
            issue = CivicIssueSchema(**current_data)
            return issue.dict(by_alias=False), True
        except Exception as e:
            if pass_num == max_passes - 1:
                # Last pass failed, return False to trigger fail-safe
                return current_data, False
            
            # Attempt to fix common issues
            error_str = str(e)
            
            # Fix null/empty values
            if "problem_type" in error_str and current_data.get("problem_type") is None:
                current_data["problem_type"] = "other"
            
            if "status" in error_str:
                current_data["status"] = "pending"
            
            if "multi_issue_detected" in error_str:
                current_data["multi_issue_detected"] = False
            
            # Clamp severity score
            if "severity_score" in error_str and current_data.get("severity_score"):
                score = current_data["severity_score"]
                if isinstance(score, (int, float)):
                    current_data["severity_score"] = max(1, min(10, int(score)))
    
    return current_data, False
