'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { PageGallery } from '@/types/admin';

export default function GalleriesManagement() {
  const router = useRouter();
  const [galleries, setGalleries] = useState<PageGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    page: 'universities' as 'universities' | 'programs' | 'about' | 'contact',
    title: '',
    description: '',
    image: '',
    order: 1
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    fetchGalleries();
  }, [router]);

  const fetchGalleries = async () => {
    try {
      const response = await fetch('/api/galleries');
      const data = await response.json();
      setGalleries(data);
    } catch (error) {
      console.error('Failed to fetch galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await fetch(`/api/galleries/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch('/api/galleries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      setShowForm(false);
      setEditingId(null);
      setFormData({ page: 'universities', title: '', description: '', image: '', order: 1 });
      fetchGalleries();
    } catch (error) {
      console.error('Failed to save gallery:', error);
    }
  };

  const handleEdit = (gallery: PageGallery) => {
    setFormData({
      page: gallery.page,
      title: gallery.title,
      description: gallery.description || '',
      image: gallery.image,
      order: gallery.order
    });
    setEditingId(gallery.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    
    try {
      await fetch(`/api/galleries/${id}`, { method: 'DELETE' });
      fetchGalleries();
    } catch (error) {
      console.error('Failed to delete gallery:', error);
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
    <div style={{ minHeight: '100vh', background: '#000000', color: '#F8F9FA' }}>
      <header style={{
        background: 'rgba(0, 0, 0, 0.9)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <Link href="/admin/dashboard">
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
          fontFamily: 'Playfair Display, serif',
          flex: 1
        }}>
          Page Galleries
        </h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({ page: 'universities', title: '', description: '', image: '', order: 1 });
          }}
          style={{
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
          }}
        >
          <Plus size={18} />
          Add Gallery Item
        </button>
      </header>

      <div style={{ padding: '2rem' }}>
        {showForm && (
          <div style={{
            marginBottom: '2rem',
            padding: '2rem',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(212, 175, 55, 0.3)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#D4AF37', marginBottom: '1.5rem' }}>
              {editingId ? 'Edit Gallery Item' : 'Add New Gallery Item'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                  Page *
                </label>
                <select
                  value={formData.page}
                  onChange={(e) => setFormData({ ...formData, page: e.target.value as any })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    outline: 'none'
                  }}
                >
                  <option value="universities">Universities</option>
                  <option value="programs">Programs</option>
                  <option value="about">About</option>
                  <option value="contact">Contact</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
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
                  Image URL *
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  placeholder="/images/example.jpg"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.7)' }}>
                  Order
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
                    border: '1px solid rgba(212, 175, 55, 0.3)',
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
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
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
                    border: '1px solid rgba(212, 175, 55, 0.3)',
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}
            >
              <div style={{
                height: '200px',
                backgroundImage: `url(${gallery.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  fontSize: '0.75rem',
                  color: '#D4AF37',
                  textTransform: 'capitalize'
                }}>
                  {gallery.page}
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '0.5rem' }}>
                  {gallery.title}
                </h3>
                {gallery.description && (
                  <p style={{ fontSize: '0.875rem', color: 'rgba(248, 249, 250, 0.7)', marginBottom: '1rem' }}>
                    {gallery.description}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(gallery)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '6px',
                      background: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#D4AF37',
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
                    onClick={() => handleDelete(gallery.id)}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
