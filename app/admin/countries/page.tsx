'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Globe } from 'lucide-react';
import { Country } from '@/types/admin';

const emptyForm = {
  name: '',
  flag: '',
  continent: '',
  description: '',
  category: 'overseas' as Country['category'],
  highlights: '',
};

export default function AdminCountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [filterCat, setFilterCat] = useState<string>('all');

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const refresh = () =>
    fetch('/api/countries').then(r => r.json()).then(d => setCountries(Array.isArray(d) ? d : []));

  useEffect(() => {
    refresh().then(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      highlights: form.highlights
        ? form.highlights.split('\n').map(s => s.trim()).filter(Boolean)
        : [],
    };
    try {
      const res = editingId
        ? await fetch(`/api/countries/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/countries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) {
        showToast(editingId ? 'Country updated!' : 'Country added!', true);
        setShowForm(false); setEditingId(null); setForm({ ...emptyForm });
        refresh();
      } else { showToast('Failed to save country', false); }
    } catch { showToast('Failed to save country', false); }
  };

  const handleEdit = (c: Country) => {
    setForm({
      name: c.name,
      flag: c.flag,
      continent: c.continent,
      description: c.description,
      category: c.category,
      highlights: (c.highlights || []).join('\n'),
    });
    setEditingId(c.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this country?')) return;
    await fetch(`/api/countries/${id}`, { method: 'DELETE' });
    refresh();
  };

  const filtered = filterCat === 'all' ? countries : countries.filter(c => c.category === filterCat || c.category === 'both');

  const catColor: Record<string, string> = { overseas: '#8b5cf6', recruitment: '#4A90D9', both: '#06b6d4' };

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
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4A90D9', fontFamily: 'Playfair Display, serif', flex: 1 }}>Countries</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'overseas', 'recruitment', 'both'].map(c => (
            <button key={c} onClick={() => setFilterCat(c)} style={{ padding: '0.4rem 0.875rem', borderRadius: '8px', border: '1px solid rgba(74,144,217,0.3)', background: filterCat === c ? '#4A90D9' : 'transparent', color: filterCat === c ? '#000' : '#4A90D9', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', textTransform: 'capitalize' }}>{c}</button>
          ))}
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ ...emptyForm }); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '8px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', border: 'none', color: '#000', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem' }}>
          <Plus size={16} /> Add Country
        </button>
      </div>

      {toast && <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: toast.ok ? 'rgba(34,197,94,0.15)' : 'rgba(220,38,38,0.15)', border: `1px solid ${toast.ok ? 'rgba(34,197,94,0.4)' : 'rgba(220,38,38,0.4)'}`, color: toast.ok ? '#4ade80' : '#f87171', fontSize: '0.875rem' }}>{toast.msg}</div>}

      {showForm && (
        <div style={{ marginBottom: '2rem', padding: '2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(74,144,217,0.3)' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#4A90D9', marginBottom: '1.5rem' }}>{editingId ? 'Edit Country' : 'Add New Country'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={lbl}>Country Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="e.g., Germany" style={inp} />
              </div>
              <div>
                <label style={lbl}>Flag Emoji *</label>
                <input type="text" value={form.flag} onChange={e => setForm({ ...form, flag: e.target.value })} required placeholder="e.g., 🇩🇪" style={inp} />
              </div>
              <div>
                <label style={lbl}>Continent *</label>
                <select value={form.continent} onChange={e => setForm({ ...form, continent: e.target.value })} required style={inp}>
                  <option value="">Select...</option>
                  {['Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Category *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Country['category'] })} required style={inp}>
                  <option value="overseas">Overseas (Study Abroad)</option>
                  <option value="recruitment">Recruitment (Jobs)</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={lbl}>Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={2} placeholder="Brief description of the country as a destination..." style={{ ...inp, resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={lbl}>Highlights / Key Facts <span style={{ fontWeight: '400', textTransform: 'none', color: 'rgba(74,144,217,0.6)' }}>(one per line)</span></label>
                <textarea value={form.highlights} onChange={e => setForm({ ...form, highlights: e.target.value })} rows={4} placeholder={'Strong economy\nHigh quality of life\nEnglish-friendly workplaces\nExcellent healthcare'} style={{ ...inp, resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', border: 'none', color: '#000', fontWeight: '600', cursor: 'pointer' }}>{editingId ? 'Update' : 'Add Country'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(74,144,217,0.3)', color: 'rgba(248,249,250,0.7)', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ color: '#4A90D9', padding: '2rem' }}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.2)' }}>
          <Globe size={40} style={{ color: '#4A90D9', margin: '0 auto 1rem' }} />
          <p style={{ color: 'rgba(248,249,250,0.5)' }}>No countries yet. Add one above.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(c => (
            <div key={c.id} style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.15)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '2rem' }}>{c.flag}</span>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: '600', color: '#F8F9FA', fontSize: '0.9375rem' }}>{c.name}</span>
                  <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', background: (catColor[c.category] || '#888') + '22', color: catColor[c.category] || '#888', border: `1px solid ${catColor[c.category] || '#888'}44`, textTransform: 'capitalize' }}>{c.category}</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'rgba(248,249,250,0.5)' }}>
                  {c.continent} · {c.description.slice(0, 80)}{c.description.length > 80 ? '…' : ''}
                </div>
                {c.highlights && c.highlights.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                    {c.highlights.slice(0, 4).map((h, i) => (
                      <span key={i} style={{ padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(74,144,217,0.08)', color: 'rgba(74,144,217,0.8)', fontSize: '0.7rem', border: '1px solid rgba(74,144,217,0.2)' }}>{h}</span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEdit(c)} style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.3)', color: '#4A90D9', cursor: 'pointer', display: 'flex' }}><Edit size={15} /></button>
                <button onClick={() => handleDelete(c.id)} style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', cursor: 'pointer', display: 'flex' }}><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
