'use client';

import { useEffect, useState } from 'react';

export default function PremiumStats() {
  const [counts, setCounts] = useState({ universities: 0, students: 0, countries: 0, programs: 0 });

  useEffect(() => {
    const targets = { universities: 100, students: 10000, countries: 12, programs: 500 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        universities: Math.floor(targets.universities * progress),
        students: Math.floor(targets.students * progress),
        countries: Math.floor(targets.countries * progress),
        programs: Math.floor(targets.programs * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: `${counts.universities}+`, label: 'Partner Universities', icon: '🎓' },
    { value: `${counts.students.toLocaleString()}+`, label: 'Students Enrolled', icon: '👨‍🎓' },
    { value: `${counts.countries}+`, label: 'European Countries', icon: '🌍' },
    { value: `${counts.programs}+`, label: 'Programs Available', icon: '📚' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 'clamp(1rem, 4vw, 2rem)',
      padding: 'clamp(2rem, 6vw, 3rem) 0'
    }}>
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            textAlign: 'center',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(74, 144, 217, 0.1) 0%, rgba(74, 144, 217, 0.05) 100%)',
            border: '1px solid rgba(74, 144, 217, 0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.borderColor = 'rgba(74, 144, 217, 0.6)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(74, 144, 217, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(74, 144, 217, 0.3)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', marginBottom: '1rem' }}>{stat.icon}</div>
          <div style={{
            fontSize: 'clamp(2rem, 7vw, 2.5rem)',
            fontWeight: '700',
            color: '#4A90D9',
            marginBottom: '0.5rem',
            fontFamily: 'Playfair Display, serif'
          }}>
            {stat.value}
          </div>
          <div style={{
            fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
            color: 'rgba(248, 249, 250, 0.7)',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
