'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Nav Links */}
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
              Global Education Council
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                href="#community" 
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                Community
              </Link>
              <Link 
                href="#company" 
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                Company
              </Link>
              <Link 
                href="#contact" 
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-white/70 hover:text-white transition-colors px-4 py-2 text-sm">
              Log in
            </button>
            <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-all text-sm">
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-4">
            <Link 
              href="#community" 
              className="block text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
            <Link 
              href="#company" 
              className="block text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Company
            </Link>
            <Link 
              href="#contact" 
              className="block text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 space-y-2">
              <button className="w-full text-left text-white/70 hover:text-white transition-colors py-2">
                Log in
              </button>
              <button className="w-full bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-all">
                Sign up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
