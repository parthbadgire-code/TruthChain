import os
import random
from typing import Optional


SARVAM_API_KEY = os.getenv("SARVAM_API_KEY", "")

LANGUAGE_MAP = {
    "hi": "Hindi", "mr": "Marathi", "bn": "Bengali", "ta": "Tamil",
    "te": "Telugu", "kn": "Kannada", "gu": "Gujarati", "pa": "Punjabi",
    "ml": "Malayalam", "en": "English",
}

MOCK_TRANSLATIONS = [
    {
        "original": "सरकार कल बैंक बंद करेगी",
        "translated": "Government will close banks tomorrow",
        "lang": "hi",
        "claim": "Banks will close tomorrow",
        "verdict": "FALSE",
        "explanation": "No official RBI notice found. This is a recurring viral hoax.",
    },
    {
        "original": "उद्या सर्व बँका बंद राहतील",
        "translated": "All banks will remain closed tomorrow",
        "lang": "mr",
        "claim": "All banks closing tomorrow",
        "verdict": "FALSE",
        "explanation": "RBI has not issued any such directive. Likely misinformation.",
    },
    {
        "original": "नया वायरस फैल रहा है जो 24 घंटे में मार देता है",
        "translated": "A new virus is spreading that kills in 24 hours",
        "lang": "hi",
        "claim": "New deadly 24-hour virus spreading",
        "verdict": "UNVERIFIED",
        "explanation": "No credible health authority has confirmed this claim.",
    },
]


def detect_and_analyze(text: str) -> dict:
    """
    Mock Sarvam AI: detect language, translate, extract claims, fact-check.
    Replace with real Sarvam AI API calls when key is available.
    """
    if not text or len(text.strip()) < 3:
        return _empty_result()

    # Try to detect if it looks like a non-English script
    has_devanagari = any("\u0900" <= c <= "\u097F" for c in text)
    has_latin = any("a" <= c.lower() <= "z" for c in text)

    if has_devanagari:
        lang = random.choice(["hi", "mr"])
        mock = random.choice(MOCK_TRANSLATIONS)
        return {
            "language_detected": lang,
            "language_name": LANGUAGE_MAP.get(lang, lang),
            "original_text": text,
            "translated_text": mock["translated"],
            "claim_extracted": mock["claim"],
            "fact_check_verdict": mock["verdict"],
            "fact_check_explanation": mock["explanation"],
            "confidence": round(random.uniform(0.75, 0.95), 2),
            "source": "Sarvam AI (mock)",
        }
    else:
        is_false = random.random() > 0.55
        return {
            "language_detected": "en",
            "language_name": "English",
            "original_text": text,
            "translated_text": None,
            "claim_extracted": text[:100] + ("..." if len(text) > 100 else ""),
            "fact_check_verdict": "FALSE" if is_false else "UNVERIFIED",
            "fact_check_explanation": (
                "Cross-referenced with trusted sources. Claim not substantiated."
                if is_false
                else "Insufficient data to verify this claim at this time."
            ),
            "confidence": round(random.uniform(0.6, 0.9), 2),
            "source": "Sarvam AI (mock)",
        }


def _empty_result() -> dict:
    return {
        "language_detected": "unknown",
        "language_name": "Unknown",
        "original_text": None,
        "translated_text": None,
        "claim_extracted": None,
        "fact_check_verdict": "NOT_APPLICABLE",
        "fact_check_explanation": "No text content to analyze.",
        "confidence": 0.0,
        "source": "Sarvam AI (mock)",
    }
