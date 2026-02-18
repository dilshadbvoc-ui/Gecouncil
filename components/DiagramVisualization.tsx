'use client';

import { useEffect, useState } from 'react';
import { Building2, Users, Globe, GraduationCap } from 'lucide-react';

export default function DiagramVisualization() {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: Globe, label: 'European Universities', color: '#60a5fa', position: 'top' },
    { icon: Building2, label: 'Programs in India', color: '#a78bfa', position: 'right' },
    { icon: Users, label: 'Indian Students', color: '#f472b6', position: 'bottom' },
    { icon: GraduationCap, label: 'Lives Transformed', color: '#fbbf24', position: 'left' },
  ];

  const centerSize = isMobile ? 70 : 100;
  const nodeSize = isMobile ? 60 : 85;
  const radius = isMobile ? 100 : 140;
  const iconSize = isMobile ? 24 : 32;
  const fontSize = isMobile ? '0.6rem' : '0.7rem';
  const centerFontSize = isMobile ? '1.25rem' : '1.5rem';

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes flow {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
      `}} />
      
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: isMobile ? '1rem' : '2rem'
      }}>
        {/* Central Hub - GEC Logo */}
        <div style={{
          position: 'absolute',
          width: `${centerSize}px`,
          height: `${centerSize}px`,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 40px rgba(167, 139, 250, 0.5)',
          zIndex: 10,
          border: '3px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            fontSize: centerFontSize,
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Space Grotesk, sans-serif'
          }}>GEC</div>
          <div style={{
            fontSize: isMobile ? '0.4rem' : '0.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginTop: '0.25rem'
          }}>HUB</div>
        </div>

        {/* Connection Network */}
        <svg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 1
          }}
          viewBox="-200 -200 400 400"
        >
          {/* Connection Lines */}
          {steps.map((step, index) => {
            const angle = (index * 90) * (Math.PI / 180);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = activeStep === index;

            return (
              <g key={index}>
                <line
                  x1="0"
                  y1="0"
                  x2={x}
                  y2={y}
                  stroke={isActive ? step.color : 'rgba(255, 255, 255, 0.15)'}
                  strokeWidth={isActive ? (isMobile ? '2' : '3') : (isMobile ? '1.5' : '2')}
                  strokeDasharray="10,5"
                  style={{
                    transition: 'all 0.5s ease',
                    animation: isActive ? 'flow 2s linear infinite' : 'none'
                  }}
                />
                {isActive && (
                  <>
                    <circle
                      cx={x * 0.3}
                      cy={y * 0.3}
                      r={isMobile ? '4' : '5'}
                      fill={step.color}
                      style={{ animation: 'pulse 1s infinite' }}
                    />
                    <circle
                      cx={x * 0.6}
                      cy={y * 0.6}
                      r={isMobile ? '3' : '4'}
                      fill={step.color}
                      opacity="0.7"
                      style={{ animation: 'pulse 1s infinite 0.3s' }}
                    />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Orbiting Nodes */}
        {steps.map((step, index) => {
          const angle = (index * 90) * (Math.PI / 180);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const Icon = step.icon;
          const isActive = activeStep === index;

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isActive ? 1.15 : 1})`,
                transition: 'all 0.5s ease',
                zIndex: 5
              }}
            >
              <div style={{
                width: `${nodeSize}px`,
                height: `${nodeSize}px`,
                borderRadius: '50%',
                backgroundColor: isActive ? step.color : 'rgba(255, 255, 255, 0.08)',
                border: `${isMobile ? '2px' : '3px'} solid ${isActive ? step.color : 'rgba(255, 255, 255, 0.2)'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                boxShadow: isActive ? `0 15px 40px ${step.color}90` : '0 5px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.5s ease'
              }}>
                <Icon style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  color: isActive ? 'white' : 'rgba(255, 255, 255, 0.6)',
                  transition: 'all 0.5s ease',
                  marginBottom: '0.25rem'
                }} />
              </div>
              <div style={{
                marginTop: '0.5rem',
                textAlign: 'center',
                fontSize: fontSize,
                fontWeight: '600',
                color: isActive ? step.color : 'rgba(255, 255, 255, 0.6)',
                transition: 'all 0.5s ease',
                maxWidth: isMobile ? '70px' : '100px',
                lineHeight: '1.2'
              }}>
                {step.label}
              </div>
            </div>
          );
        })}

        {/* Animated Orbital Rings */}
        <div style={{
          position: 'absolute',
          width: isMobile ? '230px' : '320px',
          height: isMobile ? '230px' : '320px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          animation: 'rotate 25s linear infinite'
        }} />
        <div style={{
          position: 'absolute',
          width: isMobile ? '260px' : '360px',
          height: isMobile ? '260px' : '360px',
          borderRadius: '50%',
          border: '1px dashed rgba(255, 255, 255, 0.05)',
          animation: 'rotate 35s linear infinite reverse'
        }} />
      </div>
    </>
  );
}
