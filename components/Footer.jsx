'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, ArrowRight, MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MotionButton } from './MotionWrapper';

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#0D0906] border-t border-brown-900/80 text-brown-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Banner */}
        <div className="pb-12 mb-12 border-b border-brown-900 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880] flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-brown-950 transform -rotate-45" />
              </div>
              <span className="font-display font-black text-2xl text-white tracking-wider">
                AURA <span className="text-brown-300 font-normal text-lg">ATHLETICS</span>
              </span>
            </div>
            <p className="text-brown-300 text-sm max-w-lg leading-relaxed">
              The premier athletic club engineered for high performers, biohackers, and dedicated lifters. Experience world-class strength equipment, thermal recovery suites, and bespoke coaching.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-brown-900/40 border border-brown-800/80 rounded-2xl p-6">
              <h4 className="font-display font-bold text-base text-white mb-1">
                The Performance Journal
              </h4>
              <p className="text-xs text-brown-400 mb-4">
                Receive weekly evidence-based training protocols, recovery insights, and exclusive club announcements.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-brown-900/60 border border-brown-700 rounded-xl text-white text-sm font-semibold animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C5A880]" />
                  <span>Welcome to the inner circle. Check your inbox shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your executive email..."
                    required
                    className="luxury-input flex-1 text-sm bg-[#150E0A] border-brown-700 text-white"
                  />
                  <MotionButton
                    type="submit"
                    className="btn-gold px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold shrink-0 flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </MotionButton>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Club Info */}
          <div>
            <h5 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-5">
              Flagship Facility
            </h5>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-1" />
                <span className="text-brown-200">
                  450 Lexington Avenue, Luxury District, New York, NY 10017
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span className="text-brown-200">+1 (800) 555-AURA</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span className="text-brown-200">concierge@auragym.com</span>
              </li>
            </ul>
          </div>

          {/* Col 2: Operating Hours */}
          <div>
            <h5 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-5">
              Operating Hours
            </h5>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Monday – Friday</div>
                  <div className="text-xs text-brown-400">05:00 AM – 11:00 PM</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Saturday & Sunday</div>
                  <div className="text-xs text-brown-400">06:00 AM – 10:00 PM</div>
                </div>
              </li>
              <li className="pt-2 text-xs text-brown-400">
                *Thermal Spa & Recovery Suite open 30 mins after opening till 30 mins before closing.
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h5 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-5">
              Explore AURA
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="hover:text-white transition-colors">
                  Master Coaches & Specialists
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Membership Tiers & Benefits
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-white transition-colors">
                  Weekly Class Timetable
                </Link>
              </li>
              <li>
                <Link href="/workouts" className="hover:text-white transition-colors">
                  Daily Workout Split & Exercises
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Facility Tour & Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Performance Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Member Portal & Admin */}
          <div>
            <h5 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-5">
              Portal Access
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Member Portal Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  Create Member Account
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  Staff & Admin Panel
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Private Concierge & Tours
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-brown-900/80">
              <div className="text-xs text-brown-300 font-semibold mb-2">Member Support Line</div>
              <div className="text-sm font-bold text-white">+1 (800) 555-2872</div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-brown-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brown-400">
          <div>
            © {new Date().getFullYear()} AURA ATHLETICS CLUB LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms of Membership
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Code of Conduct
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
