'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, History, Upload, Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/upload', label: 'Verify', icon: Upload },
  { href: '/history', label: 'History', icon: History },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(2,8,23,0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(6,182,212,0.3)',
          }}>
            <Shield size={18} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>
            Truth<span className="gradient-text">Chain</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nav-desktop">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              padding: '8px 16px',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: pathname === href ? 'var(--cyan)' : 'var(--text-secondary)',
              background: pathname === href ? 'rgba(6,182,212,0.1)' : 'transparent',
              transition: 'all 0.2s',
            }}>
              {label}
            </Link>
          ))}
          <Link href="/upload" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.875rem', marginLeft: 8 }}>
            Verify Content
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="btn-ghost" style={{ display: 'none' }} id="mobile-menu-btn">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(2,8,23,0.97)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '12px 24px 20px',
        }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '12px 0',
              textDecoration: 'none', fontSize: '1rem', fontWeight: 500,
              color: pathname === href ? 'var(--cyan)' : 'var(--text-secondary)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              {label}
            </Link>
          ))}
          <Link href="/upload" className="btn-primary" onClick={() => setOpen(false)} style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
            Verify Content
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
