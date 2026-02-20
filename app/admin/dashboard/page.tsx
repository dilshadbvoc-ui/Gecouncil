'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, Users, LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import { University } from '@/types/admin';

export default function AdminDashboard() {
  const router = useRouter();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    fetchUniversities();
  }, [router]);

  const fetchUniversities = async () => {
    try {
      const response = await fetch('/api/universities');
      const data = await response.json();
      setUniversities(data);
    } catch (error) {
      console.error('Failed to fetch universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this university?')) return;

    try {
      await fetch(`/api/universities/${id}`, { method: 'DELETE' });
      fetchUniversities();
    } catch (error) {
      console.error('Failed to delete university:', error);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#D4AF37'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(0, 0, 0, 0.9)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#D4AF37',
          fontFamily: 'Playfair Display, serif'
        }}>
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            cursor: 'pointer'
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <div style={{ padding: '2rem' }}>
        {/* Navigation Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <Link href="/admin/universities" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '2rem',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(96, 165, 250, 0.05) 100%)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              <Building2 style={{ width: '40px', height: '40px', color: '#60a5fa', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '0.5rem' }}>
                Universities
              </h3>
              <p style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '0.875rem' }}>
                Manage university listings
              </p>
            </div>
          </Link>

          <Link href="/admin/directors" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '2rem',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              <Users style={{ width: '40px', height: '40px', color: '#D4AF37', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '0.5rem' }}>
                Directors
              </h3>
              <p style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '0.875rem' }}>
                Manage board of directors
              </p>
            </div>
          </Link>

          <Link href="/admin/galleries" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '2rem',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              <Building2 style={{ width: '40px', height: '40px', color: '#a855f7', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '0.5rem' }}>
                Page Galleries
              </h3>
              <p style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '0.875rem' }}>
                Manage page image galleries
              </p>
            </div>
          </Link>
        </div>

        {/* Quick View - Universities */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          padding: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#D4AF37',
              fontFamily: 'Playfair Display, serif'
            }}>
              Recent Universities
            </h2>
            <Link href="/admin/universities/new">
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                border: 'none',
                color: '#000000',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                <Plus size={18} />
                Add University
              </button>
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#D4AF37', fontWeight: '600' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#D4AF37', fontWeight: '600' }}>Country</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#D4AF37', fontWeight: '600' }}>Programs</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#D4AF37', fontWeight: '600' }}>Rating</th>
                  <th style={{ padding: '1rem', textAlign: 'right', color: '#D4AF37', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {universities.map((uni) => (
                  <tr key={uni.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '1rem', color: '#F8F9FA' }}>{uni.name}</td>
                    <td style={{ padding: '1rem', color: 'rgba(248, 249, 250, 0.7)' }}>{uni.country}</td>
                    <td style={{ padding: '1rem', color: 'rgba(248, 249, 250, 0.7)' }}>{uni.programs}</td>
                    <td style={{ padding: '1rem', color: 'rgba(248, 249, 250, 0.7)' }}>{uni.rating}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <Link href={`/admin/universities/${uni.id}`}>
                          <button style={{
                            padding: '0.5rem',
                            borderRadius: '6px',
                            background: 'rgba(96, 165, 250, 0.1)',
                            border: '1px solid rgba(96, 165, 250, 0.3)',
                            color: '#60a5fa',
                            cursor: 'pointer'
                          }}>
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(uni.id)}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '6px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#ef4444',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
