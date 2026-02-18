import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const accentCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollLabelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const centerCard = centerCardRef.current;
    const accentCard = accentCardRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const scrollLabel = scrollLabelRef.current;

    if (!section || !bg || !centerCard || !accentCard || !headline || !subheadline || !cta || !scrollLabel) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([bg, centerCard, headline, subheadline, cta, accentCard, scrollLabel], { opacity: 0 });
      gsap.set(bg, { scale: 1.06 });
      gsap.set(centerCard, { y: 26, scale: 0.985 });
      gsap.set(accentCard, { x: '-12vw', scale: 0.96 });
      gsap.set([headline, subheadline, cta], { y: 18 });
      gsap.set(scrollLabel, { y: 10 });

      // Auto-play entrance animation
      const entranceTl = gsap.timeline({ delay: 0.2 });
      
      entranceTl
        .to(bg, { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' })
        .to(centerCard, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.8')
        .to(headline, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .to(subheadline, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6')
        .to(cta, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .to(accentCard, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7')
        .to(scrollLabel, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible state when scrolling back
            gsap.to([centerCard, accentCard, bg, headline, subheadline, cta, scrollLabel], {
              opacity: 1, x: 0, y: 0, scale: 1, duration: 0.3
            });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(centerCard, 
          { y: 0, x: 0, scale: 1, opacity: 1 },
          { y: '-28vh', x: '10vw', scale: 0.92, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(accentCard,
          { x: 0, y: 0, opacity: 1 },
          { x: '-18vw', y: '18vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(bg,
          { scale: 1, opacity: 1 },
          { scale: 1.06, opacity: 0.35, ease: 'power2.in' },
          0.7
        )
        .fromTo([headline, subheadline, cta],
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(scrollLabel,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-10 flex items-center justify-center"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <Image 
          src="/images/hero_campus.jpg" 
          alt="University Campus"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Center Card */}
      <div 
        ref={centerCardRef}
        className="relative z-10 w-[min(72vw,1100px)] min-h-[min(52vh,520px)] bg-white rounded-[28px] card-shadow card-border p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center text-center"
      >
        <h1 
          ref={headlineRef}
          className="font-heading font-bold text-[clamp(32px,5vw,64px)] text-text-primary leading-[0.95] max-w-[90%] mb-6"
        >
          Your global education journey, designed around you.
        </h1>
        
        <p 
          ref={subheadlineRef}
          className="text-text-secondary text-[clamp(15px,1.2vw,18px)] leading-relaxed max-w-[600px] mb-8"
        >
          Personalized guidance, top universities, and end-to-end support—so you can apply with confidence.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
          <button className="btn-primary flex items-center gap-2 text-base">
            <Calendar className="w-4 h-4" />
            Book a free call
          </button>
          <a 
            href="#programs" 
            className="flex items-center gap-2 text-text-primary font-medium hover:text-accent-violet transition-colors"
          >
            Explore programs
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Accent Card */}
      <div 
        ref={accentCardRef}
        className="absolute left-[18vw] top-[74vh] w-[180px] h-[110px] bg-accent-violet rounded-[18px] p-4 flex flex-col justify-center text-white z-10"
      >
        <h3 className="font-heading font-semibold text-lg mb-1">Start today</h3>
        <p className="text-xs text-white/80 leading-tight">
          Build a shortlist in minutes. Get expert feedback within 24 hours.
        </p>
      </div>

      {/* Scroll Label */}
      <div 
        ref={scrollLabelRef}
        className="absolute left-[6vw] top-[92vh] z-10"
      >
        <span className="font-mono-label text-white/70">Scroll to explore</span>
      </div>
    </section>
  );
}
