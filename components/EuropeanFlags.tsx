'use client';

import { useEffect, useState } from 'react';

export default function EuropeanFlags() {
  const [activeIndex, setActiveIndex] = useState(0);

  const countries = [
    { flag: '🇬🇧', name: 'United Kingdom', color: '#C8102E' },
    { flag: '🇩🇪', name: 'Germany', color: '#FFCE00' },
    { flag: '🇫🇷', name: 'France', color: '#0055A4' },
    { flag: '🇳🇱', name: 'Netherlands', color: '#FF4F00' },
    { flag: '🇮🇹', name: 'Italy', color: '#009246' },
    { flag: '🇪🇸', name: 'Spain', color: '#C60B1E' },
    { flag: '🇨🇭', name: 'Switzerland', color: '#FF0000' },
    { flag: '🇸🇪', name: 'Sweden', color: '#006AA7' },
    { flag: '🇦🇹', name: 'Austria', color: '#ED2939' },
    { flag: '🇧🇪', name: 'Belgium', color: '#FDDA24' },
    { flag: '🇮🇪', name: 'Ireland', color: '#169B62' },
    { flag: '🇵🇹', name: 'Portugal', color: '#FF0000' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % countries.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [countries.length]);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'clamp(1rem, 3vw, 1.5rem)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 'clamp(1rem, 4vw, 2rem) 0'
    }}>
      {countries.map((country, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: activeIndex === index ? 1 : 0.4,
            transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)',
            transition: 'all 0.5s ease',
            cursor: 'pointer'
          }}
        >
          <div style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            filter: activeIndex === index ? 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))' : 'none',
            animation: activeIndex === index ? 'bounce 0.5s ease' : 'none'
          }}>
            {country.flag}
          </div>
          <div style={{
            fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)',
            color: activeIndex === index ? '#D4AF37' : 'rgba(248, 249, 250, 0.5)',
            fontWeight: activeIndex === index ? '600' : '400',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}>
            {country.name}
          </div>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}} />
    </div>
  );
}
