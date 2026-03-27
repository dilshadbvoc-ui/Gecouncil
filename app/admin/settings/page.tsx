'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';

export default function AdminSettings() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '', name: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { showToast('Passwords do not match', false); return; }
    if (form.password.length < 6) { showToast('Password must be at least 6 characters', false); return; }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password, name: form.name })
      });
      const data = await res.json();
      if (res.ok) showToast(data.message || 'Saved!', true);
      else showToast(data.error || 'Failed', false);
    } catch { showToast('Failed to save', false); }
    finally { setSaving(false); }
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.875rem 1rem', borderRadius: '12px',
    border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(255,255,255,0.05)',
    color: '#F8F9FA', fontSize: '1rem', outline: 'none', boxSizing: 'border-box'
  };
  const lbl: React.CSSProperties = {
    display: 'block', marginBottom: '0.5rem', fontSize: '0.8125rem',
    fontWeight: '600', color: 'rgba(212,175,55,0.9)', textTransform: 'uppercase', letterSpacing: '0.05em'
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/dashboard">
          <button style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#D4AF37', fontFamily: 'Playfair Display, serif' }}>
          Admin Settings
        </h1>
      </div>

      {toast && (
        <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem', borderRadius: '8px', background: toast.ok ? 'rgba(34,197,94,0.15)' : 'rgba(220,38,38,0.15)', border: `1px solid ${toast.ok ? 'rgba(34,197,94,0.4)' : 'rgba(220,38,38,0.4)'}`, color: toast.ok ? '#4ade80' : '#f87171', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {toast.ok && <CheckCircle size={16} />} {toast.msg}
        </div>
      )}

      <div style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.2)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '1.5rem' }}>
          Create or Update Admin User
        </h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={lbl}>Name</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Admin Name" style={inp} />
          </div>
          <div>
            <label style={lbl}>Email *</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="admin@gecouncil.com" style={inp} />
          </div>
          <div>
            <label style={lbl}>New Password *</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required placeholder="Min 6 characters" style={inp} />
          </div>
          <div>
            <label style={lbl}>Confirm Password *</label>
            <input type="password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required placeholder="Repeat password" style={inp} />
          </div>
          <button type="submit" disabled={saving} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', borderRadius: '10px', background: saving ? 'rgba(212,175,55,0.5)' : 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)', border: 'none', color: '#000', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.9375rem' }}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Credentials'}
          </button>
        </form>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', borderRadius: '10px', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)', fontSize: '0.8125rem', color: 'rgba(248,249,250,0.5)', lineHeight: '1.6' }}>
        Current default credentials (from .env.local):<br />
        Email: <span style={{ color: '#D4AF37' }}>admin@gecouncil.com</span><br />
        Password: <span style={{ color: '#D4AF37' }}>admin123</span><br />
        Use the form above to set new credentials stored in MongoDB.
      </div>
    </div>
  );
}
