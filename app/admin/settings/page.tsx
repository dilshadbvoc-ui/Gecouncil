'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, CheckCircle, Globe, Phone, Mail, MapPin, Share2, Lock } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

const defaultSettings = {
  companyName: 'Global Education Council',
  tagline: 'Excellence in Education',
  email: 'partnerships@globaleducation.com',
  phone: '+91 98765 43210',
  whatsapp: '',
  address: 'Mumbai, Maharashtra',
  city: 'Mumbai',
  country: 'India',
  logoUrl: '',
  footerText: '© 2025 Global Education Council. All rights reserved.',
  socialLinkedin: '',
  socialInstagram: '',
  socialFacebook: '',
  socialTwitter: '',
};

export default function AdminSettings() {
  const [settings, setSettings] = useState({ ...defaultSettings });
  const [creds, setCreds] = useState({ email: '', password: '', confirm: '', name: '' });
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingCreds, setSavingCreds] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [activeTab, setActiveTab] = useState<'site' | 'credentials'>('site');

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => {
      if (data && Object.keys(data).length > 0) {
        setSettings({ ...defaultSettings, ...data });
      }
      setLoadingSettings(false);
    });
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) showToast('Site settings saved!', true);
      else showToast('Failed to save settings', false);
    } catch { showToast('Failed to save settings', false); }
    finally { setSavingSettings(false); }
  };

  const handleSaveCreds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (creds.password !== creds.confirm) { showToast('Passwords do not match', false); return; }
    if (creds.password.length < 6) { showToast('Password must be at least 6 characters', false); return; }
    setSavingCreds(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: creds.email, password: creds.password, name: creds.name }),
      });
      const data = await res.json();
      if (res.ok) showToast(data.message || 'Credentials saved!', true);
      else showToast(data.error || 'Failed', false);
    } catch { showToast('Failed to save', false); }
    finally { setSavingCreds(false); }
  };

  const inp: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid rgba(74,144,217,0.3)', background: 'rgba(255,255,255,0.05)', color: '#F8F9FA', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' };
  const lbl: React.CSSProperties = { display: 'block', marginBottom: '0.4rem', fontSize: '0.75rem', fontWeight: '700', color: 'rgba(74,144,217,0.9)', textTransform: 'uppercase', letterSpacing: '0.06em' };

  return (
    <div style={{ maxWidth: '760px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/dashboard">
          <button style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.3)', color: '#4A90D9', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4A90D9', fontFamily: 'Playfair Display, serif' }}>Settings</h1>
      </div>

      {toast && (
        <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem', borderRadius: '8px', background: toast.ok ? 'rgba(34,197,94,0.15)' : 'rgba(220,38,38,0.15)', border: `1px solid ${toast.ok ? 'rgba(34,197,94,0.4)' : 'rgba(220,38,38,0.4)'}`, color: toast.ok ? '#4ade80' : '#f87171', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {toast.ok && <CheckCircle size={16} />} {toast.msg}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {[{ key: 'site', label: 'Site Settings', icon: <Globe size={15} /> }, { key: 'credentials', label: 'Admin Credentials', icon: <Lock size={15} /> }].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key as 'site' | 'credentials')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.625rem 1.25rem', borderRadius: '8px', border: '1px solid rgba(74,144,217,0.3)', background: activeTab === tab.key ? '#4A90D9' : 'transparent', color: activeTab === tab.key ? '#000' : '#4A90D9', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'site' && (
        loadingSettings ? <div style={{ color: '#4A90D9' }}>Loading...</div> : (
          <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Branding */}
            <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: '#4A90D9', fontWeight: '700', fontSize: '0.875rem' }}>
                <Globe size={16} /> Branding
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={lbl}>Company Name</label>
                  <input type="text" value={settings.companyName} onChange={e => setSettings({ ...settings, companyName: e.target.value })} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Tagline</label>
                  <input type="text" value={settings.tagline} onChange={e => setSettings({ ...settings, tagline: e.target.value })} style={inp} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={lbl}>Footer Text</label>
                  <input type="text" value={settings.footerText} onChange={e => setSettings({ ...settings, footerText: e.target.value })} style={inp} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <ImageUpload label="Logo" value={settings.logoUrl || ''} onChange={url => setSettings({ ...settings, logoUrl: url })} />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: '#4A90D9', fontWeight: '700', fontSize: '0.875rem' }}>
                <Phone size={16} /> Contact Information
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={lbl}>Email</label>
                  <input type="email" value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Phone</label>
                  <input type="text" value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} style={inp} />
                </div>
                <div>
                  <label style={lbl}>WhatsApp</label>
                  <input type="text" value={settings.whatsapp || ''} onChange={e => setSettings({ ...settings, whatsapp: e.target.value })} placeholder="+91 98765 43210" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Address</label>
                  <input type="text" value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} style={inp} />
                </div>
                <div>
                  <label style={lbl}>City</label>
                  <input type="text" value={settings.city} onChange={e => setSettings({ ...settings, city: e.target.value })} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Country</label>
                  <input type="text" value={settings.country} onChange={e => setSettings({ ...settings, country: e.target.value })} style={inp} />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: '#4A90D9', fontWeight: '700', fontSize: '0.875rem' }}>
                <Share2 size={16} /> Social Links
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={lbl}>LinkedIn URL</label>
                  <input type="url" value={settings.socialLinkedin || ''} onChange={e => setSettings({ ...settings, socialLinkedin: e.target.value })} placeholder="https://linkedin.com/company/..." style={inp} />
                </div>
                <div>
                  <label style={lbl}>Instagram URL</label>
                  <input type="url" value={settings.socialInstagram || ''} onChange={e => setSettings({ ...settings, socialInstagram: e.target.value })} placeholder="https://instagram.com/..." style={inp} />
                </div>
                <div>
                  <label style={lbl}>Facebook URL</label>
                  <input type="url" value={settings.socialFacebook || ''} onChange={e => setSettings({ ...settings, socialFacebook: e.target.value })} placeholder="https://facebook.com/..." style={inp} />
                </div>
                <div>
                  <label style={lbl}>Twitter / X URL</label>
                  <input type="url" value={settings.socialTwitter || ''} onChange={e => setSettings({ ...settings, socialTwitter: e.target.value })} placeholder="https://twitter.com/..." style={inp} />
                </div>
              </div>
            </div>

            <button type="submit" disabled={savingSettings} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', borderRadius: '10px', background: savingSettings ? 'rgba(74,144,217,0.5)' : 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', border: 'none', color: '#000', fontWeight: '700', cursor: savingSettings ? 'not-allowed' : 'pointer', fontSize: '0.9375rem' }}>
              <Save size={16} /> {savingSettings ? 'Saving...' : 'Save Site Settings'}
            </button>
          </form>
        )
      )}

      {activeTab === 'credentials' && (
        <div style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(74,144,217,0.2)' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '1.5rem' }}>Create or Update Admin User</h2>
          <form onSubmit={handleSaveCreds} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={lbl}>Name</label>
              <input type="text" value={creds.name} onChange={e => setCreds({ ...creds, name: e.target.value })} placeholder="Admin Name" style={inp} />
            </div>
            <div>
              <label style={lbl}>Email *</label>
              <input type="email" value={creds.email} onChange={e => setCreds({ ...creds, email: e.target.value })} required placeholder="admin@gecouncil.com" style={inp} />
            </div>
            <div>
              <label style={lbl}>New Password *</label>
              <input type="password" value={creds.password} onChange={e => setCreds({ ...creds, password: e.target.value })} required placeholder="Min 6 characters" style={inp} />
            </div>
            <div>
              <label style={lbl}>Confirm Password *</label>
              <input type="password" value={creds.confirm} onChange={e => setCreds({ ...creds, confirm: e.target.value })} required placeholder="Repeat password" style={inp} />
            </div>
            <button type="submit" disabled={savingCreds} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', borderRadius: '10px', background: savingCreds ? 'rgba(74,144,217,0.5)' : 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)', border: 'none', color: '#000', fontWeight: '600', cursor: savingCreds ? 'not-allowed' : 'pointer', fontSize: '0.9375rem' }}>
              <Save size={16} /> {savingCreds ? 'Saving...' : 'Save Credentials'}
            </button>
          </form>
          <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', borderRadius: '10px', background: 'rgba(74,144,217,0.05)', border: '1px solid rgba(74,144,217,0.15)', fontSize: '0.8125rem', color: 'rgba(248,249,250,0.5)', lineHeight: '1.6' }}>
            Default credentials (from .env.local):<br />
            Email: <span style={{ color: '#4A90D9' }}>admin@gecouncil.com</span><br />
            Password: <span style={{ color: '#4A90D9' }}>admin123</span>
          </div>
        </div>
      )}
    </div>
  );
}
