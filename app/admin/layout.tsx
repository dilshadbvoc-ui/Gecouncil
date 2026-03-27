'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Building2, Users, Image, Mail,
  LogOut, Menu, X, Globe, Briefcase, BookOpen, Phone, Info
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/universities', label: 'Universities', icon: Building2 },
  { href: '/admin/programs', label: 'Programs', icon: BookOpen },
  { href: '/admin/directors', label: 'Directors', icon: Users },
  { href: '/admin/galleries', label: 'Galleries', icon: Image },
  { href: '/admin/enquiries', label: 'Enquiries', icon: Mail },
  { href: '/admin/pages/home', label: 'Home Page', icon: Globe },
  { href: '/admin/pages/skill', label: 'Skill Page', icon: BookOpen },
  { href: '/admin/pages/overseas', label: 'Overseas Page', icon: Globe },
  { href: '/admin/pages/recruitment', label: 'Recruitment Page', icon: Briefcase },
  { href: '/admin/pages/about', label: 'About Page', icon: Info },
  { href: '/admin/pages/contact', label: 'Contact Page', icon: Phone },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/admin/login') { setChecking(false); return; }
    const auth = localStorage.getItem('adminAuth');
    if (!auth) router.push('/admin/login');
    else setChecking(false);
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') return <>{children}</>;
  if (checking) return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37' }}>
      Loading...
    </div>
  );

  const sidebarStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, bottom: 0, width: '260px',
    background: 'rgba(0,0,0,0.97)', borderRight: '1px solid rgba(212,175,55,0.2)',
    display: 'flex', flexDirection: 'column', zIndex: 100,
    transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#F8F9FA' }}>
      {/* Sidebar */}
      <aside style={sidebarStyle} className="admin-sidebar">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#000', fontFamily: 'Playfair Display, serif', fontSize: '1.25rem' }}>G</div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#D4AF37', fontFamily: 'Playfair Display, serif' }}>GEC Admin</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(212,175,55,0.6)', letterSpacing: '0.1em' }}>CONTROL PANEL</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(248,249,250,0.5)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.75rem' }}>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href} onClick={() => setSidebarOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.625rem 0.875rem', borderRadius: '8px', marginBottom: '0.25rem',
                textDecoration: 'none', fontSize: '0.875rem', fontWeight: active ? '600' : '400',
                color: active ? '#000' : 'rgba(248,249,250,0.7)',
                background: active ? '#D4AF37' : 'transparent',
                transition: 'all 0.2s'
              }}>
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
          <button onClick={handleLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.625rem 0.875rem', borderRadius: '8px', background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', cursor: 'pointer', fontSize: '0.875rem'
          }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }} />
      )}

      {/* Top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.95)', borderBottom: '1px solid rgba(212,175,55,0.2)',
        padding: '0.875rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'
      }}>
        <button onClick={() => setSidebarOpen(true)} style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '8px', padding: '0.5rem', color: '#D4AF37', cursor: 'pointer', display: 'flex' }}>
          <Menu size={20} />
        </button>
        <span style={{ fontSize: '1rem', fontWeight: '600', color: '#D4AF37', fontFamily: 'Playfair Display, serif' }}>
          {navItems.find(n => pathname === n.href || pathname.startsWith(n.href + '/'))?.label || 'Admin'}
        </span>
        <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'rgba(248,249,250,0.4)' }}>
          Global Education Council
        </div>
      </header>

      <main style={{ padding: '1.5rem' }}>
        {children}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .admin-sidebar { transform: translateX(0) !important; }
          main { margin-left: 260px; }
          header { margin-left: 260px; }
        }
      `}} />
    </div>
  );
}
