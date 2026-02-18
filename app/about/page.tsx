'use client';

import ModernNavigation from '@/components/ModernNavigation';
import { Target, Eye, Award, Users } from 'lucide-react';
import EuropeanFlags from '@/components/EuropeanFlags';
import PremiumDivider from '@/components/PremiumDivider';
import PremiumStats from '@/components/PremiumStats';

export default function AboutPage() {
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
              About <span style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Global Education Council</span>
            </h1>
            <PremiumDivider />
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(248, 249, 250, 0.7)',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}>
              We are a B2B intermediary bringing world-class European universities to India, 
              enabling Indian students to access premium international education on home soil since 2015.
            </p>
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5), transparent)',
              width: '8rem',
              margin: '2rem auto 0'
            }} />
          </div>

          {/* Mission & Vision */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: 'clamp(3rem, 8vw, 5rem)'
          }}>
            <div style={{
              padding: '2.5rem',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
            }}>
              <Target style={{ width: '48px', height: '48px', color: '#D4AF37', marginBottom: '1.5rem' }} />
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: '700',
                marginBottom: '1rem',
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Our Mission</h2>
              <p style={{ color: 'rgba(248, 249, 250, 0.7)', lineHeight: '1.8', fontSize: '1.125rem' }}>
                To bring European-standard education to India, making world-class learning accessible 
                and transforming lives through quality education delivered locally.
              </p>
            </div>

            <div style={{
              padding: '2.5rem',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
            }}>
              <Eye style={{ width: '48px', height: '48px', color: '#D4AF37', marginBottom: '1.5rem' }} />
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: '700',
                marginBottom: '1rem',
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Our Vision</h2>
              <p style={{ color: 'rgba(248, 249, 250, 0.7)', lineHeight: '1.8', fontSize: '1.125rem' }}>
                To become the most trusted partner for universities seeking to expand their presence 
                in India and for Indian students seeking world-class education at home.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '3rem',
              textAlign: 'center',
              fontFamily: 'Playfair Display, serif'
            }}>
              What We <span style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Do</span>
            </h2>
            <div style={{
              padding: '2.5rem',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(30px) saturate(180%)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  {
                    title: 'University Partnerships',
                    description: 'We establish and manage partnerships with 100+ European universities to deliver their programs in India with the same quality standards.'
                  },
                  {
                    title: 'Local Program Delivery',
                    description: 'We facilitate the setup and operation of European university programs on Indian campuses, ensuring authentic curriculum delivery.'
                  },
                  {
                    title: 'Student Enrollment',
                    description: 'We recruit and enroll qualified Indian students into European-standard programs delivered locally, making world-class education accessible.'
                  },
                  {
                    title: 'Quality Assurance',
                    description: 'Rigorous monitoring to ensure European academic standards are maintained in all programs delivered in India.'
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    style={{
                      paddingBottom: index < 3 ? '2rem' : '0',
                      borderBottom: index < 3 ? '1px solid rgba(0, 0, 0, 0.2)' : 'none'
                    }}
                  >
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      marginBottom: '0.75rem',
                      fontFamily: 'Playfair Display, serif',
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'rgba(248, 249, 250, 0.7)', lineHeight: '1.7', fontSize: '1.125rem' }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '3rem',
              textAlign: 'center',
              fontFamily: 'Playfair Display, serif'
            }}>
              Why Universities <span style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Choose Us</span>
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { icon: Users, text: 'Reach 10,000+ Indian students annually' },
                { icon: Award, text: 'European-standard quality maintained' },
                { icon: Target, text: 'Local delivery, global recognition' },
                { icon: Eye, text: 'Transparent partnership model' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    style={{
                      padding: '2rem',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      backdropFilter: 'blur(20px)',
                      textAlign: 'center',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Icon style={{ width: '40px', height: '40px', color: '#D4AF37', margin: '0 auto 1rem' }} />
                    <p style={{ color: 'rgba(248, 249, 250, 0.9)', fontSize: '1rem', fontWeight: '500' }}>
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
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
              Our Achievements
            </h2>
            <PremiumDivider />
          </div>
          <PremiumStats />
        </div>
      </section>

      {/* European Network Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
            }}>
              Our European Partners
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(248, 249, 250, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              Collaborating with universities across 12+ European countries
            </p>
          </div>
          <EuropeanFlags />
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
