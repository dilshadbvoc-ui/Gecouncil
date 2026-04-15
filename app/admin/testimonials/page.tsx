'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Quote } from 'lucide-react';
import { Testimonial } from '@/types/admin';
import ImageUpload from '@/components/ImageUpload';

const emptyForm = { name: '', result: '', quote: '', image: '', order: 1 };

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const refresh = () =>
    fetch('/api/testimonials').then(r => r.json()).then(d => setTestimonials(Array.isArray(d) ? d : []));

  useEffect(() => { refresh().then(() => setLoading(false)); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = editingId
        ? await fetch(`/api/testimonials/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        : await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) {
        showToast(editingId ? 'Testimonial updated!' : 'Testimonial added!', true);
        setShowForm(false); setEditingId(null); setForm({ ...emptyForm });
        refresh();
      } else { showToast('Failed to save', false); }
    } catch { showToast('Failed to save', false); }
  };

  const handleEdit = (t: Testimonial) => {
    setForm({ name: t.name, result: t.result, quote: t.quote, image: t.image, order: t.order });
    setEditingId(t.id); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    refresh();
  };

  const inp: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid rgba(74,144,217,0.3)', background: 'rgba(255,255,255,0.05)', color: '#F8F9FA', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' };
  const lbl: React.CSSProperties = { display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: '600', color: 'rgba(74,144,217,0.9)', textTransform: 'uppercase', letterSpacing: '0.05em' };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link href="/admin/dashboard">
          <button style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.3)', color: '#4A90D9', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={20} />
          </button>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4A90D9', fontFamily: 'Playfair Display, serif', flex: 1 }}>Testimonials</h1>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ ...emptyForm, order: testimonials.length + 1 }); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '8px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', border: 'none', color: '#000', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem' }}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {toast && <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: toast.ok ? 'rgba(34,197,94,0.15)' : 'rgba(220,38,38,0.15)', border: `1px solid ${toast.ok ? 'rgba(34,197,94,0.4)' : 'rgba(220,38,38,0.4)'}`, color: toast.ok ? '#4ade80' : '#f87171', fontSize: '0.875rem' }}>{toast.msg}</div>}

      {showForm && (
        <div style={{ marginBottom: '2rem', padding: '2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(74,144,217,0.3)' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#4A90D9', marginBottom: '1.5rem' }}>{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={lbl}>Student Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="e.g., Priya S." style={inp} />
              </div>
              <div>
                <label style={lbl}>Result / Achievement *</label>
                <input type="text" value={form.result} onChange={e => setForm({ ...form, result: e.target.value })} required placeholder="e.g., University of Edinburgh — Business" style={inp} />
              </div>
              <div>
                <label style={lbl}>Display Order</label>
                <input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 1 })} min="1" style={inp} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={lbl}>Quote *</label>
                <textarea value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} required rows={3} placeholder="What the student said..." style={{ ...inp, resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <ImageUpload label="Student Photo" value={form.image} onChange={url => setForm({ ...form, image: url })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', border: 'none', color: '#000', fontWeight: '600', cursor: 'pointer' }}>{editingId ? 'Update' : 'Add'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(74,144,217,0.3)', color: 'rgba(248,249,250,0.7)', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ color: '#4A90D9', padding: '2rem' }}>Loading...</div>
      ) : testimonials.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.2)' }}>
          <Quote size={40} style={{ color: '#4A90D9', margin: '0 auto 1rem' }} />
          <p style={{ color: 'rgba(248,249,250,0.5)' }}>No testimonials yet. Add one above.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {testimonials.map(t => (
            <div key={t.id} style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.15)', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(74,144,217,0.3)', flexShrink: 0, background: 'rgba(74,144,217,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {t.image ? <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '1.5rem' }}>👤</span>}
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#F8F9FA', fontSize: '0.9375rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#4A90D9' }}>{t.result}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(248,249,250,0.65)', lineHeight: '1.6', fontStyle: 'italic', flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEdit(t)} style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.3)', color: '#4A90D9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.8rem' }}><Edit size={14} /> Edit</button>
                <button onClick={() => handleDelete(t.id)} style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.8rem' }}><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
