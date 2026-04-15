'use client';

import { useEffect, useState, useRef } from 'react';

const NODES = [
  { label: 'European\nUniversities', color: '#60a5fa', angle: 270, icon: 'globe' },
  { label: 'Skill\nDevelopment',    color: '#a78bfa', angle: 0,   icon: 'book' },
  { label: 'Indian\nStudents',      color: '#f472b6', angle: 90,  icon: 'users' },
  { label: 'Career\nPlacement',     color: '#fbbf24', angle: 180, icon: 'award' },
];

const ORBIT_R = 155;
const HUB_R   = 54;
const NODE_R  = 38;
const CX = 250, CY = 250;

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function nodePos(angle: number) {
  return { x: CX + ORBIT_R * Math.cos(toRad(angle)), y: CY + ORBIT_R * Math.sin(toRad(angle)) };
}

function NodeIcon({ type, cx, cy, r, color }: { type: string; cx: number; cy: number; r: number; color: string }) {
  const s = r * 0.48;
  const sw = 1.7;
  if (type === 'globe') return (
    <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round">
      <circle cx={cx} cy={cy} r={s} />
      <ellipse cx={cx} cy={cy} rx={s * 0.48} ry={s} />
      <line x1={cx - s} y1={cy} x2={cx + s} y2={cy} />
      <line x1={cx} y1={cy - s} x2={cx} y2={cy + s} />
    </g>
  );
  if (type === 'book') return (
    <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${cx - s * 0.1} ${cy - s * 0.9} C${cx - s * 0.1} ${cy - s * 0.9} ${cx - s * 0.8} ${cy - s * 0.7} ${cx - s * 0.8} ${cy + s * 0.9} L${cx + s * 0.8} ${cy + s * 0.9} L${cx + s * 0.8} ${cy - s * 0.7} C${cx + s * 0.8} ${cy - s * 0.7} ${cx - s * 0.1} ${cy - s * 0.9} ${cx - s * 0.1} ${cy - s * 0.9}Z`} />
      <line x1={cx - s * 0.1} y1={cy - s * 0.9} x2={cx - s * 0.1} y2={cy + s * 0.9} />
    </g>
  );
  if (type === 'users') return (
    <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round">
      <circle cx={cx - s * 0.22} cy={cy - s * 0.28} r={s * 0.38} />
      <path d={`M${cx - s * 0.82} ${cy + s * 0.62} C${cx - s * 0.82} ${cy + s * 0.08} ${cx + s * 0.38} ${cy + s * 0.08} ${cx + s * 0.38} ${cy + s * 0.62}`} />
      <circle cx={cx + s * 0.42} cy={cy - s * 0.38} r={s * 0.27} />
      <path d={`M${cx + s * 0.15} ${cy + s * 0.42} C${cx + s * 0.15} ${cy + s * 0.1} ${cx + s * 0.88} ${cy + s * 0.1} ${cx + s * 0.88} ${cy + s * 0.42}`} />
    </g>
  );
  return ( // award
    <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={cx} cy={cy - s * 0.18} r={s * 0.62} />
      <path d={`M${cx - s * 0.38} ${cy + s * 0.42} L${cx - s * 0.62} ${cy + s * 0.9} L${cx} ${cy + s * 0.62} L${cx + s * 0.62} ${cy + s * 0.9} L${cx + s * 0.38} ${cy + s * 0.42}`} />
    </g>
  );
}

export default function DiagramVisualization() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const ref = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      ref.current = (ref.current + 1) % NODES.length;
      setActive(ref.current);
    }, 2200);
    const t2 = setInterval(() => setTick(p => p + 1), 50);
    return () => { clearInterval(t); clearInterval(t2); };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gec-orbit  { to { transform: rotate(360deg);  } }
        @keyframes gec-orbitr { to { transform: rotate(-360deg); } }
        @keyframes gec-pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.2;transform:scale(0.85)} }
        @keyframes gec-dash   { to { stroke-dashoffset: -28; } }
        @keyframes gec-glow   { 0%,100%{opacity:.35} 50%{opacity:.9} }
        @keyframes gec-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .gec-ring1 { transform-origin:250px 250px; animation:gec-orbit  22s linear infinite; }
        .gec-ring2 { transform-origin:250px 250px; animation:gec-orbitr 34s linear infinite; }
        .gec-ring3 { transform-origin:250px 250px; animation:gec-orbit  48s linear infinite; }
        .gec-hub-float { transform-origin:250px 250px; animation:gec-float 4s ease-in-out infinite; }
      `}} />

      <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <radialGradient id="dv-hub" cx="38%" cy="32%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4338ca" />
          </radialGradient>
          <radialGradient id="dv-bg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(99,102,241,0.08)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          {NODES.map((n, i) => (
            <radialGradient key={i} id={`dv-n${i}`} cx="38%" cy="32%">
              <stop offset="0%" stopColor={n.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.55" />
            </radialGradient>
          ))}
          <filter id="dv-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="dv-glow-strong">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background radial glow */}
        <circle cx={CX} cy={CY} r={220} fill="url(#dv-bg)" />

        {/* Decorative rings */}
        <circle className="gec-ring3" cx={CX} cy={CY} r={210}
          fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" strokeDasharray="2 14" />
        <circle className="gec-ring1" cx={CX} cy={CY} r={ORBIT_R + 22}
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 10" />
        <circle className="gec-ring2" cx={CX} cy={CY} r={ORBIT_R - 18}
          fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="1 8" />

        {/* Orbit track */}
        <circle cx={CX} cy={CY} r={ORBIT_R}
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />

        {/* Connection lines hub → nodes */}
        {NODES.map((node, i) => {
          const pos = nodePos(node.angle);
          const isActive = active === i;
          const dx = pos.x - CX, dy = pos.y - CY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ux = dx / dist, uy = dy / dist;
          const x1 = CX + ux * (HUB_R + 3);
          const y1 = CY + uy * (HUB_R + 3);
          const x2 = pos.x - ux * (NODE_R + 3);
          const y2 = pos.y - uy * (NODE_R + 3);
          return (
            <g key={i}>
              {/* Base line */}
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isActive ? node.color : 'rgba(255,255,255,0.08)'}
                strokeWidth={isActive ? 2 : 1}
              />
              {/* Animated dash overlay */}
              {isActive && (
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={node.color} strokeWidth="2.5" strokeOpacity="0.9"
                  strokeDasharray="7 5"
                  style={{ animation: 'gec-dash 0.5s linear infinite' }}
                  filter="url(#dv-glow)"
                />
              )}
              {/* Travelling dot */}
              {isActive && (
                <circle r="4.5" fill={node.color} filter="url(#dv-glow)"
                  style={{ animation: 'gec-pulse 0.9s ease-in-out infinite' }}>
                  <animateMotion dur="1.1s" repeatCount="indefinite"
                    path={`M${x1},${y1} L${x2},${y2}`} />
                </circle>
              )}
            </g>
          );
        })}

        {/* Node circles */}
        {NODES.map((node, i) => {
          const pos = nodePos(node.angle);
          const isActive = active === i;
          const r = isActive ? NODE_R + 4 : NODE_R;
          return (
            <g key={i}>
              {/* Outer glow ring */}
              {isActive && (
                <circle cx={pos.x} cy={pos.y} r={r + 16}
                  fill={node.color} opacity="0.1"
                  style={{ animation: 'gec-glow 1.5s ease-in-out infinite' }}
                />
              )}
              {/* Mid ring */}
              <circle cx={pos.x} cy={pos.y} r={r + 6}
                fill="none"
                stroke={isActive ? node.color : 'rgba(255,255,255,0.06)'}
                strokeWidth="1"
                opacity={isActive ? 0.5 : 1}
              />
              {/* Main circle */}
              <circle cx={pos.x} cy={pos.y} r={r}
                fill={isActive ? `url(#dv-n${i})` : 'rgba(10,10,28,0.92)'}
                stroke={isActive ? node.color : 'rgba(255,255,255,0.12)'}
                strokeWidth={isActive ? 2 : 1.5}
                filter={isActive ? 'url(#dv-glow)' : undefined}
              />
              {/* Icon */}
              <NodeIcon type={node.icon} cx={pos.x} cy={pos.y} r={r}
                color={isActive ? '#fff' : 'rgba(255,255,255,0.4)'}
              />
              {/* Label */}
              {node.label.split('\n').map((line, li, arr) => {
                const ux = (pos.x - CX) / ORBIT_R;
                const uy = (pos.y - CY) / ORBIT_R;
                const lx = pos.x + ux * (r + 18);
                const ly = pos.y + uy * (r + 18) + (li - (arr.length - 1) / 2) * 13;
                return (
                  <text key={li} x={lx} y={ly}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={isActive ? node.color : 'rgba(255,255,255,0.4)'}
                    fontSize={isActive ? '11.5' : '10.5'}
                    fontWeight={isActive ? '700' : '500'}
                    fontFamily="Inter, sans-serif"
                    filter={isActive ? 'url(#dv-glow)' : undefined}
                  >{line}</text>
                );
              })}
            </g>
          );
        })}

        {/* Hub */}
        <g className="gec-hub-float">
          {/* Outer pulse ring */}
          <circle cx={CX} cy={CY} r={HUB_R + 20}
            fill="none" stroke="rgba(129,140,248,0.15)" strokeWidth="1.5"
            style={{ animation: 'gec-glow 2.5s ease-in-out infinite' }}
          />
          {/* Mid ring */}
          <circle cx={CX} cy={CY} r={HUB_R + 10}
            fill="none" stroke="rgba(129,140,248,0.25)" strokeWidth="1.5"
          />
          {/* Main hub */}
          <circle cx={CX} cy={CY} r={HUB_R}
            fill="url(#dv-hub)"
            stroke="rgba(255,255,255,0.2)" strokeWidth="2"
            filter="url(#dv-glow-strong)"
          />
          {/* GEC text */}
          <text x={CX} y={CY - 8} textAnchor="middle" dominantBaseline="middle"
            fill="white" fontSize="22" fontWeight="800"
            fontFamily="Playfair Display, serif"
            style={{ letterSpacing: '1px' }}>
            GEC
          </text>
          <text x={CX} y={CY + 14} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.6)" fontSize="7.5" fontWeight="600"
            fontFamily="Inter, sans-serif" letterSpacing="3.5">
            GLOBAL HUB
          </text>
        </g>

        {/* Corner accent dots */}
        {[45, 135, 225, 315].map((a, i) => {
          const x = CX + 230 * Math.cos(toRad(a));
          const y = CY + 230 * Math.sin(toRad(a));
          return <circle key={i} cx={x} cy={y} r="2" fill="rgba(255,255,255,0.12)" />;
        })}
      </svg>
    </div>
  );
}
