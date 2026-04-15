'use client';

import { useEffect, useState } from 'react';
import ModernNavigation from '@/components/ModernNavigation';
import Link from 'next/link';
import { GraduationCap, Clock, Globe, DollarSign, ArrowRight, X, MapPin, Star, ExternalLink, Calendar, FileText, Award, Building2 } from 'lucide-react';
import { Program, University, Country } from '@/types/admin';

export default function OverseasPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/programs?category=overseas').then(r => r.json()),
      fetch('/api/universities').then(r => r.json()),
      fetch('/api/countries?category=overseas').then(r => r.json()),
    ]).then(([progs, unis, ctrs]) => {
      setPrograms(Array.isArray(progs) ? progs : []);
      setUniversities(Array.isArray(unis) ? unis : []);
      setCountries(Array.isArray(ctrs) ? ctrs : []);
      setLoading(false);
    });
  }, []);

  // Programs for a given country — match by countryId or by university country name
  const countryPrograms = (country: Country) => {
    return programs.filter(p => {
      if (p.countryId && p.countryId === country.id) return true;
      const uni = universities.find(u => u.id === p.universityId);
      return uni?.country?.toLowerCase() === country.name.toLowerCase();
    });
  };

  const uniForProgram = (p: Program) => universities.find(u => u.id === p.universityId);

  // Group programs by university within a country
  const groupByUni = (progs: Program[]) => {
    const map = new Map<string, { uni: University | undefined; programs: Program[] }>();
    progs.forEach(p => {
      const key = p.universityId;
      if (!map.has(key)) map.set(key, { uni: uniForProgram(p), programs: [] });
      map.get(key)!.programs.push(p);
    });
    return Array.from(map.values());
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.11, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.93) 0%, rgba(139,92,246,0.05) 100%)', zIndex: 0, pointerEvents: 'none' }} />
      <ModernNavigation />
      <div style={{ paddingTop: '80px', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(4rem,10vw,7rem) 2rem', textAlign: 'center', background: 'radial-gradient(ellipse at top, rgba(139,92,246,0.07) 0%, transparent 70%)', borderBottom: '1px solid rgba(74,144,217,0.15)' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '1rem' }}>Global Education Council</p>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Study Abroad
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(248,249,250,0.65)', maxWidth: '580px', margin: '0 auto', lineHeight: '1.7' }}>
            Earn a European degree without leaving your family behind. Our partner universities bring world-class education to India.
          </p>
        </section>

        {/* Country Cards */}
        <section style={{ padding: 'clamp(3rem,6vw,5rem) 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#8b5cf6', padding: '3rem' }}>Loading...</div>
          ) : countries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.15)' }}>
              <GraduationCap size={40} style={{ color: '#8b5cf6', margin: '0 auto 1rem' }} />
              <p style={{ color: 'rgba(248,249,250,0.5)' }}>No study destinations available yet.</p>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', marginBottom: '0.75rem' }}>Study Destinations</h2>
                <p style={{ color: 'rgba(248,249,250,0.55)', fontSize: '1rem' }}>Click a country to explore available programs</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {countries.map(c => {
                  const count = countryPrograms(c).length;
                  return (
                    <button key={c.id} onClick={() => setSelectedCountry(c)}
                      style={{ textAlign: 'left', padding: '1.75rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.2)', cursor: 'pointer', transition: 'all 0.25s', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(139,92,246,0.6)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(139,92,246,0.06)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(139,92,246,0.2)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'; }}>
                      {/* Flag + Name */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '3rem', lineHeight: 1 }}>{c.flag}</div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#F8F9FA', fontSize: '1.125rem' }}>{c.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.5)' }}>{c.continent}</div>
                        </div>
                      </div>
                      {/* Description */}
                      {c.description && (
                        <p style={{ fontSize: '0.85rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.description}</p>
                      )}
                      {/* Highlights */}
                      {c.highlights && c.highlights.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {c.highlights.slice(0, 3).map((h, i) => (
                            <span key={i} style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa', fontSize: '0.72rem' }}>{h}</span>
                          ))}
                        </div>
                      )}
                      {/* Footer */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                        <span style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', color: '#8b5cf6', fontSize: '0.75rem', fontWeight: '700' }}>
                          {count} program{count !== 1 ? 's' : ''}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#8b5cf6', fontWeight: '600' }}>Explore →</span>
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
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', marginBottom: '1rem' }}>Start your journey abroad</h2>
          <p style={{ color: 'rgba(248,249,250,0.55)', marginBottom: '2rem' }}>Our counsellors will help you find the perfect program and university.</p>
          <Link href="/contact" style={{ padding: '0.875rem 2rem', borderRadius: '10px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', color: '#000', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Talk to a Counsellor <ArrowRight size={16} />
          </Link>
        </section>
      </div>

      {/* Country Detail Modal */}
      {selectedCountry && (() => {
        const progs = countryPrograms(selectedCountry);
        const groups = groupByUni(progs);
        return (
          <div onClick={() => setSelectedCountry(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}>
            <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '860px', background: '#0d0d0d', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '20px', overflow: 'hidden', marginTop: '2rem', marginBottom: '2rem' }}>
              {/* Header */}
              <div style={{ padding: '2rem', borderBottom: '1px solid rgba(139,92,246,0.15)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', background: 'rgba(139,92,246,0.04)' }}>
                <div style={{ fontSize: '3.5rem', lineHeight: 1, flexShrink: 0 }}>{selectedCountry.flag}</div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#FFFFFF', fontFamily: 'Playfair Display, serif', marginBottom: '0.4rem' }}>{selectedCountry.name}</h2>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6', margin: 0 }}>{selectedCountry.description}</p>
                </div>
                <button onClick={() => setSelectedCountry(null)} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.5rem', color: 'rgba(248,249,250,0.7)', cursor: 'pointer', flexShrink: 0 }}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Highlights */}
                {selectedCountry.highlights && selectedCountry.highlights.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '0.75rem', fontWeight: '700', color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Why Study Here</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {selectedCountry.highlights.map((h, i) => (
                        <span key={i} style={{ padding: '0.35rem 0.875rem', borderRadius: '20px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa', fontSize: '0.82rem' }}>{h}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Programs grouped by university */}
                <div>
                  <h3 style={{ fontSize: '0.75rem', fontWeight: '700', color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    Available Programs ({progs.length})
                  </h3>
                  {progs.length === 0 ? (
                    <p style={{ color: 'rgba(248,249,250,0.4)', fontSize: '0.875rem' }}>No programs listed for this country yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {groups.map(({ uni, programs: uniProgs }, gi) => (
                        <div key={gi}>
                          {/* University sub-header */}
                          {uni && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)' }}>
                              <span style={{ fontSize: '1.5rem' }}>{uni.image || '🎓'}</span>
                              <div>
                                <div style={{ fontWeight: '700', color: '#F8F9FA', fontSize: '0.9375rem' }}>{uni.name}</div>
                                <div style={{ fontSize: '0.78rem', color: 'rgba(248,249,250,0.5)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                  <MapPin size={11} style={{ color: '#8b5cf6' }} />{uni.location}
                                  {uni.established && <span>· Est. {uni.established}</span>}
                                  {uni.rating && <span style={{ color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Star size={11} fill="#D4AF37" />{uni.rating}</span>}
                                </div>
                              </div>
                            </div>
                          )}
                          {/* Program cards */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                            {uniProgs.map(p => (
                              <div key={p.id} style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.12)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                  <h4 style={{ fontWeight: '700', color: '#F8F9FA', fontSize: '0.9375rem', margin: 0 }}>{p.title}</h4>
                                  <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.3)', whiteSpace: 'nowrap' }}>{p.degree}</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6', marginBottom: '0.875rem' }}>{p.description}</p>
                                {/* Key details grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                  <div style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '0.78rem' }}>
                                    <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.15rem' }}>Duration</div>
                                    <div style={{ color: 'rgba(248,249,250,0.7)' }}>{p.duration}</div>
                                  </div>
                                  <div style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '0.78rem' }}>
                                    <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.15rem' }}>Language</div>
                                    <div style={{ color: 'rgba(248,249,250,0.7)' }}>{p.language}</div>
                                  </div>
                                  {p.tuitionFee && (
                                    <div style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '0.78rem' }}>
                                      <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.15rem' }}>Tuition Fee</div>
                                      <div style={{ color: 'rgba(248,249,250,0.7)' }}>{p.tuitionFee}</div>
                                    </div>
                                  )}
                                  {p.intake && (
                                    <div style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '0.78rem' }}>
                                      <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.15rem' }}>Intake</div>
                                      <div style={{ color: 'rgba(248,249,250,0.7)' }}>{p.intake}</div>
                                    </div>
                                  )}
                                  {p.applicationDeadline && (
                                    <div style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '0.78rem' }}>
                                      <div style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '0.15rem' }}>Deadline</div>
                                      <div style={{ color: 'rgba(248,249,250,0.7)' }}>{p.applicationDeadline}</div>
                                    </div>
                                  )}
                                </div>
                                {/* Requirements & Scholarships */}
                                {(p.requirements || p.scholarships) && (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                    {p.requirements && (
                                      <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.55)' }}>
                                        <span style={{ color: '#8b5cf6', fontWeight: '600' }}>Entry Requirements: </span>{p.requirements}
                                      </div>
                                    )}
                                    {p.scholarships && (
                                      <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.55)' }}>
                                        <span style={{ color: '#D4AF37', fontWeight: '600' }}>Scholarships: </span>{p.scholarships}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link href="/contact" onClick={() => setSelectedCountry(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '700' }}>
                    Apply Now <ArrowRight size={14} />
                  </Link>
                  <Link href="/contact" onClick={() => setSelectedCountry(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(139,92,246,0.4)', color: '#8b5cf6', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                    Talk to Counsellor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}
