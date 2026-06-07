import os
import hashlib
import random
import string


PINATA_API_KEY = os.getenv("PINATA_API_KEY", "")
PINATA_SECRET = os.getenv("PINATA_SECRET", "")


def upload_to_ipfs(file_bytes: bytes, filename: str) -> dict:
    """
    Mock IPFS upload via Pinata.
    Replace with real Pinata API call when keys are available.
    """
    content_hash = hashlib.sha256(file_bytes).hexdigest()
    mock_ipfs_hash = "Qm" + "".join(random.choices(string.ascii_letters + string.digits, k=44))

    return {
        "ipfs_hash": mock_ipfs_hash,
        "ipfs_url": f"https://gateway.pinata.cloud/ipfs/{mock_ipfs_hash}",
        "content_hash": f"0x{content_hash}",
        "size_bytes": len(file_bytes),
        "pinned": True,
        "source": "Pinata (mock)",
    }
