'use client';

import { useEffect, useState } from 'react';
import ModernNavigation from '@/components/ModernNavigation';
import Link from 'next/link';
import { BookOpen, Clock, Globe, DollarSign, ArrowRight, X, MapPin, Star, ExternalLink, GraduationCap, Calendar, FileText, Award } from 'lucide-react';
import { Program, University } from '@/types/admin';

export default function SkillPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUni, setSelectedUni] = useState<University | null>(null);

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

  // Universities that have at least one skill program
  const uniIds = [...new Set(programs.map(p => p.universityId))];
  const featuredUnis = universities.filter(u => uniIds.includes(u.id));

  const uniPrograms = (uniId: string) => programs.filter(p => p.universityId === uniId);

  return (
    <main style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.94) 0%, rgba(6,182,212,0.05) 100%)', zIndex: 0, pointerEvents: 'none' }} />
      <ModernNavigation />
      <div style={{ paddingTop: '80px', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(4rem,10vw,7rem) 2rem', textAlign: 'center', background: 'radial-gradient(ellipse at top, rgba(6,182,212,0.07) 0%, transparent 70%)', borderBottom: '1px solid rgba(74,144,217,0.15)' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: '#06b6d4', textTransform: 'uppercase', marginBottom: '1rem' }}>Global Education Council</p>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Skill Development
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(248,249,250,0.65)', maxWidth: '580px', margin: '0 auto', lineHeight: '1.7' }}>
            Industry-aligned programs and certifications from world-class European universities, delivered in India.
          </p>
        </section>

        {/* University Cards */}
        <section style={{ padding: 'clamp(3rem,6vw,5rem) 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#4A90D9', padding: '3rem' }}>Loading...</div>
          ) : featuredUnis.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.15)' }}>
              <BookOpen size={40} style={{ color: '#4A90D9', margin: '0 auto 1rem' }} />
              <p style={{ color: 'rgba(248,249,250,0.5)' }}>No skill programs available yet.</p>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', marginBottom: '0.75rem' }}>Partner Universities</h2>
                <p style={{ color: 'rgba(248,249,250,0.55)', fontSize: '1rem' }}>Click a university to explore their skill programs</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {featuredUnis.map(u => {
                  const count = uniPrograms(u.id).length;
                  return (
                    <button key={u.id} onClick={() => setSelectedUni(u)} style={{ textAlign: 'left', padding: '1.75rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,182,212,0.2)', cursor: 'pointer', transition: 'all 0.25s', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(6,182,212,0.6)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(6,182,212,0.06)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(6,182,212,0.2)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'; }}>
                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>
                          {u.image || '🎓'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: '700', color: '#F8F9FA', fontSize: '1rem', lineHeight: '1.3', marginBottom: '0.25rem' }}>{u.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.5)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <MapPin size={11} style={{ color: '#06b6d4' }} />{u.location}, {u.country}
                          </div>
                        </div>
                      </div>
                      {/* Description */}
                      {u.description && (
                        <p style={{ fontSize: '0.85rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{u.description}</p>
                      )}
                      {/* Footer */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                        <span style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)', color: '#06b6d4', fontSize: '0.75rem', fontWeight: '700' }}>
                          {count} program{count !== 1 ? 's' : ''}
                        </span>
                        {u.rating && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#D4AF37' }}>
                            <Star size={12} fill="#D4AF37" />{u.rating}
                          </span>
                        )}
                        <span style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: '600' }}>View Details →</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(3rem,6vw,5rem) 2rem', textAlign: 'center', borderTop: '1px solid rgba(74,144,217,0.1)' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', marginBottom: '1rem' }}>Ready to upskill?</h2>
          <p style={{ color: 'rgba(248,249,250,0.55)', marginBottom: '2rem' }}>Get in touch and we&apos;ll guide you to the right program.</p>
          <Link href="/contact" style={{ padding: '0.875rem 2rem', borderRadius: '10px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', color: '#000', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Contact Us <ArrowRight size={16} />
          </Link>
        </section>
      </div>

      {/* University Detail Modal */}
      {selectedUni && (
        <div onClick={() => setSelectedUni(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '780px', background: '#0d0d0d', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '20px', overflow: 'hidden', marginTop: '2rem', marginBottom: '2rem' }}>
            {/* Modal Header */}
            <div style={{ padding: '2rem', borderBottom: '1px solid rgba(6,182,212,0.15)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', background: 'rgba(6,182,212,0.04)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '14px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                {selectedUni.image || '🎓'}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#FFFFFF', fontFamily: 'Playfair Display, serif', marginBottom: '0.4rem' }}>{selectedUni.name}</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: 'rgba(248,249,250,0.6)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={13} style={{ color: '#06b6d4' }} />{selectedUni.location}, {selectedUni.country}</span>
                  {selectedUni.established && <span>Est. {selectedUni.established}</span>}
                  {selectedUni.students && <span>{selectedUni.students.toLocaleString()} students</span>}
                  {selectedUni.rating && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#D4AF37' }}><Star size={13} fill="#D4AF37" />{selectedUni.rating} rating</span>}
                </div>
              </div>
              <button onClick={() => setSelectedUni(null)} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.5rem', color: 'rgba(248,249,250,0.7)', cursor: 'pointer', flexShrink: 0 }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* About */}
              {selectedUni.description && (
                <div>
                  <h3 style={{ fontSize: '0.75rem', fontWeight: '700', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>About</h3>
                  <p style={{ color: 'rgba(248,249,250,0.75)', lineHeight: '1.7', fontSize: '0.9375rem' }}>{selectedUni.description}</p>
                  {selectedUni.details && <p style={{ color: 'rgba(248,249,250,0.6)', lineHeight: '1.7', fontSize: '0.875rem', marginTop: '0.75rem' }}>{selectedUni.details}</p>}
                </div>
              )}

              {/* Faculty / Specialisations */}
              {selectedUni.faculty && selectedUni.faculty.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '0.75rem', fontWeight: '700', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Faculties & Specialisations</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedUni.faculty.map((f, i) => (
                      <span key={i} style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', color: '#06b6d4', fontSize: '0.8rem' }}>{f}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Programs */}
              <div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: '700', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  Skill Programs ({uniPrograms(selectedUni.id).length})
                </h3>
                {uniPrograms(selectedUni.id).length === 0 ? (
                  <p style={{ color: 'rgba(248,249,250,0.4)', fontSize: '0.875rem' }}>No programs listed yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {uniPrograms(selectedUni.id).map(p => (
                      <div key={p.id} style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,182,212,0.15)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                          <h4 style={{ fontWeight: '700', color: '#F8F9FA', fontSize: '0.9375rem', margin: 0 }}>{p.title}</h4>
                          <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', background: 'rgba(6,182,212,0.15)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)', whiteSpace: 'nowrap' }}>{p.degree}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6', marginBottom: '0.75rem' }}>{p.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(248,249,250,0.55)' }}><Clock size={12} style={{ color: '#06b6d4' }} />{p.duration}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(248,249,250,0.55)' }}><Globe size={12} style={{ color: '#06b6d4' }} />{p.language}</span>
                          {p.tuitionFee && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(248,249,250,0.55)' }}><DollarSign size={12} style={{ color: '#06b6d4' }} />{p.tuitionFee}</span>}
                          {p.intake && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#4A90D9' }}><Calendar size={12} />Intake: {p.intake}</span>}
                        </div>
                        {(p.requirements || p.applicationDeadline || p.scholarships) && (
                          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {p.requirements && <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.55)' }}><span style={{ color: '#06b6d4', fontWeight: '600' }}>Requirements: </span>{p.requirements}</div>}
                            {p.applicationDeadline && <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.55)' }}><span style={{ color: '#06b6d4', fontWeight: '600' }}>Deadline: </span>{p.applicationDeadline}</div>}
                            {p.scholarships && <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.55)' }}><span style={{ color: '#06b6d4', fontWeight: '600' }}>Scholarships: </span>{p.scholarships}</div>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {selectedUni.website && (
                  <a href={selectedUni.website} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.625rem 1.25rem', borderRadius: '8px', border: '1px solid rgba(6,182,212,0.4)', color: '#06b6d4', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                    <ExternalLink size={14} /> Visit Website
                  </a>
                )}
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.625rem 1.25rem', borderRadius: '8px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', color: '#000', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '700' }}>
                  Enquire Now <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
