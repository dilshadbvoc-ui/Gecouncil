'use client';

import ModernNavigation from '@/components/ModernNavigation';
import { Search, MapPin, GraduationCap, Star } from 'lucide-react';
import { useState } from 'react';
import EuropeanLandmarks from '@/components/EuropeanLandmarks';
import UniversityLogos from '@/components/UniversityLogos';
import PremiumDivider from '@/components/PremiumDivider';
import PremiumStats from '@/components/PremiumStats';

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const universities = [
    {
      name: 'University of Amsterdam',
      country: 'Netherlands',
      location: 'Amsterdam',
      programs: 120,
      rating: 4.8,
      image: '🇳🇱',
      description: 'Leading research university with strong international focus'
    },
    {
      name: 'Technical University of Munich',
      country: 'Germany',
      location: 'Munich',
      programs: 95,
      rating: 4.9,
      image: '🇩🇪',
      description: 'Top-ranked technical university in Europe'
    },
    {
      name: 'University of Edinburgh',
      country: 'UK',
      location: 'Edinburgh',
      programs: 150,
      rating: 4.7,
      image: '🇬🇧',
      description: 'Historic university with world-class research facilities'
    },
    {
      name: 'University of Toronto',
      country: 'Canada',
      location: 'Toronto',
      programs: 200,
      rating: 4.8,
      image: '🇨🇦',
      description: 'Canada\'s leading university with diverse programs'
    },
    {
      name: 'University of Melbourne',
      country: 'Australia',
      location: 'Melbourne',
      programs: 180,
      rating: 4.7,
      image: '🇦🇺',
      description: 'Premier Australian university with global reputation'
    },
    {
      name: 'ETH Zurich',
      country: 'Switzerland',
      location: 'Zurich',
      programs: 85,
      rating: 4.9,
      image: '🇨🇭',
      description: 'World-renowned for science and technology programs'
    }
  ];

  const countries = ['all', 'Netherlands', 'Germany', 'UK', 'Canada', 'Australia', 'Switzerland'];

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
      color: '#F8F9FA'
    }}>
      <ModernNavigation />

      {/* Hero Section */}
      <section style={{ paddingTop: '6rem', paddingBottom: '2rem', padding: '6rem 1rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
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
      <section style={{ padding: '1.5rem 1rem' }}>
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
                color: '#D4AF37'
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
                  border: '1px solid rgba(212, 175, 55, 0.2)',
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
                border: '1px solid rgba(212, 175, 55, 0.2)',
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredUniversities.map((uni, index) => (
              <div
                key={index}
                className="premium-card"
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {uni.image}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  fontFamily: 'Playfair Display, serif'
                }}>
                  {uni.name}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  color: 'rgba(248, 249, 250, 0.7)',
                  fontSize: '0.875rem'
                }}>
                  <MapPin style={{ width: '16px', height: '16px', color: '#D4AF37' }} />
                  {uni.location}, {uni.country}
                </div>
                <p style={{
                  color: 'rgba(248, 249, 250, 0.7)',
                  fontSize: '0.9375rem',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {uni.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(212, 175, 55, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <GraduationCap style={{ width: '18px', height: '18px', color: '#D4AF37' }} />
                    <span style={{ fontSize: '0.875rem' }}>{uni.programs} Programs</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star style={{ width: '16px', height: '16px', color: '#D4AF37', fill: '#D4AF37' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{uni.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(212, 175, 55, 0.05)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
            }}>
              Global Excellence
            </h2>
            <PremiumDivider />
          </div>
          <PremiumStats />
        </div>
      </section>

      {/* European Cities Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(212, 175, 55, 0.05)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
            }}>
              Iconic European Cities
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(248, 249, 250, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              Experience world-class education in Europe's most prestigious locations
            </p>
          </div>
          <EuropeanLandmarks />
        </div>
      </section>

      {/* University Partners Carousel */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 0', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 1.5rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
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

      {/* Footer */}
      <footer style={{
        padding: '3rem 1.5rem',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
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
