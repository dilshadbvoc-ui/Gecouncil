'use client';

import { useEffect, useState } from 'react';
import ModernNavigation from '@/components/ModernNavigation';
import Link from 'next/link';
import { BookOpen, Clock, Globe, DollarSign, ArrowRight } from 'lucide-react';
import { Program, University } from '@/types/admin';

export default function SkillPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeUni, setActiveUni] = useState<string>('all');

  useEffect(() => {
    Promise.all([
      fetch('/api/programs?category=skill').then(r => r.json()),
      fetch('/api/universities').then(r => r.json()),
    ]).then(([progs, unis]) => {
      setPrograms(Array.isArray(progs) ? progs : []);
      setUniversities(Array.isArray(unis) ? unis : []);
      setLoading(false);
    });
  }, []);

  const filtered = activeUni === 'all' ? programs : programs.filter(p => p.universityId === activeUni);
  const uniIds = [...new Set(programs.map(p => p.universityId))];
  const featuredUnis = universities.filter(u => uniIds.includes(u.id));

  const card: React.CSSProperties = { padding: '1.75rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', flexDirection: 'column', gap: '0.75rem' };

  return (
    <main style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
      <ModernNavigation />
      <div style={{ paddingTop: '80px' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(4rem,10vw,7rem) 2rem', textAlign: 'center', background: 'radial-gradient(ellipse at top, rgba(6,182,212,0.07) 0%, transparent 70%)', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: '#06b6d4', textTransform: 'uppercase', marginBottom: '1rem' }}>Global Education Council</p>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Skill Development
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(248,249,250,0.65)', maxWidth: '580px', margin: '0 auto', lineHeight: '1.7' }}>
            Industry-aligned programs and certifications from world-class European universities, delivered in India.
          </p>
        </section>

        {/* Partner Universities */}
        {featuredUnis.length > 0 && (
          <section style={{ padding: 'clamp(2.5rem,5vw,4rem) 2rem', borderBottom: '1px solid rgba(212,175,55,0.1)', background: 'rgba(6,182,212,0.02)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(1.25rem,3vw,1.75rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', marginBottom: '1.5rem', textAlign: 'center' }}>Partner Universities</h2>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button onClick={() => setActiveUni('all')} style={{ padding: '0.625rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.3)', background: activeUni === 'all' ? '#D4AF37' : 'transparent', color: activeUni === 'all' ? '#000' : '#D4AF37', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>All</button>
                {featuredUnis.map(u => (
                  <button key={u.id} onClick={() => setActiveUni(u.id)} style={{ padding: '0.625rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.3)', background: activeUni === u.id ? '#D4AF37' : 'transparent', color: activeUni === u.id ? '#000' : '#D4AF37', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{u.image}</span> {u.name}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Programs */}
        <section style={{ padding: 'clamp(2.5rem,5vw,4rem) 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#D4AF37', padding: '3rem' }}>Loading programs...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.15)' }}>
              <BookOpen size={40} style={{ color: '#D4AF37', margin: '0 auto 1rem' }} />
              <p style={{ color: 'rgba(248,249,250,0.5)', fontSize: '1rem' }}>No skill programs available yet.</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.4)', marginBottom: '1.5rem' }}>{filtered.length} program{filtered.length !== 1 ? 's' : ''} available</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {filtered.map(p => (
                  <div key={p.id} style={card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', background: 'rgba(6,182,212,0.15)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)' }}>{p.degree}</span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(248,249,250,0.4)' }}>{p.universityName}</span>
                    </div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: '700', color: '#F8F9FA', fontFamily: 'Playfair Display, serif', lineHeight: '1.3' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6', flex: 1 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.8rem', color: 'rgba(248,249,250,0.55)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} style={{ color: '#06b6d4' }} />{p.duration}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Globe size={12} style={{ color: '#06b6d4' }} />{p.language}</span>
                      {p.tuitionFee && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><DollarSign size={12} style={{ color: '#06b6d4' }} />{p.tuitionFee}</span>}
                      {p.intake && <span style={{ color: '#D4AF37' }}>Intake: {p.intake}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(3rem,6vw,5rem) 2rem', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', marginBottom: '1rem' }}>Ready to upskill?</h2>
          <p style={{ color: 'rgba(248,249,250,0.55)', marginBottom: '2rem' }}>Get in touch and we&apos;ll guide you to the right program.</p>
          <Link href="/contact" style={{ padding: '0.875rem 2rem', borderRadius: '10px', background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)', color: '#000', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Contact Us <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
