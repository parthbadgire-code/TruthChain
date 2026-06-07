import { VerifyResult, HistoryItem } from "./types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// ── Mock data used when backend is unavailable ──────────────────────────────
function makeMock(id: string, trustScore: number, verdict: VerifyResult["verdict"]): VerifyResult {
  const now = Math.floor(Date.now() / 1000);
  const txHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  const ipfsHash = "Qm" + Array.from({ length: 44 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]).join("");

  return {
    id,
    timestamp: now,
    content_type: "image",
    filename: "demo_content.jpg",
    verdict,
    trust_score: trustScore,
    mock_mode: true,
    ai_analysis: {
      deepfake_score: trustScore < 40 ? 0.87 : 0.12,
      deepfake_detected: trustScore < 40,
      manipulation_detected: trustScore < 60,
      manipulation_findings: trustScore < 60 ? ["Face replacement detected", "Metadata timestamp mismatch"] : [],
      ela_score: 0.73,
      trust_score: trustScore,
      model: "TruthChain-Vision-v1.0 (demo)",
      processing_time_ms: 1240,
    },
    fact_check: {
      language_detected: "en",
      language_name: "English",
      original_text: null,
      translated_text: null,
      claim_extracted: "Demo content claim",
      fact_check_verdict: trustScore < 40 ? "FALSE" : "UNVERIFIED",
      fact_check_explanation: trustScore < 40
        ? "Claim not found in any verified source. Likely misinformation."
        : "Insufficient data to verify this claim.",
      confidence: 0.82,
      source: "TruthChain (demo mode)",
    },
    ipfs: {
      ipfs_hash: ipfsHash,
      ipfs_url: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      content_hash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      size_bytes: 245760,
      pinned: true,
    },
    blockchain_passport: {
      passport_id: id,
      transaction_hash: txHash,
      block_number: 12_847_392,
      contract_address: "0x0000000000000000000000000000000000000000",
      creator_wallet: "0x0000000000000000000000000000000000000000",
      content_hash: "0xabc",
      ipfs_hash: ipfsHash,
      trust_score: trustScore,
      is_ai_generated: trustScore < 40,
      timestamp: now,
      network: "Base Sepolia (demo)",
      explorer_url: `https://sepolia.basescan.org/tx/${txHash}`,
    },
  };
}

// ── API helpers ──────────────────────────────────────────────────────────────
export async function verifyContent(formData: FormData): Promise<VerifyResult> {
  try {
    const res = await fetch(`${BACKEND_URL}/verify`, { method: "POST", body: formData });
    if (!res.ok) throw new Error("Backend error");
    return res.json();
  } catch {
    // Fallback: demo mode
    await new Promise((r) => setTimeout(r, 2500)); // simulate processing
    const score = Math.floor(Math.random() * 90) + 5;
    const id = "TC-DEMO" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const verdict: VerifyResult["verdict"] = score >= 75 ? "VERIFIED" : score >= 50 ? "UNVERIFIED" : score >= 25 ? "SUSPICIOUS" : "FAKE";
    const result = makeMock(id, score, verdict);
    // Save to localStorage for history
    const history = JSON.parse(localStorage.getItem("tc_history") || "[]");
    history.unshift(result);
    localStorage.setItem("tc_history", JSON.stringify(history.slice(0, 50)));
    return result;
  }
}

export async function getPassport(id: string): Promise<VerifyResult | null> {
  // Check localStorage first (works in demo mode)
  const history = JSON.parse(localStorage.getItem("tc_history") || "[]");
  const local = history.find((r: VerifyResult) => r.id === id);
  if (local) return local;

  try {
    const res = await fetch(`${BACKEND_URL}/passport/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getHistory(): Promise<HistoryItem[]> {
  // Try localStorage first
  const local: VerifyResult[] = JSON.parse(localStorage.getItem("tc_history") || "[]");
  if (local.length > 0) {
    return local.map((r) => ({
      id: r.id,
      timestamp: r.timestamp,
      content_type: r.content_type,
      filename: r.filename,
      verdict: r.verdict,
      trust_score: r.trust_score,
    }));
  }

  try {
    const res = await fetch(`${BACKEND_URL}/history`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.items;
  } catch {
    return [];
  }
}
