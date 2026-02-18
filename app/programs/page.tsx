'use client';

import ModernNavigation from '@/components/ModernNavigation';
import { BookOpen, Clock, DollarSign, Globe } from 'lucide-react';
import UniversityLogos from '@/components/UniversityLogos';
import PremiumDivider from '@/components/PremiumDivider';

export default function ProgramsPage() {
  const programs = [
    {
      title: 'Business & Management',
      duration: '1-2 years',
      tuition: '€15,000 - €30,000',
      universities: 45,
      popular: ['MBA', 'International Business', 'Finance', 'Marketing']
    },
    {
      title: 'Engineering & Technology',
      duration: '2-4 years',
      tuition: '€10,000 - €25,000',
      universities: 38,
      popular: ['Computer Science', 'Mechanical Engineering', 'Data Science', 'AI & ML']
    },
    {
      title: 'Medicine & Healthcare',
      duration: '4-6 years',
      tuition: '€20,000 - €50,000',
      universities: 22,
      popular: ['Medicine', 'Nursing', 'Public Health', 'Pharmacy']
    },
    {
      title: 'Arts & Humanities',
      duration: '1-3 years',
      tuition: '€8,000 - €20,000',
      universities: 35,
      popular: ['Psychology', 'International Relations', 'Media Studies', 'Design']
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      color: '#F8F9FA',
      fontFamily: 'Inter, sans-serif',
      position: 'relative'
    }}>
      {/* Subtle Gradient Orbs */}
      <div style={{
        position: 'fixed',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
        top: '-10%',
        right: '-10%',
        filter: 'blur(100px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
        bottom: '-10%',
        left: '-10%',
        filter: 'blur(100px)',
        zIndex: 0
      }} />
      
      <ModernNavigation />

      <section style={{ paddingTop: '6rem', paddingBottom: '3rem', padding: '6rem 1rem 3rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: '700',
              marginBottom: '1.5rem',
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}>
              Study <span style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Programs</span>
            </h1>
            <PremiumDivider />
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(248, 249, 250, 0.7)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}>
              European-standard programs delivered in India across multiple disciplines
            </p>
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5), transparent)',
              width: '8rem',
              margin: '2rem auto 0'
            }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {programs.map((program, index) => (
              <div
                key={index}
                style={{
                  padding: '2.5rem',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(30px) saturate(180%)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <BookOpen style={{ width: '32px', height: '32px', color: '#D4AF37' }} />
                </div>

                <h3 style={{
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  fontFamily: 'Playfair Display, serif',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {program.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                    <Clock style={{ width: '20px', height: '20px', color: '#D4AF37' }} />
                    <span style={{ fontSize: '1rem' }}>{program.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                    <DollarSign style={{ width: '20px', height: '20px', color: '#D4AF37' }} />
                    <span style={{ fontSize: '1rem' }}>{program.tuition}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                    <Globe style={{ width: '20px', height: '20px', color: '#D4AF37' }} />
                    <span style={{ fontSize: '1rem' }}>{program.universities} Universities</span>
                  </div>
                </div>

                <div style={{
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(0, 0, 0, 0.2)'
                }}>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.5)', marginBottom: '0.75rem', fontWeight: '500' }}>
                    Popular Specializations:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {program.popular.map((spec, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '0.375rem 0.75rem',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(30px) saturate(180%)',
                          fontSize: '0.875rem',
                          color: 'rgba(248, 249, 250, 0.9)',
                          border: '1px solid rgba(212, 175, 55, 0.3)'
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Partners */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 0', backgroundColor: 'rgba(0, 0, 0, 0.3)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 1.5rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
            }}>
              Available at Top Universities
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(248, 249, 250, 0.7)' }}>
              Programs delivered by prestigious European institutions
            </p>
          </div>
          <UniversityLogos />
        </div>
      </section>

      <footer style={{
        padding: '3rem 1.5rem',
        borderTop: '1px solid rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        color: 'rgba(248, 249, 250, 0.5)',
        fontSize: '0.875rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5), transparent)',
          width: '6rem',
          margin: '0 auto 1.5rem'
        }} />
        © 2024 Global Education Council. All rights reserved.
      </footer>
    </div>
  );
}
