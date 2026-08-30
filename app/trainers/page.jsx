'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Filter,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react';
import {
  SlideUp,
  StaggerContainer,
  StaggerItem,
  MotionButton,
} from '../../components/MotionWrapper';
import Modal from '../../components/Modal';
import { BrandedSpinner } from '../../components/BrandedSpinner';

const SPECIALTIES = [
  'All',
  'Strength',
  'HIIT',
  'Boxing',
  'Pilates',
  'Yoga',
  'Recovery',
  'Nutrition',
];

export default function TrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    async function fetchTrainers() {
      try {
        setLoading(true);
        const res = await fetch('/api/trainers');
        const data = await res.json();
        if (data.success) {
          setTrainers(data.data);
        }
      } catch (err) {
        console.error('Error loading trainers:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrainers();
  }, []);

  const filteredTrainers = trainers.filter((t) => {
    if (selectedSpecialty === 'All') return true;
    const spec = Array.isArray(t.specialties) ? t.specialties : [];
    return (
      spec.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase())) ||
      t.title.toLowerCase().includes(selectedSpecialty.toLowerCase())
    );
  });

  return (
    <div className="bg-charcoal-950 text-brown-50 pt-12 pb-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <SlideUp>
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-gold-400">
            Elite Conditioning Faculty
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-brown-50 mt-3 mb-4">
            MASTER COACHES & SPECIALISTS
          </h1>
          <p className="max-w-2xl mx-auto text-brown-300 text-sm sm:text-base leading-relaxed">
            Every coach at AURA is a recognized specialist in biomechanics, sports physiology, or competitive athletics. No generalists—only master practitioners.
          </p>
        </SlideUp>
      </div>

      {/* Specialty Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {SPECIALTIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedSpecialty(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedSpecialty === category
                  ? 'btn-gold shadow-gold-sm'
                  : 'bg-brown-900/40 border border-brown-800 text-brown-300 hover:text-brown-100 hover:bg-brown-900/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 flex justify-center">
            <BrandedSpinner size="lg" />
          </div>
        ) : filteredTrainers.length === 0 ? (
          <div className="text-center py-20 bg-charcoal-900/40 rounded-3xl border border-brown-900">
            <p className="text-brown-300 text-sm">No coaches found in this specialty.</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrainers.map((trainer) => (
              <StaggerItem key={trainer.id}>
                <div
                  onClick={() => setSelectedTrainer(trainer)}
                  className="group cursor-pointer rounded-3xl overflow-hidden glass-panel border-brown-800/80 hover:border-gold-accent/50 transition-all duration-300 hover:shadow-gold-md flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-80 w-full overflow-hidden bg-brown-950">
                      <Image
                        src={trainer.photo_url}
                        alt={trainer.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />
                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-brown-950/80 border border-gold-accent/40 text-[11px] font-bold text-gold-300 backdrop-blur-md">
                        {trainer.experience_years}+ Yrs Exp
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold font-display text-brown-50 group-hover:text-gold-accent transition-colors">
                        {trainer.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-gold-400 font-bold mb-3">
                        {trainer.title}
                      </p>

                      <p className="text-brown-300 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                        {trainer.bio}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {(trainer.specialties || []).map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brown-900/80 border border-brown-800 text-brown-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-brown-900/60 pt-4">
                    <span className="text-xs font-bold text-gold-400 group-hover:text-gold-300 inline-flex items-center gap-1">
                      <span>View Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

      {/* Trainer Detail Modal */}
      <Modal
        isOpen={Boolean(selectedTrainer)}
        onClose={() => setSelectedTrainer(null)}
        title={selectedTrainer?.name || 'Master Coach'}
      >
        {selectedTrainer && (
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-full md:w-56 h-72 rounded-2xl overflow-hidden shrink-0 border border-brown-800 shadow-gold-sm">
              <Image
                src={selectedTrainer.photo_url}
                alt={selectedTrainer.name}
                fill
                sizes="(max-width: 768px) 100vw, 224px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="text-xs uppercase font-bold text-gold-400 tracking-wider">
                {selectedTrainer.title}
              </span>
              <h4 className="text-2xl font-bold font-display text-brown-50 mt-1 mb-3">
                {selectedTrainer.name}
              </h4>
              <p className="text-brown-200 text-sm leading-relaxed mb-5">
                {selectedTrainer.bio}
              </p>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase text-brown-400 block mb-2">
                  Specialties & Focus Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {(selectedTrainer.specialties || []).map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-lg bg-brown-900 border border-gold-accent/30 text-gold-300 font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Link href="/schedule" className="flex-1">
                  <MotionButton className="btn-gold w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2">
                    <span>View Scheduled Classes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </MotionButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
