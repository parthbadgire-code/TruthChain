from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
import uuid, time, hashlib

from services import ai_engine, sarvam_service, ipfs_service, web3_service
from services.store import result_store

router = APIRouter()


@router.post("/verify")
async def verify_content(
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None),
):
    """
    Main verification endpoint.
    Accepts an uploaded file (image/video) or raw text.
    Returns trust score, AI findings, fact-check, and blockchain passport.
    """
    if not file and not text:
        raise HTTPException(status_code=400, detail="Provide a file or text to verify.")

    scan_id = "TC-" + uuid.uuid4().hex[:10].upper()
    timestamp = int(time.time())

    # ── Determine content type ──
    if file:
        content_type = "video" if (file.content_type or "").startswith("video") else "image"
        file_bytes = await file.read()
        filename = file.filename or "upload"
    else:
        content_type = "text"
        file_bytes = (text or "").encode()
        filename = "text_input.txt"

    # ── AI Analysis ──
    if content_type == "video":
        ai_result = ai_engine.analyze_video(filename)
    elif content_type == "text":
        ai_result = ai_engine.analyze_text(text or "")
    else:
        ai_result = ai_engine.analyze_image(file_bytes, filename)

    trust_score = ai_result["trust_score"]
    verdict = ai_engine.get_verdict(trust_score)

    # ── Sarvam AI fact-check (for text or image captions) ──
    fact_result = sarvam_service.detect_and_analyze(text or "")

    # ── IPFS Upload ──
    ipfs_result = ipfs_service.upload_to_ipfs(file_bytes, filename)

    # ── Blockchain Passport ──
    passport = web3_service.register_content_on_chain(
        content_hash=ipfs_result["content_hash"],
        ipfs_hash=ipfs_result["ipfs_hash"],
        trust_score=trust_score,
        is_ai_generated=ai_result.get("deepfake_detected", False),
    )
    passport["passport_id"] = scan_id

    # ── Build response ──
    result = {
        "id": scan_id,
        "timestamp": timestamp,
        "content_type": content_type,
        "filename": filename,
        "verdict": verdict,
        "trust_score": trust_score,
        "ai_analysis": ai_result,
        "fact_check": fact_result,
        "ipfs": ipfs_result,
        "blockchain_passport": passport,
        "mock_mode": True,
    }

    result_store[scan_id] = result
    return result
