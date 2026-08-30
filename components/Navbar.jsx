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
      <div className="bg-[#120A06] border-b border-brown-800 py-1.5 px-4 text-[11px] text-brown-200 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-brown-300">
              <Clock className="w-3 h-3 text-[#C5A880]" />
              Mon–Fri: 05:00–23:00 | Sat–Sun: 06:00–22:00
            </span>
            <span className="flex items-center gap-1.5 text-brown-300">
              <Phone className="w-3 h-3 text-[#C5A880]" />
              +1 (800) 555-AURA
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              Complimentary 3-Day Executive Trial Pass Available
            </span>
            <Link
              href="/pricing"
              className="text-white hover:text-[#C5A880] font-bold underline transition-colors"
            >
              Claim Pass
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'glass-header py-2.5 shadow-brown-lg'
            : 'bg-[#0D0906]/90 backdrop-blur-md py-3.5 border-b border-brown-900/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#C5A880] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Dumbbell className="w-4 h-4 text-brown-950 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-wider text-white transition-colors leading-tight">
                AURA
              </span>
              <span className="text-[8px] tracking-[0.25em] uppercase font-bold text-brown-300 -mt-0.5">
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
                      : 'text-brown-300 hover:text-white hover:bg-brown-900/40'
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
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] uppercase font-bold tracking-wider border border-brown-700 bg-brown-900/50 text-white hover:bg-brown-800 transition-all"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin Console
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-brown-200 font-semibold">
                    <div className="w-7 h-7 rounded-full bg-brown-800 border border-brown-600 flex items-center justify-center text-white font-bold text-xs">
                      {currentUser.name ? currentUser.name[0].toUpperCase() : 'M'}
                    </div>
                    <span>{currentUser.name}</span>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs uppercase font-bold tracking-wider text-brown-200 hover:text-white transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}

            <Link href="/pricing">
              <MotionButton className="btn-gold px-4 py-2 rounded-xl text-[11px] uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                <span>Join Club</span>
                <ArrowRight className="w-3 h-3" />
              </MotionButton>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/pricing" className="sm:inline-block hidden">
              <MotionButton className="btn-gold px-3.5 py-1.5 rounded-lg text-xs font-bold">
                Join
              </MotionButton>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-brown-900/60 border border-brown-800 text-brown-200 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Slide-in Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#0D0906]/90 backdrop-blur-sm"
            />

            {/* Off-canvas Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0D0906] border-l border-brown-800 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-5 border-b border-brown-900 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C5A880] flex items-center justify-center">
                      <Dumbbell className="w-4 h-4 text-brown-950 transform -rotate-45" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-black text-base tracking-wider text-white">
                        AURA
                      </span>
                      <span className="text-[8px] tracking-[0.2em] uppercase font-bold text-brown-300 -mt-0.5">
                        ATHLETICS
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-brown-400 hover:text-white hover:bg-brown-900/50 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Staggered Navigation Links */}
                <motion.nav
                  initial="hidden"
                  animate="show"
                  variants={{
                    show: {
                      transition: { staggerChildren: 0.04 },
                    },
                  }}
                  className="flex flex-col gap-1.5"
                >
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        variants={{
                          hidden: { opacity: 0, x: 15 },
                          show: { opacity: 1, x: 0 },
                        }}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                            isActive
                              ? 'bg-brown-900/80 text-white border-l-4 border-white'
                              : 'text-brown-300 hover:text-white hover:bg-brown-900/40'
                          }`}
                        >
                          <span>{link.name}</span>
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>
              </div>

              {/* Bottom Actions in Drawer */}
              <div className="pt-6 border-t border-brown-900 flex flex-col gap-3">
                {currentUser ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-brown-900/40 rounded-xl border border-brown-800">
                      <div className="w-9 h-9 rounded-full bg-brown-800 border border-brown-600 flex items-center justify-center text-white font-bold text-xs">
                        {currentUser.name ? currentUser.name[0].toUpperCase() : 'M'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">{currentUser.name}</span>
                        <span className="text-[10px] text-brown-400 capitalize">{currentUser.role} Member</span>
                      </div>
                    </div>
                    {currentUser.role === 'admin' || currentUser.role === 'staff' ? (
                      <Link href="/admin">
                        <MotionButton className="w-full py-2.5 rounded-xl bg-brown-800 border border-brown-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                          <Shield className="w-3.5 h-3.5" />
                          Admin Console
                        </MotionButton>
                      </Link>
                    ) : null}
                  </>
                ) : (
                  <Link href="/login">
                    <MotionButton className="w-full py-2.5 rounded-xl border border-brown-700 bg-brown-900/40 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      Sign In / Member Portal
                    </MotionButton>
                  </Link>
                )}

                <Link href="/pricing">
                  <MotionButton className="w-full btn-gold py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                    <span>Join Club Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </MotionButton>
                </Link>

                <div className="text-center pt-1 text-[11px] text-brown-400">
                  Concierge: +1 (800) 555-AURA
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
