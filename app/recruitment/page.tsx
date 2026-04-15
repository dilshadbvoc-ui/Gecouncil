'use client';

import { useEffect, useState } from 'react';
import ModernNavigation from '@/components/ModernNavigation';
import Link from 'next/link';
import { Briefcase, Globe, MapPin, ArrowRight, X, Star, Clock, DollarSign, Users, CheckCircle } from 'lucide-react';
import { Program, Country } from '@/types/admin';

export default function RecruitmentPage() {
  const [opportunities, setOpportunities] = useState<Program[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/programs?category=recruitment').then(r => r.json()),
      fetch('/api/countries?category=recruitment').then(r => r.json()),
    ]).then(([opps, ctrs]) => {
      setOpportunities(Array.isArray(opps) ? opps : []);
      setCountries(Array.isArray(ctrs) ? ctrs : []);
      setLoading(false);
    });
  }, []);

  const countryOpportunities = (country: Country) =>
    opportunities.filter(o => {
      if (o.countryId && o.countryId === country.id) return true;
      return o.countryName?.toLowerCase() === country.name.toLowerCase();
    });

  const sectorColor = (sector?: string) => {
    const map: Record<string, string> = {
      healthcare: '#10b981', engineering: '#4A90D9', hospitality: '#f59e0b',
      finance: '#8b5cf6', education: '#06b6d4', construction: '#f97316',
    };
    const key = (sector || '').toLowerCase();
    return Object.entries(map).find(([k]) => key.includes(k))?.[1] || '#4A90D9';
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.93) 0%, rgba(236,72,153,0.04) 100%)', zIndex: 0, pointerEvents: 'none' }} />
      <ModernNavigation />
      <div style={{ paddingTop: '80px', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(4rem,10vw,8rem) 2rem', textAlign: 'center', background: 'radial-gradient(ellipse at top, rgba(74,144,217,0.08) 0%, transparent 70%)', borderBottom: '1px solid rgba(74,144,217,0.2)' }}>
          <p style={{ fontSize: '0.875rem', letterSpacing: '0.3em', color: '#4A90D9', textTransform: 'uppercase', marginBottom: '1rem' }}>Abroad Job Recruitment</p>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', lineHeight: '1.1', marginBottom: '1.5rem' }}>
            Work in Europe.<br />
            <span style={{ color: '#4A90D9' }}>Live Your Dream.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(248,249,250,0.7)', maxWidth: '620px', margin: '0 auto 2.5rem', lineHeight: '1.7' }}>
            We connect skilled Indian professionals with verified employers across Europe — handling everything from job matching to visa support.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ padding: '0.875rem 2rem', borderRadius: '10px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', color: '#000', fontWeight: '700', fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Apply Now <ArrowRight size={18} />
            </Link>
            <a href="#countries" style={{ padding: '0.875rem 2rem', borderRadius: '10px', border: '1.5px solid rgba(74,144,217,0.5)', color: '#4A90D9', fontWeight: '600', fontSize: '1rem', textDecoration: 'none' }}>
              Browse Countries
            </a>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: '3rem 2rem', borderBottom: '1px solid rgba(74,144,217,0.1)', background: 'rgba(74,144,217,0.03)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {[
              { value: '1,200+', label: 'Active Job Openings' },
              { value: '18', label: 'European Countries' },
              { value: '500+', label: 'Partner Employers' },
              { value: '95%', label: 'Visa Success Rate' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: '700', color: '#4A90D9', fontFamily: 'Playfair Display, serif' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(248,249,250,0.6)', marginTop: '0.25rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Country Cards */}
        <section id="countries" style={{ padding: 'clamp(3rem,6vw,5rem) 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#4A90D9', padding: '3rem' }}>Loading...</div>
          ) : countries.length === 0 ? (
            /* Fallback static cards if no countries in DB */
            <>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: 'clamp(1.75rem,4vw,3rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', marginBottom: '1rem' }}>Destination Countries</h2>
                <p style={{ color: 'rgba(248,249,250,0.6)' }}>Add countries via the admin panel to show opportunities here.</p>
              </div>
            </>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: 'clamp(1.75rem,4vw,3rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', marginBottom: '0.75rem' }}>Destination Countries</h2>
                <p style={{ color: 'rgba(248,249,250,0.6)' }}>Click a country to explore available job opportunities</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {countries.map(c => {
                  const count = countryOpportunities(c).length;
                  return (
                    <button key={c.id} onClick={() => setSelectedCountry(c)}
                      style={{ textAlign: 'left', padding: '1.75rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.2)', cursor: 'pointer', transition: 'all 0.25s', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(74,144,217,0.6)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(74,144,217,0.06)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(74,144,217,0.2)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'; }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '3rem', lineHeight: 1 }}>{c.flag}</div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#F8F9FA', fontSize: '1.125rem' }}>{c.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.5)' }}>{c.continent}</div>
                        </div>
                      </div>
                      {c.description && (
                        <p style={{ fontSize: '0.85rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.description}</p>
                      )}
                      {c.highlights && c.highlights.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {c.highlights.slice(0, 3).map((h, i) => (
                            <span key={i} style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.25)', color: '#93c5fd', fontSize: '0.72rem' }}>{h}</span>
                          ))}
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                        <span style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', background: 'rgba(74,144,217,0.12)', border: '1px solid rgba(74,144,217,0.3)', color: '#4A90D9', fontSize: '0.75rem', fontWeight: '700' }}>
                          {count} opportunit{count !== 1 ? 'ies' : 'y'}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#4A90D9', fontWeight: '600' }}>Explore →</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </section>

        {/* How It Works */}
        <section style={{ padding: 'clamp(3rem,6vw,5rem) 2rem', background: 'rgba(74,144,217,0.03)', borderTop: '1px solid rgba(74,144,217,0.1)', borderBottom: '1px solid rgba(74,144,217,0.1)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem,4vw,3rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', marginBottom: '1rem' }}>How It Works</h2>
              <p style={{ color: 'rgba(248,249,250,0.6)' }}>Your journey to working abroad in 4 simple steps</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              {[
                { step: '01', title: 'Register Your Profile', desc: 'Submit your qualifications, experience, and preferred destination country.' },
                { step: '02', title: 'Skills Assessment', desc: 'We evaluate your profile and match you with suitable European employers.' },
                { step: '03', title: 'Interview & Offer', desc: 'Connect directly with employers for interviews and receive job offers.' },
                { step: '04', title: 'Visa & Relocation', desc: 'We assist with work visa applications and pre-departure preparation.' },
              ].map(s => (
                <div key={s.step} style={{ textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(74,144,217,0.1)', border: '2px solid rgba(74,144,217,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1rem', fontWeight: '700', color: '#4A90D9', fontFamily: 'Playfair Display, serif' }}>
                    {s.step}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '0.5rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(3rem,6vw,5rem) 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: '#FFFFFF', marginBottom: '1rem' }}>Ready to Work Abroad?</h2>
          <p style={{ color: 'rgba(248,249,250,0.6)', marginBottom: '2rem', fontSize: '1rem' }}>Submit your profile today and our team will reach out within 48 hours.</p>
          <Link href="/contact" style={{ padding: '1rem 2.5rem', borderRadius: '10px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', color: '#000', fontWeight: '700', fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Get Started <ArrowRight size={18} />
          </Link>
        </section>
      </div>

      {/* Country Detail Modal */}
      {selectedCountry && (() => {
        const opps = countryOpportunities(selectedCountry);
        return (
          <div onClick={() => setSelectedCountry(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}>
            <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '820px', background: '#0d0d0d', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '20px', overflow: 'hidden', marginTop: '2rem', marginBottom: '2rem' }}>
              {/* Header */}
              <div style={{ padding: '2rem', borderBottom: '1px solid rgba(74,144,217,0.15)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', background: 'rgba(74,144,217,0.04)' }}>
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
                    <h3 style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4A90D9', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Why Work Here</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {selectedCountry.highlights.map((h, i) => (
                        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.875rem', borderRadius: '20px', background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.25)', color: '#93c5fd', fontSize: '0.82rem' }}>
                          <CheckCircle size={12} style={{ color: '#4A90D9' }} />{h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Opportunities */}
                <div>
                  <h3 style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4A90D9', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    Available Opportunities ({opps.length})
                  </h3>
                  {opps.length === 0 ? (
                    <p style={{ color: 'rgba(248,249,250,0.4)', fontSize: '0.875rem' }}>No opportunities listed for this country yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {opps.map(o => {
                        const col = sectorColor(o.sector);
                        return (
                          <div key={o.id} style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.12)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                              <h4 style={{ fontWeight: '700', color: '#F8F9FA', fontSize: '0.9375rem', margin: 0 }}>{o.title}</h4>
                              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                {o.sector && <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', background: col + '22', color: col, border: `1px solid ${col}44` }}>{o.sector}</span>}
                                {o.jobType && <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '600', background: 'rgba(255,255,255,0.06)', color: 'rgba(248,249,250,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>{o.jobType}</span>}
                              </div>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6', marginBottom: '0.875rem' }}>{o.description}</p>
                            {/* Details grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                              {o.duration && (
                                <div style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '0.78rem' }}>
                                  <div style={{ color: '#4A90D9', fontWeight: '600', marginBottom: '0.15rem' }}>Contract</div>
                                  <div style={{ color: 'rgba(248,249,250,0.7)' }}>{o.duration}</div>
                                </div>
                              )}
                              {o.salary && (
                                <div style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '0.78rem' }}>
                                  <div style={{ color: '#4A90D9', fontWeight: '600', marginBottom: '0.15rem' }}>Salary</div>
                                  <div style={{ color: 'rgba(248,249,250,0.7)' }}>{o.salary}</div>
                                </div>
                              )}
                              {o.language && (
                                <div style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '0.78rem' }}>
                                  <div style={{ color: '#4A90D9', fontWeight: '600', marginBottom: '0.15rem' }}>Language</div>
                                  <div style={{ color: 'rgba(248,249,250,0.7)' }}>{o.language}</div>
                                </div>
                              )}
                              {o.intake && (
                                <div style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '0.78rem' }}>
                                  <div style={{ color: '#4A90D9', fontWeight: '600', marginBottom: '0.15rem' }}>Start Date</div>
                                  <div style={{ color: 'rgba(248,249,250,0.7)' }}>{o.intake}</div>
                                </div>
                              )}
                              {o.visaSponsorship !== undefined && (
                                <div style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '0.78rem' }}>
                                  <div style={{ color: '#4A90D9', fontWeight: '600', marginBottom: '0.15rem' }}>Visa Sponsorship</div>
                                  <div style={{ color: o.visaSponsorship ? '#4ade80' : '#f87171' }}>{o.visaSponsorship ? 'Yes' : 'No'}</div>
                                </div>
                              )}
                            </div>
                            {/* Requirements */}
                            {(o.requirements || o.applicationDeadline) && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                {o.requirements && <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.55)' }}><span style={{ color: '#4A90D9', fontWeight: '600' }}>Requirements: </span>{o.requirements}</div>}
                                {o.applicationDeadline && <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.55)' }}><span style={{ color: '#4A90D9', fontWeight: '600' }}>Apply By: </span>{o.applicationDeadline}</div>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link href="/contact" onClick={() => setSelectedCountry(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', color: '#000', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '700' }}>
                    Apply Now <ArrowRight size={14} />
                  </Link>
                  <Link href="/contact" onClick={() => setSelectedCountry(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(74,144,217,0.4)', color: '#4A90D9', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                    Talk to Recruiter
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
