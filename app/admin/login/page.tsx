'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        localStorage.setItem('adminAuth', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.875rem 1rem 0.875rem 3rem',
    borderRadius: '12px', border: '1px solid rgba(212,175,55,0.3)',
    background: 'rgba(255,255,255,0.05)', color: '#F8F9FA',
    fontSize: '1rem', outline: 'none', boxSizing: 'border-box'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{
        maxWidth: '400px', width: '100%', padding: '2.5rem', borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(212,175,55,0.1) 100%)',
        border: '1px solid rgba(212,175,55,0.3)', backdropFilter: 'blur(20px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem', fontSize: '1.5rem', fontWeight: 'bold',
            color: '#000000', fontFamily: 'Playfair Display, serif'
          }}>G</div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>
            Admin Login
          </h1>
          <p style={{ color: 'rgba(248,249,250,0.7)', fontSize: '0.875rem' }}>Global Education Council</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {error && (
            <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgba(248,249,250,0.7)' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#D4AF37' }} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@gecouncil.com" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgba(248,249,250,0.7)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#D4AF37' }} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" style={inputStyle} />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            padding: '1rem', borderRadius: '12px',
            background: loading ? 'rgba(212,175,55,0.5)' : 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
            border: 'none', color: '#000000', fontSize: '1rem', fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s'
          }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
