from fastapi import APIRouter, HTTPException
from services.store import result_store

router = APIRouter()


@router.get("/passport/{passport_id}")
async def get_passport(passport_id: str):
    """Fetch a previously verified content passport by ID."""
    result = result_store.get(passport_id)
    if not result:
        raise HTTPException(status_code=404, detail="Passport not found.")
    return result


@router.get("/history")
async def get_history():
    """Return all verified content (in-memory, no DB needed for demo)."""
    items = []
    for scan_id, data in reversed(list(result_store.items())):
        items.append({
            "id": data["id"],
            "timestamp": data["timestamp"],
            "content_type": data["content_type"],
            "filename": data["filename"],
            "verdict": data["verdict"],
            "trust_score": data["trust_score"],
        })
    return {"items": items, "total": len(items)}
