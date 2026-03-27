'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Building2, Users, Image, Mail, Globe,
  BookOpen, Briefcase, Info, Phone, ArrowRight, Plus
} from 'lucide-react';

interface Stats { universities: number; directors: number; galleries: number; enquiries: number; newEnquiries: number; }

const sections = [
  { href: '/admin/universities', label: 'Universities', icon: Building2, color: '#60a5fa', desc: 'Add, edit, delete university listings' },
  { href: '/admin/directors', label: 'Directors', icon: Users, color: '#D4AF37', desc: 'Manage board of directors' },
  { href: '/admin/galleries', label: 'Galleries', icon: Image, color: '#a855f7', desc: 'Page image galleries' },
  { href: '/admin/enquiries', label: 'Enquiries', icon: Mail, color: '#22c55e', desc: 'Partnership enquiries' },
  { href: '/admin/pages/home', label: 'Home Page', icon: Globe, color: '#f97316', desc: 'Edit hero, stats, content' },
  { href: '/admin/pages/skill', label: 'Skill Page', icon: BookOpen, color: '#06b6d4', desc: 'Edit skill page content' },
  { href: '/admin/pages/overseas', label: 'Overseas Page', icon: Globe, color: '#8b5cf6', desc: 'Edit overseas page content' },
  { href: '/admin/pages/recruitment', label: 'Recruitment Page', icon: Briefcase, color: '#ec4899', desc: 'Edit recruitment content' },
  { href: '/admin/pages/about', label: 'About Page', icon: Info, color: '#14b8a6', desc: 'Edit about page content' },
  { href: '/admin/pages/contact', label: 'Contact Page', icon: Phone, color: '#f59e0b', desc: 'Edit contact info' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ universities: 0, directors: 0, galleries: 0, enquiries: 0, newEnquiries: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/universities').then(r => r.json()),
      fetch('/api/directors').then(r => r.json()),
      fetch('/api/galleries').then(r => r.json()),
      fetch('/api/enquiries').then(r => r.json()),
    ]).then(([unis, dirs, gals, enqs]) => {
      setStats({
        universities: Array.isArray(unis) ? unis.length : 0,
        directors: Array.isArray(dirs) ? dirs.length : 0,
        galleries: Array.isArray(gals) ? gals.length : 0,
        enquiries: Array.isArray(enqs) ? enqs.length : 0,
        newEnquiries: Array.isArray(enqs) ? enqs.filter((e: { status: string }) => e.status === 'new').length : 0,
      });
    }).catch(() => {});
  }, []);

  const statCards = [
    { label: 'Universities', value: stats.universities, color: '#60a5fa' },
    { label: 'Directors', value: stats.directors, color: '#D4AF37' },
    { label: 'Galleries', value: stats.galleries, color: '#a855f7' },
    { label: 'New Enquiries', value: stats.newEnquiries, color: '#22c55e' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '700', color: '#D4AF37', fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>
          Welcome back
        </h1>
        <p style={{ color: 'rgba(248,249,250,0.5)', fontSize: '0.9rem' }}>Manage all content for the Global Education Council website.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {statCards.map(s => (
          <div key={s.label} style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${s.color}33` }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: s.color, fontFamily: 'Playfair Display, serif' }}>{s.value}</div>
            <div style={{ fontSize: '0.8125rem', color: 'rgba(248,249,250,0.5)', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '1rem', fontWeight: '600', color: 'rgba(248,249,250,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
        Manage Content
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {sections.map(({ href, label, icon: Icon, color, desc }) => (
          <Link key={href} href={href} style={{ textDecoration: 'none' }}>
            <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: color + '1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <ArrowRight size={16} style={{ color: 'rgba(248,249,250,0.3)' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#F8F9FA', marginBottom: '0.25rem' }}>{label}</div>
                <div style={{ fontSize: '0.8125rem', color: 'rgba(248,249,250,0.45)' }}>{desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '2.5rem', padding: '1.5rem', borderRadius: '14px', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: '600', color: '#D4AF37' }}>Add a new university</div>
          <div style={{ fontSize: '0.8125rem', color: 'rgba(248,249,250,0.5)' }}>Quickly add a new partner university to the listings</div>
        </div>
        <Link href="/admin/universities/new">
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '10px', background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)', border: 'none', color: '#000', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem' }}>
            <Plus size={16} /> Add University
          </button>
        </Link>
      </div>
    </div>
  );
}
