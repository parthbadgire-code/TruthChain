import os
import random
import string
import time


CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS", "0x0000000000000000000000000000000000000000")
BASE_RPC_URL = os.getenv("BASE_RPC_URL", "https://sepolia.base.org")
PRIVATE_KEY = os.getenv("PRIVATE_KEY", "")


def register_content_on_chain(
    content_hash: str,
    ipfs_hash: str,
    trust_score: int,
    is_ai_generated: bool,
    creator_wallet: str = "0x0000000000000000000000000000000000000000",
) -> dict:
    """
    Mock blockchain registration on Base Sepolia.
    Replace with real web3.py contract call when keys are ready.
    """
    tx_hash = "0x" + "".join(random.choices("0123456789abcdef", k=64))
    block_number = random.randint(10_000_000, 15_000_000)
    passport_id = "TC-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=8))

    return {
        "passport_id": passport_id,
        "transaction_hash": tx_hash,
        "block_number": block_number,
        "contract_address": CONTRACT_ADDRESS,
        "creator_wallet": creator_wallet,
        "content_hash": content_hash,
        "ipfs_hash": ipfs_hash,
        "trust_score": trust_score,
        "is_ai_generated": is_ai_generated,
        "timestamp": int(time.time()),
        "network": "Base Sepolia (mock)",
        "explorer_url": f"https://sepolia.basescan.org/tx/{tx_hash}",
    }


def get_passport_from_chain(passport_id: str) -> dict | None:
    """Mock passport lookup from blockchain."""
    # In production: query the smart contract by passport_id
    return None
