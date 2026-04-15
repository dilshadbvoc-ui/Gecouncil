'use client';

import ModernNavigation from '@/components/ModernNavigation';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import GlobalMap from '@/components/GlobalMap';
import EuropeanFlags from '@/components/EuropeanFlags';
import PremiumDivider from '@/components/PremiumDivider';
import PageGallery from '@/components/PageGallery';

const DEFAULTS = {
  heroTitle: 'Get In Touch',
  heroSubtitle: "Ready to partner with us? Let's discuss how we can bring your university's programs to India",
  contactInfoTitle: 'Contact Information',
  formTitle: 'Send Us a Message',
  networkTitle: 'Our Global Network',
  networkSubtitle: 'Connecting European excellence with Indian aspirations',
  partnersTitle: 'Partner Countries',
  partnersSubtitle: 'Universities from across Europe delivering programs in India',
};

const SETTINGS_DEFAULTS = {
  email: 'partnerships@globaleducation.com',
  phone: '+91 98765 43210',
  address: 'Mumbai, Maharashtra',
  city: 'Mumbai',
  country: 'India',
  footerText: '© 2025 Global Education Council. All rights reserved.',
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', university: '', message: '' });
  const [content, setContent] = useState<Record<string, string>>(DEFAULTS);
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>(SETTINGS_DEFAULTS);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/pages?page=contact').then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ]).then(([pageData, settingsData]) => {
      if (pageData) setContent({ ...DEFAULTS, ...pageData });
      if (settingsData) setSiteSettings({ ...SETTINGS_DEFAULTS, ...settingsData });
    });
  }, []);

  const c = (key: string) => content[key] || DEFAULTS[key as keyof typeof DEFAULTS] || '';
  const s = (key: string) => siteSettings[key] || SETTINGS_DEFAULTS[key as keyof typeof SETTINGS_DEFAULTS] || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'general' }),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', university: '', message: '' });
    } catch { /* silent */ }
    finally { setSubmitting(false); }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      color: '#F8F9FA',
      fontFamily: 'Inter, sans-serif',
      position: 'relative'
    }}>
      {/* Background — modern office/communication */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.09, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.94) 0%, rgba(212,175,55,0.04) 100%)', zIndex: 0, pointerEvents: 'none' }} />
      {/* Subtle Gradient Orbs */}
      <div style={{
        position: 'fixed',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(74, 144, 217, 0.1) 0%, transparent 70%)',
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
          height: '450px',
          backgroundImage: 'url(/images/feature_counseling_student.jpg)',
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
          height: '450px',
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
              {c('heroTitle').split(' ').slice(0, -1).join(' ')} <span style={{
                background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>{c('heroTitle').split(' ').slice(-1)}</span>
            </h1>
            <PremiumDivider />
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(248, 249, 250, 0.7)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}>
              {c('heroSubtitle')}
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
                background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {c('contactInfoTitle')}
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(74, 144, 217, 0.1) 100%)',
                  border: '1px solid rgba(74, 144, 217, 0.3)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
                }}>
                  <Mail style={{ width: '24px', height: '24px', color: '#4A90D9', marginBottom: '0.75rem' }} />
                  <div style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.5)', marginBottom: '0.25rem', fontWeight: '500' }}>
                    Email
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'rgba(248, 249, 250, 0.9)' }}>
                    {s('email')}
                  </div>
                </div>

                <div style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(74, 144, 217, 0.1) 100%)',
                  border: '1px solid rgba(74, 144, 217, 0.3)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
                }}>
                  <Phone style={{ width: '24px', height: '24px', color: '#4A90D9', marginBottom: '0.75rem' }} />
                  <div style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.5)', marginBottom: '0.25rem', fontWeight: '500' }}>
                    Phone
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'rgba(248, 249, 250, 0.9)' }}>
                    {s('phone')}
                  </div>
                </div>

                <div style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(74, 144, 217, 0.1) 100%)',
                  border: '1px solid rgba(74, 144, 217, 0.3)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
                }}>
                  <MapPin style={{ width: '24px', height: '24px', color: '#4A90D9', marginBottom: '0.75rem' }} />
                  <div style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.5)', marginBottom: '0.25rem', fontWeight: '500' }}>
                    Office
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'rgba(248, 249, 250, 0.9)', lineHeight: '1.6' }}>
                    {s('address')}<br />{s('city')}, {s('country')}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{
              padding: '2.5rem',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(74, 144, 217, 0.1) 100%)',
              border: '1px solid rgba(74, 144, 217, 0.3)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: '700',
                marginBottom: '2rem',
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {c('formTitle')}
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
                      border: '1px solid rgba(74, 144, 217, 0.3)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#F8F9FA',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    placeholder="John Doe"
                    onFocus={(e) => e.target.style.borderColor = '#4A90D9'}
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
                      border: '1px solid rgba(74, 144, 217, 0.3)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#F8F9FA',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    placeholder="john@university.edu"
                    onFocus={(e) => e.target.style.borderColor = '#4A90D9'}
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
                      border: '1px solid rgba(74, 144, 217, 0.3)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#F8F9FA',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    placeholder="Your University"
                    onFocus={(e) => e.target.style.borderColor = '#4A90D9'}
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
                      border: '1px solid rgba(74, 144, 217, 0.3)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#F8F9FA',
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.3s'
                    }}
                    placeholder="Tell us about your partnership interests..."
                    onFocus={(e) => e.target.style.borderColor = '#4A90D9'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.3)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: submitted ? 'rgba(34,197,94,0.2)' : 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)',
                    border: submitted ? '1px solid rgba(34,197,94,0.5)' : '2px solid #FFFFFF',
                    color: submitted ? '#22c55e' : '#4A90D9',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <Send style={{ width: '20px', height: '20px' }} />
                  {submitted ? 'Message Sent! We\'ll be in touch.' : submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
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
              {c('networkTitle')}
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(248, 249, 250, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              {c('networkSubtitle')}
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
              color: '#4A90D9'
            }}>
              {c('partnersTitle')}
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(248, 249, 250, 0.7)' }}>
              {c('partnersSubtitle')}
            </p>
          </div>
          <EuropeanFlags />
        </div>
      </section>

      {/* Page Gallery */}
      <PageGallery page="contact" />

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
        {s('footerText')}
      </footer>
    </div>
  );
}
