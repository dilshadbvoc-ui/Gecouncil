'use client';

import { useEffect, useState } from 'react';

export default function GlobalMap() {
  const [activePath, setActivePath] = useState(0);

  const connections = [
    { from: '🇮🇳', to: '🇬🇧', label: 'UK Programs' },
    { from: '🇮🇳', to: '🇩🇪', label: 'German Excellence' },
    { from: '🇮🇳', to: '🇫🇷', label: 'French Culture' },
    { from: '🇮🇳', to: '🇳🇱', label: 'Dutch Innovation' },
    { from: '🇮🇳', to: '🇨🇭', label: 'Swiss Quality' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePath((prev) => (prev + 1) % connections.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [connections.length]);

  return (
    <div style={{
      padding: 'clamp(2rem, 6vw, 3rem) 0',
      position: 'relative'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'clamp(1rem, 3vw, 2rem)',
        maxWidth: 'min(800px, 90vw)',
        margin: '0 auto',
        alignItems: 'center'
      }}>
        {/* India (Center) */}
        <div style={{
          gridColumn: '2',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            fontSize: 'clamp(2.5rem, 10vw, 4rem)',
            animation: 'pulse 2s ease-in-out infinite',
            filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))'
          }}>
            🇮🇳
          </div>
          <div style={{
            fontSize: 'clamp(0.75rem, 3vw, 1rem)',
            fontWeight: '700',
            color: '#D4AF37',
            fontFamily: 'Playfair Display, serif'
          }}>
            INDIA
          </div>
        </div>

        {/* European Countries */}
        {connections.map((conn, index) => (
          <div
            key={index}
            style={{
              gridColumn: index < 2 ? '1' : '3',
              gridRow: Math.floor(index / 2) + 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: activePath === index ? 1 : 0.3,
              transform: activePath === index ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.5s ease',
              position: 'relative'
            }}
          >
            <div style={{
              fontSize: 'clamp(2rem, 8vw, 3rem)',
              filter: activePath === index ? 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))' : 'none'
            }}>
              {conn.to}
            </div>
            <div style={{
              fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)',
              fontWeight: '600',
              color: activePath === index ? '#D4AF37' : 'rgba(248, 249, 250, 0.5)',
              textAlign: 'center'
            }}>
              {conn.label}
            </div>
            {activePath === index && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: index < 2 ? '100%' : 'auto',
                right: index >= 2 ? '100%' : 'auto',
                width: '100px',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.8), rgba(212, 175, 55, 0))',
                transform: 'translateY(-50%)',
                animation: 'flowLine 1.5s ease-in-out infinite'
              }} />
            )}
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes flowLine {
          0% { opacity: 0; transform: translateY(-50%) scaleX(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-50%) scaleX(1); }
        }
      `}} />
    </div>
  );
}
