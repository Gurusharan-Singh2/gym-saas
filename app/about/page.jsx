'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Target,
  Flame,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  Users,
} from 'lucide-react';
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
  MotionButton,
  MotionCard,
} from '../../components/MotionWrapper';

export default function AboutPage() {
  const leadership = [
    {
      name: 'Alexander Vance',
      role: 'Founder & Managing Director',
      bio: 'Former Olympic conditioning advisor with a vision to merge brutal athletic rigor with five-star hospitality.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Elena Rostova',
      role: 'Chief Operating Officer & Head of Experience',
      bio: '15 years steering ultra-luxury private athletic clubs across London, Zurich, and New York.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dr. Henrik Thorne',
      role: 'Head of Sports Science & Biometrics',
      bio: 'Leading researcher in neuromuscular adaptation, heart rate variability, and hyperbaric recovery protocols.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const standards = [
    'Custom Swedish Eleiko calibrated competition steel',
    'Woodway non-motorized curved treadmills',
    '38°F filtered mineral cold immersion plunges',
    'Finnish cedarwood dry saunas & infrared spectrums',
    'Full locker room laundry and styling suites',
    'Capped member registration to eliminate wait times',
  ];

  return (
    <div className="bg-charcoal-950 text-brown-50 pt-12 pb-24">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <SlideUp>
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-gold-400">
            Heritage & Philosophy
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-brown-50 mt-3 mb-6">
            THE ARCHITECTURE <br />
            <span className="gold-gradient-text">OF HUMAN POTENTIAL</span>
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-brown-300 leading-relaxed">
            Founded in 2014, AURA ATHLETICS was established with a singular conviction: that elite athletic progression and ultra-luxury hospitality should never be mutually exclusive.
          </p>
        </SlideUp>
      </div>

      {/* Story & Facility Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <SlideUp>
              <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border border-gold-accent/30 shadow-brown-lg">
                <Image
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1000&auto=format&fit=crop&q=80"
                  alt="AURA Interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-charcoal-950/80 backdrop-blur-md border border-brown-800">
                  <div className="font-display font-bold text-brown-100 text-sm">
                    Flagship Manhattan Facility
                  </div>
                  <div className="text-xs text-gold-400">35,000 Sq Ft of Curated Iron & Contrast Recovery</div>
                </div>
              </div>
            </SlideUp>
          </div>

          <div className="lg:col-span-6">
            <SlideUp delay={0.15}>
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-400">
                Our Genesis
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-brown-50 mt-2 mb-6">
                BUILT BY LIFTERS, FOR LIFTERS.
              </h2>
              <p className="text-brown-200 text-sm sm:text-base leading-relaxed mb-6">
                Most modern gym environments fall into one of two extremes: crowded commercial facilities with broken machines and long queues, or fragile boutique studios devoid of heavy iron and Olympic platforms.
              </p>
              <p className="text-brown-300 text-sm sm:text-base leading-relaxed mb-8">
                AURA was engineered to bridge that void. We provide Olympic-caliber barbells, precision dumbbells calibrated up to 150 lbs, biometric telemetry, and private Nordic recovery suites in a serene espresso-and-gold aesthetic.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {standards.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-brown-200">
                    <CheckCircle2 className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              <Link href="/pricing">
                <MotionButton className="btn-gold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2">
                  <span>Explore Membership Options</span>
                  <ArrowRight className="w-4 h-4" />
                </MotionButton>
              </Link>
            </SlideUp>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="bg-charcoal-900/60 py-24 border-y border-brown-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-400">
              Executive Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-brown-50 mt-2">
              STEWARDS OF THE CLUB
            </h2>
          </SlideUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, i) => (
              <StaggerItem key={i}>
                <div className="glass-panel rounded-2xl overflow-hidden border-brown-800/80 p-6 flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gold-accent/40 mb-6 shadow-gold-sm">
                    <Image
                      src={leader.photo}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold font-display text-brown-50 mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-xs uppercase font-bold tracking-wider text-gold-400 mb-4">
                    {leader.role}
                  </p>
                  <p className="text-brown-300 text-xs sm:text-sm leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}
