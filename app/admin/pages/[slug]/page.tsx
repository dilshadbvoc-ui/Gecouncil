'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

type FieldType = 'text' | 'textarea' | 'image';

interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  hint?: string;
}

const PAGE_CONFIGS: Record<string, { label: string; fields: FieldConfig[] }> = {
  home: {
    label: 'Home Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title (Line 1)', type: 'text', placeholder: 'CONNECTING' },
      { key: 'heroTitleLine2', label: 'Hero Title (Line 2)', type: 'text', placeholder: 'GLOBAL EDUCATION' },
      { key: 'heroTitleLine3', label: 'Hero Title (Line 3)', type: 'text', placeholder: 'TO INDIA' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', placeholder: 'Every student deserves a chance to dream bigger...' },
      { key: 'heroCta', label: 'Hero CTA Button', type: 'text', placeholder: 'Partner With Us' },
      { key: 'heroTag1', label: 'Hero Tag 1', type: 'text', placeholder: 'Study Close to Home' },
      { key: 'heroTag2', label: 'Hero Tag 2', type: 'text', placeholder: 'Your Family, Your Future' },
      { key: 'heroTag3', label: 'Hero Tag 3', type: 'text', placeholder: 'Dreams Within Reach' },
      { key: 'heroCard1Label', label: 'Feature Card 1 Label', type: 'text', placeholder: 'UNIVERSITY NETWORK' },
      { key: 'heroCard1Title', label: 'Feature Card 1 Title', type: 'text', placeholder: 'EUROPEAN EDUCATION IN INDIA' },
      { key: 'heroCard2Label', label: 'Feature Card 2 Label', type: 'text', placeholder: 'LOCAL DELIVERY' },
      { key: 'heroCard3Label', label: 'Feature Card 3 Label', type: 'text', placeholder: 'LIVES TRANSFORMED' },
      { key: 'heroCard3Number', label: 'Feature Card 3 Number', type: 'text', placeholder: '1000+' },
      { key: 'whyTitle', label: '"Why This Matters" Section Title', type: 'text', placeholder: 'Why This Matters' },
      { key: 'whySubtitle', label: '"Why This Matters" Subtitle', type: 'textarea' },
      { key: 'why1Title', label: 'Why Card 1 Title', type: 'text', placeholder: 'Stay Close to Home' },
      { key: 'why1Body', label: 'Why Card 1 Body', type: 'textarea' },
      { key: 'why2Title', label: 'Why Card 2 Title', type: 'text', placeholder: 'Your Community Matters' },
      { key: 'why2Body', label: 'Why Card 2 Body', type: 'textarea' },
      { key: 'why3Title', label: 'Why Card 3 Title', type: 'text', placeholder: 'Education That Fits Your Life' },
      { key: 'why3Body', label: 'Why Card 3 Body', type: 'textarea' },
      { key: 'why4Title', label: 'Why Card 4 Title', type: 'text', placeholder: 'Your Success, Our Promise' },
      { key: 'why4Body', label: 'Why Card 4 Body', type: 'textarea' },
      { key: 'journeyTitle', label: '"Your Journey" Section Title', type: 'text', placeholder: 'Your Journey With Us' },
      { key: 'journeySubtitle', label: '"Your Journey" Subtitle', type: 'textarea' },
      { key: 'journey1Title', label: 'Journey Step 1 Title', type: 'text', placeholder: 'Share Your Dreams' },
      { key: 'journey1Body', label: 'Journey Step 1 Body', type: 'textarea' },
      { key: 'journey2Title', label: 'Journey Step 2 Title', type: 'text', placeholder: 'Find Your Perfect Fit' },
      { key: 'journey2Body', label: 'Journey Step 2 Body', type: 'textarea' },
      { key: 'journey3Title', label: 'Journey Step 3 Title', type: 'text', placeholder: 'Start Your Journey' },
      { key: 'journey3Body', label: 'Journey Step 3 Body', type: 'textarea' },
      { key: 'journey4Title', label: 'Journey Step 4 Title', type: 'text', placeholder: 'Grow and Succeed' },
      { key: 'journey4Body', label: 'Journey Step 4 Body', type: 'textarea' },
      { key: 'stat1Number', label: 'Stat 1 Number', type: 'text', placeholder: '100+' },
      { key: 'stat1Label', label: 'Stat 1 Label', type: 'text', placeholder: 'Universities Believe in Us' },
      { key: 'stat2Number', label: 'Stat 2 Number', type: 'text', placeholder: '10,000+' },
      { key: 'stat2Label', label: 'Stat 2 Label', type: 'text', placeholder: "Dreams We've Supported" },
      { key: 'stat3Number', label: 'Stat 3 Number', type: 'text', placeholder: '25+' },
      { key: 'stat3Label', label: 'Stat 3 Label', type: 'text', placeholder: 'Countries Connected' },
      { key: 'stat4Number', label: 'Stat 4 Number', type: 'text', placeholder: '95%' },
      { key: 'stat4Label', label: 'Stat 4 Label', type: 'text', placeholder: 'Students Achieving Their Goals' },
      { key: 'ctaTitle', label: 'CTA Section Title', type: 'text', placeholder: 'Ready to Start Your Journey?' },
      { key: 'ctaSubtitle', label: 'CTA Subtitle', type: 'textarea' },
      { key: 'ctaButton', label: 'CTA Button Text', type: 'text', placeholder: 'Talk to Us Today' },
    ]
  },
  skill: {
    label: 'Skill Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title', type: 'text', placeholder: 'Skill Development' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', placeholder: 'Industry-aligned programs...' },
      { key: 'ctaTitle', label: 'CTA Section Title', type: 'text', placeholder: 'Ready to upskill?' },
      { key: 'ctaSubtitle', label: 'CTA Subtitle', type: 'textarea' },
    ]
  },
  overseas: {
    label: 'Overseas Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title', type: 'text', placeholder: 'Study Abroad' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
      { key: 'countriesSectionTitle', label: 'Countries Section Title', type: 'text', placeholder: 'Study Destinations' },
      { key: 'countriesSectionSubtitle', label: 'Countries Section Subtitle', type: 'text' },
      { key: 'ctaTitle', label: 'CTA Section Title', type: 'text', placeholder: 'Start your journey abroad' },
      { key: 'ctaSubtitle', label: 'CTA Subtitle', type: 'textarea' },
    ]
  },
  recruitment: {
    label: 'Recruitment Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title Line 1', type: 'text', placeholder: 'Work in Europe.' },
      { key: 'heroTitleAccent', label: 'Hero Title Line 2 (accent)', type: 'text', placeholder: 'Live Your Dream.' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
      { key: 'heroCta', label: 'Hero CTA Button', type: 'text', placeholder: 'Apply Now' },
      { key: 'statOpenings', label: 'Stat: Job Openings', type: 'text', placeholder: '1,200+' },
      { key: 'statOpeningsLabel', label: 'Stat: Job Openings Label', type: 'text', placeholder: 'Active Job Openings' },
      { key: 'statCountries', label: 'Stat: Countries', type: 'text', placeholder: '18' },
      { key: 'statCountriesLabel', label: 'Stat: Countries Label', type: 'text', placeholder: 'European Countries' },
      { key: 'statEmployers', label: 'Stat: Employers', type: 'text', placeholder: '500+' },
      { key: 'statEmployersLabel', label: 'Stat: Employers Label', type: 'text', placeholder: 'Partner Employers' },
      { key: 'statVisa', label: 'Stat: Visa Success Rate', type: 'text', placeholder: '95%' },
      { key: 'statVisaLabel', label: 'Stat: Visa Label', type: 'text', placeholder: 'Visa Success Rate' },
      { key: 'howTitle', label: '"How It Works" Title', type: 'text', placeholder: 'How It Works' },
      { key: 'howSubtitle', label: '"How It Works" Subtitle', type: 'text' },
      { key: 'step1Title', label: 'Step 1 Title', type: 'text', placeholder: 'Register Your Profile' },
      { key: 'step1Body', label: 'Step 1 Body', type: 'textarea' },
      { key: 'step2Title', label: 'Step 2 Title', type: 'text', placeholder: 'Skills Assessment' },
      { key: 'step2Body', label: 'Step 2 Body', type: 'textarea' },
      { key: 'step3Title', label: 'Step 3 Title', type: 'text', placeholder: 'Interview & Offer' },
      { key: 'step3Body', label: 'Step 3 Body', type: 'textarea' },
      { key: 'step4Title', label: 'Step 4 Title', type: 'text', placeholder: 'Visa & Relocation' },
      { key: 'step4Body', label: 'Step 4 Body', type: 'textarea' },
      { key: 'ctaTitle', label: 'CTA Title', type: 'text', placeholder: 'Ready to Work Abroad?' },
      { key: 'ctaSubtitle', label: 'CTA Subtitle', type: 'textarea' },
    ]
  },
  about: {
    label: 'About Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title', type: 'text', placeholder: 'About Global Education Council' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', placeholder: 'We started with a simple belief...' },
      { key: 'missionTitle', label: 'Mission Card Title', type: 'text', placeholder: 'Our Heart' },
      { key: 'missionBody', label: 'Mission Card Body', type: 'textarea' },
      { key: 'visionTitle', label: 'Vision Card Title', type: 'text', placeholder: 'Our Dream' },
      { key: 'visionBody', label: 'Vision Card Body', type: 'textarea' },
      { key: 'howTitle', label: '"How We Help" Section Title', type: 'text', placeholder: 'How We Help You' },
      { key: 'help1Title', label: 'Help Item 1 Title', type: 'text', placeholder: 'We Listen to Your Story' },
      { key: 'help1Body', label: 'Help Item 1 Body', type: 'textarea' },
      { key: 'help2Title', label: 'Help Item 2 Title', type: 'text', placeholder: 'We Find Your Path' },
      { key: 'help2Body', label: 'Help Item 2 Body', type: 'textarea' },
      { key: 'help3Title', label: 'Help Item 3 Title', type: 'text', placeholder: 'We Walk Beside You' },
      { key: 'help3Body', label: 'Help Item 3 Body', type: 'textarea' },
      { key: 'help4Title', label: 'Help Item 4 Title', type: 'text', placeholder: 'We Keep Our Promise' },
      { key: 'help4Body', label: 'Help Item 4 Body', type: 'textarea' },
      { key: 'trustTitle', label: '"Why Families Trust Us" Title', type: 'text', placeholder: 'Why Families Trust Us' },
      { key: 'trust1', label: 'Trust Card 1 Text', type: 'textarea' },
      { key: 'trust2', label: 'Trust Card 2 Text', type: 'textarea' },
      { key: 'trust3', label: 'Trust Card 3 Text', type: 'textarea' },
      { key: 'trust4', label: 'Trust Card 4 Text', type: 'textarea' },
      { key: 'leadersTitle', label: 'Leadership Section Title', type: 'text', placeholder: 'Our Leadership Team' },
      { key: 'leadersSubtitle', label: 'Leadership Section Subtitle', type: 'textarea' },
      { key: 'partnersTitle', label: 'Partners Section Title', type: 'text', placeholder: 'Our European Partners' },
      { key: 'partnersSubtitle', label: 'Partners Section Subtitle', type: 'textarea' },
    ]
  },
  contact: {
    label: 'Contact Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title', type: 'text', placeholder: 'Get In Touch' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', placeholder: 'Ready to partner with us?...' },
      { key: 'contactInfoTitle', label: 'Contact Info Section Title', type: 'text', placeholder: 'Contact Information' },
      { key: 'formTitle', label: 'Form Section Title', type: 'text', placeholder: 'Send Us a Message' },
      { key: 'networkTitle', label: 'Network Section Title', type: 'text', placeholder: 'Our Global Network' },
      { key: 'networkSubtitle', label: 'Network Section Subtitle', type: 'text' },
      { key: 'partnersTitle', label: 'Partner Countries Title', type: 'text', placeholder: 'Partner Countries' },
      { key: 'partnersSubtitle', label: 'Partner Countries Subtitle', type: 'text' },
    ]
  },
  programs: {
    label: 'Programs Page',
    fields: [
      { key: 'heroTitle', label: 'Hero Title', type: 'text', placeholder: 'Study Programs' },
      { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', placeholder: 'European-standard programs...' },
      { key: 'prog1Title', label: 'Program 1 Title', type: 'text', placeholder: 'Business & Management' },
      { key: 'prog1Duration', label: 'Program 1 Duration', type: 'text', placeholder: '1-2 years' },
      { key: 'prog1Tuition', label: 'Program 1 Tuition', type: 'text', placeholder: '€15,000 - €30,000' },
      { key: 'prog1Universities', label: 'Program 1 Universities Count', type: 'text', placeholder: '45' },
      { key: 'prog1Popular', label: 'Program 1 Specializations (comma-separated)', type: 'text', placeholder: 'MBA, International Business, Finance' },
      { key: 'prog2Title', label: 'Program 2 Title', type: 'text', placeholder: 'Engineering & Technology' },
      { key: 'prog2Duration', label: 'Program 2 Duration', type: 'text', placeholder: '2-4 years' },
      { key: 'prog2Tuition', label: 'Program 2 Tuition', type: 'text', placeholder: '€10,000 - €25,000' },
      { key: 'prog2Universities', label: 'Program 2 Universities Count', type: 'text', placeholder: '38' },
      { key: 'prog2Popular', label: 'Program 2 Specializations (comma-separated)', type: 'text', placeholder: 'Computer Science, Data Science, AI & ML' },
      { key: 'prog3Title', label: 'Program 3 Title', type: 'text', placeholder: 'Medicine & Healthcare' },
      { key: 'prog3Duration', label: 'Program 3 Duration', type: 'text', placeholder: '4-6 years' },
      { key: 'prog3Tuition', label: 'Program 3 Tuition', type: 'text', placeholder: '€20,000 - €50,000' },
      { key: 'prog3Universities', label: 'Program 3 Universities Count', type: 'text', placeholder: '22' },
      { key: 'prog3Popular', label: 'Program 3 Specializations (comma-separated)', type: 'text', placeholder: 'Medicine, Nursing, Public Health' },
      { key: 'prog4Title', label: 'Program 4 Title', type: 'text', placeholder: 'Arts & Humanities' },
      { key: 'prog4Duration', label: 'Program 4 Duration', type: 'text', placeholder: '1-3 years' },
      { key: 'prog4Tuition', label: 'Program 4 Tuition', type: 'text', placeholder: '€8,000 - €20,000' },
      { key: 'prog4Universities', label: 'Program 4 Universities Count', type: 'text', placeholder: '35' },
      { key: 'prog4Popular', label: 'Program 4 Specializations (comma-separated)', type: 'text', placeholder: 'Psychology, International Relations, Design' },
      { key: 'uniSectionTitle', label: 'University Section Title', type: 'text', placeholder: 'Available at Top Universities' },
      { key: 'uniSectionSubtitle', label: 'University Section Subtitle', type: 'text' },
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
      .then(data => { setFormData(data || {}); setLoading(false); });
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
    <div style={{ padding: '2rem', color: '#ef4444' }}>Page &quot;{slug}&quot; not found in config.</div>
  );

  const inputBase: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
    border: '1px solid rgba(74,144,217,0.3)', background: 'rgba(255,255,255,0.04)',
    color: '#F8F9FA', fontSize: '0.9375rem', outline: 'none',
    fontFamily: 'Inter, sans-serif', boxSizing: 'border-box'
  };

  return (
    <div style={{ maxWidth: '860px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link href="/admin/dashboard">
          <button style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.3)', color: '#4A90D9', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4A90D9', fontFamily: 'Playfair Display, serif', flex: 1 }}>
          Edit: {config.label}
        </h1>
        <button onClick={handleSave} disabled={saving} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem 1.5rem', borderRadius: '10px',
          background: saved ? 'rgba(34,197,94,0.2)' : 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)',
          border: saved ? '1px solid rgba(34,197,94,0.5)' : 'none',
          color: saved ? '#22c55e' : '#000', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem'
        }}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}</>}
        </button>
      </div>

      <div style={{ marginBottom: '1.5rem', padding: '0.875rem 1rem', borderRadius: '8px', background: 'rgba(74,144,217,0.06)', border: '1px solid rgba(74,144,217,0.2)', fontSize: '0.8125rem', color: 'rgba(248,249,250,0.6)' }}>
        Leave any field blank to use the default hardcoded value. Changes take effect immediately after saving.
      </div>

      {loading ? (
        <div style={{ color: '#4A90D9' }}>Loading...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {config.fields.map(field => (
            <div key={field.key} style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,144,217,0.12)' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '700', color: 'rgba(74,144,217,0.9)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {field.label}
              </label>
              {field.hint && <p style={{ fontSize: '0.75rem', color: 'rgba(248,249,250,0.4)', marginBottom: '0.5rem' }}>{field.hint}</p>}
              {field.type === 'image' ? (
                <ImageUpload
                  label=""
                  value={formData[field.key] || ''}
                  onChange={url => setFormData({ ...formData, [field.key]: url })}
                />
              ) : field.type === 'textarea' ? (
                <textarea
                  value={formData[field.key] || ''}
                  onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                  rows={3}
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
