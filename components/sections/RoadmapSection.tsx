import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, List, FileEdit, Scale, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Tell us your goals.',
    icon: Search
  },
  {
    number: '02',
    title: 'Shortlist',
    description: 'Match universities & programs.',
    icon: List
  },
  {
    number: '03',
    title: 'Apply',
    description: 'Documents, essays, submissions.',
    icon: FileEdit
  },
  {
    number: '04',
    title: 'Decide',
    description: 'Compare offers & finalize.',
    icon: Scale
  },
  {
    number: '05',
    title: 'Enroll',
    description: 'Visa, travel, settle in.',
    icon: Plane
  }
];

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;

    if (!section || !heading || !timeline || !line) return;

    const ctx = gsap.context(() => {
      const stepElements = timeline.querySelectorAll('.step-item');
      const stepCircles = timeline.querySelectorAll('.step-circle');

      // Heading reveal
      gsap.fromTo(heading,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Connector line animation
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Step circles stagger
      gsap.fromTo(stepCircles,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Step content
      gsap.fromTo(stepElements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="process"
      className="relative py-20 md:py-28 bg-bg-primary"
      style={{ zIndex: 80 }}
    >
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="font-heading font-bold text-[clamp(32px,3.6vw,52px)] text-text-primary mb-4">
            Your admission roadmap.
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,18px)] max-w-[500px]">
            A simple, proven path from first chat to enrollment day.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Connector Line (Desktop) */}
          <div 
            ref={lineRef}
            className="hidden lg:block absolute top-[40px] left-[60px] right-[60px] h-[2px] bg-accent-violet/30 origin-left"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="step-item relative">
                  {/* Step Circle */}
                  <div 
                    className={`step-circle w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-all duration-300 ${
                      index === 0 
                        ? 'bg-accent-violet text-white' 
                        : 'bg-white text-text-primary card-border hover:border-accent-violet/50'
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Step Content */}
                  <div className="font-mono-label text-accent-violet text-[10px] mb-2">
                    STEP {step.number}
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
