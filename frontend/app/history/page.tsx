'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, Upload, CheckCircle, AlertTriangle, XCircle, Clock, FileImage, FileVideo, Type, Search } from 'lucide-react';
import { getHistory } from '@/lib/api';
import type { HistoryItem } from '@/lib/types';

const SEED_HISTORY: HistoryItem[] = [
  { id: 'TC-DEMO001', timestamp: Date.now() / 1000 - 3600, content_type: 'image', filename: 'politician_speech.jpg', verdict: 'FAKE', trust_score: 18 },
  { id: 'TC-DEMO002', timestamp: Date.now() / 1000 - 7200, content_type: 'text', filename: 'whatsapp_forward.txt', verdict: 'SUSPICIOUS', trust_score: 34 },
  { id: 'TC-DEMO003', timestamp: Date.now() / 1000 - 14400, content_type: 'image', filename: 'news_photo.png', verdict: 'VERIFIED', trust_score: 88 },
  { id: 'TC-DEMO004', timestamp: Date.now() / 1000 - 28800, content_type: 'video', filename: 'viral_clip.mp4', verdict: 'SUSPICIOUS', trust_score: 41 },
  { id: 'TC-DEMO005', timestamp: Date.now() / 1000 - 86400, content_type: 'text', filename: 'text_input.txt', verdict: 'FAKE', trust_score: 12 },
];

const VERDICT_CONFIG: Record<string, { icon: React.ElementType; color: string }> = {
  VERIFIED:   { icon: CheckCircle,   color: '#10b981' },
  UNVERIFIED: { icon: AlertTriangle, color: '#f59e0b' },
  SUSPICIOUS: { icon: AlertTriangle, color: '#fb923c' },
  FAKE:       { icon: XCircle,       color: '#f43f5e' },
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  image: FileImage,
  video: FileVideo,
  text: Type,
};

function timeAgo(ts: number): string {
  const diff = Math.floor(Date.now() / 1000 - ts);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory().then((data) => {
      setItems(data.length > 0 ? data : SEED_HISTORY);
      setLoading(false);
    });
  }, []);

  const filtered = items.filter((i) => {
    if (filter !== 'ALL' && i.verdict !== filter) return false;
    if (search && !i.filename.toLowerCase().includes(search.toLowerCase()) && !i.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = { ALL: items.length, VERIFIED: 0, SUSPICIOUS: 0, FAKE: 0 };
  items.forEach((i) => {
    if (i.verdict in counts) counts[i.verdict as keyof typeof counts]++;
    if (i.verdict === 'UNVERIFIED') counts.SUSPICIOUS++;
  });

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      <div className="container" style={{ padding: '60px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <History size={24} color="var(--cyan)" />
              <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Verification <span className="gradient-text">History</span></h1>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>Track all previously verified content and their trust scores.</p>
          </div>
          <Link href="/upload" className="btn-primary">
            <Upload size={16} /> Verify New Content
          </Link>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 32 }}>
          {[
            { label: 'Total Scans', value: items.length, color: 'var(--cyan)' },
            { label: 'Verified', value: counts.VERIFIED, color: '#10b981' },
            { label: 'Suspicious', value: counts.SUSPICIOUS + (items.filter(i => i.verdict === 'UNVERIFIED').length), color: '#fb923c' },
            { label: 'Fake', value: counts.FAKE, color: '#f43f5e' },
          ].map(({ label, value, color }) => (
            <div key={label} className="glass-card" style={{ padding: '18px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color, marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by filename or ID..."
              style={{
                width: '100%', padding: '11px 14px 11px 40px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                borderRadius: 10, color: 'var(--text-primary)', fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['ALL', 'VERIFIED', 'SUSPICIOUS', 'FAKE'].map((v) => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                style={{
                  padding: '9px 16px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600,
                  border: filter === v ? '1px solid var(--cyan)' : '1px solid var(--border)',
                  background: filter === v ? 'rgba(6,182,212,0.1)' : 'transparent',
                  color: filter === v ? 'var(--cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {v} {counts[v as keyof typeof counts] !== undefined ? `(${counts[v as keyof typeof counts]})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1, 2, 3].map((n) => <div key={n} className="skeleton" style={{ height: 80, borderRadius: 12 }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card" style={{ padding: '60px 24px', textAlign: 'center' }}>
            <History size={40} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ marginBottom: 8 }}>No Results Found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
              {search || filter !== 'ALL' ? 'Try adjusting your search or filter.' : 'No content verified yet.'}
            </p>
            <Link href="/upload" className="btn-primary">Verify First Content</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((item, idx) => {
              const vc = VERDICT_CONFIG[item.verdict] || VERDICT_CONFIG.UNVERIFIED;
              const VIcon = vc.icon;
              const TypeIcon = TYPE_ICONS[item.content_type] || FileImage;
              const isDemo = item.id.startsWith('TC-DEMO');

              return (
                <Link
                  key={item.id}
                  href={isDemo ? '/upload' : `/results/${item.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="glass-card" style={{
                    padding: '18px 24px',
                    display: 'flex', alignItems: 'center', gap: 16,
                    cursor: 'pointer', animation: `fadeInUp 0.4s ease ${idx * 0.05}s both`,
                  }}>
                    {/* Type icon */}
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <TypeIcon size={18} color="var(--text-muted)" />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.filename}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'Space Grotesk, monospace' }}>{item.id}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>·</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <Clock size={11} /> {timeAgo(item.timestamp)}
                        </span>
                      </div>
                    </div>

                    {/* Trust score */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: '1.2rem', color: vc.color, marginBottom: 2 }}>{item.trust_score}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>/ 100</div>
                    </div>

                    {/* Verdict */}
                    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: vc.color + '18', border: `1px solid ${vc.color}33` }}>
                      <VIcon size={14} color={vc.color} />
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: vc.color }}>{item.verdict}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        input:focus { border-color: rgba(6,182,212,0.4) !important; }
      `}</style>
    </div>
  );
}
