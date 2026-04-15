'use client';

import { useEffect, useState, useRef } from 'react';
import { University } from '@/types/admin';

// Well-known university logo URLs via Clearbit / Wikipedia CDN
// Keyed by partial name match (lowercase)
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
  'zurich':       'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/ETH_Z%C3%BCrich_Logo_black.svg/200px-ETH_Z%C3%BCrich_Logo_black.svg.png',
  'berlin':       'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Humboldt-Universit%C3%A4t_zu_Berlin_Logo.svg/200px-Humboldt-Universit%C3%A4t_zu_Berlin_Logo.svg.png',
  'heidelberg':   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Heidelberg_University_Logo.svg/200px-Heidelberg_University_Logo.svg.png',
  'bologna':      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Unibo_Seal.svg/120px-Unibo_Seal.svg.png',
  'paris':        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Sorbonne_Universite_logo.svg/200px-Sorbonne_Universite_logo.svg.png',
  'ghent':        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ghent_University_logo.svg/200px-Ghent_University_logo.svg.png',
  'leuven':       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/KU_Leuven_logo.svg/200px-KU_Leuven_logo.svg.png',
  'warsaw':       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/University_of_Warsaw_logo.svg/200px-University_of_Warsaw_logo.svg.png',
  'prague':       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Charles_University_logo.svg/200px-Charles_University_logo.svg.png',
};

function getLogoUrl(uni: University): string | null {
  // If the university has a real logo URL stored
  if (uni.logo && (uni.logo.startsWith('http') || uni.logo.startsWith('/api/images/'))) {
    return uni.logo;
  }
  // Try to match by name
  const nameLower = uni.name.toLowerCase();
  for (const [key, url] of Object.entries(LOGO_MAP)) {
    if (nameLower.includes(key)) return url;
  }
  return null;
}

// Initials fallback
function getInitials(name: string): string {
  return name.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

// Country flag from country name
const FLAG_MAP: Record<string, string> = {
  'united kingdom': '🇬🇧', 'uk': '🇬🇧', 'england': '🇬🇧',
  'germany': '🇩🇪', 'france': '🇫🇷', 'netherlands': '🇳🇱',
  'switzerland': '🇨🇭', 'sweden': '🇸🇪', 'spain': '🇪🇸',
  'italy': '🇮🇹', 'austria': '🇦🇹', 'belgium': '🇧🇪',
  'ireland': '🇮🇪', 'portugal': '🇵🇹', 'denmark': '🇩🇰',
  'norway': '🇳🇴', 'finland': '🇫🇮', 'poland': '🇵🇱',
  'czech republic': '🇨🇿', 'hungary': '🇭🇺', 'india': '🇮🇳',
  'usa': '🇺🇸', 'united states': '🇺🇸', 'canada': '🇨🇦',
  'australia': '🇦🇺',
};

function getFlag(country: string): string {
  return FLAG_MAP[country.toLowerCase()] || '🌍';
}

// Fallback static list when no DB universities
const FALLBACK: University[] = [
  { id: '1', name: 'University of Oxford',    country: 'United Kingdom', location: 'Oxford',    programs: 120, rating: 4.9, image: '🎓', description: '' },
  { id: '2', name: 'University of Cambridge', country: 'United Kingdom', location: 'Cambridge', programs: 115, rating: 4.9, image: '📚', description: '' },
  { id: '3', name: 'Sorbonne University',     country: 'France',         location: 'Paris',     programs: 90,  rating: 4.7, image: '🏛️', description: '' },
  { id: '4', name: 'TU Munich',               country: 'Germany',        location: 'Munich',    programs: 85,  rating: 4.8, image: '⚙️', description: '' },
  { id: '5', name: 'ETH Zurich',              country: 'Switzerland',    location: 'Zurich',    programs: 80,  rating: 4.9, image: '🔬', description: '' },
  { id: '6', name: 'University of Amsterdam', country: 'Netherlands',    location: 'Amsterdam', programs: 75,  rating: 4.6, image: '🌷', description: '' },
  { id: '7', name: 'University of Barcelona', country: 'Spain',          location: 'Barcelona', programs: 70,  rating: 4.5, image: '🏰', description: '' },
  { id: '8', name: 'Politecnico di Milano',   country: 'Italy',          location: 'Milan',     programs: 65,  rating: 4.7, image: '🎨', description: '' },
  { id: '9', name: 'Stockholm University',    country: 'Sweden',         location: 'Stockholm', programs: 60,  rating: 4.6, image: '👑', description: '' },
  { id: '10',name: 'University College Dublin',country: 'Ireland',       location: 'Dublin',    programs: 55,  rating: 4.5, image: '☘️', description: '' },
  { id: '11',name: 'Imperial College London', country: 'United Kingdom', location: 'London',    programs: 95,  rating: 4.8, image: '🔭', description: '' },
  { id: '12',name: 'University of Edinburgh', country: 'United Kingdom', location: 'Edinburgh', programs: 88,  rating: 4.7, image: '🏰', description: '' },
];

interface LogoCardProps {
  uni: University;
}

function LogoCard({ uni }: LogoCardProps) {
  const logoUrl = getLogoUrl(uni);
  const [imgError, setImgError] = useState(false);
  const initials = getInitials(uni.name);
  const flag = getFlag(uni.country);

  return (
    <div style={{
      minWidth: '160px',
      maxWidth: '160px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.625rem',
      padding: '1.25rem 1rem',
      borderRadius: '14px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(74,144,217,0.18)',
      backdropFilter: 'blur(12px)',
      transition: 'all 0.3s ease',
      cursor: 'default',
      flexShrink: 0,
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(74,144,217,0.55)';
      (e.currentTarget as HTMLDivElement).style.background = 'rgba(74,144,217,0.08)';
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(74,144,217,0.18)';
      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
    }}>
      {/* Logo area */}
      <div style={{
        width: '72px', height: '72px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
      }}>
        {logoUrl && !imgError ? (
          <img
            src={logoUrl}
            alt={uni.name}
            onError={() => setImgError(true)}
            style={{ width: '60px', height: '60px', objectFit: 'contain', padding: '4px' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2563EB 100%)',
            color: '#fff',
            fontSize: initials.length > 2 ? '1rem' : '1.25rem',
            fontWeight: '800',
            fontFamily: 'Playfair Display, serif',
            letterSpacing: '0.5px',
          }}>
            {initials || uni.image || '🎓'}
          </div>
        )}
      </div>

      {/* Name */}
      <div style={{
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#F8F9FA',
        textAlign: 'center',
        lineHeight: '1.3',
        maxWidth: '130px',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      }}>
        {uni.name}
      </div>

      {/* Location + flag */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.3rem',
        fontSize: '0.7rem', color: 'rgba(248,249,250,0.5)',
      }}>
        <span>{flag}</span>
        <span>{uni.location}</span>
      </div>

      {/* Rating */}
      {uni.rating > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.25rem',
          fontSize: '0.7rem', color: '#D4AF37',
        }}>
          {'★'.repeat(Math.round(uni.rating))}{'☆'.repeat(5 - Math.round(uni.rating))}
        </div>
      )}
    </div>
  );
}

export default function UniversityLogos() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [paused, setPaused] = useState(false);
  const offsetRef = useRef(0);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>(0);
  const CARD_W = 176; // 160px + 16px gap

  useEffect(() => {
    fetch('/api/universities')
      .then(r => r.json())
      .then(data => setUniversities(Array.isArray(data) && data.length > 0 ? data : FALLBACK))
      .catch(() => setUniversities(FALLBACK));
  }, []);

  const list = universities.length > 0 ? universities : FALLBACK;
  // Triple the list so the loop is seamless
  const tripled = [...list, ...list, ...list];
  const totalW = list.length * CARD_W;

  useEffect(() => {
    if (paused) return;
    const step = () => {
      offsetRef.current = (offsetRef.current + 0.5) % totalW;
      setOffset(offsetRef.current);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, totalW]);

  return (
    <div
      style={{ overflow: 'hidden', width: '100%', padding: '1.5rem 0', position: 'relative' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #000, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #000, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{
        display: 'flex',
        gap: '1rem',
        transform: `translateX(-${offset}px)`,
        willChange: 'transform',
      }}>
        {tripled.map((uni, i) => (
          <LogoCard key={`${uni.id}-${i}`} uni={uni} />
        ))}
      </div>
    </div>
  );
}
