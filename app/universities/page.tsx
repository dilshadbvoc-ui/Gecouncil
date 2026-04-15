'use client';

import ModernNavigation from '@/components/ModernNavigation';
import { Search, MapPin, GraduationCap, Star, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import EuropeanLandmarks from '@/components/EuropeanLandmarks';
import UniversityLogos from '@/components/UniversityLogos';
import PremiumDivider from '@/components/PremiumDivider';
import PremiumStats from '@/components/PremiumStats';
import PageGallery from '@/components/PageGallery';
import { University } from '@/types/admin';

// Same logo resolution logic as UniversityLogos
const LOGO_MAP: Record<string, string> = {
  'oxford':       'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/120px-Oxford-University-Circlet.svg.png',
  'cambridge':    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/100px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png',
  'sorbonne':     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Sorbonne_Universite_logo.svg/200px-Sorbonne_Universite_logo.svg.png',
  'munich':       'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/TU_M%C3%BCnchen_Logo.svg/200px-TU_M%C3%BCnchen_Logo.svg.png',
  'eth':          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/ETH_Z%C3%BCrich_Logo_black.svg/200px-ETH_Z%C3%BCrich_Logo_black.svg.png',
  'amsterdam':    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Universiteit_van_Amsterdam_logo.svg/200px-Universiteit_van_Amsterdam_logo.svg.png',
  'barcelona':    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Universitat_de_Barcelona_logo.svg/200px-Universitat_de_Barcelona_logo.svg.png',
  'milan':        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Politecnico_di_Milano_Logo.svg/200px-Politecnico_di_Milano_Logo.svg.png',
  'stockholm':    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Stockholm_University_logo.svg/200px-Stockholm_University_logo.svg.png',
  'dublin':       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/University_College_Dublin_logo.svg/200px-University_College_Dublin_logo.svg.png',
  'trinity':      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Trinity_College_Dublin_Logo.svg/200px-Trinity_College_Dublin_Logo.svg.png',
  'edinburgh':    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/University_of_Edinburgh_ceremonial_roundel.svg/120px-University_of_Edinburgh_ceremonial_roundel.svg.png',
  'manchester':   'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/University_of_Manchester_logo.svg/200px-University_of_Manchester_logo.svg.png',
  'imperial':     'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Imperial_College_London_logo.svg/200px-Imperial_College_London_logo.svg.png',
  'ucl':          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/UCL_logo.svg/200px-UCL_logo.svg.png',
  'lse':          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/LSE_Logo.svg/200px-LSE_Logo.svg.png',
  'delft':        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/TU_Delft_Logo.svg/200px-TU_Delft_Logo.svg.png',
  'leiden':       'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Leiden_University_logo.svg/200px-Leiden_University_logo.svg.png',
  'vienna':       'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Uni_Wien_Logo.svg/200px-Uni_Wien_Logo.svg.png',
  'berlin':       'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Humboldt-Universit%C3%A4t_zu_Berlin_Logo.svg/200px-Humboldt-Universit%C3%A4t_zu_Berlin_Logo.svg.png',
  'heidelberg':   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Heidelberg_University_Logo.svg/200px-Heidelberg_University_Logo.svg.png',
  'bologna':      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Unibo_Seal.svg/120px-Unibo_Seal.svg.png',
  'leuven':       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/KU_Leuven_logo.svg/200px-KU_Leuven_logo.svg.png',
};

const FLAG_MAP: Record<string, string> = {
  'united kingdom': '🇬🇧', 'uk': '🇬🇧', 'england': '🇬🇧',
  'germany': '🇩🇪', 'france': '🇫🇷', 'netherlands': '🇳🇱',
  'switzerland': '🇨🇭', 'sweden': '🇸🇪', 'spain': '🇪🇸',
  'italy': '🇮🇹', 'austria': '🇦🇹', 'belgium': '🇧🇪',
  'ireland': '🇮🇪', 'portugal': '🇵🇹', 'denmark': '🇩🇰',
  'norway': '🇳🇴', 'finland': '🇫🇮', 'poland': '🇵🇱',
  'india': '🇮🇳', 'usa': '🇺🇸', 'united states': '🇺🇸', 'canada': '🇨🇦', 'australia': '🇦🇺',
};

function getLogoUrl(uni: University): string | null {
  if (uni.logo && (uni.logo.startsWith('http') || uni.logo.startsWith('/api/images/'))) return uni.logo;
  const nameLower = uni.name.toLowerCase();
  for (const [key, url] of Object.entries(LOGO_MAP)) {
    if (nameLower.includes(key)) return url;
  }
  return null;
}

function getInitials(name: string): string {
  return name.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

function UniCard({ uni }: { uni: University }) {
  const logoUrl = getLogoUrl(uni);
  const [imgError, setImgError] = useState(false);
  const flag = FLAG_MAP[uni.country?.toLowerCase()] || '🌍';

  return (
    <Link href={`/universities/${uni.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div style={{
        padding: '1.75rem',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(74,144,217,0.18)',
        backdropFilter: 'blur(16px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(74,144,217,0.55)';
        el.style.background = 'rgba(74,144,217,0.06)';
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = '0 12px 40px rgba(74,144,217,0.15)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(74,144,217,0.18)';
        el.style.background = 'rgba(255,255,255,0.03)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}>
        {/* Logo + header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Logo box */}
          <div style={{
            width: '64px', height: '64px', flexShrink: 0,
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}>
            {logoUrl && !imgError ? (
              <img src={logoUrl} alt={uni.name} onError={() => setImgError(true)}
                style={{ width: '52px', height: '52px', objectFit: 'contain', padding: '4px' }} />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #1e3a5f 0%, #2563EB 100%)',
                color: '#fff', fontSize: '1.1rem', fontWeight: '800',
                fontFamily: 'Playfair Display, serif',
              }}>
                {getInitials(uni.name) || uni.image || '🎓'}
              </div>
            )}
          </div>
          {/* Name + location */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              fontSize: '0.9375rem', fontWeight: '700', color: '#F8F9FA',
              fontFamily: 'Playfair Display, serif', lineHeight: '1.3',
              marginBottom: '0.3rem',
              overflow: 'hidden', display: '-webkit-box',
              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            }}>{uni.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'rgba(248,249,250,0.55)' }}>
              <span>{flag}</span>
              <MapPin size={11} style={{ color: '#4A90D9' }} />
              <span>{uni.location}, {uni.country}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {uni.description && (
          <p style={{
            fontSize: '0.85rem', color: 'rgba(248,249,250,0.6)', lineHeight: '1.6',
            flex: 1, margin: 0,
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
          }}>{uni.description}</p>
        )}

        {/* Footer stats */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '0.875rem', borderTop: '1px solid rgba(74,144,217,0.12)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'rgba(248,249,250,0.55)' }}>
            <GraduationCap size={13} style={{ color: '#4A90D9' }} />
            <span>{uni.programs} programs</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem', color: '#D4AF37' }}>
            <Star size={12} fill="#D4AF37" />
            <span style={{ fontWeight: '700' }}>{uni.rating}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem', color: '#4A90D9', fontWeight: '600' }}>
            <span>View</span>
            <ExternalLink size={11} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await fetch('/api/universities');
      const data = await response.json();
      setUniversities(data);
    } catch (error) {
      console.error('Failed to fetch universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const countries = ['all', ...Array.from(new Set(universities.map(u => u.country)))];

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || uni.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      color: '#F8F9FA',
      position: 'relative'
    }}>
      {/* Full page background — European university architecture */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.95) 100%)', zIndex: 0, pointerEvents: 'none' }} />
      <ModernNavigation />

      {/* Hero Section */}
      <section style={{ paddingTop: '6rem', paddingBottom: '2rem', padding: '6rem 1rem 2rem', position: 'relative', overflow: 'hidden' }}>
        {/* Hero Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          backgroundImage: 'url(/images/hero_campus.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9))',
          zIndex: 1
        }} />
        
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            fontFamily: 'Playfair Display, serif',
            letterSpacing: '-0.02em'
          }} className="text-shadow-gold">
            Our Partner <span className="gold-accent">Universities</span>
          </h1>
          <PremiumDivider />
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(248, 249, 250, 0.7)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Explore 100+ world-class universities across Europe, North America, and Australia
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section style={{ padding: '1.5rem 1rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem'
          }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: '#4A90D9'
              }} />
              <input
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(74, 144, 217, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  color: '#F8F9FA',
                  fontSize: '0.9375rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Country Filter */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid rgba(74, 144, 217, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                color: '#F8F9FA',
                fontSize: '0.9375rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {countries.map(country => (
                <option key={country} value={country} style={{ background: '#1A2B45' }}>
                  {country === 'all' ? 'All Countries' : country}
                </option>
              ))}
            </select>
          </div>

          {/* Universities Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#4A90D9' }}>
                Loading universities...
              </div>
            ) : filteredUniversities.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                No universities found
              </div>
            ) : (
              filteredUniversities.map((uni, index) => (
                <UniCard key={uni.id || index} uni={uni} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(74, 144, 217, 0.05)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#4A90D9'
            }}>
              Global Excellence
            </h2>
            <PremiumDivider />
          </div>
          <PremiumStats />
        </div>
      </section>

      {/* European Cities Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(74, 144, 217, 0.05)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#4A90D9'
            }}>
              Iconic European Cities
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(248, 249, 250, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              Experience world-class education in Europe&apos;s most prestigious locations
            </p>
          </div>
          <EuropeanLandmarks />
        </div>
      </section>

      {/* University Partners Carousel */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 0', backgroundColor: 'rgba(0, 0, 0, 0.3)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 1.5rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#4A90D9'
            }}>
              Our University Partners
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(248, 249, 250, 0.7)' }}>
              Prestigious institutions delivering European-standard education
            </p>
          </div>
          <UniversityLogos />
        </div>
      </section>

      {/* Page Gallery */}
      <PageGallery page="universities" />

      {/* Footer */}
      <footer style={{
        padding: '3rem 1.5rem',
        borderTop: '1px solid rgba(74, 144, 217, 0.2)',
        textAlign: 'center',
        color: 'rgba(248, 249, 250, 0.5)',
        fontSize: '0.875rem',
        marginTop: '5rem'
      }}>
        © 2024 Global Education Council. All rights reserved.
      </footer>
    </div>
  );
}
