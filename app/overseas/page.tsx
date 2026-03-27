'use client';

import ModernNavigation from '@/components/ModernNavigation';

export default function OverseasPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
      <ModernNavigation />
      <div style={{ paddingTop: '80px' }}>
        {/* Hero */}
        <section style={{
          padding: 'clamp(4rem, 10vw, 8rem) 2rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <p style={{ fontSize: '0.875rem', letterSpacing: '0.3em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Global Education Council
          </p>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '700',
            fontFamily: 'Playfair Display, serif',
            color: '#FFFFFF',
            lineHeight: '1.1',
            marginBottom: '1.5rem'
          }}>
            Overseas Education
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(248, 249, 250, 0.7)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Connecting Indian students and institutions with premier European universities for a truly global education experience.
          </p>
        </section>

        {/* Content placeholder */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {['Study in Europe', 'Admission Guidance', 'Visa Assistance', 'Scholarship Support'].map((item) => (
              <div key={item} style={{
                padding: '2rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  marginBottom: '1rem'
                }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '0.75rem', fontFamily: 'Playfair Display, serif' }}>
                  {item}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(248, 249, 250, 0.6)', lineHeight: '1.6' }}>
                  End-to-end support for students pursuing education at top European institutions.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
