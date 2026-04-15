'use client';

import { ArrowRight, Play, Globe, Users, Building2, Award, CheckCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import DiagramVisualization from '@/components/DiagramVisualization';
import ModernNavigation from '@/components/ModernNavigation';
import EuropeanFlags from '@/components/EuropeanFlags';
import UniversityLogos from '@/components/UniversityLogos';
import EuropeanLandmarks from '@/components/EuropeanLandmarks';
import GlobalMap from '@/components/GlobalMap';
import PremiumDivider from '@/components/PremiumDivider';
import PremiumStats from '@/components/PremiumStats';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      color: '#F8F9FA',
      fontFamily: 'Inter, sans-serif',
      position: 'relative'
    }}>
      {/* Hero background image — European university campus */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        opacity: 0.12,
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      {/* Gold gradient overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 50%, rgba(212,175,55,0.06) 100%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      {/* Subtle Gradient Orbs */}
      <div style={{
        position: 'fixed',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(74,144,217,0.08) 0%, transparent 70%)',
        bottom: '-10%',
        left: '-10%',
        filter: 'blur(100px)',
        zIndex: 0
      }} />
      
      {/* Navigation */}
      <ModernNavigation />

      {/* Hero Section */}
      <section style={{ padding: '5.5rem 1.5rem 3rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="hero-grid" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'stretch'
          }}>
            {/* Left Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Avatar Circles */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#c4b5fd',
                  border: '2px solid #0a0a0f'
                }}></div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#60a5fa',
                  border: '2px solid #0a0a0f',
                  marginLeft: '-8px'
                }}></div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#f472b6',
                  border: '2px solid #0a0a0f',
                  marginLeft: '-8px'
                }}></div>
              </div>
              
              {/* Main Heading */}
              <h1 style={{
                fontSize: 'clamp(2rem, 10vw, 5rem)',
                fontWeight: '800',
                lineHeight: '1.1',
                fontFamily: 'Playfair Display, serif',
                color: '#F8F9FA',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }} className="text-shadow-gold">
                CONNECTING<br />
                <span className="gold-accent">GLOBAL EDUCATION</span><br />
                TO INDIA
              </h1>
              <p style={{
                fontSize: 'clamp(0.9375rem, 4vw, 1.125rem)',
                color: 'rgba(248, 249, 250, 0.7)',
                lineHeight: '1.8',
                maxWidth: '100%',
                fontWeight: '400'
              }}>
                Every student deserves a chance to dream bigger. We bring world-class education to your doorstep, so you can build your future without leaving your family behind.
              </p>

              {/* Partner Button */}
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: 'clamp(0.875rem, 3vw, 1.125rem) clamp(1.5rem, 5vw, 2.5rem)',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)',
                border: 'none',
                color: '#000000',
                fontSize: 'clamp(0.875rem, 3.5vw, 1rem)',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '400px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                boxShadow: '0 8px 30px rgba(74, 144, 217, 0.4)',
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(74, 144, 217, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(74, 144, 217, 0.4)';
              }}>
                <span>Partner With Us</span>
                <ArrowRight style={{ width: '20px', height: '20px' }} />
              </button>

              {/* Learn More Button */}
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(74, 144, 217, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Play style={{ width: '20px', height: '20px', fill: 'white' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>Learn More</div>
                  <div style={{ fontSize: '0.75rem' }}>about us</div>
                </div>
              </button>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem' }}>
                {['Study Close to Home', 'Your Family, Your Future', 'Dreams Within Reach'].map((tag) => (
                  <span key={tag} style={{
                    padding: '0.625rem 1.25rem',
                    borderRadius: '10px',
                    fontSize: '0.8125rem',
                    fontWeight: '500',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(74, 144, 217, 0.3)',
                    backdropFilter: 'blur(10px)',
                    color: 'rgba(248, 249, 250, 0.9)',
                    letterSpacing: '0.02em'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Content - Diagram Visualization */}
            <div style={{
              width: '100%',
              maxWidth: '520px',
              margin: '0 auto',
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
            }}>
              <DiagramVisualization />
            </div>
          </div>

          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginTop: '3rem'
          }}>
            {/* Blue Card */}
            <div style={{
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #0000ff 0%, #0000cc 100%)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.3s'
            }}>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                  opacity: 0.8
                }}>
                  UNIVERSITY NETWORK
                </div>
                <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', lineHeight: '1.2' }}>
                  EUROPEAN<br />
                  EDUCATION IN INDIA
                </h3>
              </div>
            </div>

            {/* Gray Card */}
            <div style={{
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
              color: 'black',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                  opacity: 0.6
                }}>
                  LOCAL DELIVERY
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '8rem',
                  fontSize: '6rem',
                  fontWeight: 'bold'
                }}>
                  ⇄
                </div>
              </div>
            </div>

            {/* Yellow Card */}
            <div style={{
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #ffc107 0%, #ffb300 100%)',
              color: 'black',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                  opacity: 0.6
                }}>
                  LIVES TRANSFORMED
                </div>
                <div style={{ fontSize: '6rem', fontWeight: 'bold', lineHeight: '1' }}>
                  1000+
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* European Partners Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.3)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#4A90D9'
            }}>
              Our European Network
            </h2>
            <PremiumDivider />
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              Because your dreams shouldn&apos;t require you to leave everything behind
            </p>
          </div>
          <EuropeanFlags />
        </div>
      </section>

      {/* Premium Stats Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#4A90D9'
            }}>
              Our Impact in Numbers
            </h2>
            <PremiumDivider />
          </div>
          <PremiumStats />
        </div>
      </section>

      {/* University Partners Carousel */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 0', backgroundColor: 'rgba(0, 0, 0, 0.2)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 1rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#4A90D9'
            }}>
              Partner Universities
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              100+ world-class institutions delivering programs in India
            </p>
          </div>
          <UniversityLogos />
        </div>
      </section>

      {/* Global Connection Map */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.3)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#4A90D9'
            }}>
              Connecting World to India
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              Your journey to a brighter future starts here, in your own community
            </p>
          </div>
          <GlobalMap />
        </div>
      </section>

      {/* European Landmarks */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#4A90D9'
            }}>
              Study in Iconic Cities
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              Where learning meets belonging - education that honors your roots while opening new doors
            </p>
          </div>
          <EuropeanLandmarks />
        </div>
      </section>

      {/* Why Choose GEC Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Why This Matters
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              Because choosing between your education and your family shouldn&apos;t be a choice you have to make
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                icon: Globe,
                title: 'Stay Close to Home',
                description: 'Study at world-renowned universities without saying goodbye to your parents, your culture, or the place you call home.',
                color: '#60a5fa'
              },
              {
                icon: Users,
                title: 'Your Community Matters',
                description: 'Learn alongside friends who share your dreams, supported by family who can celebrate every milestone with you.',
                color: '#a78bfa'
              },
              {
                icon: Building2,
                title: 'Education That Fits Your Life',
                description: 'No visa stress, no foreign expenses, no cultural shock - just quality education that respects who you are.',
                color: '#f472b6'
              },
              {
                icon: Award,
                title: 'Your Success, Our Promise',
                description: 'We believe in you. Every program is designed to help you succeed, with support every step of the way.',
                color: '#fbbf24'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  style={{
                    padding: '2rem',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(74, 144, 217, 0.3)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '15px',
                    background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <Icon style={{ width: '30px', height: '30px', color: item.color }} />
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '0.75rem',
                    color: 'white'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6'
                  }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Your Journey With Us
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              From your first question to graduation day, we&apos;re here for you
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            position: 'relative'
          }}>
            {[
              {
                step: '01',
                title: 'Share Your Dreams',
                description: 'Tell us what you want to study and where you see yourself. We listen, understand, and guide you to the right path.'
              },
              {
                step: '02',
                title: 'Find Your Perfect Fit',
                description: 'We help you discover programs that match your passion, your goals, and your unique story.'
              },
              {
                step: '03',
                title: 'Start Your Journey',
                description: 'Begin your studies with confidence, knowing your family is nearby and your future is bright.'
              },
              {
                step: '04',
                title: 'Grow and Succeed',
                description: 'Learn, grow, and achieve your dreams with support from teachers who care and a community that believes in you.'
              }
            ].map((item, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <div style={{
                  padding: '2rem 1.5rem',
                  borderRadius: '20px',
                  background: 'rgba(74, 144, 217, 0.15)',
                  border: '1px solid rgba(74, 144, 217, 0.3)',
                  height: '100%'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '1rem',
                    fontFamily: 'Space Grotesk, sans-serif'
                  }}>
                    {item.step}
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    marginBottom: '0.75rem',
                    color: 'white'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6'
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Real Stories, Real Impact
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { number: '100+', label: 'Universities Believe in Us', icon: Building2 },
              { number: '10,000+', label: 'Dreams We&apos;ve Supported', icon: Users },
              { number: '25+', label: 'Countries Connected', icon: Globe },
              { number: '95%', label: 'Students Achieving Their Goals', icon: CheckCircle },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  style={{
                    padding: '2.5rem 2rem',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(74, 144, 217, 0.3)',
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center',
                    transition: 'all 0.3s'
                  }}
                >
                  <Icon style={{
                    width: '40px',
                    height: '40px',
                    color: '#a78bfa',
                    margin: '0 auto 1rem'
                  }} />
                  <div style={{
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #ffffff, #c4b5fd)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.5rem',
                    fontFamily: 'Space Grotesk, sans-serif'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9375rem',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem)',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(196, 181, 253, 0.1), rgba(167, 139, 250, 0.1))',
              border: '1px solid rgba(196, 181, 253, 0.3)',
              backdropFilter: 'blur(20px)',
              textAlign: 'center'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Ready to Start Your Journey?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Your story matters. Your dreams are valid. Let&apos;s make them happen together, right here at home.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <button style={{
                padding: '1rem 2.5rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Talk to Us Today
                <ArrowRight style={{ width: '20px', height: '20px' }} />
              </button>
              <Link
                href="/contact"
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9375rem',
                  textDecoration: 'none'
                }}
              >
                or reach out anytime →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 1.5rem',
        borderTop: '1px solid rgba(74, 144, 217, 0.3)',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.875rem'
      }}>
        © 2024 Global Education Council. All rights reserved.
      </footer>
    </div>
  );
}
