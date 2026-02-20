'use client';

import { useState } from 'react';
import { X, Send } from 'lucide-react';

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnershipModal({ isOpen, onClose }: PartnershipModalProps) {
  const [formData, setFormData] = useState({
    universityName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log('PartnershipModal render - isOpen:', isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'partnership',
          ...formData
        })
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({
            universityName: '',
            contactPerson: '',
            email: '',
            phone: '',
            country: '',
            message: ''
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to submit enquiry:', error);
      alert('Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(212, 175, 55, 0.1) 100%)',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        borderRadius: '20px',
        padding: '2rem',
        position: 'relative',
        animation: 'slideUp 0.3s ease-out'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: '0.5rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: '#D4AF37',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#D4AF37',
          marginBottom: '0.5rem',
          fontFamily: 'Playfair Display, serif'
        }}>
          Partner With Us
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'rgba(248, 249, 250, 0.7)',
          marginBottom: '2rem'
        }}>
          Join our network of world-class universities bringing education to India
        </p>

        {success ? (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            borderRadius: '12px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#22c55e', marginBottom: '0.5rem' }}>
              Thank You!
            </h3>
            <p style={{ color: 'rgba(248, 249, 250, 0.7)' }}>
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.9)'
              }}>
                University Name *
              </label>
              <input
                type="text"
                value={formData.universityName}
                onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                required
                placeholder="e.g., University of Excellence"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#F8F9FA',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'rgba(248, 249, 250, 0.9)'
                }}>
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  required
                  placeholder="Your name"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'rgba(248, 249, 250, 0.9)'
                }}>
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g., Netherlands"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'rgba(248, 249, 250, 0.9)'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'rgba(248, 249, 250, 0.9)'
                }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+31 123 456 789"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#F8F9FA',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgba(248, 249, 250, 0.9)'
              }}>
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                placeholder="Tell us about your university and partnership interests..."
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#F8F9FA',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem',
                borderRadius: '12px',
                background: submitting ? 'rgba(212, 175, 55, 0.5)' : 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
                border: 'none',
                color: '#000000',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <Send size={18} />
              {submitting ? 'Sending...' : 'Submit Partnership Request'}
            </button>
          </form>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
    </div>
  );
}
