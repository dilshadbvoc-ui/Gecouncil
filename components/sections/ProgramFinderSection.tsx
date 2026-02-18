import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  { name: 'Computer Science', country: 'USA', levels: 'Bachelor / Master', color: 'bg-blue-50' },
  { name: 'Business Administration', country: 'UK', levels: 'Bachelor / MBA', color: 'bg-purple-50' },
  { name: 'Graphic Design', country: 'Canada', levels: 'Diploma / Bachelor', color: 'bg-pink-50' },
  { name: 'Data Analytics', country: 'Germany', levels: 'Master', color: 'bg-green-50' },
  { name: 'Nursing', country: 'Australia', levels: 'Bachelor / Master', color: 'bg-orange-50' },
  { name: 'Psychology', country: 'Netherlands', levels: 'Bachelor / Master', color: 'bg-teal-50' },
];

const filters = ['All', 'STEM', 'Business', 'Design', 'Health', 'Humanities'];

export default function ProgramFinderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const filtersEl = filtersRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !filtersEl || !cards) return;

    const ctx = gsap.context(() => {
      const filterChips = filtersEl.querySelectorAll('.filter-chip');
      const cardElements = cards.querySelectorAll('.program-card');

      // Heading reveal
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Filter chips stagger
      gsap.fromTo(filterChips,
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.04,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: filtersEl,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards reveal by row
      gsap.fromTo(cardElements,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
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
      id="programs"
      className="relative py-20 md:py-28 bg-bg-primary"
      style={{ zIndex: 70 }}
    >
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-10">
          <h2 className="font-heading font-bold text-[clamp(32px,3.6vw,52px)] text-text-primary mb-4">
            Find the right program.
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,18px)] max-w-[600px] mx-auto mb-6">
            Browse degrees, diplomas, and pathways across top destinations—filtered by what matters to you.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-accent-violet font-medium hover:underline"
          >
            View all programs
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-chip px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-accent-violet text-white'
                  : 'bg-white text-text-secondary hover:text-text-primary card-border'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Program Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {programs.map((program, index) => (
            <div
              key={index}
              className="program-card group bg-white rounded-[18px] card-shadow card-border p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <div className={`w-12 h-12 ${program.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <GraduationCap className="w-6 h-6 text-text-primary" />
              </div>
              
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                {program.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="font-mono-label text-text-secondary text-[10px]">
                  {program.country}
                </span>
                <span className="text-xs text-text-secondary">
                  {program.levels}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
