'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { MotionButton, SlideUp } from '../components/MotionWrapper';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log unexpected client error to monitoring
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-charcoal-950">
      <div className="max-w-md w-full text-center">
        <SlideUp>
          <div className="w-20 h-20 rounded-2xl bg-brown-900/80 border border-amber-500/40 flex items-center justify-center mx-auto mb-6 text-amber-400 shadow-brown-md">
            <AlertCircle className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
            System Interruption
          </span>

          <h1 className="text-3xl sm:text-4xl font-black font-display text-brown-50 mt-2 mb-4">
            SOMETHING WENT WRONG
          </h1>

          <p className="text-brown-300 text-sm leading-relaxed mb-8">
            Our high-performance servers encountered an unexpected issue while loading this view. Please try refreshing or return to the main dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <MotionButton
              onClick={() => reset()}
              className="btn-gold w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Session</span>
            </MotionButton>
            <Link href="/" className="w-full sm:w-auto">
              <MotionButton className="w-full px-6 py-3.5 rounded-xl border border-brown-700 bg-brown-900/40 text-brown-200 hover:text-brown-50 hover:bg-brown-900/80 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors">
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </MotionButton>
            </Link>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
