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
      
      {/* Navigation */}
      <ModernNavigation />

      {/* Hero Section */}
      <section style={{ paddingTop: '6rem', paddingBottom: '3rem', padding: '6rem 1rem 3rem', position: 'relative', zIndex: 1 }}>
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
                <span className="gold-accent">WORLD</span><br />
                TO INDIA
              </h1>
              <p style={{
                fontSize: 'clamp(0.9375rem, 4vw, 1.125rem)',
                color: 'rgba(248, 249, 250, 0.7)',
                lineHeight: '1.8',
                maxWidth: '100%',
                fontWeight: '400'
              }}>
                Bringing European-standard education to Indian shores, empowering students to transform their lives without leaving home
              </p>

              {/* Partner Button */}
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: 'clamp(0.875rem, 3vw, 1.125rem) clamp(1.5rem, 5vw, 2.5rem)',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                border: 'none',
                color: '#000000',
                fontSize: 'clamp(0.875rem, 3.5vw, 1rem)',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '400px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                boxShadow: '0 8px 30px rgba(212, 175, 55, 0.4)',
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(212, 175, 55, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.4)';
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
                  backgroundColor: 'rgba(212, 175, 55, 0.3)',
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
                {['European Education in India', 'Local Delivery', 'Life-Changing Access'].map((tag) => (
                  <span key={tag} style={{
                    padding: '0.625rem 1.25rem',
                    borderRadius: '10px',
                    fontSize: '0.8125rem',
                    fontWeight: '500',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
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
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              minHeight: '300px',
              height: 'clamp(300px, 50vw, 500px)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              backdropFilter: 'blur(30px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              zIndex: 1
            }} className="premium-card shimmer">
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
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
            }}>
              Our European Network
            </h2>
            <PremiumDivider />
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              Partnering with prestigious universities across Europe
            </p>
          </div>
          <EuropeanFlags />
        </div>
      </section>

      {/* Premium Stats Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
            }}>
              Our Impact in Numbers
            </h2>
            <PremiumDivider />
          </div>
          <PremiumStats />
        </div>
      </section>

      {/* University Partners Carousel */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 0', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 1rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
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
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
            }}>
              Connecting World to India
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              Bringing European excellence to Indian students
            </p>
          </div>
          <GlobalMap />
        </div>
      </section>

      {/* European Landmarks */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
            }}>
              Study in Iconic Cities
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              Experience European culture and education
            </p>
          </div>
          <EuropeanLandmarks />
        </div>
      </section>

      {/* Why Choose GEC Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Why Partner With Us?
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              We bring European-standard education to India, transforming lives through accessible world-class learning
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
                title: 'European Standards',
                description: 'Deliver authentic European university programs in India with the same quality and curriculum',
                color: '#60a5fa'
              },
              {
                icon: Users,
                title: 'Student Access',
                description: 'Reach 10,000+ Indian students annually seeking world-class education without leaving home',
                color: '#a78bfa'
              },
              {
                icon: Building2,
                title: 'Local Infrastructure',
                description: 'Complete setup and operational support for delivering your programs on Indian campuses',
                color: '#f472b6'
              },
              {
                icon: Award,
                title: 'Quality Maintained',
                description: 'Rigorous monitoring to ensure your academic standards are preserved in every program',
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
                    border: '1px solid rgba(212, 175, 55, 0.3)',
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
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              How We Work
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Simple, transparent, and effective partnership process
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
                title: 'Partnership Setup',
                description: 'Establish partnership framework for delivering your programs in India with quality standards'
              },
              {
                step: '02',
                title: 'Infrastructure Setup',
                description: 'Set up local campus facilities and resources to deliver European-standard education'
              },
              {
                step: '03',
                title: 'Student Enrollment',
                description: 'Recruit and enroll qualified Indian students into your programs delivered locally'
              },
              {
                step: '04',
                title: 'Quality Delivery',
                description: 'Ensure authentic curriculum delivery and maintain European academic standards throughout'
              }
            ].map((item, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <div style={{
                  padding: '2rem 1.5rem',
                  borderRadius: '20px',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
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
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              Our Impact in Numbers
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { number: '100+', label: 'Partner Universities', icon: Building2 },
              { number: '10,000+', label: 'Students Placed', icon: Users },
              { number: '25+', label: 'Countries', icon: Globe },
              { number: '95%', label: 'Visa Success Rate', icon: CheckCircle },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  style={{
                    padding: '2.5rem 2rem',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
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
              Ready to Expand Your Reach?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Join our network of leading universities and connect with talented Indian students
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
                Schedule a Partnership Call
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
                or send us an email →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 1.5rem',
        borderTop: '1px solid rgba(212, 175, 55, 0.3)',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.875rem'
      }}>
        © 2024 Global Education Council. All rights reserved.
      </footer>
    </div>
  );
}
