import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const form = formRef.current;
    const footer = footerRef.current;

    if (!section || !headline || !form || !footer) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(headline,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form card reveal
      gsap.fromTo(form,
        { y: 28, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Footer fade
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', destination: '', message: '' });
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative py-20 md:py-28 bg-bg-secondary"
      style={{ zIndex: 100 }}
    >
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left: Headline */}
          <div ref={headlineRef} className="flex flex-col justify-center">
            <h2 className="font-heading font-bold text-[clamp(36px,4vw,56px)] text-white leading-[0.95] mb-6">
              Ready to start?
            </h2>
            <p className="text-gray-400 text-[clamp(15px,1.1vw,18px)] leading-relaxed mb-8 max-w-[400px]">
              Tell us what you&apos;re aiming for. We&apos;ll reply within one business day.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-accent-violet" />
                <span className="text-sm">hello@globaledcouncil.org</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-accent-violet" />
                <span className="text-sm">+91 98XXX XXXXX</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MessageCircle className="w-5 h-5 text-accent-violet" />
                <span className="text-sm">WhatsApp available</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div 
            ref={formRef}
            className="bg-white rounded-[28px] p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F3F4F8] rounded-xl text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-violet/30 transition-all"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F3F4F8] rounded-xl text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-violet/30 transition-all"
                    placeholder="you@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F3F4F8] rounded-xl text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-violet/30 transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Destination Interest</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F3F4F8] rounded-xl text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-violet/30 transition-all"
                  >
                    <option value="">Select destination</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="germany">Germany</option>
                    <option value="ireland">Ireland</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#F3F4F8] rounded-xl text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-violet/30 transition-all resize-none"
                  placeholder="Tell us about your goals..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2 py-4"
              >
                <Send className="w-4 h-4" />
                Send message
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer ref={footerRef} className="border-t border-white/10 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent-violet rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">G</span>
              </div>
              <span className="font-heading font-semibold text-white">Global Education Council</span>
            </div>

            <nav className="flex items-center gap-8">
              <a href="#programs" className="text-gray-400 text-sm hover:text-white transition-colors">Programs</a>
              <a href="#process" className="text-gray-400 text-sm hover:text-white transition-colors">Process</a>
              <a href="#stories" className="text-gray-400 text-sm hover:text-white transition-colors">Stories</a>
              <a href="#contact" className="text-gray-400 text-sm hover:text-white transition-colors">Contact</a>
            </nav>

            <p className="text-gray-500 text-sm">
              © 2026 Global Education Council. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
