'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';

const PAGE_CONFIGS: Record<string, { label: string; fields: { key: string; label: string; type: 'text' | 'textarea'; placeholder?: string }[] }> = {
  home: {
    label: 'Home Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title', type: 'text', placeholder: 'CONNECTING GLOBAL EDUCATION TO INDIA' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', placeholder: 'We bridge the gap between...' },
      { key: 'heroCta', label: 'Hero CTA Button Text', type: 'text', placeholder: 'Explore Universities' },
      { key: 'statsStudents', label: 'Stat: Students', type: 'text', placeholder: '10,000+' },
      { key: 'statsUniversities', label: 'Stat: Universities', type: 'text', placeholder: '50+' },
      { key: 'statsCountries', label: 'Stat: Countries', type: 'text', placeholder: '15' },
      { key: 'statsYears', label: 'Stat: Years', type: 'text', placeholder: '10+' },
    ]
  },
  skill: {
    label: 'Skill Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title', type: 'text', placeholder: 'Skill Development' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', placeholder: 'Empowering individuals...' },
      { key: 'section1Title', label: 'Section 1 Title', type: 'text' },
      { key: 'section1Body', label: 'Section 1 Body', type: 'textarea' },
      { key: 'section2Title', label: 'Section 2 Title', type: 'text' },
      { key: 'section2Body', label: 'Section 2 Body', type: 'textarea' },
    ]
  },
  overseas: {
    label: 'Overseas Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title', type: 'text', placeholder: 'Overseas Education' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
      { key: 'section1Title', label: 'Section 1 Title', type: 'text' },
      { key: 'section1Body', label: 'Section 1 Body', type: 'textarea' },
      { key: 'section2Title', label: 'Section 2 Title', type: 'text' },
      { key: 'section2Body', label: 'Section 2 Body', type: 'textarea' },
    ]
  },
  recruitment: {
    label: 'Recruitment Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title', type: 'text', placeholder: 'Work in Europe. Live Your Dream.' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
      { key: 'statOpenings', label: 'Stat: Job Openings', type: 'text', placeholder: '1,200+' },
      { key: 'statCountries', label: 'Stat: Countries', type: 'text', placeholder: '18' },
      { key: 'statEmployers', label: 'Stat: Employers', type: 'text', placeholder: '500+' },
      { key: 'statVisa', label: 'Stat: Visa Success Rate', type: 'text', placeholder: '95%' },
    ]
  },
  about: {
    label: 'About Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title', type: 'text', placeholder: 'About Us' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
      { key: 'missionTitle', label: 'Mission Title', type: 'text', placeholder: 'Our Mission' },
      { key: 'missionBody', label: 'Mission Body', type: 'textarea' },
      { key: 'visionTitle', label: 'Vision Title', type: 'text', placeholder: 'Our Vision' },
      { key: 'visionBody', label: 'Vision Body', type: 'textarea' },
      { key: 'storyTitle', label: 'Our Story Title', type: 'text' },
      { key: 'storyBody', label: 'Our Story Body', type: 'textarea' },
    ]
  },
  contact: {
    label: 'Contact Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title', type: 'text', placeholder: 'Get In Touch' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
      { key: 'address', label: 'Address', type: 'textarea' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'hours', label: 'Office Hours', type: 'text', placeholder: 'Mon–Fri, 9am–6pm IST' },
    ]
  }
};

export default function PageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const config = PAGE_CONFIGS[slug];
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/pages?page=${slug}`)
      .then(r => r.json())
      .then(data => { setFormData(data); setLoading(false); });
  }, [slug]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/admin/pages?page=${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!config) return (
    <div style={{ padding: '2rem', color: '#ef4444' }}>Page &quot;{slug}&quot; not found.</div>
  );

  const inputBase: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
    border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(255,255,255,0.04)',
    color: '#F8F9FA', fontSize: '0.9375rem', outline: 'none',
    fontFamily: 'Inter, sans-serif', boxSizing: 'border-box'
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/dashboard">
          <button style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#D4AF37', fontFamily: 'Playfair Display, serif', flex: 1 }}>
          Edit: {config.label}
        </h1>
        <button onClick={handleSave} disabled={saving} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem 1.5rem', borderRadius: '10px',
          background: saved ? 'rgba(34,197,94,0.2)' : 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
          border: saved ? '1px solid rgba(34,197,94,0.5)' : 'none',
          color: saved ? '#22c55e' : '#000', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem'
        }}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}</>}
        </button>
      </div>

      {loading ? (
        <div style={{ color: '#D4AF37' }}>Loading...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {config.fields.map(field => (
            <div key={field.key} style={{ padding: '1.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.15)' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8125rem', fontWeight: '600', color: 'rgba(212,175,55,0.9)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  value={formData[field.key] || ''}
                  onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                  rows={4}
                  placeholder={field.placeholder}
                  style={{ ...inputBase, resize: 'vertical' }}
                />
              ) : (
                <input
                  type="text"
                  value={formData[field.key] || ''}
                  onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  style={inputBase}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
