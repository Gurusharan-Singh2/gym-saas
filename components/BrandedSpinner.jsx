'use client';

import React from 'react';

export function BrandedSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-brown-800 border-t-gold-accent animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

export function LoadingSkeleton({ className = '', count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-gradient-to-r from-brown-900/60 via-brown-800/40 to-brown-900/60 bg-[length:200%_100%] animate-shimmer rounded-xl ${className}`}
        />
      ))}
    </>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="w-full space-y-3">
      <div className="flex gap-4 p-4 bg-brown-900/40 rounded-xl border border-brown-800/50">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="flex-1 h-5 bg-brown-800/40 rounded animate-pulse" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 bg-charcoal-900/40 rounded-xl border border-brown-900/40">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="flex-1 h-5 bg-brown-900/60 rounded animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );
}
