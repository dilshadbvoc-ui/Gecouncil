'use client';

import ModernNavigation from '@/components/ModernNavigation';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import GlobalMap from '@/components/GlobalMap';
import EuropeanFlags from '@/components/EuropeanFlags';
import PremiumDivider from '@/components/PremiumDivider';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', university: '', message: '' });
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
              Get In <span style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Touch</span>
            </h1>
            <PremiumDivider />
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(248, 249, 250, 0.7)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}>
              Ready to partner with us? Let&apos;s discuss how we can bring your university&apos;s programs to India
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
            gap: '2rem'
          }}>
            {/* Contact Info */}
            <div>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: '700',
                marginBottom: '2rem',
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Contact Information
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
                }}>
                  <Mail style={{ width: '24px', height: '24px', color: '#D4AF37', marginBottom: '0.75rem' }} />
                  <div style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.5)', marginBottom: '0.25rem', fontWeight: '500' }}>
                    Email
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'rgba(248, 249, 250, 0.9)' }}>
                    partnerships@globaleducation.com
                  </div>
                </div>

                <div style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
                }}>
                  <Phone style={{ width: '24px', height: '24px', color: '#D4AF37', marginBottom: '0.75rem' }} />
                  <div style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.5)', marginBottom: '0.25rem', fontWeight: '500' }}>
                    Phone
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'rgba(248, 249, 250, 0.9)' }}>
                    +91 98765 43210
                  </div>
                </div>

                <div style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
                }}>
                  <MapPin style={{ width: '24px', height: '24px', color: '#D4AF37', marginBottom: '0.75rem' }} />
                  <div style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.5)', marginBottom: '0.25rem', fontWeight: '500' }}>
                    Office
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'rgba(248, 249, 250, 0.9)', lineHeight: '1.6' }}>
                    Mumbai, Maharashtra<br />India
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{
              padding: '2.5rem',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: '700',
                marginBottom: '2rem',
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgba(248, 249, 250, 0.7)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#F8F9FA',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    placeholder="John Doe"
                    onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.3)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgba(248, 249, 250, 0.7)' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#F8F9FA',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    placeholder="john@university.edu"
                    onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.3)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgba(248, 249, 250, 0.7)' }}>
                    University Name
                  </label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => setFormData({...formData, university: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#F8F9FA',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    placeholder="Your University"
                    onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.3)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgba(248, 249, 250, 0.7)' }}>
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#F8F9FA',
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.3s'
                    }}
                    placeholder="Tell us about your partnership interests..."
                    onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.3)'}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                    border: '2px solid #FFFFFF',
                    color: '#D4AF37',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = '#000000';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  <Send style={{ width: '20px', height: '20px' }} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1rem', backgroundColor: 'rgba(212, 175, 55, 0.05)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#D4AF37'
            }}>
              Our Global Network
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(248, 249, 250, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              Connecting European excellence with Indian aspirations
            </p>
          </div>
          <GlobalMap />
        </div>
      </section>

      {/* Partner Countries */}
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
              Partner Countries
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(248, 249, 250, 0.7)' }}>
              Universities from across Europe delivering programs in India
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
