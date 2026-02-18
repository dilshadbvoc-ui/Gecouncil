import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LayoutDashboard, BookOpen, FileText, MessageSquare, Settings, Search, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DashboardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const uiCardRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const sidebarItemsRef = useRef<HTMLDivElement>(null);
  const appCardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const uiCard = uiCardRef.current;
    const textCard = textCardRef.current;
    const pill = pillRef.current;
    const sidebarItems = sidebarItemsRef.current;
    const appCards = appCardsRef.current;

    if (!section || !uiCard || !textCard || !pill) return;

    const ctx = gsap.context(() => {
      const sidebarNavs = sidebarItems?.querySelectorAll('.sidebar-nav');
      const cards = appCards?.querySelectorAll('.app-card');

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
      // UI Card from right
      scrollTl.fromTo(uiCard,
        { x: '60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Text card from left
      scrollTl.fromTo(textCard,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Pill entrance
      scrollTl.fromTo(pill,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // Sidebar items stagger
      if (sidebarNavs) {
        scrollTl.fromTo(sidebarNavs,
          { x: -12, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.04, ease: 'none' },
          0.12
        );
      }

      // App cards stagger
      if (cards) {
        scrollTl.fromTo(cards,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, ease: 'none' },
          0.15
        );
      }

      // SETTLE (30% - 70%)

      // EXIT (70% - 100%)
      scrollTl.fromTo(uiCard,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(textCard,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(pill,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="dashboard"
      className="section-pinned flex items-center justify-center"
      style={{ zIndex: 60 }}
    >
      <div className="relative w-full h-full flex items-center px-[6vw]">
        {/* Text Card */}
        <div 
          ref={textCardRef}
          className="absolute left-[6vw] top-[14vh] w-[30vw] h-[72vh] bg-white rounded-[28px] card-shadow card-border p-[clamp(22px,2.2vw,36px)] flex flex-col justify-center"
        >
          <h2 className="font-heading font-bold text-[clamp(26px,2.8vw,42px)] text-text-primary leading-[1.05] mb-6">
            One place for every step.
          </h2>
          <p className="text-text-secondary text-[clamp(14px,1.1vw,17px)] leading-relaxed">
            Track applications, compare offers, and chat with your counselor—all in a clean, modern dashboard.
          </p>
        </div>

        {/* UI Card */}
        <div 
          ref={uiCardRef}
          className="absolute left-[38vw] top-[14vh] w-[56vw] h-[72vh] bg-white rounded-[28px] card-shadow card-border overflow-hidden flex"
        >
          {/* Sidebar */}
          <div className="w-[200px] bg-[#F7F8FC] p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-accent-violet rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-semibold text-sm">GEC Portal</span>
            </div>
            
            <div ref={sidebarItemsRef} className="flex flex-col gap-1">
              <div className="sidebar-nav flex items-center gap-3 px-3 py-2.5 bg-white rounded-lg text-accent-violet font-medium text-sm">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </div>
              <div className="sidebar-nav flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-text-primary transition-colors text-sm">
                <BookOpen className="w-4 h-4" />
                Programs
              </div>
              <div className="sidebar-nav flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-text-primary transition-colors text-sm">
                <FileText className="w-4 h-4" />
                Applications
              </div>
              <div className="sidebar-nav flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-text-primary transition-colors text-sm">
                <FileText className="w-4 h-4" />
                Documents
              </div>
              <div className="sidebar-nav flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-text-primary transition-colors text-sm">
                <MessageSquare className="w-4 h-4" />
                Messages
              </div>
              <div className="sidebar-nav flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-text-primary transition-colors text-sm">
                <Settings className="w-4 h-4" />
                Settings
              </div>
            </div>
          </div>

          {/* Main Panel */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-lg">Applications</h3>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#F7F8FC] rounded-lg text-sm text-text-secondary">
                <Search className="w-4 h-4" />
                <span>Search...</span>
              </div>
            </div>

            <div ref={appCardsRef} className="space-y-4">
              <div className="app-card p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">Bachelor in Design</h4>
                    <p className="text-sm text-text-secondary">University of Arts London</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Submitted
                  </span>
                </div>
              </div>

              <div className="app-card p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">Bachelor in Design</h4>
                    <p className="text-sm text-text-secondary">University of Manchester</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Submitted
                  </span>
                </div>
              </div>
            </div>

            <button className="mt-6 btn-primary text-sm w-full justify-center">
              Compare offers
            </button>
          </div>
        </div>

        {/* Accent Pill */}
        <div 
          ref={pillRef}
          className="absolute left-[6vw] top-[78vh] w-[30vw] h-[8vh] min-h-[64px] bg-accent-violet rounded-[14px] px-6 flex flex-col justify-center text-white"
        >
          <span className="font-mono-label text-white/70 text-[10px] mb-1">DASHBOARD</span>
          <span className="text-sm font-medium">Live status • Offer compare • Chat & files</span>
        </div>
      </div>
    </section>
  );
}
