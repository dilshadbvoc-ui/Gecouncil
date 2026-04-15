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
        background: 'linear-gradient(90deg, transparent, #4A90D9)',
      }} />
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#4A90D9',
        boxShadow: '0 0 20px rgba(74, 144, 217, 0.6)'
      }} />
      <div style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #4A90D9, #7BB8F0)',
        boxShadow: '0 0 25px rgba(74, 144, 217, 0.8)'
      }} />
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#4A90D9',
        boxShadow: '0 0 20px rgba(74, 144, 217, 0.6)'
      }} />
      <div style={{
        width: '60px',
        height: '1px',
        background: 'linear-gradient(90deg, #4A90D9, transparent)',
      }} />
    </div>
  );
}
