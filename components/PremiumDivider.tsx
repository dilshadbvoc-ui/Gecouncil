'use client';

export default function PremiumDivider() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: '2rem 0',
      opacity: 0.6
    }}>
      <div style={{
        width: '60px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #D4AF37)',
      }} />
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#D4AF37',
        boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)'
      }} />
      <div style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #D4AF37, #F4E4C1)',
        boxShadow: '0 0 25px rgba(212, 175, 55, 0.8)'
      }} />
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#D4AF37',
        boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)'
      }} />
      <div style={{
        width: '60px',
        height: '1px',
        background: 'linear-gradient(90deg, #D4AF37, transparent)',
      }} />
    </div>
  );
}
