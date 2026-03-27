'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

export default function NewUniversityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [formData, setFormData] = useState({
    name: '', country: '', location: '', programs: 0, rating: 4.5,
    image: '', description: '', website: '',
    established: new Date().getFullYear(), students: 0, details: '',
    keyPersons: [] as Array<{ id: string; name: string; position: string; image: string; bio?: string }>
  });

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) { showToast('University added!', true); router.push('/admin/universities'); }
      else showToast('Failed to add university', false);
    } catch { showToast('Failed to add university', false); }
    finally { setLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value }));
  };

  const addKeyPerson = () => setFormData(prev => ({
    ...prev,
    keyPersons: [...prev.keyPersons, { id: Date.now().toString(), name: '', position: '', image: '', bio: '' }]
  }));

  const updateKeyPerson = (i: number, field: string, value: string) => setFormData(prev => ({
    ...prev, keyPersons: prev.keyPersons.map((p, idx) => idx === i ? { ...p, [field]: value } : p)
  }));

  const removeKeyPerson = (i: number) => setFormData(prev => ({
    ...prev, keyPersons: prev.keyPersons.filter((_, idx) => idx !== i)
  }));

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.875rem 1rem', borderRadius: '12px',
    border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(255,255,255,0.05)',
    color: '#F8F9FA', fontSize: '1rem', outline: 'none', boxSizing: 'border-box'
  };
  const lbl: React.CSSProperties = {
    display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem',
    fontWeight: '500', color: 'rgba(248,249,250,0.7)'
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/universities">
          <button style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={20} />
          </button>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#D4AF37', fontFamily: 'Playfair Display, serif' }}>
          Add New University
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(212,175,55,0.3)', padding: '2rem' }}>
        {toast && (
          <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem', borderRadius: '8px', background: toast.ok ? 'rgba(34,197,94,0.15)' : 'rgba(220,38,38,0.15)', border: `1px solid ${toast.ok ? 'rgba(34,197,94,0.4)' : 'rgba(220,38,38,0.4)'}`, color: toast.ok ? '#4ade80' : '#f87171', fontSize: '0.875rem' }}>
            {toast.msg}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={lbl}>University Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g., University of Amsterdam" style={inp} />
          </div>
          <div>
            <label style={lbl}>Country *</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="e.g., Netherlands" style={inp} />
          </div>
          <div>
            <label style={lbl}>Location *</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g., Amsterdam" style={inp} />
          </div>
          <div>
            <label style={lbl}>Flag Emoji</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="e.g., flag emoji" style={inp} />
          </div>
          <div>
            <label style={lbl}>Programs *</label>
            <input type="number" name="programs" value={formData.programs} onChange={handleChange} required min="0" style={inp} />
          </div>
          <div>
            <label style={lbl}>Rating (0-5) *</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} required min="0" max="5" step="0.1" style={inp} />
          </div>
          <div>
            <label style={lbl}>Established Year</label>
            <input type="number" name="established" value={formData.established} onChange={handleChange} min="1000" max={new Date().getFullYear()} style={inp} />
          </div>
          <div>
            <label style={lbl}>Students</label>
            <input type="number" name="students" value={formData.students} onChange={handleChange} min="0" style={inp} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={lbl}>Website URL</label>
            <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="https://www.university.edu" style={inp} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={lbl}>Short Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} style={{ ...inp, resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={lbl}>Detailed Information</label>
            <textarea name="details" value={formData.details} onChange={handleChange} rows={6} style={{ ...inp, resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
          </div>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(212,175,55,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#D4AF37', fontFamily: 'Playfair Display, serif' }}>University Officials</h2>
            <button type="button" onClick={addKeyPerson} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', cursor: 'pointer', fontSize: '0.875rem' }}>
              + Add Official
            </button>
          </div>
          {formData.keyPersons.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(248,249,250,0.5)', fontSize: '0.875rem' }}>No officials added yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {formData.keyPersons.map((person, index) => (
                <div key={person.id} style={{ padding: '1.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: '600', color: 'rgba(248,249,250,0.9)' }}>Official #{index + 1}</span>
                    <button type="button" onClick={() => removeKeyPerson(index)} style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: '#EF4444', cursor: 'pointer', fontSize: '0.75rem' }}>Remove</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ ...lbl, fontSize: '0.75rem' }}>Name *</label>
                      <input type="text" value={person.name} onChange={e => updateKeyPerson(index, 'name', e.target.value)} required style={{ ...inp, padding: '0.75rem', fontSize: '0.875rem' }} />
                    </div>
                    <div>
                      <label style={{ ...lbl, fontSize: '0.75rem' }}>Position *</label>
                      <input type="text" value={person.position} onChange={e => updateKeyPerson(index, 'position', e.target.value)} required style={{ ...inp, padding: '0.75rem', fontSize: '0.875rem' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <ImageUpload label="Photo" value={person.image} onChange={(url) => updateKeyPerson(index, 'image', url)} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ ...lbl, fontSize: '0.75rem' }}>Bio</label>
                      <textarea value={person.bio} onChange={e => updateKeyPerson(index, 'bio', e.target.value)} rows={2} style={{ ...inp, padding: '0.75rem', fontSize: '0.875rem', resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <Link href="/admin/universities">
            <button type="button" style={{ padding: '0.875rem 1.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.3)', color: 'rgba(248,249,250,0.7)', cursor: 'pointer', fontWeight: '500' }}>Cancel</button>
          </Link>
          <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', borderRadius: '8px', background: loading ? 'rgba(212,175,55,0.5)' : 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)', border: 'none', color: '#000', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
            <Save size={18} />
            {loading ? 'Saving...' : 'Save University'}
          </button>
        </div>
      </form>
    </div>
  );
}
