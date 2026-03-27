'use client';

import { useEffect, useState } from 'react';
import ModernNavigation from '@/components/ModernNavigation';
import Link from 'next/link';
import { GraduationCap, Clock, Globe, DollarSign, MapPin, ArrowRight } from 'lucide-react';
import { Program, University } from '@/types/admin';

export default function OverseasPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeUni, setActiveUni] = useState<string>('all');
  const [activeDegree, setActiveDegree] = useState<string>('all');

  useEffect(() => {
    Promise.all([
      fetch('/api/programs?category=overseas').then(r => r.json()),
      fetch('/api/universities').then(r => r.json()),
    ]).then(([progs, unis]) => {
      setPrograms(Array.isArray(progs) ? progs : []);
      setUniversities(Array.isArray(unis) ? unis : []);
      setLoading(false);
    });
  }, []);

  const uniIds = [...new Set(programs.map(p => p.universityId))];
  const featuredUnis = universities.filter(u => uniIds.includes(u.id));
  const degrees = [...new Set(programs.map(p => p.degree))];

  const filtered = programs.filter(p => {
    const uniMatch = activeUni === 'all' || p.universityId === activeUni;
    const degMatch = activeDegree === 'all' || p.degree === activeDegree;
    return uniMatch && degMatch;
  });

  const card: React.CSSProperties = { padding: '1.75rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', flexDirection: 'column', gap: '0.75rem' };
  const filterBtn = (active: boolean): React.CSSProperties => ({ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.3)', background: active ? '#D4AF37' : 'transparent', color: active ? '#000' : '#D4AF37', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' });

  return (
    <main style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
      <ModernNavigation />
      <div style={{ paddingTop: '80px' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(4rem,10vw,7rem) 2rem', textAlign: 'center', background: 'radial-gradient(ellipse at top, rgba(139,92,246,0.07) 0%, transparent 70%)', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '1rem' }}>Global Education Council</p>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Study Abroad
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(248,249,250,0.65)', maxWidth: '580px', margin: '0 auto', lineHeight: '1.7' }}>
            Earn a European degree without leaving your family behind. Our partner universities bring world-class education to India.
          </p>
        </section>

        {/* Universities */}
        {featuredUnis.length > 0 && (
          <section style={{ padding: 'clamp(2rem,4vw,3rem) 2rem', borderBottom: '1px solid rgba(212,175,55,0.1)', background: 'rgba(139,92,246,0.02)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {featuredUnis.map(u => (
                  <div key={u.id} onClick={() => setActiveUni(activeUni === u.id ? 'all' : u.id)} style={{ padding: '1.25rem', borderRadius: '12px', background: activeUni === u.id ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${activeUni === u.id ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.15)'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>{u.image}</span>
                    <div>
                      <div style={{ fontWeight: '600', color: '#F8F9FA', fontSize: '0.9rem' }}>{u.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(248,249,250,0.5)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={10} />{u.location}, {u.country}</div>
                    </div>
                  </div>
                ))}
              </div>
              {degrees.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setActiveDegree('all')} style={filterBtn(activeDegree === 'all')}>All Degrees</button>
                  {degrees.map(d => <button key={d} onClick={() => setActiveDegree(d)} style={filterBtn(activeDegree === d)}>{d}</button>)}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Programs */}
        <section style={{ padding: 'clamp(2.5rem,5vw,4rem) 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#D4AF37', padding: '3rem' }}>Loading programs...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.15)' }}>
              <GraduationCap size={40} style={{ color: '#D4AF37', margin: '0 auto 1rem' }} />
              <p style={{ color: 'rgba(248,249,250,0.5)' }}>No overseas programs available yet.</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.4)', marginBottom: '1.5rem' }}>{filtered.length} program{filtered.length !== 1 ? 's' : ''} found</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {filtered.map(p => (
                  <div key={p.id} style={card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.3)' }}>{p.degree}</span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(248,249,250,0.4)' }}>{p.universityName}</span>
                    </div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: '700', color: '#F8F9FA', fontFamily: 'Playfair Display, serif', lineHeight: '1.3' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6', flex: 1 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.8rem', color: 'rgba(248,249,250,0.55)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} style={{ color: '#8b5cf6' }} />{p.duration}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Globe size={12} style={{ color: '#8b5cf6' }} />{p.language}</span>
                      {p.tuitionFee && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><DollarSign size={12} style={{ color: '#8b5cf6' }} />{p.tuitionFee}</span>}
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
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', marginBottom: '1rem' }}>Start your journey abroad</h2>
          <p style={{ color: 'rgba(248,249,250,0.55)', marginBottom: '2rem' }}>Our counsellors will help you find the perfect program and university.</p>
          <Link href="/contact" style={{ padding: '0.875rem 2rem', borderRadius: '10px', background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)', color: '#000', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Talk to a Counsellor <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
