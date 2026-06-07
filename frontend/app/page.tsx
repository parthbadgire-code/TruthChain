'use client';

import Link from 'next/link';
import {
  Shield, Zap, Globe, Lock, ArrowRight,
  CheckCircle, AlertTriangle, XCircle, Search, ChevronRight
} from 'lucide-react';

const features = [
  {
    icon: Zap, color: '#06b6d4',
    title: 'AI Deepfake Detection',
    desc: 'State-of-the-art models detect face replacements, synthetic media, and manipulation artifacts in images and videos.',
  },
  {
    icon: Globe, color: '#8b5cf6',
    title: 'Indian Language Fact-Check',
    desc: 'Sarvam AI detects Hindi, Marathi, Bengali and 22+ Indian languages, translates and fact-checks viral content.',
  },
  {
    icon: Lock, color: '#10b981',
    title: 'Blockchain Passport',
    desc: 'Every verified piece of content gets an immutable authenticity record minted on Base blockchain.',
  },
  {
    icon: Shield, color: '#f59e0b',
    title: 'Trust Score',
    desc: 'A transparent 0–100 trust score combining deepfake probability, manipulation analysis, and fact-check results.',
  },
];

const steps = [
  { n: '01', title: 'Upload Content', desc: 'Drag and drop an image, video, or paste text / WhatsApp message.' },
  { n: '02', title: 'AI Analysis', desc: 'TruthChain runs deepfake detection, manipulation analysis, and Indian language fact-checking.' },
  { n: '03', title: 'Get Trust Score', desc: 'Receive a transparent verdict with a 0–100 trust score and detailed findings.' },
  { n: '04', title: 'Blockchain Passport', desc: 'An immutable content passport is minted on Base blockchain as permanent proof.' },
];

const stats = [
  { value: '10K+', label: 'Content Verified' },
  { value: '87%', label: 'Deepfakes Caught' },
  { value: '25+', label: 'Languages Supported' },
  { value: '0.3s', label: 'Avg Analysis Time' },
];

const demos = [
  { icon: XCircle, color: '#f43f5e', title: 'Politician Deepfake', badge: 'FAKE — 91% confidence', desc: 'Uploaded fake politician video detected as AI-generated face replacement.' },
  { icon: AlertTriangle, color: '#f59e0b', title: 'Marathi Fake Forward', badge: 'FALSE CLAIM', desc: 'Sarvam AI: Banks closing tomorrow — No RBI notice found.' },
  { icon: CheckCircle, color: '#10b981', title: 'Verified Original', badge: 'VERIFIED — 94/100', desc: 'Blockchain passport confirms original creator and authentic timestamp.' },
];

export default function LandingPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      {/* ── Hero ── */}
      <section style={{ padding: '100px 0 80px', textAlign: 'center' }}>
        <div className="container">
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 18px', borderRadius: 100,
            background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
            color: '#06b6d4', fontSize: '0.82rem', fontWeight: 600,
            marginBottom: 32, letterSpacing: '0.05em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            Powered by Sarvam AI + Base Blockchain
          </div>

          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: 900, lineHeight: 1.08,
            letterSpacing: '-0.03em', marginBottom: 24,
          }}>
            Verify Before<br />
            <span className="gradient-text">You Trust</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.7 }}>
            TruthChain is a decentralized trust protocol for digital content. Fight AI-generated misinformation,
            deepfakes, and fake news with cutting-edge AI and blockchain verification.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/upload" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 32px' }}>
              Start Verifying <ArrowRight size={18} />
            </Link>
            <Link href="/history" className="btn-secondary" style={{ fontSize: '1rem', padding: '15px 32px' }}>
              View History
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="container">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 1, background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden',
          }}>
            {stats.map(({ value, label }) => (
              <div key={label} style={{ padding: '28px 20px', textAlign: 'center', background: 'var(--bg-card)', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cyan)', marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 12 }}>
              Everything You Need to <span className="gradient-text">Fight Misinformation</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>
              A full-stack defense system combining the latest in AI and Web3 technology.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {features.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="glass-card" style={{ padding: 28 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: color + '22', border: `1px solid ${color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 10 }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo Results Preview ── */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 12 }}>
              See <span className="gradient-text">TruthChain in Action</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {demos.map(({ icon: Icon, color, title, badge, desc }) => (
              <div key={title} className="glass-card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <Icon size={22} color={color} />
                  <span style={{ fontWeight: 700 }}>{title}</span>
                </div>
                <div style={{
                  display: 'inline-block', padding: '4px 12px', borderRadius: 6,
                  background: color + '22', color, fontSize: '0.78rem', fontWeight: 700,
                  letterSpacing: '0.06em', marginBottom: 14,
                }}>
                  {badge}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 12 }}>
              How <span className="gradient-text">TruthChain Works</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, position: 'relative' }}>
            {steps.map(({ n, title, desc }, i) => (
              <div key={n} style={{ position: 'relative' }}>
                <div className="glass-card" style={{ padding: 28 }}>
                  <div style={{
                    fontSize: '2.5rem', fontWeight: 900, marginBottom: 12,
                    background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                    WebkitBackgroundClip: 'text', backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>{n}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight size={20} color="rgba(255,255,255,0.15)"
                    style={{ position: 'absolute', top: '50%', right: -12, transform: 'translateY(-50%)', display: 'none' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '60px 40px', maxWidth: 640, margin: '0 auto' }}>
            <Shield size={48} color="var(--cyan)" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 12 }}>
              Ready to Fight Misinformation?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.7 }}>
              Upload any content and get a comprehensive trust analysis powered by AI and blockchain in seconds.
            </p>
            <Link href="/upload" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 36px' }}>
              Verify Content Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © 2026 TruthChain · Built for HackHazards · Powered by Sarvam AI + Base Blockchain
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
