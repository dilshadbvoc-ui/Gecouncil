'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { University } from '@/types/admin';

export default function EditUniversityPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<University>>({
    name: '',
    country: '',
    location: '',
    programs: 0,
    rating: 4.5,
    image: '🎓',
    description: '',
    website: '',
    established: new Date().getFullYear(),
    students: 0,
    details: ''
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    if (params.id) {
      fetchUniversity(params.id as string);
    }
  }, [params.id, router]);

  const fetchUniversity = async (id: string) => {
    try {
      const response = await fetch(`/api/universities/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Failed to fetch university:', error);
      alert('Failed to load university');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/universities/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('University updated successfully!');
        router.push('/admin/universities');
      } else {
        alert('Failed to update university');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update university');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#D4AF37', fontSize: '1.25rem' }}>Loading...</div>
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
        alignItems: 'center',
        gap: '1rem'
      }}>
        <Link href="/admin/universities">
          <button style={{
            padding: '0.5rem',
            borderRadius: '8px',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: '#D4AF37',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
            <ArrowLeft size={20} />
          </button>
        </Link>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#D4AF37',
          fontFamily: 'Playfair Display, serif'
        }}>
          Edit University
        </h1>
      </header>

      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          padding: '2rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {/* University Name */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.7)'
              }}>
                University Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#F8F9FA',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Country */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.7)'
              }}>
                Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#F8F9FA',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Location */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.7)'
              }}>
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#F8F9FA',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Flag/Image */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.7)'
              }}>
                Flag Emoji *
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#F8F9FA',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Programs */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.7)'
              }}>
                Number of Programs *
              </label>
              <input
                type="number"
                name="programs"
                value={formData.programs}
                onChange={handleChange}
                required
                min="0"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#F8F9FA',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Rating */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.7)'
              }}>
                Rating (0-5) *
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                min="0"
                max="5"
                step="0.1"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#F8F9FA',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Established */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.7)'
              }}>
                Established Year
              </label>
              <input
                type="number"
                name="established"
                value={formData.established}
                onChange={handleChange}
                min="1000"
                max={new Date().getFullYear()}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#F8F9FA',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Students */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.7)'
              }}>
                Number of Students
              </label>
              <input
                type="number"
                name="students"
                value={formData.students}
                onChange={handleChange}
                min="0"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#F8F9FA',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Website */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.7)'
              }}>
                Website URL
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#F8F9FA',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Description */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.7)'
              }}>
                Short Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
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
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>

            {/* Details */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.7)'
              }}>
                Detailed Information
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={6}
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
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Link href="/admin/universities">
              <button
                type="button"
                style={{
                  padding: '0.875rem 1.5rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: 'rgba(248, 249, 250, 0.7)',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={saving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.5rem',
                borderRadius: '8px',
                background: saving ? 'rgba(212, 175, 55, 0.5)' : 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                border: 'none',
                color: '#000000',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer'
              }}
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Update University'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
