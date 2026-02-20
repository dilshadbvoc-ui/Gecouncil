import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from 'sonner';

import Navigation from './components/Navigation';
import HeroSection from '../components/sections/HeroSection';
import FeatureSection from '../components/sections/FeatureSection';
import DashboardSection from '../components/sections/DashboardSection';
import ProgramFinderSection from '../components/sections/ProgramFinderSection';
import RoadmapSection from '../components/sections/RoadmapSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

// Feature sections data
const featureSections = [
  {
    id: 'counseling',
    headline: 'Personalized guidance that puts you first.',
    body: 'We match your goals, grades, and budget to universities where you\'ll thrive—then build a plan to get you in.',
    pillLabel: 'COUNSELING',
    pillValue: '1:1 sessions • University shortlisting • Application strategy',
    imageSrc: '/images/feature_counseling_student.jpg',
    imageAlt: 'Student receiving counseling',
    layout: 'image-left' as const,
    zIndex: 20
  },
  {
    id: 'support',
    headline: 'Support that travels with you.',
    body: 'From first questions to final enrollment, our team is a message away—clear, kind, and fast.',
    pillLabel: 'AVAILABILITY',
    pillValue: 'WhatsApp / Email • 24–48h response • Document checklists',
    imageSrc: '/images/feature_support_student.jpg',
    imageAlt: 'Student with support',
    layout: 'image-right' as const,
    zIndex: 30
  },
  {
    id: 'planning',
    headline: 'Deadlines, documents, details—handled.',
    body: 'We map out every milestone so nothing slips through. You stay focused; we keep the plan on track.',
    pillLabel: 'PLANNING',
    pillValue: 'Timeline builder • Task reminders • Deadline alerts',
    imageSrc: '/images/feature_planning_student.jpg',
    imageAlt: 'Student planning',
    layout: 'image-left' as const,
    zIndex: 40
  },
  {
    id: 'community',
    headline: 'A community that gets it.',
    body: 'Connect with peers, mentors, and alumni who\'ve walked the same path—so you\'re never figuring it out alone.',
    pillLabel: 'COMMUNITY',
    pillValue: 'Peer groups • Alumni mentors • Campus meetups',
    imageSrc: '/images/feature_community_group.jpg',
    imageAlt: 'Student community',
    layout: 'image-right' as const,
    zIndex: 50
  }
];

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection />
        
        {/* Sections 2-5: Feature Sections */}
        {featureSections.map((section) => (
          <FeatureSection
            key={section.id}
            {...section}
          />
        ))}
        
        {/* Section 6: Dashboard */}
        <DashboardSection />
        
        {/* Section 7: Program Finder (Flowing) */}
        <ProgramFinderSection />
        
        {/* Section 8: Roadmap (Flowing) */}
        <RoadmapSection />
        
        {/* Section 9: Testimonials (Flowing) */}
        <TestimonialsSection />
        
        {/* Section 10: Contact (Flowing) */}
        <ContactSection />
      </main>
      
      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#0B0C10',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      />
    </div>
  );
}

export default App;
