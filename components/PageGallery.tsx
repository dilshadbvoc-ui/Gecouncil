'use client';

import { useEffect, useState } from 'react';
import { PageGallery as PageGalleryType } from '@/types/admin';

interface PageGalleryProps {
  page: 'universities' | 'programs' | 'about' | 'contact';
}

export default function PageGallery({ page }: PageGalleryProps) {
  const [galleries, setGalleries] = useState<PageGalleryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch(`/api/galleries?page=${page}`);
      const data = await response.json();
      setGalleries(data);
    } catch (error) {
      console.error('Failed to fetch galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || galleries.length === 0) return null;

  return (
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
            Gallery
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {galleries.map((item) => (
            <div
              key={item.id}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                height: '250px',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                  padding: '2rem 1.5rem 1.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#D4AF37',
                    marginBottom: '0.5rem',
                    fontFamily: 'Playfair Display, serif'
                  }}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(248, 249, 250, 0.8)',
                      lineHeight: '1.5'
                    }}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
