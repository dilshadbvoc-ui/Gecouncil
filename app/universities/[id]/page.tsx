'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ModernNavigation from '@/components/ModernNavigation';
import { MapPin, Globe, Users, Calendar, Star, ArrowLeft, Clock, DollarSign, BookOpen, GraduationCap, ExternalLink, Award } from 'lucide-react';
import Link from 'next/link';
import { University, Program } from '@/types/admin';

// Logo resolution (same map as UniversityLogos)
const LOGO_MAP: Record<string, string> = {
  oxford: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/120px-Oxford-University-Circlet.svg.png',
  cambridge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/100px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png',
  sorbonne: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Sorbonne_Universite_logo.svg/200px-Sorbonne_Universite_logo.svg.png',
  munich: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/TU_M%C3%BCnchen_Logo.svg/200px-TU_M%C3%BCnchen_Logo.svg.png',
  eth: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/ETH_Z%C3%BCrich_Logo_black.svg/200px-ETH_Z%C3%BCrich_Logo_black.svg.png',
  amsterdam: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Universiteit_van_Amsterdam_logo.svg/200px-Universiteit_van_Amsterdam_logo.svg.png',
  barcelona: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Universitat_de_Barcelona_logo.svg/200px-Universitat_de_Barcelona_logo.svg.png',
  milan: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Politecnico_di_Milano_Logo.svg/200px-Politecnico_di_Milano_Logo.svg.png',
  stockholm: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Stockholm_University_logo.svg/200px-Stockholm_University_logo.svg.png',
  dublin: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/University_College_Dublin_logo.svg/200px-University_College_Dublin_logo.svg.png',
  edinburgh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/University_of_Edinburgh_ceremonial_roundel.svg/120px-University_of_Edinburgh_ceremonial_roundel.svg.png',
  manchester: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/University_of_Manchester_logo.svg/200px-University_of_Manchester_logo.svg.png',
  imperial: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Imperial_College_London_logo.svg/200px-Imperial_College_London_logo.svg.png',
  ucl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/UCL_logo.svg/200px-UCL_logo.svg.png',
  lse: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/LSE_Logo.svg/200px-LSE_Logo.svg.png',
  delft: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/TU_Delft_Logo.svg/200px-TU_Delft_Logo.svg.png',
  leiden: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Leiden_University_logo.svg/200px-Leiden_University_logo.svg.png',
  vienna: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Uni_Wien_Logo.svg/200px-Uni_Wien_Logo.svg.png',
  berlin: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Humboldt-Universit%C3%A4t_zu_Berlin_Logo.svg/200px-Humboldt-Universit%C3%A4t_zu_Berlin_Logo.svg.png',
  heidelberg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Heidelberg_University_Logo.svg/200px-Heidelberg_University_Logo.svg.png',
  leuven: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/KU_Leuven_logo.svg/200px-KU_Leuven_logo.svg.png',
};

function getLogoUrl(uni: University): string | null {
  if (uni.logo && (uni.logo.startsWith('http') || uni.logo.startsWith('/api/images/'))) return uni.logo;
  const n = uni.name.toLowerCase();
  for (const [k, v] of Object.entries(LOGO_MAP)) { if (n.includes(k)) return v; }
  return null;
}

function getInitials(name: string) {
  return name.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

const CAT_COLOR: Record<string, string> = { skill: '#06b6d4', overseas: '#8b5cf6', both: '#4A90D9', recruitment: '#f59e0b' };

export default function UniversityDetailPage() {
  const params = useParams();
  const [university, setUniversity] = useState<University | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'skill' | 'overseas' | 'recruitment'>('all');

  useEffect(() => {
    if (!params.id) return;
    const id = params.id as string;
    Promise.all([
      fetch(`/api/universities/${id}`).then(r => r.json()),
      fetch(`/api/programs?universityId=${id}`).then(r => r.json()),
    ]).then(([uni, progs]) => {
      setUniversity(uni);
      setPrograms(Array.isArray(progs) ? progs : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <ModernNavigation />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', color: '#4A90D9', fontSize: '1.25rem' }}>Loading...</div>
    </div>
  );

  if (!university) return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F8F9FA' }}>
      <ModernNavigation />
      <div style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: '#4A90D9', marginBottom: '1rem' }}>University Not Found</h1>
        <Link href="/universities">
          <button style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'linear-gradient(135deg,#4A90D9,#2563EB)', border: 'none', color: '#000', fontWeight: '600', cursor: 'pointer' }}>Back to Universities</button>
        </Link>
      </div>
    </div>
  );

  const logoUrl = getLogoUrl(university);
  const initials = getInitials(university.name);
  const filteredPrograms = activeTab === 'all' ? programs : programs.filter(p => p.category === activeTab || p.category === 'both');

  const card: React.CSSProperties = { padding: '1.5rem', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.15)', display: 'flex', flexDirection: 'column', gap: '0.75rem' };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F8F9FA', fontFamily: 'Inter, sans-serif' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at top right, rgba(74,144,217,0.06) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }} />
      <ModernNavigation />

      <div style={{ paddingTop: '80px', position: 'relative', zIndex: 1 }}>
        {/* Hero banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(74,144,217,0.08) 0%, rgba(0,0,0,0) 100%)', borderBottom: '1px solid rgba(74,144,217,0.12)', padding: 'clamp(2rem,5vw,3.5rem) clamp(1rem,4vw,2rem)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Link href="/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#4A90D9', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              <ArrowLeft size={16} /> Back to Universities
            </Link>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {/* Logo */}
              <div style={{ width: '100px', height: '100px', borderRadius: '18px', background: 'rgba(255,255,255,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
                {logoUrl && !imgError ? (
                  <img src={logoUrl} alt={university.name} onError={() => setImgError(true)} style={{ width: '84px', height: '84px', objectFit: 'contain', padding: '6px' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#1e3a5f,#2563EB)', color: '#fff', fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Playfair Display, serif' }}>
                    {initials || university.image || '🎓'}
                  </div>
                )}
              </div>

              {/* Title block */}
              <div style={{ flex: 1, minWidth: '240px' }}>
                <h1 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: '800', color: '#F8F9FA', fontFamily: 'Playfair Display, serif', lineHeight: '1.15', marginBottom: '0.75rem' }}>
                  {university.name}
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.875rem', color: 'rgba(248,249,250,0.6)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><MapPin size={14} style={{ color: '#4A90D9' }} />{university.location}, {university.country}</span>
                  {university.established && <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={14} style={{ color: '#4A90D9' }} />Est. {university.established}</span>}
                  {university.students && <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Users size={14} style={{ color: '#4A90D9' }} />{university.students.toLocaleString()}+ students</span>}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#D4AF37' }}><Star size={14} fill="#D4AF37" />{university.rating} rating</span>
                </div>
                {university.faculty && university.faculty.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.875rem' }}>
                    {university.faculty.map((f, i) => (
                      <span key={i} style={{ padding: '0.2rem 0.65rem', borderRadius: '20px', background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.25)', color: '#93c5fd', fontSize: '0.75rem' }}>{f}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexShrink: 0 }}>
                {university.website && (
                  <a href={university.website} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.25rem', borderRadius: '10px', background: 'linear-gradient(135deg,#4A90D9,#2563EB)', color: '#000', fontWeight: '700', textDecoration: 'none', fontSize: '0.875rem' }}>
                    <Globe size={15} /> Visit Website <ExternalLink size={13} />
                  </a>
                )}
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.75rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(74,144,217,0.4)', color: '#4A90D9', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem,4vw,3rem) clamp(1rem,4vw,2rem)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: '2rem', alignItems: 'start' }}>

          {/* Left — main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', minWidth: 0 }}>

            {/* About */}
            {(university.description || university.details) && (
              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#F8F9FA', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={18} style={{ color: '#4A90D9' }} /> About the University
                </h2>
                <p style={{ color: 'rgba(248,249,250,0.75)', lineHeight: '1.8', fontSize: '0.9375rem', marginBottom: university.details ? '1rem' : 0 }}>{university.description}</p>
                {university.details && <p style={{ color: 'rgba(248,249,250,0.6)', lineHeight: '1.8', fontSize: '0.9rem' }}>{university.details}</p>}
              </section>
            )}

            {/* Programs */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#F8F9FA', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GraduationCap size={18} style={{ color: '#4A90D9' }} /> Programs Offered
                  <span style={{ padding: '0.15rem 0.6rem', borderRadius: '20px', background: 'rgba(74,144,217,0.15)', color: '#4A90D9', fontSize: '0.75rem', fontWeight: '700' }}>{programs.length}</span>
                </h2>
                {/* Category tabs */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {(['all', 'skill', 'overseas', 'recruitment'] as const).map(tab => {
                    const count = tab === 'all' ? programs.length : programs.filter(p => p.category === tab || p.category === 'both').length;
                    if (tab !== 'all' && count === 0) return null;
                    return (
                      <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', border: `1px solid ${activeTab === tab ? (CAT_COLOR[tab] || '#4A90D9') : 'rgba(255,255,255,0.1)'}`, background: activeTab === tab ? (CAT_COLOR[tab] || '#4A90D9') + '22' : 'transparent', color: activeTab === tab ? (CAT_COLOR[tab] || '#4A90D9') : 'rgba(248,249,250,0.5)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600', textTransform: 'capitalize' }}>
                        {tab} {count > 0 && tab !== 'all' && `(${count})`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {filteredPrograms.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', borderRadius: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(74,144,217,0.1)', color: 'rgba(248,249,250,0.4)', fontSize: '0.9rem' }}>
                  No programs listed yet.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                  {filteredPrograms.map(p => {
                    const col = CAT_COLOR[p.category] || '#4A90D9';
                    return (
                      <div key={p.id} style={card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <h3 style={{ fontWeight: '700', color: '#F8F9FA', fontSize: '0.9375rem', lineHeight: '1.3', flex: 1 }}>{p.title}</h3>
                          <span style={{ padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.68rem', fontWeight: '700', background: col + '22', color: col, border: `1px solid ${col}44`, whiteSpace: 'nowrap', flexShrink: 0 }}>{p.degree}</span>
                        </div>
                        <p style={{ fontSize: '0.83rem', color: 'rgba(248,249,250,0.58)', lineHeight: '1.6', margin: 0 }}>{p.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.78rem', color: 'rgba(248,249,250,0.5)', marginTop: 'auto' }}>
                          {p.duration && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={11} style={{ color: col }} />{p.duration}</span>}
                          {p.language && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Globe size={11} style={{ color: col }} />{p.language}</span>}
                          {p.tuitionFee && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={11} style={{ color: col }} />{p.tuitionFee}</span>}
                          {p.intake && <span style={{ color: '#4A90D9', fontWeight: '600' }}>Intake: {p.intake}</span>}
                        </div>
                        {(p.requirements || p.applicationDeadline || p.scholarships) && (
                          <div style={{ paddingTop: '0.625rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            {p.requirements && <div style={{ fontSize: '0.75rem', color: 'rgba(248,249,250,0.5)' }}><span style={{ color: col, fontWeight: '600' }}>Requirements: </span>{p.requirements}</div>}
                            {p.applicationDeadline && <div style={{ fontSize: '0.75rem', color: 'rgba(248,249,250,0.5)' }}><span style={{ color: col, fontWeight: '600' }}>Deadline: </span>{p.applicationDeadline}</div>}
                            {p.scholarships && <div style={{ fontSize: '0.75rem', color: 'rgba(248,249,250,0.5)' }}><span style={{ color: '#D4AF37', fontWeight: '600' }}>Scholarships: </span>{p.scholarships}</div>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Key Persons */}
            {university.keyPersons && university.keyPersons.length > 0 && (
              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#F8F9FA', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={18} style={{ color: '#4A90D9' }} /> University Officials
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  {university.keyPersons.map(person => (
                    <div key={person.id} style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.15)', textAlign: 'center' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(74,144,217,0.1)', border: '2px solid rgba(74,144,217,0.3)', margin: '0 auto 1rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {person.image ? <img src={person.image} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '2rem' }}>👤</span>}
                      </div>
                      <div style={{ fontWeight: '700', color: '#F8F9FA', fontSize: '0.9375rem', marginBottom: '0.25rem', fontFamily: 'Playfair Display, serif' }}>{person.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#4A90D9', fontWeight: '600', marginBottom: person.bio ? '0.625rem' : 0 }}>{person.position}</div>
                      {person.bio && <p style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6', margin: 0 }}>{person.bio}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar — quick facts */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: '100px' }}>
            <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(74,144,217,0.05)', border: '1px solid rgba(74,144,217,0.2)' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '700', color: '#4A90D9', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>Quick Facts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: <GraduationCap size={16} style={{ color: '#4A90D9' }} />, label: 'Programs', value: `${university.programs}+` },
                  university.established ? { icon: <Calendar size={16} style={{ color: '#4A90D9' }} />, label: 'Established', value: String(university.established) } : null,
                  university.students ? { icon: <Users size={16} style={{ color: '#4A90D9' }} />, label: 'Students', value: `${university.students.toLocaleString()}+` } : null,
                  { icon: <Star size={16} style={{ color: '#D4AF37' }} />, label: 'Rating', value: `${university.rating} / 5` },
                  { icon: <MapPin size={16} style={{ color: '#4A90D9' }} />, label: 'Location', value: `${university.location}, ${university.country}` },
                ].filter(Boolean).map((item, i) => item && (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(248,249,250,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#F8F9FA' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category breakdown */}
            {programs.length > 0 && (
              <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(74,144,217,0.12)' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: '700', color: '#4A90D9', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Programs by Type</h3>
                {(['skill', 'overseas', 'recruitment', 'both'] as const).map(cat => {
                  const count = programs.filter(p => p.category === cat).length;
                  if (count === 0) return null;
                  const col = CAT_COLOR[cat] || '#4A90D9';
                  return (
                    <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(248,249,250,0.6)', textTransform: 'capitalize' }}>{cat}</span>
                      <span style={{ padding: '0.15rem 0.55rem', borderRadius: '20px', background: col + '22', color: col, fontSize: '0.72rem', fontWeight: '700', border: `1px solid ${col}44` }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <Link href="/contact" style={{ display: 'block', padding: '1rem', borderRadius: '12px', background: 'linear-gradient(135deg,#4A90D9,#2563EB)', color: '#000', fontWeight: '700', textDecoration: 'none', textAlign: 'center', fontSize: '0.9rem' }}>
              Apply / Enquire
            </Link>
          </aside>
        </div>
      </div>

      <footer style={{ padding: '2.5rem 1.5rem', borderTop: '1px solid rgba(74,144,217,0.15)', textAlign: 'center', color: 'rgba(248,249,250,0.4)', fontSize: '0.875rem', position: 'relative', zIndex: 1 }}>
        © 2025 Global Education Council. All rights reserved.
      </footer>
    </div>
  );
}
