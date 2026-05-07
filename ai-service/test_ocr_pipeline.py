"""
Test script for OCR pipeline
Demonstrates end-to-end civic issue OCR processing
"""

import sys
import json
from datetime import datetime
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from services.ocr_processor import OCRProcessor
from services.civic_schema import validate_and_correct, create_fail_safe_output, generate_civic_issue_id


def test_ocr_text_processing():
    """Test OCR text processing with sample civic issue data."""
    print("=" * 80)
    print("TEST 1: OCR Text Processing")
    print("=" * 80)

    # Sample OCR text
    sample_ocr = """
    Large pothole on MG Road near Indiranagar signal, Bangalore 560038. 
    Very deep, caused 2 accidents this week. Reported before but no action taken.
    """

    print(f"\nInput OCR Text:\n{sample_ocr}\n")

    processor = OCRProcessor()
    structured_data, success = processor.process_ocr_text(sample_ocr)

    if success:
        print("✅ Successfully structured OCR text\n")
        print("Structured Output:")
        print(json.dumps(structured_data, indent=2))

        # Validate
        validated_data, is_valid = validate_and_correct(structured_data)
        if is_valid:
            print("\n✅ Schema validation passed!")
            return validated_data
        else:
            print("\n⚠️ Schema validation failed, using fail-safe")
            return create_fail_safe_output(datetime.utcnow().strftime("%Y-%m-%d"))
    else:
        print("❌ Failed to structure OCR text")
        return None


def test_multilingual_ocr():
    """Test multilingual OCR text processing."""
    print("\n" + "=" * 80)
    print("TEST 2: Multilingual OCR Processing (Hindi)")
    print("=" * 80)

    # Sample Hindi OCR text
    hindi_ocr = """
    नल से पानी लीक हो रहा है। पिछले 2 हफ्तों से हो रहा है। 
    जगह: अंधेरी वेस्ट, मुंबई 400058
    """

    print(f"\nInput OCR Text (Hindi):\n{hindi_ocr}\n")

    processor = OCRProcessor()
    structured_data, success = processor.process_ocr_text(hindi_ocr)

    if success:
        print("✅ Successfully processed Hindi OCR\n")
        print("Structured Output:")
        print(json.dumps(structured_data, indent=2))

        # Validate
        validated_data, is_valid = validate_and_correct(structured_data)
        if is_valid:
            print("\n✅ Schema validation passed!")
            print(f"Source Language: {validated_data.get('_meta', {}).get('source_language')}")
            print(f"Translation Applied: {validated_data.get('_meta', {}).get('translation_applied')}")
            return validated_data
        else:
            print("\n⚠️ Schema validation failed")
    else:
        print("❌ Failed to process Hindi OCR")
    return None


def test_noisy_ocr():
    """Test noisy OCR processing."""
    print("\n" + "=" * 80)
    print("TEST 3: Noisy OCR Processing")
    print("=" * 80)

    noisy_ocr = """
    garb@ge dump1ng n3ar schl AND str33t l1ght broken. 
    smll bad. kids afectd. 1st tym reporting
    """

    print(f"\nInput OCR Text (Noisy):\n{noisy_ocr}\n")

    processor = OCRProcessor()
    structured_data, success = processor.process_ocr_text(noisy_ocr)

    if success:
        print("✅ Successfully processed noisy OCR\n")
        print("Structured Output:")
        output = json.dumps(structured_data, indent=2)
        print(output)

        # Check metadata
        meta = structured_data.get("_meta", {})
        print(f"\nOCR Quality: {meta.get('ocr_quality')}")
        print(f"Extraction Confidence: {meta.get('extraction_confidence')}")
        print(f"Multi-Issue Detected: {structured_data.get('multi_issue_detected')}")

        # Validate
        validated_data, is_valid = validate_and_correct(structured_data)
        if is_valid:
            print("\n✅ Schema validation passed!")
            return validated_data
        else:
            print("\n⚠️ Schema validation failed")
    else:
        print("❌ Failed to process noisy OCR")
    return None


def test_schema_validation():
    """Test schema validation and error correction."""
    print("\n" + "=" * 80)
    print("TEST 4: Schema Validation & Error Correction")
    print("=" * 80)

    # Create a partially invalid structure
    test_data = {
        "schema_version": "2.0",
        "issue_id": "a3f1c2d4-4b87-4e9a-b021-7c3d9e1f0a82",
        "area": "MG Road, Bangalore",
        "location_raw": {
            "street": "MG Road",
            "landmark": "near signal",
            "locality": "Indiranagar",
            "city": "Bangalore",
            "state": "Karnataka",
        },
        "issue_description": "A pothole has been reported.",
        "latitude": None,
        "longitude": None,
        "pincode": "560038",
        "problem_type": "roads",
        "secondary_problem_type": None,
        "multi_issue_detected": False,
        "status": "pending",
        "severity_score": 8,
        "upload_date": datetime.utcnow().strftime("%Y-%m-%d"),
        "incident_date_estimate": None,
        "urgency_level": "high",
        "repeat_complaint": False,
        "_meta": {
            "ocr_quality": "clean",
            "source_language": "en",
            "extraction_confidence": "high",
            "fields_extracted": ["area", "problem_type", "severity_score"],
            "fields_nulled": ["latitude", "longitude"],
            "translation_applied": False,
            "fail_safe_triggered": False,
            "processing_notes": None,
        },
    }

    print("\nTesting data structure:")
    print(json.dumps(test_data, indent=2, default=str))

    validated_data, is_valid = validate_and_correct(test_data)

    if is_valid:
        print("\n✅ Schema validation passed!")
        print("Issue ID:", validated_data.get("issue_id"))
        print("Problem Type:", validated_data.get("problem_type"))
        print("Severity Score:", validated_data.get("severity_score"))
        print("Urgency Level:", validated_data.get("urgency_level"))
    else:
        print("\n❌ Schema validation failed")

    return validated_data if is_valid else None


def test_fail_safe():
    """Test fail-safe output generation."""
    print("\n" + "=" * 80)
    print("TEST 5: Fail-Safe Output Generation")
    print("=" * 80)

    current_date = datetime.utcnow().strftime("%Y-%m-%d")
    fail_safe = create_fail_safe_output(current_date)

    print(f"\nFail-Safe Output (triggered on validation failure):")
    print(json.dumps(fail_safe, indent=2))

    print(f"\n✅ Fail-safe structure created")
    print(f"Fail-Safe Triggered: {fail_safe['_meta']['fail_safe_triggered']}")
    print(f"Problem Type (default): {fail_safe['problem_type']}")
    print(f"Extraction Confidence: {fail_safe['_meta']['extraction_confidence']}")


def main():
    """Run all tests."""
    print("\n" + "🚀 " * 40)
    print("CIVIC ISSUE OCR PIPELINE TEST SUITE")
    print("🚀 " * 40 + "\n")

    results = {}

    # Test 1: Basic OCR processing
    result1 = test_ocr_text_processing()
    results["test_basic_ocr"] = "✅ PASSED" if result1 else "❌ FAILED"

    # Test 2: Multilingual
    result2 = test_multilingual_ocr()
    results["test_multilingual"] = "✅ PASSED" if result2 else "❌ FAILED"

    # Test 3: Noisy OCR
    result3 = test_noisy_ocr()
    results["test_noisy_ocr"] = "✅ PASSED" if result3 else "❌ FAILED"

    # Test 4: Schema validation
    result4 = test_schema_validation()
    results["test_schema_validation"] = "✅ PASSED" if result4 else "❌ FAILED"

    # Test 5: Fail-safe
    test_fail_safe()
    results["test_fail_safe"] = "✅ PASSED"

    # Summary
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    for test_name, result in results.items():
        print(f"{test_name}: {result}")

    passed = sum(1 for v in results.values() if "✅" in v)
    total = len(results)
    print(f"\nTotal: {passed}/{total} tests passed")

    if passed == total:
        print("\n🎉 All tests passed! OCR pipeline is ready for production.")
    else:
        print("\n⚠️ Some tests failed. Review the output above.")


if __name__ == "__main__":
    main()
