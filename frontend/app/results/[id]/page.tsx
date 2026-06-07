'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield, AlertTriangle, XCircle, CheckCircle,
  Link as LinkIcon, ArrowLeft, Copy, ExternalLink, Globe, Cpu, Lock
} from 'lucide-react';
import TrustMeter from '@/components/TrustMeter';
import { getPassport } from '@/lib/api';
import type { VerifyResult } from '@/lib/types';

function VerdictBanner({ verdict }: { verdict: string }) {
  const config: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
    VERIFIED:   { icon: CheckCircle,   color: '#10b981', bg: 'rgba(16,185,129,0.1)',  label: '✅ Content Verified' },
    UNVERIFIED: { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  label: '⚠️ Unverified Content' },
    SUSPICIOUS: { icon: AlertTriangle, color: '#fb923c', bg: 'rgba(251,146,60,0.1)',  label: '🚨 Suspicious Content' },
    FAKE:       { icon: XCircle,       color: '#f43f5e', bg: 'rgba(244,63,94,0.1)',   label: '🚫 Likely Fake / Manipulated' },
  };
  const c = config[verdict] || config.UNVERIFIED;
  const Icon = c.icon;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '20px 28px', borderRadius: 14,
      background: c.bg, border: `1px solid ${c.color}44`,
      marginBottom: 28,
    }}>
      <Icon size={28} color={c.color} />
      <div>
        <div style={{ fontWeight: 800, fontSize: '1.15rem', color: c.color }}>{c.label}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 2 }}>
          AI + Blockchain analysis complete
        </div>
      </div>
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? 'var(--cyan)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', padding: '4px 8px', borderRadius: 6 }}
    >
      <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPassport(id).then((r) => { setData(r); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '3px solid rgba(6,182,212,0.3)', borderTopColor: 'var(--cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Loading analysis results...</p>
      </div>
    </div>
  );

  if (!data) return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <XCircle size={48} color="#f43f5e" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ marginBottom: 12 }}>Result Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>This passport may have expired or does not exist.</p>
        <Link href="/upload" className="btn-primary">Verify New Content</Link>
      </div>
    </div>
  );

  const { ai_analysis: ai, fact_check: fc, blockchain_passport: bp, ipfs } = data;

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      <div className="container" style={{ padding: '48px 24px', maxWidth: 900 }}>
        {/* Back */}
        <button onClick={() => router.push('/upload')} className="btn-ghost" style={{ marginBottom: 28 }}>
          <ArrowLeft size={16} /> New Verification
        </button>

        {/* Demo mode banner */}
        {data.mock_mode && (
          <div style={{
            padding: '10px 18px', borderRadius: 10, marginBottom: 20,
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
            color: '#f59e0b', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            ⚡ Demo mode — backend not connected. Add NEXT_PUBLIC_BACKEND_URL to connect live AI.
          </div>
        )}

        <VerdictBanner verdict={data.verdict} />

        {/* Top row: Trust Meter + Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {/* Trust Meter */}
          <div className="glass-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 24, alignSelf: 'flex-start' }}>Trust Score</h3>
            <TrustMeter score={data.trust_score} size={200} />
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Deepfake Probability', value: `${Math.round(ai.deepfake_score * 100)}%`, color: ai.deepfake_detected ? '#f43f5e' : '#10b981' },
              { label: 'Manipulation Detected', value: ai.manipulation_detected ? 'Yes' : 'No', color: ai.manipulation_detected ? '#f43f5e' : '#10b981' },
              { label: 'Language', value: fc.language_name, color: 'var(--cyan)' },
              { label: 'Fact Check', value: fc.fact_check_verdict, color: fc.fact_check_verdict === 'FALSE' ? '#f43f5e' : fc.fact_check_verdict === 'TRUE' ? '#10b981' : '#f59e0b' },
              { label: 'Processing Time', value: `${ai.processing_time_ms}ms`, color: 'var(--text-secondary)' },
            ].map(({ label, value, color }) => (
              <div key={label} className="glass-card" style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{label}</span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Findings */}
        <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Cpu size={20} color="var(--cyan)" /> AI Analysis Findings
          </h3>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Deepfake Score</span>
              <span style={{ fontWeight: 700, color: ai.deepfake_score > 0.5 ? '#f43f5e' : '#10b981' }}>
                {Math.round(ai.deepfake_score * 100)}%
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${ai.deepfake_score * 100}%`, background: ai.deepfake_score > 0.5 ? 'linear-gradient(90deg,#f59e0b,#f43f5e)' : 'linear-gradient(90deg,#06b6d4,#10b981)' }} />
            </div>
          </div>

          {ai.manipulation_findings.length > 0 && (
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Manipulation Findings</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ai.manipulation_findings.map((f) => (
                  <span key={f} style={{
                    padding: '6px 12px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500,
                    background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', color: '#f43f5e',
                  }}>{f}</span>
                ))}
              </div>
            </div>
          )}

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 16 }}>Model: {ai.model}</p>
        </div>

        {/* Fact Check */}
        <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Globe size={20} color="#8b5cf6" /> Sarvam AI Fact Check
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 20px', alignItems: 'start' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: 2 }}>Language</span>
            <span style={{ fontWeight: 600 }}>{fc.language_name} ({fc.language_detected})</span>

            {fc.translated_text && (
              <>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: 2 }}>Translation</span>
                <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>"{fc.translated_text}"</span>
              </>
            )}

            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: 2 }}>Verdict</span>
            <span className={`verdict-badge verdict-${fc.fact_check_verdict === 'FALSE' ? 'FAKE' : fc.fact_check_verdict === 'UNVERIFIED' ? 'UNVERIFIED' : 'VERIFIED'}`}>
              {fc.fact_check_verdict}
            </span>

            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: 2 }}>Explanation</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{fc.fact_check_explanation}</span>
          </div>
        </div>

        {/* Blockchain Passport */}
        <div className="glass-card" style={{ padding: 28, border: '1px solid rgba(6,182,212,0.2)', boxShadow: '0 0 40px rgba(6,182,212,0.05)' }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Lock size={20} color="var(--cyan)" /> Blockchain Passport
          </h3>

          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { label: 'Passport ID', value: bp.passport_id },
              { label: 'Transaction Hash', value: bp.transaction_hash, link: bp.explorer_url },
              { label: 'Block Number', value: bp.block_number.toLocaleString() },
              { label: 'Network', value: bp.network },
              { label: 'IPFS Hash', value: bp.ipfs_hash, link: ipfs.ipfs_url },
              { label: 'Content Hash', value: bp.content_hash },
              { label: 'AI Generated', value: bp.is_ai_generated ? 'Yes' : 'No' },
              { label: 'Timestamp', value: new Date(bp.timestamp * 1000).toLocaleString() },
            ].map(({ label, value, link }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', flexShrink: 0, paddingTop: 2 }}>{label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <span className="hash-text" style={{ textAlign: 'right' }}>
                    {typeof value === 'string' && value.length > 30 ? value.slice(0, 14) + '...' + value.slice(-8) : value}
                  </span>
                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', display: 'flex' }}>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {typeof value === 'string' && <CopyButton value={String(value)} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <Link href="/upload" className="btn-primary">Verify Another</Link>
          <Link href="/history" className="btn-secondary">View History</Link>
          <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="btn-ghost">
            <LinkIcon size={15} /> Copy Report Link
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
