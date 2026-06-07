'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileImage, FileVideo, Type, X, Scan, AlertCircle, Zap } from 'lucide-react';
import { verifyContent } from '@/lib/api';

type ContentType = 'image' | 'video' | 'text';

const DEMO_SAMPLES = [
  { label: '🎭 Demo Deepfake', type: 'image' as ContentType, text: null },
  { label: '📱 Demo Marathi Fake News', type: 'text' as ContentType, text: 'उद्या सर्व बँका बंद राहतील — सरकारी आदेश' },
  { label: '📰 Demo English Misinformation', type: 'text' as ContentType, text: 'Breaking: Government will shut all banks tomorrow due to new cyber threat. Forward to warn everyone!' },
];

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [contentType, setContentType] = useState<ContentType>('image');
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [dragging, setDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      setContentType(dropped.type.startsWith('video') ? 'video' : 'image');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setContentType(f.type.startsWith('video') ? 'video' : 'image');
    }
  };

  const handleDemoSample = (sample: typeof DEMO_SAMPLES[0]) => {
    setContentType(sample.type);
    if (sample.text) {
      setText(sample.text);
      setFile(null);
    } else {
      // Create a dummy file for demo
      const blob = new Blob(['demo'], { type: 'image/jpeg' });
      const demoFile = new File([blob], 'demo_image.jpg', { type: 'image/jpeg' });
      setFile(demoFile);
      setText('');
    }
  };

  const handleScan = async () => {
    if (contentType === 'text' && !text.trim()) { setError('Please enter text to verify.'); return; }
    if (contentType !== 'text' && !file) { setError('Please upload a file to verify.'); return; }
    setError('');
    setScanning(true);

    try {
      const fd = new FormData();
      if (file && contentType !== 'text') fd.append('file', file);
      if (text) fd.append('text', text);

      const result = await verifyContent(fd);
      router.push(`/results/${result.id}`);
    } catch {
      setError('Analysis failed. Please try again.');
      setScanning(false);
    }
  };

  const tabStyle = (active: boolean) => ({
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 20px', borderRadius: 10, cursor: 'pointer',
    border: active ? '1px solid rgba(6,182,212,0.4)' : '1px solid var(--border)',
    background: active ? 'rgba(6,182,212,0.1)' : 'transparent',
    color: active ? 'var(--cyan)' : 'var(--text-secondary)',
    fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
  });

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      <div className="container" style={{ padding: '60px 24px', maxWidth: 720 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 16px', borderRadius: 100,
            background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
            color: 'var(--cyan)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 20,
          }}>
            <Scan size={14} /> AI-Powered Analysis
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Verify <span className="gradient-text">Any Content</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Upload an image, video, or paste text to check for deepfakes, manipulation, and misinformation.
          </p>
        </div>

        {/* Demo samples */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Try a Demo Sample</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {DEMO_SAMPLES.map((s) => (
              <button key={s.label} onClick={() => handleDemoSample(s)} className="btn-ghost">
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: 32 }}>
          {/* Type selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            <button style={tabStyle(contentType === 'image')} onClick={() => { setContentType('image'); setFile(null); }}>
              <FileImage size={16} /> Image
            </button>
            <button style={tabStyle(contentType === 'video')} onClick={() => { setContentType('video'); setFile(null); }}>
              <FileVideo size={16} /> Video
            </button>
            <button style={tabStyle(contentType === 'text')} onClick={() => { setContentType('text'); setFile(null); }}>
              <Type size={16} /> Text / WhatsApp
            </button>
          </div>

          {/* Upload zone or text area */}
          {contentType === 'text' ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste news article, WhatsApp message, or any text to fact-check..."
              rows={7}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)', borderRadius: 12,
                color: 'var(--text-primary)', padding: '16px', fontSize: '0.95rem',
                resize: 'vertical', outline: 'none', lineHeight: 1.7,
                fontFamily: 'Inter, sans-serif',
              }}
            />
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onClick={() => !file && fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${dragging ? 'var(--cyan)' : file ? 'rgba(16,185,129,0.5)' : 'var(--border)'}`,
                borderRadius: 16, padding: '48px 24px',
                textAlign: 'center', cursor: file ? 'default' : 'pointer',
                background: dragging ? 'rgba(6,182,212,0.05)' : file ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s',
              }}
            >
              {file ? (
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: 8 }}>
                    {file.type.startsWith('video') ? '🎥' : '🖼️'}
                  </div>
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>{file.name}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16 }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="btn-ghost">
                    <X size={14} /> Remove
                  </button>
                </div>
              ) : (
                <div>
                  <Upload size={40} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
                  <p style={{ fontWeight: 600, marginBottom: 6 }}>
                    Drop {contentType === 'video' ? 'video' : 'image'} here
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 16 }}>
                    or click to browse
                  </p>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {contentType === 'video' ? 'MP4, MOV, AVI up to 100MB' : 'JPG, PNG, WEBP up to 20MB'}
                  </span>
                </div>
              )}
            </div>
          )}

          <input ref={fileInputRef} type="file"
            accept={contentType === 'video' ? 'video/*' : 'image/*'}
            onChange={handleFileChange} style={{ display: 'none' }}
          />

          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginTop: 16, padding: '12px 16px', borderRadius: 10,
              background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)',
              color: '#f43f5e', fontSize: '0.875rem',
            }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            onClick={handleScan}
            disabled={scanning}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: '16px', fontSize: '1rem', opacity: scanning ? 0.8 : 1 }}
          >
            {scanning ? (
              <>
                <div style={{
                  width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                }} />
                Analyzing Content...
              </>
            ) : (
              <><Zap size={18} /> Scan Content</>
            )}
          </button>
        </div>

        {scanning && (
          <div className="glass-card" style={{ marginTop: 20, padding: '20px 24px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16, textAlign: 'center' }}>
              🔍 Running AI analysis pipeline...
            </p>
            {['Deepfake detection', 'Manipulation analysis', 'Language detection', 'Fact checking', 'Generating blockchain passport'].map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, opacity: 0.7, animation: `fadeInUp 0.4s ease ${i * 0.15}s both` }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: '2px solid var(--cyan)', borderTopColor: 'transparent',
                  animation: 'spin 1s linear infinite', flexShrink: 0,
                }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{step}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        textarea:focus { border-color: rgba(6,182,212,0.4) !important; box-shadow: 0 0 0 3px rgba(6,182,212,0.1); }
      `}</style>
    </div>
  );
}
