'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import PartnershipModal from './PartnershipModal';

export default function ModernNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          textDecoration: 'none'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            background: '#000000',
            border: '2px solid #D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#D4AF37',
            fontSize: '1.5rem',
            fontFamily: 'Playfair Display, serif'
          }}>
            G
          </div>
          <div>
            <div style={{
              fontSize: '1.125rem',
              fontWeight: '700',
              color: '#D4AF37',
              lineHeight: '1.2',
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-0.02em'
            }}>
              Global Education Council
            </div>
            <div style={{
              fontSize: '0.625rem',
              color: 'rgba(212, 175, 55, 0.7)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}>
              Excellence in Education
            </div>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div style={{
          display: 'none',
          gap: '0.25rem',
          alignItems: 'center'
        }} className="desktop-nav">
          <NavLink href="/" active={isActive('/')}>Home</NavLink>
          <NavLink href="/skill" active={isActive('/skill')}>Skill</NavLink>
          <NavLink href="/overseas" active={isActive('/overseas')}>Overseas</NavLink>
          <NavLink href="/recruitment" active={isActive('/recruitment')}>Recruitment</NavLink>
          <NavLink href="/about" active={isActive('/about')}>About</NavLink>
          <NavLink href="/contact" active={isActive('/contact')}>Contact</NavLink>
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: 'none',
          gap: '0.75rem',
          alignItems: 'center'
        }} className="desktop-nav">
          <Link href="/admin/login" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '0.625rem 1.5rem',
              borderRadius: '8px',
              border: '1.5px solid #D4AF37',
              backgroundColor: 'transparent',
              color: '#D4AF37',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '0.01em'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#D4AF37';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#D4AF37';
            }}>
              For Universities
            </button>
          </Link>
          <button style={{
            padding: '0.625rem 1.5rem',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
            border: 'none',
            color: '#000000',
            fontSize: '0.875rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            letterSpacing: '0.01em',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
          }}
          onClick={() => {
            console.log('Partner button clicked');
            setShowPartnershipModal(true);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
          }}>
            Partner With Us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'block',
            padding: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'white'
          }}
          className="mobile-menu-btn"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '1.5rem 2rem'
        }} className="mobile-menu">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <MobileNavLink href="/" active={isActive('/')} onClick={() => setIsOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/skill" active={isActive('/skill')} onClick={() => setIsOpen(false)}>
              Skill
            </MobileNavLink>
            <MobileNavLink href="/overseas" active={isActive('/overseas')} onClick={() => setIsOpen(false)}>
              Overseas
            </MobileNavLink>
            <MobileNavLink href="/recruitment" active={isActive('/recruitment')} onClick={() => setIsOpen(false)}>
              Recruitment
            </MobileNavLink>
            <MobileNavLink href="/about" active={isActive('/about')} onClick={() => setIsOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="/contact" active={isActive('/contact')} onClick={() => setIsOpen(false)}>
              Contact
            </MobileNavLink>
            <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link href="/admin/login" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1.5px solid #D4AF37',
                  backgroundColor: 'transparent',
                  color: '#D4AF37',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  For Universities
                </button>
              </Link>
              <button style={{
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                border: 'none',
                color: '#000000',
                fontSize: '0.875rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
              onClick={() => {
                console.log('Mobile partner button clicked');
                setIsOpen(false);
                setShowPartnershipModal(true);
              }}>
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      )}

      <PartnershipModal isOpen={showPartnershipModal} onClose={() => setShowPartnershipModal(false)} />

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}} />
    </nav>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        padding: '0.625rem 1.125rem',
        borderRadius: '8px',
        color: active ? '#000000' : 'rgba(255, 255, 255, 0.85)',
        backgroundColor: active ? '#D4AF37' : 'transparent',
        fontSize: '0.9375rem',
        fontWeight: active ? '600' : '500',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        letterSpacing: '0.01em'
      }}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, active, onClick, children }: { href: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        padding: '0.875rem 1rem',
        borderRadius: '8px',
        color: active ? '#000000' : 'rgba(255, 255, 255, 0.85)',
        backgroundColor: active ? '#D4AF37' : 'rgba(255, 255, 255, 0.05)',
        fontSize: '0.9375rem',
        fontWeight: active ? '600' : '500',
        textDecoration: 'none',
        border: active ? 'none' : '1px solid rgba(212, 175, 55, 0.2)'
      }}
    >
      {children}
    </Link>
  );
}
