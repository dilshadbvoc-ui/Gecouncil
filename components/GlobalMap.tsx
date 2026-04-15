'use client';

import { useEffect, useState } from 'react';

// Approximate SVG coords for a 960×500 Mercator-ish projection
// India center, then European capitals
const LOCATIONS = {
  india:      { x: 680, y: 285, label: 'India',       flag: '🇮🇳', color: '#f97316' },
  uk:         { x: 430, y: 155, label: 'United Kingdom', flag: '🇬🇧', color: '#60a5fa' },
  germany:    { x: 490, y: 160, label: 'Germany',     flag: '🇩🇪', color: '#a78bfa' },
  france:     { x: 450, y: 175, label: 'France',      flag: '🇫🇷', color: '#f472b6' },
  netherlands:{ x: 468, y: 152, label: 'Netherlands', flag: '🇳🇱', color: '#34d399' },
  sweden:     { x: 500, y: 130, label: 'Sweden',      flag: '🇸🇪', color: '#fbbf24' },
  spain:      { x: 435, y: 195, label: 'Spain',       flag: '🇪🇸', color: '#fb923c' },
  italy:      { x: 490, y: 190, label: 'Italy',       flag: '🇮🇹', color: '#4ade80' },
};

const ROUTES = [
  { dest: 'uk',          label: 'UK Programs',        color: '#60a5fa' },
  { dest: 'germany',     label: 'German Excellence',  color: '#a78bfa' },
  { dest: 'france',      label: 'French Culture',     color: '#f472b6' },
  { dest: 'netherlands', label: 'Dutch Innovation',   color: '#34d399' },
  { dest: 'sweden',      label: 'Nordic Quality',     color: '#fbbf24' },
  { dest: 'spain',       label: 'Spanish Heritage',   color: '#fb923c' },
  { dest: 'italy',       label: 'Italian Excellence', color: '#4ade80' },
];

// Cubic bezier control point — arc upward between India and Europe
function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.28;
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
}

export default function GlobalMap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx(p => (p + 1) % ROUTES.length);
      setAnimKey(p => p + 1);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const india = LOCATIONS.india;
  const activeRoute = ROUTES[activeIdx];
  const activeDest = LOCATIONS[activeRoute.dest as keyof typeof LOCATIONS];

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gm-dash { to { stroke-dashoffset: -60; } }
        @keyframes gm-pulse { 0%,100%{r:5;opacity:1} 50%{r:9;opacity:.4} }
        @keyframes gm-dot-travel { 0%{offset-distance:0%} 100%{offset-distance:100%} }
        @keyframes gm-fade-in { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
        @keyframes gm-ping { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(2.5);opacity:0} }
        @keyframes gm-glow { 0%,100%{opacity:.4} 50%{opacity:1} }
      `}} />

      <svg
        viewBox="0 0 960 500"
        style={{ width: '100%', display: 'block', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(74,144,217,0.12)' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="gm-india-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <filter id="gm-blur-sm">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="gm-glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="gm-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={activeRoute.color} opacity="0.8" />
          </marker>
        </defs>

        {/* Grid lines — subtle latitude/longitude feel */}
        {[100, 200, 300, 400].map(y => (
          <line key={y} x1="0" y1={y} x2="960" y2={y}
            stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        ))}
        {[160, 320, 480, 640, 800].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="500"
            stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        ))}

        {/* Continent silhouettes — simplified shapes */}
        {/* Europe blob */}
        <ellipse cx="475" cy="175" rx="80" ry="55"
          fill="rgba(74,144,217,0.06)" stroke="rgba(74,144,217,0.1)" strokeWidth="1" />
        {/* India blob */}
        <ellipse cx="680" cy="295" rx="38" ry="48"
          fill="rgba(249,115,22,0.07)" stroke="rgba(249,115,22,0.12)" strokeWidth="1" />
        {/* Middle East connector */}
        <ellipse cx="580" cy="240" rx="30" ry="20"
          fill="rgba(255,255,255,0.02)" />

        {/* All inactive routes — faint */}
        {ROUTES.map((route, i) => {
          if (i === activeIdx) return null;
          const dest = LOCATIONS[route.dest as keyof typeof LOCATIONS];
          return (
            <path key={i}
              d={arcPath(india.x, india.y, dest.x, dest.y)}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          );
        })}

        {/* Active route arc */}
        <path key={`arc-${animKey}`}
          d={arcPath(india.x, india.y, activeDest.x, activeDest.y)}
          fill="none"
          stroke={activeRoute.color}
          strokeWidth="2"
          strokeOpacity="0.25"
        />
        {/* Animated dash on active arc */}
        <path key={`dash-${animKey}`}
          d={arcPath(india.x, india.y, activeDest.x, activeDest.y)}
          fill="none"
          stroke={activeRoute.color}
          strokeWidth="2.5"
          strokeDasharray="10 8"
          strokeOpacity="0.9"
          filter="url(#gm-glow)"
          style={{ animation: 'gm-dash 0.7s linear infinite' }}
        />

        {/* Travelling dot along active arc */}
        <circle r="5" fill={activeRoute.color} filter="url(#gm-glow)" key={`dot-${animKey}`}>
          <animateMotion
            dur="2.6s"
            repeatCount="indefinite"
            path={arcPath(india.x, india.y, activeDest.x, activeDest.y)}
          />
        </circle>

        {/* All destination dots */}
        {ROUTES.map((route, i) => {
          const dest = LOCATIONS[route.dest as keyof typeof LOCATIONS];
          const isActive = i === activeIdx;
          return (
            <g key={i}>
              {isActive && (
                <circle cx={dest.x} cy={dest.y} r="14"
                  fill={route.color} opacity="0"
                  style={{ animation: 'gm-ping 1.4s ease-out infinite' }}
                />
              )}
              <circle cx={dest.x} cy={dest.y} r={isActive ? 7 : 4}
                fill={isActive ? route.color : 'rgba(255,255,255,0.2)'}
                stroke={isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'}
                strokeWidth="1.5"
                filter={isActive ? 'url(#gm-glow)' : undefined}
                style={isActive ? { animation: 'gm-glow 1.5s ease-in-out infinite' } : {}}
              />
            </g>
          );
        })}

        {/* India dot — always prominent */}
        <circle cx={india.x} cy={india.y} r="28"
          fill="url(#gm-india-glow)" />
        <circle cx={india.x} cy={india.y} r="18"
          fill="rgba(249,115,22,0.15)"
          style={{ animation: 'gm-ping 2s ease-out infinite' }}
        />
        <circle cx={india.x} cy={india.y} r="10"
          fill="#f97316"
          stroke="rgba(255,255,255,0.4)" strokeWidth="2"
          filter="url(#gm-glow)"
        />
        <text x={india.x} y={india.y + 22}
          textAnchor="middle" fill="#f97316"
          fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif"
          letterSpacing="1">
          INDIA
        </text>

        {/* Active destination label */}
        <g key={`label-${animKey}`} style={{ animation: 'gm-fade-in 0.4s ease-out' }}>
          <rect
            x={activeDest.x - 52} y={activeDest.y - 36}
            width="104" height="22" rx="6"
            fill="rgba(0,0,0,0.75)" stroke={activeRoute.color} strokeWidth="1"
          />
          <text x={activeDest.x} y={activeDest.y - 22}
            textAnchor="middle" dominantBaseline="middle"
            fill={activeRoute.color} fontSize="10.5" fontWeight="700"
            fontFamily="Inter, sans-serif">
            {activeRoute.label}
          </text>
        </g>

        {/* Europe label */}
        <text x="475" y="118" textAnchor="middle"
          fill="rgba(74,144,217,0.5)" fontSize="11" fontWeight="600"
          fontFamily="Inter, sans-serif" letterSpacing="3">
          EUROPE
        </text>

        {/* Route counter badge */}
        <rect x="20" y="20" width="130" height="32" rx="8"
          fill="rgba(0,0,0,0.6)" stroke="rgba(74,144,217,0.3)" strokeWidth="1" />
        <text x="85" y="36" textAnchor="middle" dominantBaseline="middle"
          fill="rgba(248,249,250,0.7)" fontSize="10" fontFamily="Inter, sans-serif">
          {activeIdx + 1} / {ROUTES.length} destinations
        </text>
      </svg>

      {/* Route pills below map */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1.25rem' }}>
        {ROUTES.map((route, i) => {
          const isActive = i === activeIdx;
          const dest = LOCATIONS[route.dest as keyof typeof LOCATIONS];
          return (
            <button key={i} onClick={() => { setActiveIdx(i); setAnimKey(p => p + 1); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.35rem 0.875rem', borderRadius: '20px',
                background: isActive ? route.color + '22' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isActive ? route.color : 'rgba(255,255,255,0.1)'}`,
                color: isActive ? route.color : 'rgba(248,249,250,0.5)',
                fontSize: '0.78rem', fontWeight: isActive ? '700' : '500',
                cursor: 'pointer', transition: 'all 0.25s',
              }}>
              <span>{dest.flag}</span>
              <span>{dest.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
