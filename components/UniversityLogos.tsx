'use client';

import { useEffect, useState } from 'react';

export default function UniversityLogos() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const universities = [
    { name: 'Oxford', icon: '🎓', country: '🇬🇧' },
    { name: 'Cambridge', icon: '📚', country: '🇬🇧' },
    { name: 'Sorbonne', icon: '🏛️', country: '🇫🇷' },
    { name: 'TU Munich', icon: '⚙️', country: '🇩🇪' },
    { name: 'ETH Zurich', icon: '🔬', country: '🇨🇭' },
    { name: 'Amsterdam', icon: '🌷', country: '🇳🇱' },
    { name: 'Barcelona', icon: '🏰', country: '🇪🇸' },
    { name: 'Milan', icon: '🎨', country: '🇮🇹' },
    { name: 'Stockholm', icon: '👑', country: '🇸🇪' },
    { name: 'Dublin', icon: '☘️', country: '🇮🇪' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (universities.length * 150));
    }, 50);
    return () => clearInterval(interval);
  }, [universities.length]);

  return (
    <div style={{
      overflow: 'hidden',
      width: '100%',
      padding: 'clamp(1rem, 4vw, 2rem) 0',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        gap: '2rem',
        transform: `translateX(-${scrollPosition}px)`,
        transition: 'transform 0.05s linear'
      }}>
        {[...universities, ...universities, ...universities].map((uni, index) => (
          <div
            key={index}
            style={{
              minWidth: 'clamp(110px, 25vw, 130px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
            }}
          >
            <div style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)' }}>{uni.icon}</div>
            <div style={{
              fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
              fontWeight: '600',
              color: '#D4AF37',
              textAlign: 'center'
            }}>
              {uni.name}
            </div>
            <div style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>{uni.country}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
