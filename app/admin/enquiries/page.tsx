'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Trash2 } from 'lucide-react';
import { Enquiry } from '@/types/admin';

export default function EnquiriesManagement() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    fetchEnquiries();
  }, [router]);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/enquiries');
      const data = await response.json();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'new' | 'in-progress' | 'completed') => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchEnquiries();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    
    try {
      await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      fetchEnquiries();
      setSelectedEnquiry(null);
    } catch (error) {
      console.error('Failed to delete enquiry:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#3b82f6' };
      case 'in-progress': return { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.3)', text: '#fbbf24' };
      case 'completed': return { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: '#22c55e' };
      default: return { bg: 'rgba(156, 163, 175, 0.1)', border: 'rgba(156, 163, 175, 0.3)', text: '#9ca3af' };
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#D4AF37', fontSize: '1.25rem' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ color: '#F8F9FA' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/dashboard">
          <button style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={20} />
          </button>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#D4AF37', fontFamily: 'Playfair Display, serif', flex: 1 }}>
          Partnership Enquiries
        </h1>
        <div style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', fontWeight: '600' }}>
          {enquiries.length} Total
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: selectedEnquiry ? '1fr 400px' : '1fr', gap: '2rem' }}>
        {/* Enquiries List */}
        <div>
          {enquiries.length === 0 ? (
            <div style={{
              padding: '3rem',
              textAlign: 'center',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              <Mail size={48} style={{ color: '#D4AF37', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '0.5rem' }}>
                No Enquiries Yet
              </h3>
              <p style={{ color: 'rgba(248, 249, 250, 0.7)' }}>
                Partnership enquiries will appear here
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {enquiries.map((enquiry) => {
                const statusColors = getStatusColor(enquiry.status);
                return (
                  <div
                    key={enquiry.id}
                    style={{
                      padding: '1.5rem',
                      borderRadius: '16px',
                      background: selectedEnquiry?.id === enquiry.id ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${selectedEnquiry?.id === enquiry.id ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.3)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => setSelectedEnquiry(enquiry)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '0.25rem' }}>
                          {enquiry.universityName || 'General Enquiry'}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.6)' }}>
                          {new Date(enquiry.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                        background: statusColors.bg,
                        border: `1px solid ${statusColors.border}`,
                        color: statusColors.text,
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {enquiry.status.replace('-', ' ')}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.8)' }}>
                        <Mail size={14} style={{ color: '#D4AF37' }} />
                        {enquiry.email}
                      </div>
                      {enquiry.phone && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.8)' }}>
                          <Phone size={14} style={{ color: '#D4AF37' }} />
                          {enquiry.phone}
                        </div>
                      )}
                      {enquiry.country && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.8)' }}>
                          <MapPin size={14} style={{ color: '#D4AF37' }} />
                          {enquiry.country}
                        </div>
                      )}
                    </div>

                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(248, 249, 250, 0.7)',
                      lineHeight: '1.5',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {enquiry.message}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Enquiry Details */}
        {selectedEnquiry && (
          <div style={{
            position: 'sticky',
            top: '2rem',
            height: 'fit-content',
            padding: '2rem',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(212, 175, 55, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#D4AF37', fontFamily: 'Playfair Display, serif' }}>
                Enquiry Details
              </h2>
              <button
                onClick={() => handleDelete(selectedEnquiry.id)}
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'rgba(248, 249, 250, 0.6)', marginBottom: '0.25rem', display: 'block' }}>
                  University Name
                </label>
                <p style={{ fontSize: '1rem', color: '#F8F9FA', fontWeight: '500' }}>
                  {selectedEnquiry.universityName || 'N/A'}
                </p>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'rgba(248, 249, 250, 0.6)', marginBottom: '0.25rem', display: 'block' }}>
                  Contact Person
                </label>
                <p style={{ fontSize: '1rem', color: '#F8F9FA', fontWeight: '500' }}>
                  {selectedEnquiry.contactPerson}
                </p>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'rgba(248, 249, 250, 0.6)', marginBottom: '0.25rem', display: 'block' }}>
                  Email
                </label>
                <a href={`mailto:${selectedEnquiry.email}`} style={{ fontSize: '1rem', color: '#D4AF37', textDecoration: 'none' }}>
                  {selectedEnquiry.email}
                </a>
              </div>

              {selectedEnquiry.phone && (
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'rgba(248, 249, 250, 0.6)', marginBottom: '0.25rem', display: 'block' }}>
                    Phone
                  </label>
                  <a href={`tel:${selectedEnquiry.phone}`} style={{ fontSize: '1rem', color: '#D4AF37', textDecoration: 'none' }}>
                    {selectedEnquiry.phone}
                  </a>
                </div>
              )}

              {selectedEnquiry.country && (
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'rgba(248, 249, 250, 0.6)', marginBottom: '0.25rem', display: 'block' }}>
                    Country
                  </label>
                  <p style={{ fontSize: '1rem', color: '#F8F9FA', fontWeight: '500' }}>
                    {selectedEnquiry.country}
                  </p>
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.75rem', color: 'rgba(248, 249, 250, 0.6)', marginBottom: '0.25rem', display: 'block' }}>
                  Message
                </label>
                <p style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.8)', lineHeight: '1.6' }}>
                  {selectedEnquiry.message}
                </p>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'rgba(248, 249, 250, 0.6)', marginBottom: '0.5rem', display: 'block' }}>
                  Status
                </label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// layout fix applied
