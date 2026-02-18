import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Aisha R.',
    result: 'University of Toronto — Computer Science',
    quote: 'I had no idea where to start. They turned my confusion into a clear plan—and an offer.',
    image: '/images/testimonial_aisha.jpg'
  },
  {
    name: 'Rohan K.',
    result: 'University of Edinburgh — Business',
    quote: 'The shortlist was spot on. The essay feedback was honest. I felt supported the whole way.',
    image: '/images/testimonial_rohan.jpg'
  }
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      const cardElements = cards.querySelectorAll('.testimonial-card');

      // Heading reveal
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
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

      // Cards reveal with stagger
      gsap.fromTo(cardElements,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
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
      id="stories"
      className="relative py-20 md:py-28 bg-bg-primary"
      style={{ zIndex: 90 }}
    >
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <h2 className="font-heading font-bold text-[clamp(32px,3.6vw,52px)] text-text-primary mb-4">
            Students who made the leap.
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,18px)]">
            Real stories from students who trusted us with their journey.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-white rounded-[28px] card-shadow card-border overflow-hidden flex flex-col sm:flex-row"
            >
              {/* Image */}
              <div className="sm:w-[45%] h-[240px] sm:h-auto relative">
                <Image 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 45vw"
                />
              </div>

              {/* Content */}
              <div className="sm:w-[55%] p-6 md:p-8 flex flex-col justify-center">
                <Quote className="w-8 h-8 text-accent-violet/30 mb-4" />
                
                <p className="text-text-primary text-[clamp(15px,1.1vw,17px)] leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div>
                  <h4 className="font-heading font-semibold text-lg text-text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {testimonial.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
