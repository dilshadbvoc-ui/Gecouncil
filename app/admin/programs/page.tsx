'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { Program, University } from '@/types/admin';

const emptyForm = {
  universityId: '', title: '', degree: '', duration: '',
  language: 'English', description: '', category: 'overseas' as Program['category'],
  tuitionFee: '', intake: ''
};

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
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

  useEffect(() => {
    Promise.all([
      fetch('/api/programs').then(r => r.json()),
      fetch('/api/universities').then(r => r.json()),
    ]).then(([progs, unis]) => {
      setPrograms(Array.isArray(progs) ? progs : []);
      setUniversities(Array.isArray(unis) ? unis : []);
      setLoading(false);
    });
  }, []);

  const refresh = () => fetch('/api/programs').then(r => r.json()).then(d => setPrograms(Array.isArray(d) ? d : []));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const uni = universities.find(u => u.id === form.universityId);
    const payload = { ...form, universityName: uni?.name || '' };
    try {
      const res = editingId
        ? await fetch(`/api/programs/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/programs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) {
        showToast(editingId ? 'Program updated!' : 'Program added!', true);
        setShowForm(false); setEditingId(null); setForm({ ...emptyForm });
        refresh();
      } else { showToast('Failed to save program', false); }
    } catch { showToast('Failed to save program', false); }
  };

  const handleEdit = (p: Program) => {
    setForm({ universityId: p.universityId, title: p.title, degree: p.degree, duration: p.duration, language: p.language, description: p.description, category: p.category, tuitionFee: p.tuitionFee || '', intake: p.intake || '' });
    setEditingId(p.id); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this program?')) return;
    await fetch(`/api/programs/${id}`, { method: 'DELETE' });
    refresh();
  };

  const filtered = filterCat === 'all' ? programs : programs.filter(p => p.category === filterCat || p.category === 'both');

  const inp: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(255,255,255,0.05)', color: '#F8F9FA', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' };
  const lbl: React.CSSProperties = { display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: '600', color: 'rgba(212,175,55,0.9)', textTransform: 'uppercase', letterSpacing: '0.05em' };

  const catBadge = (cat: string) => {
    const colors: Record<string, string> = { skill: '#06b6d4', overseas: '#8b5cf6', both: '#D4AF37' };
    return <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', background: (colors[cat] || '#888') + '22', color: colors[cat] || '#888', border: `1px solid ${colors[cat] || '#888'}44`, textTransform: 'capitalize' }}>{cat}</span>;
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link href="/admin/dashboard">
          <button style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={20} />
          </button>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#D4AF37', fontFamily: 'Playfair Display, serif', flex: 1 }}>Programs</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'skill', 'overseas', 'both'].map(c => (
            <button key={c} onClick={() => setFilterCat(c)} style={{ padding: '0.4rem 0.875rem', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.3)', background: filterCat === c ? '#D4AF37' : 'transparent', color: filterCat === c ? '#000' : '#D4AF37', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', textTransform: 'capitalize' }}>{c}</button>
          ))}
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ ...emptyForm }); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '8px', background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)', border: 'none', color: '#000', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem' }}>
          <Plus size={16} /> Add Program
        </button>
      </div>

      {toast && <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: toast.ok ? 'rgba(34,197,94,0.15)' : 'rgba(220,38,38,0.15)', border: `1px solid ${toast.ok ? 'rgba(34,197,94,0.4)' : 'rgba(220,38,38,0.4)'}`, color: toast.ok ? '#4ade80' : '#f87171', fontSize: '0.875rem' }}>{toast.msg}</div>}

      {showForm && (
        <div style={{ marginBottom: '2rem', padding: '2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.3)' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#D4AF37', marginBottom: '1.5rem' }}>{editingId ? 'Edit Program' : 'Add New Program'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={lbl}>University *</label>
                <select value={form.universityId} onChange={e => setForm({ ...form, universityId: e.target.value })} required style={{ ...inp }}>
                  <option value="">Select university...</option>
                  {universities.map(u => <option key={u.id} value={u.id}>{u.name} ({u.country})</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={lbl}>Program Title *</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="e.g., MSc Computer Science" style={inp} />
              </div>
              <div>
                <label style={lbl}>Degree *</label>
                <select value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} required style={inp}>
                  <option value="">Select...</option>
                  {['Certificate', 'Diploma', 'Bachelor', 'Master', 'MBA', 'PhD', 'Short Course'].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Category *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Program['category'] })} required style={inp}>
                  <option value="skill">Skill</option>
                  <option value="overseas">Overseas / Study Abroad</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div>
                <label style={lbl}>Duration *</label>
                <input type="text" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} required placeholder="e.g., 2 years" style={inp} />
              </div>
              <div>
                <label style={lbl}>Language</label>
                <input type="text" value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} placeholder="English" style={inp} />
              </div>
              <div>
                <label style={lbl}>Tuition Fee</label>
                <input type="text" value={form.tuitionFee} onChange={e => setForm({ ...form, tuitionFee: e.target.value })} placeholder="e.g., €12,000/year" style={inp} />
              </div>
              <div>
                <label style={lbl}>Intake</label>
                <input type="text" value={form.intake} onChange={e => setForm({ ...form, intake: e.target.value })} placeholder="e.g., September, February" style={inp} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={lbl}>Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={3} placeholder="Brief program description..." style={{ ...inp, resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)', border: 'none', color: '#000', fontWeight: '600', cursor: 'pointer' }}>{editingId ? 'Update' : 'Add Program'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.3)', color: 'rgba(248,249,250,0.7)', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ color: '#D4AF37', padding: '2rem' }}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)' }}>
          <BookOpen size={40} style={{ color: '#D4AF37', margin: '0 auto 1rem' }} />
          <p style={{ color: 'rgba(248,249,250,0.5)' }}>No programs yet. Add one above.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(p => (
            <div key={p.id} style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: '600', color: '#F8F9FA', fontSize: '0.9375rem' }}>{p.title}</span>
                  {catBadge(p.category)}
                  <span style={{ fontSize: '0.75rem', color: 'rgba(248,249,250,0.4)', background: 'rgba(255,255,255,0.05)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>{p.degree}</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'rgba(248,249,250,0.5)' }}>
                  {p.universityName} · {p.duration} · {p.language}{p.tuitionFee ? ` · ${p.tuitionFee}` : ''}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEdit(p)} style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', cursor: 'pointer', display: 'flex' }}><Edit size={15} /></button>
                <button onClick={() => handleDelete(p.id)} style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', cursor: 'pointer', display: 'flex' }}><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
