'use client';

import { useEffect, useRef, useState } from 'react';

interface TrustMeterProps {
  score: number;
  size?: number;
}

function getColor(score: number): string {
  if (score >= 75) return '#10b981';
  if (score >= 50) return '#f59e0b';
  if (score >= 25) return '#fb923c';
  return '#f43f5e';
}

function getLabel(score: number): string {
  if (score >= 75) return 'VERIFIED';
  if (score >= 50) return 'UNVERIFIED';
  if (score >= 25) return 'SUSPICIOUS';
  return 'FAKE';
}

export default function TrustMeter({ score, size = 220 }: TrustMeterProps) {
  const [animated, setAnimated] = useState(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1400;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setAnimated(Math.round(ease * score));
      if (progress < 1) animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [score]);

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const circumference = 2 * Math.PI * r;
  const arcLength = circumference * 0.75; // 270° arc
  const gapLength = circumference * 0.25;

  // offset: start at 135° (bottom-left), fill clockwise
  const strokeDasharray = `${arcLength} ${gapLength}`;
  const filledLength = (animated / 100) * arcLength;
  const emptyLength = circumference - filledLength;

  const color = getColor(score);
  const label = getLabel(score);

  // Rotation: 135° offset so arc starts at bottom-left
  const rotation = 135;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="meterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="33%" stopColor="#fb923c" />
            <stop offset="66%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background arc track */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={size * 0.07}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(${rotation} ${cx} ${cy})`}
        />

        {/* Filled arc */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth={size * 0.07}
          strokeDasharray={`${filledLength} ${emptyLength}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(${rotation} ${cx} ${cy})`}
          filter="url(#glow)"
          style={{ transition: 'stroke 0.4s' }}
        />

        {/* Center: score */}
        <text
          x={cx} y={cy - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.22}
          fontWeight="800"
          fill={color}
          fontFamily="Inter, sans-serif"
        >
          {animated}
        </text>
        <text
          x={cx} y={cy + size * 0.13}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.065}
          fill="rgba(255,255,255,0.4)"
          fontFamily="Inter, sans-serif"
        >
          / 100
        </text>

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = ((rotation + (tick / 100) * 270) * Math.PI) / 180;
          const outer = r + size * 0.08;
          const inner = r + size * 0.04;
          return (
            <line
              key={tick}
              x1={cx + inner * Math.cos(angle)} y1={cy + inner * Math.sin(angle)}
              x2={cx + outer * Math.cos(angle)} y2={cy + outer * Math.sin(angle)}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={1.5}
            />
          );
        })}
      </svg>

      {/* Label */}
      <div style={{
        padding: '8px 24px',
        borderRadius: 100,
        background: color + '22',
        border: `1px solid ${color}55`,
        color,
        fontWeight: 800,
        fontSize: '0.85rem',
        letterSpacing: '0.12em',
      }}>
        {label}
      </div>
    </div>
  );
}
