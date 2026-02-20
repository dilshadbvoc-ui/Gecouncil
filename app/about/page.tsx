'use client';

import { useEffect, useState } from 'react';
import ModernNavigation from '@/components/ModernNavigation';
import { Target, Eye, Award, Users } from 'lucide-react';
import EuropeanFlags from '@/components/EuropeanFlags';
import PremiumDivider from '@/components/PremiumDivider';
import PremiumStats from '@/components/PremiumStats';
import PageGallery from '@/components/PageGallery';
import { Director } from '@/types/admin';

export default function AboutPage() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDirectors();
  }, []);

  const fetchDirectors = async () => {
    try {
      const response = await fetch('/api/directors');
      const data = await response.json();
      setDirectors(data);
    } catch (error) {
      console.error('Failed to fetch directors:', error);
    } finally {
      setLoading(false);
    }
  };
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

      <section style={{ paddingTop: '6rem', paddingBottom: '3rem', padding: '6rem 1rem 3rem', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        {/* Hero Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '500px',
          backgroundImage: 'url(/images/feature_community_group.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          zIndex: -2
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '500px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.95))',
          zIndex: -1
        }} />
        
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
              We started with a simple belief: no student should have to choose between their dreams and their family. 
              Since 2015, we&apos;ve been building bridges between world-class universities and Indian students who deserve every opportunity.
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
              }}>Our Heart</h2>
              <p style={{ color: 'rgba(248, 249, 250, 0.7)', lineHeight: '1.8', fontSize: '1.125rem' }}>
                To ensure that every talented student in India can access world-class education without leaving their loved ones behind. 
                We believe education should bring families together, not tear them apart.
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
              }}>Our Dream</h2>
              <p style={{ color: 'rgba(248, 249, 250, 0.7)', lineHeight: '1.8', fontSize: '1.125rem' }}>
                A future where every Indian student can pursue their passion, achieve their potential, and make their family proud - 
                all while staying rooted in the community that shaped them.
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
              How We <span style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Help You</span>
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
                    title: 'We Listen to Your Story',
                    description: 'Every student is unique. We take time to understand your dreams, your challenges, and what matters most to you and your family.'
                  },
                  {
                    title: 'We Find Your Path',
                    description: 'With connections to universities worldwide, we help you discover programs that align with your passion and your future goals.'
                  },
                  {
                    title: 'We Walk Beside You',
                    description: 'From your first question to graduation day, we&apos;re here - answering questions, solving problems, celebrating victories.'
                  },
                  {
                    title: 'We Keep Our Promise',
                    description: 'Quality education, close to home, with support that never wavers. That&apos;s our commitment to every student we serve.'
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
              Why Families <span style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Trust Us</span>
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { icon: Users, text: 'We&apos;ve helped over 10,000 students achieve their dreams' },
                { icon: Award, text: 'Quality education that parents can trust' },
                { icon: Target, text: 'Study locally, succeed globally' },
                { icon: Eye, text: 'Honest guidance, no hidden surprises' }
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

      {/* Directors Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.3)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
            }}>
              Our Leadership Team
            </h2>
            <PremiumDivider />
            <p style={{ fontSize: '1.125rem', color: 'rgba(248, 249, 250, 0.7)', maxWidth: '700px', margin: '1rem auto 0' }}>
              Meet the dedicated professionals guiding students toward their dreams
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#D4AF37' }}>
              Loading directors...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {directors.map((director) => (
                <div
                  key={director.id}
                  style={{
                    padding: '2rem',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    backdropFilter: 'blur(20px)',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  {/* Image Placeholder */}
                  <div style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
                    border: '3px solid rgba(212, 175, 55, 0.4)',
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    {director.image && director.image.startsWith('http') ? (
                      <img 
                        src={director.image} 
                        alt={director.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '4rem' }}>👤</span>
                    )}
                  </div>

                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#F8F9FA',
                    marginBottom: '0.5rem',
                    fontFamily: 'Playfair Display, serif'
                  }}>
                    {director.name}
                  </h3>

                  <p style={{
                    fontSize: '0.9375rem',
                    color: '#D4AF37',
                    marginBottom: '1rem',
                    fontWeight: '600'
                  }}>
                    {director.position}
                  </p>

                  {director.bio && (
                    <p style={{
                      fontSize: '0.9375rem',
                      color: 'rgba(248, 249, 250, 0.7)',
                      lineHeight: '1.6'
                    }}>
                      {director.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* European Network Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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

      {/* Page Gallery */}
      <PageGallery page="about" />

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
