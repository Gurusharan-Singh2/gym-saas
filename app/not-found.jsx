'use client';

import React from 'react';
import Link from 'next/link';
import { Dumbbell, ArrowLeft, Home } from 'lucide-react';
import { MotionButton, SlideUp } from '../components/MotionWrapper';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-charcoal-950">
      <div className="max-w-md w-full text-center">
        <SlideUp>
          <div className="w-20 h-20 rounded-2xl bg-brown-900/80 border border-gold-accent/40 flex items-center justify-center mx-auto mb-6 text-gold-accent shadow-gold-sm">
            <Dumbbell className="w-10 h-10 transform -rotate-45" />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            Error 404 — Page Not Found
          </span>

          <h1 className="text-4xl sm:text-5xl font-black font-display text-brown-50 mt-2 mb-4">
            LOST IN TRAINING?
          </h1>

          <p className="text-brown-300 text-sm leading-relaxed mb-8">
            The page you are looking for has been retired or moved. Let's get you back on track toward your athletic goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <MotionButton className="btn-gold w-full px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </MotionButton>
            </Link>
            <Link href="/schedule" className="w-full sm:w-auto">
              <MotionButton className="w-full px-6 py-3.5 rounded-xl border border-brown-700 bg-brown-900/40 text-brown-200 hover:text-brown-50 hover:bg-brown-900/80 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>View Schedule</span>
              </MotionButton>
            </Link>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
