'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Users } from 'lucide-react';
import { Director } from '@/types/admin';
import ImageUpload from '@/components/ImageUpload';

export default function DirectorsManagement() {
  const router = useRouter();
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    image: '',
    bio: '',
    order: 1
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    fetchDirectors();
  }, [router]);

  const fetchDirectors = async () => {
    try {
      const response = await fetch('/api/directors');
      const data = await response.json();
      setDirectors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch directors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await fetch(`/api/directors/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch('/api/directors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', position: '', image: '', bio: '', order: 1 });
      fetchDirectors();
    } catch (error) {
      console.error('Failed to save director:', error);
    }
  };

  const handleEdit = (director: Director) => {
    setFormData({
      name: director.name,
      position: director.position,
      image: director.image,
      bio: director.bio || '',
      order: director.order
    });
    setEditingId(director.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this director?')) return;
    
    try {
      await fetch(`/api/directors/${id}`, { method: 'DELETE' });
      fetchDirectors();
    } catch (error) {
      console.error('Failed to delete director:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#4A90D9', fontSize: '1.25rem' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ color: '#F8F9FA' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/dashboard">
          <button style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.3)', color: '#4A90D9', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={20} />
          </button>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4A90D9', fontFamily: 'Playfair Display, serif', flex: 1 }}>
          Board of Directors
        </h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({ name: '', position: '', image: '', bio: '', order: directors.length + 1 });
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', border: 'none', color: '#000000', fontWeight: '600', cursor: 'pointer' }}
        >
          <Plus size={18} />
          Add Director
        </button>
      </div>
        {showForm && (
          <div style={{
            marginBottom: '2rem',
            padding: '2rem',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(74, 144, 217, 0.3)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#4A90D9', marginBottom: '1.5rem' }}>
              {editingId ? 'Edit Director' : 'Add New Director'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(74, 144, 217, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                  Position *
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                  placeholder="e.g., Chairman & CEO"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(74, 144, 217, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <ImageUpload
                  label="Photo"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  placeholder="Brief biography..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(74, 144, 217, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  min="1"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(74, 144, 217, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)',
                    border: 'none',
                    color: '#000000',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(74, 144, 217, 0.3)',
                    color: 'rgba(248, 249, 250, 0.7)',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {directors.map((director) => (
            <div
              key={director.id}
              style={{
                padding: '2rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(74, 144, 217, 0.3)',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(74, 144, 217, 0.2) 0%, rgba(74, 144, 217, 0.05) 100%)',
                border: '3px solid rgba(74, 144, 217, 0.4)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {director.image ? (
                  <img 
                    src={director.image} 
                    alt={director.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Users size={48} style={{ color: '#4A90D9' }} />
                )}
              </div>

              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: '#F8F9FA',
                marginBottom: '0.5rem',
                fontFamily: 'Playfair Display, serif'
              }}>
                {director.name}
              </h3>

              <p style={{
                fontSize: '0.875rem',
                color: '#4A90D9',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                {director.position}
              </p>

              {director.bio && (
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(248, 249, 250, 0.7)',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {director.bio}
                </p>
              )}

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(director)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '6px',
                    background: 'rgba(74, 144, 217, 0.1)',
                    border: '1px solid rgba(74, 144, 217, 0.3)',
                    color: '#4A90D9',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(director.id)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '6px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
