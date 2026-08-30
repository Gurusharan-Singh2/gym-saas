'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell, Shield, User, ArrowRight, Phone, Clock, Sparkles } from 'lucide-react';
import { MotionButton } from './MotionWrapper';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Trainers', href: '/trainers' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Schedule', href: '/schedule' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check auth status
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setCurrentUser(data.user);
          }
        }
      } catch {
        // Offline or not logged in
      }
    }
    checkAuth();
  }, [pathname]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Sleek Announcement Bar */}
      <div className="bg-[#09090B] border-b border-zinc-800 py-1.5 px-4 text-[11px] text-zinc-300 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Clock className="w-3 h-3 text-white" />
              Mon–Fri: 05:00–23:00 | Sat–Sun: 06:00–22:00
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Phone className="w-3 h-3 text-white" />
              +1 (800) 555-AURA
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-white" />
              Complimentary 3-Day Executive Trial Pass Available
            </span>
            <Link
              href="/pricing"
              className="text-white hover:text-zinc-300 font-bold underline transition-colors"
            >
              Claim Pass
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#09090B]/95 backdrop-blur-md py-2.5 shadow-2xl border-b border-zinc-800'
            : 'bg-[#09090B] py-3.5 border-b border-zinc-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
              <Dumbbell className="w-4 h-4 text-black transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-wider text-white transition-colors leading-tight">
                AURA
              </span>
              <span className="text-[8px] tracking-[0.25em] uppercase font-bold text-zinc-400 -mt-0.5">
                ATHLETICS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-white font-extrabold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {currentUser.role === 'admin' || currentUser.role === 'staff' ? (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] uppercase font-bold tracking-wider border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-sm"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin Console
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-zinc-200 font-semibold">
                    <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold text-xs">
                      {currentUser.name ? currentUser.name[0].toUpperCase() : 'M'}
                    </div>
                    <span>{currentUser.name}</span>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xs uppercase tracking-wider font-bold text-zinc-300 hover:text-white px-3 py-1.5 transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            <Link href="/pricing">
              <MotionButton className="btn-gold px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                <span>Join Club</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </MotionButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 focus:outline-none transition-colors"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer Dropdown (Inside Header Container with Sticky Support) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden bg-[#09090B] border-t border-zinc-800 px-4 pt-3 pb-6 shadow-2xl mt-3 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex flex-col space-y-1.5">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-white text-black font-extrabold'
                          : 'text-white hover:bg-zinc-900'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-500'}`} />
                    </Link>
                  );
                })}

                <div className="pt-4 mt-2 border-t border-zinc-800 flex flex-col gap-2.5">
                  {currentUser ? (
                    currentUser.role === 'admin' || currentUser.role === 'staff' ? (
                      <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="w-full py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-bold uppercase tracking-wider text-white text-center flex items-center justify-center gap-2"
                      >
                        <Shield className="w-4 h-4 text-white" />
                        <span>Access Admin Console</span>
                      </Link>
                    ) : (
                      <div className="text-xs text-zinc-300 text-center py-2 font-medium bg-zinc-900/60 rounded-xl border border-zinc-800">
                        Signed in as <span className="font-bold text-white">{currentUser.name}</span>
                      </div>
                    )
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-wider text-white text-center flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4 text-white" />
                      <span>Member & Staff Sign In</span>
                    </Link>
                  )}

                  <Link href="/pricing" onClick={() => setIsOpen(false)}>
                    <MotionButton className="btn-gold w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2">
                      <span>Claim 3-Day Trial Pass</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </MotionButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
