export interface VerifyResult {
  id: string;
  timestamp: number;
  content_type: "image" | "video" | "text";
  filename: string;
  verdict: "VERIFIED" | "UNVERIFIED" | "SUSPICIOUS" | "FAKE";
  trust_score: number;
  mock_mode: boolean;
  ai_analysis: {
    deepfake_score: number;
    deepfake_detected: boolean;
    manipulation_detected: boolean;
    manipulation_findings: string[];
    ela_score?: number;
    frames_analyzed?: number;
    suspicious_frames?: number;
    trust_score: number;
    model: string;
    processing_time_ms: number;
  };
  fact_check: {
    language_detected: string;
    language_name: string;
    original_text: string | null;
    translated_text: string | null;
    claim_extracted: string | null;
    fact_check_verdict: "TRUE" | "FALSE" | "UNVERIFIED" | "NOT_APPLICABLE";
    fact_check_explanation: string;
    confidence: number;
    source: string;
  };
  ipfs: {
    ipfs_hash: string;
    ipfs_url: string;
    content_hash: string;
    size_bytes: number;
    pinned: boolean;
  };
  blockchain_passport: {
    passport_id: string;
    transaction_hash: string;
    block_number: number;
    contract_address: string;
    creator_wallet: string;
    content_hash: string;
    ipfs_hash: string;
    trust_score: number;
    is_ai_generated: boolean;
    timestamp: number;
    network: string;
    explorer_url: string;
  };
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  content_type: string;
  filename: string;
  verdict: string;
  trust_score: number;
}
