'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { SlideUp, StaggerContainer, StaggerItem } from '../../components/MotionWrapper';
import { BrandedSpinner } from '../../components/BrandedSpinner';

const CATEGORIES = ['All', 'Strength', 'Cardio', 'Studio', 'Wellness', 'Facility'];

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true);
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (data.success) {
          setGallery(data.data);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const filteredImages = gallery.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const nextLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="bg-charcoal-950 text-brown-50 pt-12 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <SlideUp>
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-gold-400">
            Sanctuary of High Performance
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-brown-50 mt-3 mb-4">
            FACILITY & ATHLETIC TOUR
          </h1>
          <p className="max-w-2xl mx-auto text-brown-300 text-sm sm:text-base leading-relaxed">
            Immerse yourself in our architectural spaces, custom equipment suites, and tranquil recovery zones.
          </p>
        </SlideUp>
      </div>

      {/* Category Chips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'btn-gold shadow-gold-sm'
                  : 'bg-brown-900/40 border border-brown-800 text-brown-300 hover:text-brown-100 hover:bg-brown-900/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 flex justify-center">
            <BrandedSpinner size="lg" />
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-charcoal-900/40 rounded-3xl border border-brown-900">
            <p className="text-brown-300 text-sm">No media available in this category.</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, idx) => (
              <StaggerItem key={img.id}>
                <div
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="group relative h-80 rounded-2xl overflow-hidden glass-panel border-brown-800/80 cursor-pointer hover:border-gold-accent/50 transition-all duration-300 shadow-brown-sm hover:shadow-gold-md"
                >
                  <Image
                    src={img.image_url}
                    alt={img.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Overlay Meta */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-brown-950/80 border border-gold-accent/30 text-gold-300 backdrop-blur-md">
                        {img.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-brown-950/70 border border-brown-700 flex items-center justify-center text-brown-200 group-hover:text-gold-accent transition-colors">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold font-display text-brown-50 group-hover:text-gold-accent transition-colors mb-1">
                        {img.title}
                      </h3>
                      {img.caption && (
                        <p className="text-xs text-brown-300 line-clamp-2">{img.caption}</p>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && filteredImages[activeLightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-950/95 backdrop-blur-xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-brown-900/80 border border-brown-700 text-brown-200 hover:text-gold-accent transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevLightbox}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-brown-900/80 border border-brown-700 text-brown-200 hover:text-gold-accent transition-colors hidden sm:flex"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextLightbox}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-brown-900/80 border border-brown-700 text-brown-200 hover:text-gold-accent transition-colors hidden sm:flex"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Visual */}
            <motion.div
              key={activeLightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden border border-gold-accent/30 shadow-2xl bg-charcoal-950">
                <Image
                  src={filteredImages[activeLightboxIndex].image_url}
                  alt={filteredImages[activeLightboxIndex].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs uppercase font-bold text-gold-400 tracking-wider">
                  {filteredImages[activeLightboxIndex].category}
                </span>
                <h4 className="text-xl font-bold font-display text-brown-50 mt-1">
                  {filteredImages[activeLightboxIndex].title}
                </h4>
                {filteredImages[activeLightboxIndex].caption && (
                  <p className="text-xs sm:text-sm text-brown-300 mt-1 max-w-xl">
                    {filteredImages[activeLightboxIndex].caption}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
