'use client';

import { useEffect, useState } from 'react';

// Approximate positions on a 700×420 canvas (simplified Europe)
const COUNTRIES = [
  { id: 'uk',          flag: '🇬🇧', name: 'United Kingdom', x: 195, y: 118, color: '#60a5fa',  unis: '18+' },
  { id: 'ireland',     flag: '🇮🇪', name: 'Ireland',        x: 162, y: 128, color: '#4ade80',  unis: '6+'  },
  { id: 'france',      flag: '🇫🇷', name: 'France',         x: 228, y: 168, color: '#f472b6',  unis: '22+' },
  { id: 'spain',       flag: '🇪🇸', name: 'Spain',          x: 210, y: 210, color: '#fb923c',  unis: '14+' },
  { id: 'portugal',    flag: '🇵🇹', name: 'Portugal',       x: 182, y: 218, color: '#facc15',  unis: '8+'  },
  { id: 'belgium',     flag: '🇧🇪', name: 'Belgium',        x: 248, y: 145, color: '#fbbf24',  unis: '9+'  },
  { id: 'netherlands', flag: '🇳🇱', name: 'Netherlands',    x: 258, y: 132, color: '#34d399',  unis: '12+' },
  { id: 'germany',     flag: '🇩🇪', name: 'Germany',        x: 278, y: 148, color: '#a78bfa',  unis: '28+' },
  { id: 'switzerland', flag: '🇨🇭', name: 'Switzerland',    x: 268, y: 178, color: '#f87171',  unis: '10+' },
  { id: 'austria',     flag: '🇦🇹', name: 'Austria',        x: 295, y: 172, color: '#c084fc',  unis: '7+'  },
  { id: 'italy',       flag: '🇮🇹', name: 'Italy',          x: 285, y: 200, color: '#86efac',  unis: '16+' },
  { id: 'sweden',      flag: '🇸🇪', name: 'Sweden',         x: 295, y: 98,  color: '#7dd3fc',  unis: '11+' },
];

// GEC India hub position
const HUB = { x: 560, y: 290, label: 'GEC India' };

function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2 + (y2 - y1) * 0.15;
  const my = (y1 + y2) / 2 - (x2 - x1) * 0.12;
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
}

export default function EuropeanFlags() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx(p => (p + 1) % COUNTRIES.length);
      setAnimKey(p => p + 1);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  const active = COUNTRIES[activeIdx];

  return (
    <div style={{ width: '100%', maxWidth: '860px', margin: '0 auto' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ef-dash   { to { stroke-dashoffset: -60; } }
        @keyframes ef-ping   { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.8);opacity:0} }
        @keyframes ef-glow   { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes ef-fadein { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ef-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .ef-hub { animation: ef-float 3.5s ease-in-out infinite; transform-origin: ${HUB.x}px ${HUB.y}px; }
      `}} />

      <svg
        viewBox="0 0 700 420"
        style={{ width: '100%', display: 'block', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(74,144,217,0.12)' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="ef-hub-grad" cx="38%" cy="32%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4338ca" />
          </radialGradient>
          <radialGradient id="ef-europe-bg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(74,144,217,0.08)" />
            <stop offset="100%" stopColor="rgba(74,144,217,0)" />
          </radialGradient>
          <radialGradient id="ef-india-bg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(249,115,22,0.12)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0)" />
          </radialGradient>
          <filter id="ef-glow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ef-glow-strong">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Grid */}
        {[100, 200, 300, 400].map(y => (
          <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
        ))}
        {[140, 280, 420, 560].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="420" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
        ))}

        {/* Europe region glow */}
        <ellipse cx="250" cy="170" rx="120" ry="90" fill="url(#ef-europe-bg)" />
        {/* India/GEC region glow */}
        <ellipse cx={HUB.x} cy={HUB.y} rx="70" ry="60" fill="url(#ef-india-bg)" />

        {/* Region labels */}
        <text x="250" y="62" textAnchor="middle"
          fill="rgba(74,144,217,0.4)" fontSize="10" fontWeight="600"
          fontFamily="Inter, sans-serif" letterSpacing="3">
          EUROPE
        </text>
        <text x={HUB.x} y={HUB.y - 68} textAnchor="middle"
          fill="rgba(249,115,22,0.4)" fontSize="10" fontWeight="600"
          fontFamily="Inter, sans-serif" letterSpacing="3">
          INDIA
        </text>

        {/* All inactive arcs */}
        {COUNTRIES.map((c, i) => {
          if (i === activeIdx) return null;
          return (
            <path key={i}
              d={arcPath(c.x, c.y, HUB.x, HUB.y)}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          );
        })}

        {/* Active arc */}
        <path key={`arc-base-${animKey}`}
          d={arcPath(active.x, active.y, HUB.x, HUB.y)}
          fill="none" stroke={active.color} strokeWidth="1.5" strokeOpacity="0.2"
        />
        <path key={`arc-dash-${animKey}`}
          d={arcPath(active.x, active.y, HUB.x, HUB.y)}
          fill="none" stroke={active.color} strokeWidth="2.5"
          strokeDasharray="10 7" strokeOpacity="0.9"
          filter="url(#ef-glow)"
          style={{ animation: 'ef-dash 0.65s linear infinite' }}
        />

        {/* Travelling dot */}
        <circle r="4.5" fill={active.color} filter="url(#ef-glow)" key={`travdot-${animKey}`}>
          <animateMotion dur="2.4s" repeatCount="indefinite"
            path={arcPath(active.x, active.y, HUB.x, HUB.y)} />
        </circle>

        {/* Country dots */}
        {COUNTRIES.map((c, i) => {
          const isActive = i === activeIdx;
          const isHovered = hovered === i;
          const show = isActive || isHovered;
          return (
            <g key={i}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => { setActiveIdx(i); setAnimKey(p => p + 1); }}
            >
              {/* Ping ring */}
              {isActive && (
                <circle cx={c.x} cy={c.y} r="14"
                  fill={c.color} opacity="0"
                  style={{ animation: 'ef-ping 1.3s ease-out infinite' }}
                />
              )}
              {/* Outer ring */}
              <circle cx={c.x} cy={c.y} r={show ? 11 : 7}
                fill="none"
                stroke={show ? c.color : 'rgba(255,255,255,0.08)'}
                strokeWidth="1"
                style={{ transition: 'all 0.25s' }}
              />
              {/* Main dot */}
              <circle cx={c.x} cy={c.y} r={show ? 7 : 4.5}
                fill={show ? c.color : 'rgba(255,255,255,0.18)'}
                stroke={show ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.08)'}
                strokeWidth="1.5"
                filter={isActive ? 'url(#ef-glow)' : undefined}
                style={{ transition: 'all 0.25s', ...(isActive ? { animation: 'ef-glow 1.5s ease-in-out infinite' } : {}) }}
              />
              {/* Flag + name tooltip on hover/active */}
              {show && (
                <g style={{ animation: 'ef-fadein 0.25s ease-out' }}>
                  <rect
                    x={c.x - 38} y={c.y - 34}
                    width="76" height="22" rx="5"
                    fill="rgba(0,0,0,0.82)" stroke={c.color} strokeWidth="1"
                  />
                  <text x={c.x} y={c.y - 21}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={c.color} fontSize="9.5" fontWeight="700"
                    fontFamily="Inter, sans-serif">
                    {c.flag} {c.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* GEC Hub */}
        <g className="ef-hub">
          <circle cx={HUB.x} cy={HUB.y} r="38"
            fill="none" stroke="rgba(129,140,248,0.12)" strokeWidth="1.5"
            style={{ animation: 'ef-glow 2.5s ease-in-out infinite' }}
          />
          <circle cx={HUB.x} cy={HUB.y} r="28"
            fill="none" stroke="rgba(129,140,248,0.22)" strokeWidth="1.5"
          />
          <circle cx={HUB.x} cy={HUB.y} r="20"
            fill="url(#ef-hub-grad)"
            stroke="rgba(255,255,255,0.2)" strokeWidth="2"
            filter="url(#ef-glow-strong)"
          />
          <text x={HUB.x} y={HUB.y - 3}
            textAnchor="middle" dominantBaseline="middle"
            fill="white" fontSize="10" fontWeight="800"
            fontFamily="Playfair Display, serif" letterSpacing="0.5">
            GEC
          </text>
          <text x={HUB.x} y={HUB.y + 9}
            textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.55)" fontSize="5.5" fontWeight="600"
            fontFamily="Inter, sans-serif" letterSpacing="2">
            HUB
          </text>
        </g>

        {/* Active country info card */}
        <g key={`card-${animKey}`} style={{ animation: 'ef-fadein 0.35s ease-out' }}>
          <rect x="420" y="20" width="260" height="58" rx="10"
            fill="rgba(0,0,0,0.75)" stroke={active.color} strokeWidth="1.2"
          />
          <text x="440" y="42" dominantBaseline="middle"
            fill={active.color} fontSize="18" fontFamily="Inter, sans-serif">
            {active.flag}
          </text>
          <text x="468" y="38" dominantBaseline="middle"
            fill="white" fontSize="11.5" fontWeight="700"
            fontFamily="Inter, sans-serif">
            {active.name}
          </text>
          <text x="468" y="56" dominantBaseline="middle"
            fill="rgba(255,255,255,0.5)" fontSize="9.5"
            fontFamily="Inter, sans-serif">
            {active.unis} partner universities
          </text>
        </g>

        {/* Counter */}
        <rect x="14" y="14" width="110" height="24" rx="6"
          fill="rgba(0,0,0,0.6)" stroke="rgba(74,144,217,0.25)" strokeWidth="1" />
        <text x="69" y="26" textAnchor="middle" dominantBaseline="middle"
          fill="rgba(248,249,250,0.55)" fontSize="9" fontFamily="Inter, sans-serif">
          {activeIdx + 1} / {COUNTRIES.length} countries
        </text>
      </svg>

      {/* Country pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', justifyContent: 'center', marginTop: '1.25rem' }}>
        {COUNTRIES.map((c, i) => {
          const isActive = i === activeIdx;
          return (
            <button key={i}
              onClick={() => { setActiveIdx(i); setAnimKey(p => p + 1); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.3rem 0.75rem', borderRadius: '20px',
                background: isActive ? c.color + '22' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isActive ? c.color : 'rgba(255,255,255,0.1)'}`,
                color: isActive ? c.color : 'rgba(248,249,250,0.45)',
                fontSize: '0.75rem', fontWeight: isActive ? '700' : '400',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
