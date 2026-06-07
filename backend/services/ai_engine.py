import random
import hashlib
import time
from typing import Optional


def analyze_image(file_bytes: bytes, filename: str) -> dict:
    """Mock AI image analysis — replace with real model calls when API keys are ready."""
    deepfake_score = round(random.uniform(0.05, 0.95), 3)
    manipulation_score = round(random.uniform(0.0, 1.0), 3)
    manipulation_detected = manipulation_score > 0.45

    findings = []
    if manipulation_detected:
        pool = [
            "Face replacement detected",
            "Metadata timestamp mismatch",
            "Noise pattern inconsistency",
            "Compression artifact anomaly",
            "AI generation artifacts found",
            "Edge detection anomalies around subject",
        ]
        findings = random.sample(pool, k=random.randint(1, 3))

    trust_score = _calculate_trust_score(deepfake_score, manipulation_detected, False)

    return {
        "deepfake_score": deepfake_score,
        "deepfake_detected": deepfake_score > 0.5,
        "manipulation_detected": manipulation_detected,
        "manipulation_findings": findings,
        "ela_score": round(random.uniform(0.1, 0.9), 3),
        "trust_score": trust_score,
        "model": "TruthChain-Vision-v1.0 (mock)",
        "processing_time_ms": random.randint(600, 2200),
    }


def analyze_video(filename: str) -> dict:
    """Mock AI video analysis."""
    deepfake_score = round(random.uniform(0.1, 0.97), 3)
    frames_analyzed = random.randint(24, 120)
    trust_score = _calculate_trust_score(deepfake_score, deepfake_score > 0.5, False)

    return {
        "deepfake_score": deepfake_score,
        "deepfake_detected": deepfake_score > 0.5,
        "frames_analyzed": frames_analyzed,
        "suspicious_frames": int(frames_analyzed * deepfake_score),
        "manipulation_findings": ["Temporal face inconsistency", "Blinking pattern anomaly"] if deepfake_score > 0.5 else [],
        "trust_score": trust_score,
        "model": "TruthChain-Video-v1.0 (mock)",
        "processing_time_ms": random.randint(2000, 5000),
    }


def analyze_text(text: str) -> dict:
    """Mock AI text analysis."""
    is_potentially_false = random.random() > 0.5
    trust_score = _calculate_trust_score(0.1, False, is_potentially_false)

    return {
        "deepfake_score": 0.0,
        "deepfake_detected": False,
        "manipulation_detected": is_potentially_false,
        "manipulation_findings": ["Unverified claim detected"] if is_potentially_false else [],
        "trust_score": trust_score,
        "model": "TruthChain-NLP-v1.0 (mock)",
        "processing_time_ms": random.randint(300, 900),
    }


def _calculate_trust_score(deepfake_score: float, manipulation: bool, false_claim: bool) -> int:
    score = 100
    score -= int(deepfake_score * 40)
    if manipulation:
        score -= 15
    if false_claim:
        score -= 25
    score -= random.randint(0, 8)
    return max(5, min(100, score))


def get_verdict(trust_score: int) -> str:
    if trust_score >= 75:
        return "VERIFIED"
    elif trust_score >= 50:
        return "UNVERIFIED"
    elif trust_score >= 25:
        return "SUSPICIOUS"
    else:
        return "FAKE"
