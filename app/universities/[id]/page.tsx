'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ModernNavigation from '@/components/ModernNavigation';
import { MapPin, Globe, Users, Calendar, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { University } from '@/types/admin';

export default function UniversityDetailPage() {
  const params = useParams();
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchUniversity(params.id as string);
    }
  }, [params.id]);

  const fetchUniversity = async (id: string) => {
    try {
      const response = await fetch(`/api/universities/${id}`);
      const data = await response.json();
      setUniversity(data);
    } catch (error) {
      console.error('Failed to fetch university:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
        <ModernNavigation />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <div style={{ color: '#D4AF37', fontSize: '1.25rem' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
        <ModernNavigation />
        <div style={{ padding: '6rem 1rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '1rem' }}>University Not Found</h1>
          <Link href="/universities">
            <button style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
              border: 'none',
              color: '#000000',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Back to Universities
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
      <ModernNavigation />

      {/* Hero Section */}
      <section style={{ paddingTop: '6rem', paddingBottom: '3rem', padding: '6rem 1rem 3rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Link href="/universities">
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: '#D4AF37',
              cursor: 'pointer',
              marginBottom: '2rem'
            }}>
              <ArrowLeft size={18} />
              Back to Universities
            </button>
          </Link>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Left Column */}
            <div>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem',
                textAlign: 'center',
                padding: '2rem',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}>
                {university.image}
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '700',
                marginBottom: '1rem',
                fontFamily: 'Playfair Display, serif',
                color: '#D4AF37'
              }}>
                {university.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <MapPin style={{ width: '20px', height: '20px', color: '#D4AF37' }} />
                <span style={{ color: 'rgba(248, 249, 250, 0.7)' }}>
                  {university.location}, {university.country}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <Star style={{ width: '20px', height: '20px', color: '#D4AF37', fill: '#D4AF37' }} />
                <span style={{ fontSize: '1.25rem', fontWeight: '600', color: '#F8F9FA' }}>
                  {university.rating}
                </span>
              </div>

              <p style={{
                fontSize: '1.125rem',
                color: 'rgba(248, 249, 250, 0.8)',
                lineHeight: '1.8',
                marginBottom: '2rem'
              }}>
                {university.description}
              </p>

              {university.website && (
                <a
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                    border: 'none',
                    color: '#000000',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  <Globe size={18} />
                  Visit Website
                </a>
              )}
            </div>

            {/* Right Column - Stats */}
            <div style={{
              padding: '2rem',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                fontFamily: 'Playfair Display, serif',
                color: '#D4AF37'
              }}>
                Quick Facts
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {university.established && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Calendar style={{ width: '20px', height: '20px', color: '#D4AF37' }} />
                      <span style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.6)' }}>Established</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#F8F9FA' }}>
                      {university.established}
                    </div>
                  </div>
                )}

                {university.students && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Users style={{ width: '20px', height: '20px', color: '#D4AF37' }} />
                      <span style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.6)' }}>Students</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#F8F9FA' }}>
                      {university.students.toLocaleString()}+
                    </div>
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Globe style={{ width: '20px', height: '20px', color: '#D4AF37' }} />
                    <span style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.6)' }}>Programs</span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#F8F9FA' }}>
                    {university.programs}+
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          {university.details && (
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                fontFamily: 'Playfair Display, serif',
                color: '#D4AF37'
              }}>
                About the University
              </h2>
              <p style={{
                fontSize: '1.0625rem',
                color: 'rgba(248, 249, 250, 0.8)',
                lineHeight: '1.8'
              }}>
                {university.details}
              </p>
            </div>
          )}

          {/* Key Persons Section */}
          {university.keyPersons && university.keyPersons.length > 0 && (
            <div style={{ marginTop: '3rem' }}>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: '700',
                marginBottom: '2rem',
                fontFamily: 'Playfair Display, serif',
                color: '#D4AF37',
                textAlign: 'center'
              }}>
                University Officials
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem'
              }}>
                {university.keyPersons.map((person) => (
                  <div
                    key={person.id}
                    style={{
                      padding: '2rem',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                    }}
                  >
                    {/* Image Area */}
                    <div style={{
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
                      border: '3px solid rgba(212, 175, 55, 0.4)',
                      margin: '0 auto 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      {person.image && person.image.startsWith('http') ? (
                        <img 
                          src={person.image} 
                          alt={person.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '3.5rem' }}>👤</span>
                      )}
                    </div>

                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#F8F9FA',
                      marginBottom: '0.5rem',
                      fontFamily: 'Playfair Display, serif'
                    }}>
                      {person.name}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#D4AF37',
                      marginBottom: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {person.position}
                    </p>
                    {person.bio && (
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'rgba(248, 249, 250, 0.7)',
                        lineHeight: '1.6'
                      }}>
                        {person.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 1.5rem',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        textAlign: 'center',
        color: 'rgba(248, 249, 250, 0.5)',
        fontSize: '0.875rem'
      }}>
        © 2024 Global Education Council. All rights reserved.
      </footer>
    </div>
  );
}
