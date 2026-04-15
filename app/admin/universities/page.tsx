'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2, ArrowLeft, Search } from 'lucide-react';
import { University } from '@/types/admin';

export default function AdminUniversitiesPage() {
  const router = useRouter();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
      setUniversities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this university?')) return;

    try {
      await fetch(`/api/universities/${id}`, { method: 'DELETE' });
      fetchUniversities();
    } catch (error) {
      console.error('Failed to delete university:', error);
      alert('Failed to delete university');
    }
  };

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/dashboard">
            <button style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.3)', color: '#4A90D9', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={20} />
            </button>
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4A90D9', fontFamily: 'Playfair Display, serif' }}>
            Manage Universities
          </h1>
        </div>
        <Link href="/admin/universities/new">
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', border: 'none', color: '#000000', fontWeight: '600', cursor: 'pointer' }}>
            <Plus size={18} />
            Add University
          </button>
        </Link>
      </div>

      <div style={{ marginBottom: '2rem', maxWidth: '500px' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              color: '#4A90D9'
            }} />
            <input
              type="text"
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                borderRadius: '12px',
                border: '1px solid rgba(74, 144, 217, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#F8F9FA',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Universities Table */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(74, 144, 217, 0.3)',
          overflow: 'hidden'
        }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#4A90D9' }}>
              Loading universities...
            </div>
          ) : filteredUniversities.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(248, 249, 250, 0.7)' }}>
              No universities found
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(74, 144, 217, 0.2)', background: 'rgba(74, 144, 217, 0.05)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#4A90D9', fontWeight: '600' }}>Flag</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#4A90D9', fontWeight: '600' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#4A90D9', fontWeight: '600' }}>Location</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#4A90D9', fontWeight: '600' }}>Country</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: '#4A90D9', fontWeight: '600' }}>Programs</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: '#4A90D9', fontWeight: '600' }}>Rating</th>
                    <th style={{ padding: '1rem', textAlign: 'right', color: '#4A90D9', fontWeight: '600' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUniversities.map((uni) => (
                    <tr key={uni.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '1rem', fontSize: '2rem' }}>{uni.image}</td>
                      <td style={{ padding: '1rem', color: '#F8F9FA', fontWeight: '500' }}>{uni.name}</td>
                      <td style={{ padding: '1rem', color: 'rgba(248, 249, 250, 0.7)' }}>{uni.location}</td>
                      <td style={{ padding: '1rem', color: 'rgba(248, 249, 250, 0.7)' }}>{uni.country}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: 'rgba(248, 249, 250, 0.7)' }}>{uni.programs}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: '#4A90D9', fontWeight: '600' }}>{uni.rating}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <Link href={`/admin/universities/${uni.id}`}>
                            <button style={{
                              padding: '0.5rem',
                              borderRadius: '6px',
                              background: 'rgba(96, 165, 250, 0.1)',
                              border: '1px solid rgba(96, 165, 250, 0.3)',
                              color: '#60a5fa',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
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
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
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
          )}
        </div>

        {/* Stats */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          borderRadius: '12px',
          background: 'rgba(74, 144, 217, 0.1)',
          border: '1px solid rgba(74, 144, 217, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.6)', marginBottom: '0.25rem' }}>
              Total Universities
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#4A90D9' }}>
              {universities.length}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.6)', marginBottom: '0.25rem' }}>
              Countries
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#4A90D9' }}>
              {new Set(universities.map(u => u.country)).size}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.6)', marginBottom: '0.25rem' }}>
              Total Programs
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#4A90D9' }}>
              {universities.reduce((sum, u) => sum + u.programs, 0)}
            </div>
          </div>
        </div>
    </div>
  );
}
