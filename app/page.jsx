'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dumbbell,
  ArrowRight,
  Sparkles,
  Flame,
  Award,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  Star,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  HeartPulse,
} from 'lucide-react';
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
  CounterNumber,
  MotionButton,
  MotionCard,
} from '../components/MotionWrapper';
import Modal from '../components/Modal';

export default function HomePage() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const featuredTrainers = [
    {
      id: 1,
      name: 'Marcus Vance',
      title: 'Head of Strength & Conditioning',
      bio: 'Former Olympic weightlifting coach with 12+ years optimizing athletic power, biomechanics, and structural resilience.',
      specialties: ['Olympic Lifting', 'Hypertrophy', 'Biomechanics'],
      experience_years: 12,
      photo_url: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Sienna Hayes',
      title: 'Lead HIIT & Conditioning Master',
      bio: 'Specialist in metabolic conditioning, cardiovascular threshold training, and high-energy group kinetics.',
      specialties: ['Metabolic HIIT', 'Endurance', 'Kettlebells'],
      experience_years: 8,
      photo_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Darius Thorne',
      title: 'Combat & Boxing Director',
      bio: 'Golden Gloves champion turned technical combat coach. Dedicated to rotational power, agility, and mental sharpness.',
      specialties: ['Boxing Fundamentals', 'Combat Conditioning', 'Footwork'],
      experience_years: 10,
      photo_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      name: 'Aria Montgomery',
      title: 'Reformer Pilates & Mobility Specialist',
      bio: 'Classical Pilates master and neuromuscular therapist focused on core architecture, pelvic stability, and spinal decompression.',
      specialties: ['Reformer Pilates', 'Spinal Alignment', 'Deep Core'],
      experience_years: 9,
      photo_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const membershipTiers = [
    {
      name: 'Essential Club',
      tagline: 'Pure performance with full strength and cardio floor privileges.',
      priceMonthly: 89,
      priceYearly: 890,
      popular: false,
      features: [
        'Full access to all Strength & Cardio zones',
        'Custom Eleiko calibrated barbell platforms',
        'Eucalyptus steam showers & towel service',
        'AURA Mobile app workout tracking',
      ],
    },
    {
      name: 'Elite Performance',
      tagline: 'Unlimited studio classes and contrast recovery suites.',
      priceMonthly: 149,
      priceYearly: 1490,
      popular: true,
      features: [
        'All Essential Club privileges',
        'Unlimited Studio Classes (HIIT, Boxing, Pilates)',
        'Infrared sauna & cold plunge circuit access',
        'Bi-weekly InBody 770 biometric scans',
        '2 Complimentary guest passes / month',
        '10% Discount on AURA Nutrition Bar',
      ],
    },
    {
      name: 'Executive Black',
      tagline: 'Bespoke coaching, private lounge, and VIP locker suite.',
      priceMonthly: 249,
      priceYearly: 2490,
      popular: false,
      features: [
        'All Elite Performance privileges',
        '4 Private 1-on-1 Personal Training sessions',
        'Personalized nutrition & biometric strategy',
        'Reserved walnut locker with laundry service',
        'Unlimited guest privileges anytime',
        'VIP Member Rooftop Lounge access',
      ],
    },
  ];

  const testimonials = [
    {
      author: 'Lord Richard Kensington',
      role: 'Managing Director, Kensington Capital',
      quote:
        'AURA ATHLETICS has redefined the athletic club experience. The immaculate aesthetic, precision Eleiko equipment, and world-class coaches make this the only facility that meets my standard.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      author: 'Dr. Evelyn Martinez',
      role: 'Orthopedic Surgeon & Marathoner',
      quote:
        'The Nordic recovery suite with 190°F Finnish saunas and 38°F plunge pools cut my post-race recovery in half. This is serious sports science in a 5-star atmosphere.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      author: 'Julian Montgomery',
      role: 'Tech Founder & Biohacker',
      quote:
        'The biometric tracking, personalized periodization, and private vibe make AURA feels like a private Olympic training ground built for high achievers.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
      rating: 5,
    },
  ];

  const clubPillars = [
    {
      icon: <Dumbbell className="w-6 h-6 text-white" />,
      title: 'Precision Heavy Iron',
      desc: 'Calibrated Olympic discs, custom Swedish Eleiko barbells, and ergonomic Hammer Strength equipment.',
    },
    {
      icon: <Flame className="w-6 h-6 text-white" />,
      title: 'High-Kinetics Studios',
      desc: 'Acoustically isolated studios for metabolic conditioning, authentic boxing rings, and Reformer Pilates.',
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-white" />,
      title: 'Nordic Recovery Circuit',
      desc: 'Contrast therapy featuring 200°F cedar dry saunas, infrared suites, and 38°F cold immersion plunge pools.',
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: 'Elite Master Coaches',
      desc: 'Former Olympians, sports physiologists, and registered dietitians dedicated to your absolute physical peak.',
    },
  ];

  return (
    <div className="bg-[#09090B] text-[#FFFFFF] overflow-hidden">
      {/* 1. HERO SECTION — Full-Width 2-Column Split */}
      <section className="relative w-full pt-8 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[calc(100vh-80px)] flex flex-col justify-center">
        {/* Ambient Radial Glows */}
        <div className="gold-glow-orb w-[500px] h-[500px] -top-32 -left-32 opacity-15" />
        <div className="brown-glow-orb w-[500px] h-[500px] top-1/3 -right-48 opacity-15" />

        {/* Hero Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&auto=format&fit=crop&q=85"
            alt="Luxury Gym Atmosphere"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/90 via-[#09090B]/70 to-[#09090B]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
            {/* Left Column: Bold Clean Typography */}
            <div className="text-left flex flex-col items-start">
              {/* Micro Tag */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 backdrop-blur-md mb-4"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-zinc-300">
                  Manhattan Flagship • Private High-Performance Club
                </span>
              </motion.div>

              {/* Headline with Balanced Responsive Sizing */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.12] mb-5"
              >
                ELEVATE YOUR <br className="hidden sm:inline" />
                <span className="gold-gradient-text">PERFORMANCE & FORM</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
                className="max-w-lg text-xs sm:text-sm md:text-base text-zinc-300 font-normal leading-relaxed mb-6"
              >
                A high-performance sanctuary engineered for athletes, executives, and dedicated lifters. Master coach periodization, calibrated Swedish Eleiko steel, and Nordic contrast recovery.
              </motion.p>

              {/* Key Highlights Checklist */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7 text-xs text-zinc-300 w-full max-w-md"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Olympic Eleiko Calibrated Suite</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>38°F Cold Plunge & Cedar Sauna</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>InBody 770 Biometric Scans</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Strict Member Capacity Cap</span>
                </div>
              </motion.div>

              {/* Dual CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-7"
              >
                <Link href="/pricing" className="w-full sm:w-auto">
                  <MotionButton className="btn-gold w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2">
                    <span>Claim 3-Day Executive Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </MotionButton>
                </Link>

                <Link href="/schedule" className="w-full sm:w-auto">
                  <MotionButton className="btn-outline-gold w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4 text-white" />
                    <span>Class Timetable</span>
                  </MotionButton>
                </Link>
              </motion.div>

              {/* Social Proof Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex items-center gap-3 pt-4 border-t border-zinc-800 text-xs text-zinc-400"
              >
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border border-zinc-700 overflow-hidden relative">
                    <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Member" fill className="object-cover" />
                  </div>
                  <div className="w-6 h-6 rounded-full border border-zinc-700 overflow-hidden relative">
                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Member" fill className="object-cover" />
                  </div>
                  <div className="w-6 h-6 rounded-full border border-zinc-700 overflow-hidden relative">
                    <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Member" fill className="object-cover" />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-white font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span>4.98 / 5.0</span>
                  <span className="text-zinc-400 font-normal ml-1">(1,200+ Members)</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Visual Athletic Card with Floating Glass Overlays */}
            <div className="relative flex justify-center lg:justify-end w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-full max-w-sm sm:max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-zinc-800 bg-[#141418] shadow-2xl group"
              >
                {/* Main Hero Visual */}
                <div className="relative h-[380px] sm:h-[430px] w-full bg-zinc-950 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1000&auto=format&fit=crop&q=85"
                    alt="AURA Elite Training"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/20 to-transparent" />
                </div>

                {/* Top Floating Glass Badge: Live Occupancy */}
                <div className="absolute top-3.5 left-3.5 right-3.5 p-3 rounded-2xl bg-[#09090B]/90 border border-zinc-800 backdrop-blur-md flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <div className="text-[10px] font-bold text-white uppercase tracking-wider">Live Facility Flow</div>
                      <div className="text-[9px] text-zinc-400">42% Capacity • Optimal Space</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-black text-emerald-400 font-display">OPTIMAL</span>
                </div>

                {/* Bottom Floating Glass Card: Next Master Class */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 rounded-2xl bg-[#09090B]/95 border border-zinc-800 backdrop-blur-md shadow-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider">
                      Upcoming Elite Session
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-800 text-white font-semibold">
                      Today • 07:00 AM
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white mb-1">
                    Metabolic Conditioning & Heavy Power
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Coach Marcus Vance</span>
                    <Link href="/schedule" className="text-white hover:underline font-bold text-[10px] flex items-center gap-1">
                      <span>Reserve</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS COUNTER STRIP */}
      <section className="relative py-12 bg-[#0F0F12] border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <StaggerItem className="text-center p-4 rounded-2xl bg-[#141418] border border-zinc-800">
              <div className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-1">
                <CounterNumber end={2500} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Active Athletes
              </div>
            </StaggerItem>

            <StaggerItem className="text-center p-4 rounded-2xl bg-[#141418] border border-zinc-800">
              <div className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-1">
                <CounterNumber end={18} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Master Coaches
              </div>
            </StaggerItem>

            <StaggerItem className="text-center p-4 rounded-2xl bg-[#141418] border border-zinc-800">
              <div className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-1">
                <CounterNumber end={45} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Weekly Classes
              </div>
            </StaggerItem>

            <StaggerItem className="text-center p-4 rounded-2xl bg-[#141418] border border-zinc-800">
              <div className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-1">
                <CounterNumber end={99} suffix="%" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Member Retention
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 3. FOUR CLUB PILLARS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Uncompromising Standards
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white mt-2 mb-4">
            ENGINEERED FOR ELITE RESULTS
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every square foot of AURA is curated to remove friction from your training regimen and deliver unmatched physical progression.
          </p>
        </SlideUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubPillars.map((pillar, i) => (
            <StaggerItem key={i}>
              <MotionCard className="bg-[#141418] p-7 rounded-2xl h-full flex flex-col justify-between border border-zinc-800 hover:border-zinc-700 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-5">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. MASTER COACHES PREVIEW */}
      <section className="py-20 bg-[#0F0F12] border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SlideUp>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
                World-Class Faculty
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white mt-2">
                MEET YOUR MASTER COACHES
              </h2>
            </SlideUp>
            <SlideUp delay={0.1} className="mt-4 md:mt-0">
              <Link href="/trainers">
                <MotionButton className="btn-outline-gold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2">
                  <span>View All Faculty</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </MotionButton>
              </Link>
            </SlideUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTrainers.map((trainer) => (
              <StaggerItem key={trainer.id}>
                <div
                  onClick={() => setSelectedTrainer(trainer)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-[#141418] border border-zinc-800 transition-all duration-300 hover:border-zinc-600 shadow-lg"
                >
                  <div className="relative h-72 w-full overflow-hidden bg-zinc-950">
                    <Image
                      src={trainer.photo_url}
                      alt={trainer.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/20 to-transparent" />
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 border border-zinc-700 text-[10px] font-bold text-white backdrop-blur-md">
                      {trainer.experience_years}+ Yrs Exp
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold font-display text-white group-hover:text-zinc-200 transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-medium mb-3">
                      {trainer.title}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {trainer.specialties.slice(0, 2).map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-zinc-300 group-hover:text-white inline-flex items-center gap-1">
                      <span>View Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. MEMBERSHIP TIERS PREVIEW */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Investment in Longevity
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white mt-2 mb-4">
            MEMBERSHIP TIERS
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mb-6">
            Transparent pricing with zero initiation fees, no hidden contracts, and flexible commitments.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#141418] border border-zinc-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                billingCycle === 'monthly'
                  ? 'btn-gold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                billingCycle === 'yearly'
                  ? 'btn-gold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Annual Commitment</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-white font-extrabold border border-zinc-700">
                SAVE 20%
              </span>
            </button>
          </div>
        </SlideUp>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {membershipTiers.map((tier, i) => {
            const price =
              billingCycle === 'monthly' ? tier.priceMonthly : Math.round(tier.priceYearly / 12);

            return (
              <StaggerItem key={i}>
                <div
                  className={`relative rounded-3xl p-7 flex flex-col justify-between h-full transition-all duration-300 ${
                    tier.popular
                      ? 'bg-[#18181D] border-2 border-white lg:scale-105 z-10 shadow-2xl'
                      : 'bg-[#141418] border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-black font-extrabold text-[10px] uppercase tracking-widest flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3 text-black" />
                      <span>Most Popular Choice</span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-bold font-display text-white mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mb-6">{tier.tagline}</p>

                    <div className="flex items-baseline gap-1.5 mb-6 pb-4 border-b border-zinc-800">
                      <span className="text-4xl sm:text-5xl font-extrabold font-display text-white">
                        ${price}
                      </span>
                      <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                        / Month {billingCycle === 'yearly' && '(Billed Annually)'}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8 text-xs text-zinc-300">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/pricing" className="w-full">
                    <MotionButton
                      className={`w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 ${
                        tier.popular ? 'btn-gold' : 'btn-outline-gold'
                      }`}
                    >
                      <span>Select {tier.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </MotionButton>
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="text-center mt-10">
          <Link
            href="/pricing"
            className="text-xs font-bold text-white hover:text-zinc-300 underline inline-flex items-center gap-1.5"
          >
            <span>Compare full feature matrix & executive privileges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. TESTIMONIALS CAROUSEL */}
      <section className="py-20 bg-[#0F0F12] border-t border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Verified Member Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-2">
              ATHLETIC TESTIMONIALS
            </h2>
          </SlideUp>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-[#141418] p-6 sm:p-10 rounded-3xl border border-zinc-800 shadow-xl mb-6"
            >
              <div className="flex justify-center gap-1 mb-5 text-white">
                {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-white" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg text-white font-medium leading-relaxed italic mb-6">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>

              <div className="flex items-center justify-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-700">
                  <Image
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].author}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-bold font-display text-sm text-white">
                    {testimonials[activeTestimonial].author}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Selector Dots */}
          <div className="flex justify-center items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`transition-all rounded-full ${
                  activeTestimonial === i
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-black via-[#111114] to-black border-t border-zinc-800">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp>
            <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-zinc-400">
              Limited Membership Availability
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white mt-2 mb-4">
              YOUR ATHLETIC EVOLUTION BEGINS NOW
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
              Schedule your private concierge walkthrough and experience the premier high-performance club in person.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/pricing" className="w-full sm:w-auto">
                <MotionButton className="btn-gold w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2">
                  <span>Join Aura Club</span>
                  <ArrowRight className="w-4 h-4" />
                </MotionButton>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <MotionButton className="btn-outline-gold w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2">
                  <span>Schedule Facility Tour</span>
                </MotionButton>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Trainer Bio Modal */}
      <Modal
        isOpen={Boolean(selectedTrainer)}
        onClose={() => setSelectedTrainer(null)}
        title={selectedTrainer?.name || 'Master Coach'}
      >
        {selectedTrainer && (
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-full md:w-48 h-64 rounded-xl overflow-hidden shrink-0 border border-zinc-800">
              <Image
                src={selectedTrainer.photo_url}
                alt={selectedTrainer.name}
                fill
                sizes="(max-width: 768px) 100vw, 192px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                {selectedTrainer.title}
              </span>
              <h4 className="text-2xl font-bold font-display text-white mt-1 mb-3">
                {selectedTrainer.name}
              </h4>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                {selectedTrainer.bio}
              </p>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase text-zinc-400 block mb-2">
                  Disciplines & Certifications
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedTrainer.specialties.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-white font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <Link href="/schedule">
                <MotionButton className="btn-gold w-full py-3 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2">
                  <span>Book Class with {selectedTrainer.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </MotionButton>
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
