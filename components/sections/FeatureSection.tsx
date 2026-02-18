import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  id: string;
  headline: string;
  body: string;
  pillLabel: string;
  pillValue: string;
  imageSrc: string;
  imageAlt: string;
  layout: 'image-left' | 'image-right';
  zIndex: number;
}

export default function FeatureSection({
  id,
  headline,
  body,
  pillLabel,
  pillValue,
  imageSrc,
  imageAlt,
  layout,
  zIndex
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imageCard = imageCardRef.current;
    const textCard = textCardRef.current;
    const pill = pillRef.current;
    const headlineEl = headlineRef.current;

    if (!section || !imageCard || !textCard || !pill || !headlineEl) return;

    const ctx = gsap.context(() => {
      const isImageLeft = layout === 'image-left';
      
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      // Image card entrance
      scrollTl.fromTo(imageCard,
        { 
          x: isImageLeft ? '-60vw' : '60vw', 
          opacity: 0, 
          scale: 0.96,
          rotateZ: isImageLeft ? -1 : 1
        },
        { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          rotateZ: 0,
          ease: 'none'
        },
        0
      );

      // Text card entrance
      scrollTl.fromTo(textCard,
        { 
          x: isImageLeft ? '50vw' : '-50vw', 
          opacity: 0,
          rotateZ: isImageLeft ? 1.5 : -1.5
        },
        { 
          x: 0, 
          opacity: 1,
          rotateZ: 0,
          ease: 'none'
        },
        0.05
      );

      // Headline entrance
      scrollTl.fromTo(headlineEl,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Pill entrance
      scrollTl.fromTo(pill,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // All entrance complete by 30%
      scrollTl.to({}, {}, 0.3);

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(imageCard,
        { x: 0, opacity: 1 },
        { 
          x: isImageLeft ? '-18vw' : '18vw', 
          opacity: 0.25,
          ease: 'power2.in'
        },
        0.7
      );

      scrollTl.fromTo(textCard,
        { x: 0, opacity: 1 },
        { 
          x: isImageLeft ? '18vw' : '-18vw', 
          opacity: 0.2,
          ease: 'power2.in'
        },
        0.7
      );

      scrollTl.fromTo(pill,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, [layout]);

  const isImageLeft = layout === 'image-left';

  return (
    <section 
      ref={sectionRef}
      id={id}
      className="section-pinned flex items-center justify-center"
      style={{ zIndex }}
    >
      <div className="relative w-full h-full flex items-center px-[6vw]">
        {/* Image Card */}
        <div 
          ref={imageCardRef}
          className={`absolute ${isImageLeft ? 'left-[6vw]' : 'left-[38vw]'} top-[14vh] w-[56vw] h-[72vh] rounded-[28px] overflow-hidden card-shadow`}
        >
          <Image 
            src={imageSrc} 
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="56vw"
            priority
          />
        </div>

        {/* Text Card */}
        <div 
          ref={textCardRef}
          className={`absolute ${isImageLeft ? 'left-[64vw]' : 'left-[6vw]'} top-[14vh] w-[30vw] h-[72vh] bg-white rounded-[28px] card-shadow card-border p-[clamp(22px,2.2vw,36px)] flex flex-col justify-center`}
        >
          <h2 
            ref={headlineRef}
            className="font-heading font-bold text-[clamp(26px,2.8vw,42px)] text-text-primary leading-[1.05] mb-6"
          >
            {headline}
          </h2>
          <p className="text-text-secondary text-[clamp(14px,1.1vw,17px)] leading-relaxed">
            {body}
          </p>
        </div>

        {/* Accent Pill */}
        <div 
          ref={pillRef}
          className={`absolute ${isImageLeft ? 'left-[64vw]' : 'left-[6vw]'} top-[78vh] w-[30vw] h-[8vh] min-h-[64px] bg-accent-violet rounded-[14px] px-6 flex flex-col justify-center text-white`}
        >
          <span className="font-mono-label text-white/70 text-[10px] mb-1">{pillLabel}</span>
          <span className="text-sm font-medium">{pillValue}</span>
        </div>
      </div>
    </section>
  );
}
