'use client';

import { useEffect, useState } from 'react';

export default function EuropeanLandmarks() {
  const [activeIndex, setActiveIndex] = useState(0);

  const landmarks = [
    { icon: '🗼', name: 'Eiffel Tower', city: 'Paris', country: '🇫🇷' },
    { icon: '🏰', name: 'Neuschwanstein', city: 'Bavaria', country: '🇩🇪' },
    { icon: '🏛️', name: 'Colosseum', city: 'Rome', country: '🇮🇹' },
    { icon: '🌉', name: 'Tower Bridge', city: 'London', country: '🇬🇧' },
    { icon: '⛪', name: 'Sagrada Familia', city: 'Barcelona', country: '🇪🇸' },
    { icon: '🏔️', name: 'Matterhorn', city: 'Zermatt', country: '🇨🇭' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % landmarks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [landmarks.length]);

  return (
    <div style={{
      position: 'relative',
      height: 'clamp(250px, 50vw, 300px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {landmarks.map((landmark, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            opacity: activeIndex === index ? 1 : 0,
            transform: activeIndex === index ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: activeIndex === index ? 'auto' : 'none'
          }}
        >
          <div style={{
            fontSize: 'clamp(4rem, 15vw, 6rem)',
            filter: 'drop-shadow(0 10px 30px rgba(212, 175, 55, 0.4))',
            animation: activeIndex === index ? 'float 3s ease-in-out infinite' : 'none'
          }}>
            {landmark.icon}
          </div>
          <div style={{
            textAlign: 'center',
            padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1rem, 4vw, 2rem)',
            borderRadius: '12px',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
              fontWeight: '700',
              color: '#D4AF37',
              marginBottom: '0.25rem',
              fontFamily: 'Playfair Display, serif'
            }}>
              {landmark.name}
            </div>
            <div style={{
              fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
              color: 'rgba(248, 249, 250, 0.7)'
            }}>
              {landmark.city} {landmark.country}
            </div>
          </div>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}} />
    </div>
  );
}
