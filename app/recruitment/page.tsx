'use client';

import ModernNavigation from '@/components/ModernNavigation';
import { Briefcase, Globe, MapPin, Users, Star, ArrowRight } from 'lucide-react';

const jobCategories = [
  { title: 'Healthcare & Nursing', locations: 'Germany, Netherlands, UK', openings: '200+ roles', icon: '🏥' },
  { title: 'Engineering & Technology', locations: 'Germany, Sweden, Denmark', openings: '350+ roles', icon: '⚙️' },
  { title: 'Hospitality & Tourism', locations: 'France, Spain, Italy', openings: '180+ roles', icon: '🏨' },
  { title: 'Finance & Banking', locations: 'Luxembourg, Switzerland, UK', openings: '120+ roles', icon: '💼' },
  { title: 'Education & Teaching', locations: 'Netherlands, Belgium, Ireland', openings: '90+ roles', icon: '📚' },
  { title: 'Construction & Trades', locations: 'Germany, Austria, Norway', openings: '250+ roles', icon: '🏗️' },
];

const steps = [
  { step: '01', title: 'Register Your Profile', desc: 'Submit your qualifications, experience, and preferred destination country.' },
  { step: '02', title: 'Skills Assessment', desc: 'We evaluate your profile and match you with suitable European employers.' },
  { step: '03', title: 'Interview & Offer', desc: 'Connect directly with employers for interviews and receive job offers.' },
  { step: '04', title: 'Visa & Relocation', desc: 'We assist with work visa applications and pre-departure preparation.' },
];

export default function RecruitmentPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
      <ModernNavigation />
      <div style={{ paddingTop: '80px' }}>

        {/* Hero */}
        <section style={{
          padding: 'clamp(4rem, 10vw, 8rem) 2rem',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at top, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <p style={{ fontSize: '0.875rem', letterSpacing: '0.3em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Abroad Job Recruitment
          </p>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '700',
            fontFamily: 'Playfair Display, serif',
            color: '#FFFFFF',
            lineHeight: '1.1',
            marginBottom: '1.5rem'
          }}>
            Work in Europe.<br />
            <span style={{ color: '#D4AF37' }}>Live Your Dream.</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(248, 249, 250, 0.7)',
            maxWidth: '620px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.7'
          }}>
            We connect skilled Indian professionals with verified employers across Europe — handling everything from job matching to visa support.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{
              padding: '0.875rem 2rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
              color: '#000000',
              fontWeight: '700',
              fontSize: '1rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Apply Now <ArrowRight size={18} />
            </a>
            <a href="#categories" style={{
              padding: '0.875rem 2rem',
              borderRadius: '10px',
              border: '1.5px solid rgba(212, 175, 55, 0.5)',
              color: '#D4AF37',
              fontWeight: '600',
              fontSize: '1rem',
              textDecoration: 'none'
            }}>
              Browse Jobs
            </a>
          </div>
        </section>

        {/* Stats */}
        <section style={{
          padding: '3rem 2rem',
          borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
          background: 'rgba(212, 175, 55, 0.03)'
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { value: '1,200+', label: 'Active Job Openings' },
              { value: '18', label: 'European Countries' },
              { value: '500+', label: 'Partner Employers' },
              { value: '95%', label: 'Visa Success Rate' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', color: '#D4AF37', fontFamily: 'Playfair Display, serif' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.6)', marginTop: '0.25rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Job Categories */}
        <section id="categories" style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: '700',
              fontFamily: 'Playfair Display, serif',
              color: '#FFFFFF',
              marginBottom: '1rem'
            }}>
              Job Categories
            </h2>
            <p style={{ color: 'rgba(248, 249, 250, 0.6)', fontSize: '1rem' }}>
              Opportunities across high-demand sectors in Europe
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {jobCategories.map((cat) => (
              <div key={cat.title} style={{
                padding: '1.75rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                transition: 'border-color 0.3s'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '0.75rem' }}>
                  {cat.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(248,249,250,0.6)', marginBottom: '0.4rem' }}>
                  <MapPin size={13} style={{ color: '#D4AF37' }} /> {cat.locations}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#D4AF37', fontWeight: '600' }}>
                  <Briefcase size={13} /> {cat.openings}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{
          padding: 'clamp(3rem, 6vw, 5rem) 2rem',
          background: 'rgba(212, 175, 55, 0.03)',
          borderTop: '1px solid rgba(212, 175, 55, 0.1)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.1)'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: '700',
                fontFamily: 'Playfair Display, serif',
                color: '#FFFFFF',
                marginBottom: '1rem'
              }}>
                How It Works
              </h2>
              <p style={{ color: 'rgba(248, 249, 250, 0.6)' }}>Your journey to working abroad in 4 simple steps</p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem'
            }}>
              {steps.map((s) => (
                <div key={s.step} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '2px solid rgba(212, 175, 55, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#D4AF37',
                    fontFamily: 'Playfair Display, serif'
                  }}>
                    {s.step}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '0.5rem' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.6)', lineHeight: '1.6' }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '700',
            fontFamily: 'Playfair Display, serif',
            color: '#FFFFFF',
            marginBottom: '1rem'
          }}>
            Ready to Work Abroad?
          </h2>
          <p style={{ color: 'rgba(248, 249, 250, 0.6)', marginBottom: '2rem', fontSize: '1rem' }}>
            Submit your profile today and our team will reach out within 48 hours.
          </p>
          <a href="/contact" style={{
            padding: '1rem 2.5rem',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
            color: '#000000',
            fontWeight: '700',
            fontSize: '1rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            Get Started <ArrowRight size={18} />
          </a>
        </section>

      </div>
    </main>
  );
}
