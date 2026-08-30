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
      icon: <Dumbbell className="w-6 h-6 text-[#C5A880]" />,
      title: 'Precision Heavy Iron',
      desc: 'Calibrated Olympic discs, custom Swedish Eleiko barbells, and ergonomic Hammer Strength equipment.',
    },
    {
      icon: <Flame className="w-6 h-6 text-[#C5A880]" />,
      title: 'High-Kinetics Studios',
      desc: 'Acoustically isolated studios for metabolic conditioning, authentic boxing rings, and Reformer Pilates.',
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-[#C5A880]" />,
      title: 'Nordic Recovery Circuit',
      desc: 'Contrast therapy featuring 200°F cedar dry saunas, infrared suites, and 38°F cold immersion plunge pools.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#C5A880]" />,
      title: 'Elite Master Coaches',
      desc: 'Former Olympians, sports physiologists, and registered dietitians dedicated to your absolute physical peak.',
    },
  ];

  return (
    <div className="bg-[#0D0906] text-[#FFFFFF] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Glows */}
        <div className="gold-glow-orb w-[500px] h-[500px] -top-32 -left-32 opacity-30" />
        <div className="brown-glow-orb w-[600px] h-[600px] top-1/3 -right-48 opacity-25" />

        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&auto=format&fit=crop&q=85"
            alt="Luxury Gym Atmosphere"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0906]/90 via-[#0D0906]/70 to-[#0D0906]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0D0906]/60 to-[#0D0906]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.12] mb-6 max-w-4xl"
          >
            ELEVATE YOUR <br className="hidden sm:inline" />
            <span className="gold-gradient-text">PERFORMANCE & FORM</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-2xl text-sm sm:text-base md:text-lg text-brown-200 font-normal leading-relaxed mb-8"
          >
            A high-performance sanctuary engineered for athletes, executives, and dedicated lifters. Master coach periodization, calibrated Swedish Eleiko steel, and Nordic contrast recovery.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10"
          >
            <Link href="/pricing" className="w-full sm:w-auto">
              <MotionButton className="btn-gold w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2.5">
                <span>Claim 3-Day Executive Pass</span>
                <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </Link>

            <Link href="/schedule" className="w-full sm:w-auto">
              <MotionButton className="btn-outline-gold w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <span>Class Timetable</span>
              </MotionButton>
            </Link>
          </motion.div>

          {/* Social Proof Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-6 border-t border-brown-900/80 text-xs text-brown-300"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border border-brown-600 overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Member" fill className="object-cover" />
                </div>
                <div className="w-7 h-7 rounded-full border border-brown-600 overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Member" fill className="object-cover" />
                </div>
                <div className="w-7 h-7 rounded-full border border-brown-600 overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Member" fill className="object-cover" />
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-white font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                  <span>4.98 / 5.0</span>
                </div>
                <div className="text-[11px] text-brown-400">1,200+ Verified Members</div>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-brown-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Strict Capacity Cap (Zero Wait Times)</span>
            </div>

            <div className="h-6 w-[1px] bg-brown-800 hidden md:block" />

            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-[#C5A880]" />
              <span>38°F Plunge & Infrared Recovery</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS COUNTER STRIP */}
      <section className="relative py-12 bg-[#140E0A] border-y border-brown-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <StaggerItem className="text-center p-4 rounded-2xl glass-panel border-brown-800/80">
              <div className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-1">
                <CounterNumber end={2500} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-brown-300">
                Active Athletes
              </div>
            </StaggerItem>

            <StaggerItem className="text-center p-4 rounded-2xl glass-panel border-brown-800/80">
              <div className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-1">
                <CounterNumber end={18} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-brown-300">
                Master Coaches
              </div>
            </StaggerItem>

            <StaggerItem className="text-center p-4 rounded-2xl glass-panel border-brown-800/80">
              <div className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-1">
                <CounterNumber end={45} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-brown-300">
                Weekly Classes
              </div>
            </StaggerItem>

            <StaggerItem className="text-center p-4 rounded-2xl glass-panel border-brown-800/80">
              <div className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-1">
                <CounterNumber end={99} suffix="%" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-brown-300">
                Member Retention
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 3. FOUR CLUB PILLARS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">
            Uncompromising Standards
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white mt-2 mb-4">
            ENGINEERED FOR ELITE RESULTS
          </h2>
          <p className="text-brown-300 text-sm sm:text-base leading-relaxed">
            Every square foot of AURA is curated to remove friction from your training regimen and deliver unmatched physical progression.
          </p>
        </SlideUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubPillars.map((pillar, i) => (
            <StaggerItem key={i}>
              <MotionCard className="glass-panel glass-panel-hover p-7 rounded-2xl h-full flex flex-col justify-between border-brown-800/80">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brown-900/80 border border-brown-700 flex items-center justify-center mb-5">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-brown-300 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. MASTER COACHES PREVIEW */}
      <section className="py-20 bg-[#140E0A] border-t border-brown-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SlideUp>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">
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
                  className="group cursor-pointer rounded-2xl overflow-hidden glass-panel border-brown-800/80 transition-all duration-300 hover:border-[#C5A880]/50"
                >
                  <div className="relative h-72 w-full overflow-hidden bg-brown-950">
                    <Image
                      src={trainer.photo_url}
                      alt={trainer.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0906] via-[#0D0906]/20 to-transparent" />
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-brown-950/85 border border-brown-700 text-[10px] font-bold text-white backdrop-blur-md">
                      {trainer.experience_years}+ Yrs Exp
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold font-display text-white group-hover:text-[#E8DDD3] transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-[#C5A880] font-medium mb-3">
                      {trainer.title}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {trainer.specialties.slice(0, 2).map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brown-900/80 border border-brown-800 text-brown-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-brown-200 group-hover:text-white inline-flex items-center gap-1">
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
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">
            Investment in Longevity
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white mt-2 mb-4">
            MEMBERSHIP TIERS
          </h2>
          <p className="text-brown-300 text-sm sm:text-base mb-6">
            Transparent pricing with zero initiation fees, no hidden contracts, and flexible commitments.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#17110C] border border-brown-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                billingCycle === 'monthly'
                  ? 'btn-gold'
                  : 'text-brown-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                billingCycle === 'yearly'
                  ? 'btn-gold'
                  : 'text-brown-400 hover:text-white'
              }`}
            >
              <span>Annual Commitment</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-brown-950 text-white font-extrabold">
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
                      ? 'bg-[#1C140E] border-2 border-[#C5A880] lg:scale-105 z-10'
                      : 'glass-panel border-brown-800/80 hover:border-brown-700'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C5A880] text-[#0D0906] font-extrabold text-[10px] uppercase tracking-widest flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      <span>Most Popular Choice</span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-bold font-display text-white mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-brown-300 mb-6">{tier.tagline}</p>

                    <div className="flex items-baseline gap-1.5 mb-6 pb-4 border-b border-brown-800/80">
                      <span className="text-4xl sm:text-5xl font-extrabold font-display text-white">
                        ${price}
                      </span>
                      <span className="text-xs text-brown-400 font-semibold uppercase tracking-wider">
                        / Month {billingCycle === 'yearly' && '(Billed Annually)'}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8 text-xs text-brown-200">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
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
            className="text-xs font-bold text-white hover:text-brown-200 underline inline-flex items-center gap-1.5"
          >
            <span>Compare full feature matrix & executive privileges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. TESTIMONIALS CAROUSEL */}
      <section className="py-20 bg-[#140E0A] border-t border-brown-900/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">
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
              className="glass-panel p-6 sm:p-10 rounded-3xl border-brown-800/80 mb-6"
            >
              <div className="flex justify-center gap-1 mb-5 text-[#C5A880]">
                {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A880]" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg text-white font-medium leading-relaxed italic mb-6">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>

              <div className="flex items-center justify-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brown-600">
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
                  <div className="text-xs text-brown-400">
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
                    ? 'w-6 h-2 bg-[#C5A880]'
                    : 'w-2 h-2 bg-brown-800 hover:bg-brown-600'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-brown-950 via-[#150E0A] to-brown-950 border-t border-brown-800">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp>
            <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#C5A880]">
              Limited Membership Availability
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white mt-2 mb-4">
              YOUR ATHLETIC EVOLUTION BEGINS NOW
            </h2>
            <p className="text-brown-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
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
            <div className="relative w-full md:w-48 h-64 rounded-xl overflow-hidden shrink-0 border border-brown-800">
              <Image
                src={selectedTrainer.photo_url}
                alt={selectedTrainer.name}
                fill
                sizes="(max-width: 768px) 100vw, 192px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="text-xs uppercase font-bold text-[#C5A880] tracking-wider">
                {selectedTrainer.title}
              </span>
              <h4 className="text-2xl font-bold font-display text-white mt-1 mb-3">
                {selectedTrainer.name}
              </h4>
              <p className="text-brown-300 text-sm leading-relaxed mb-4">
                {selectedTrainer.bio}
              </p>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase text-brown-400 block mb-2">
                  Disciplines & Certifications
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedTrainer.specialties.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-brown-900 border border-brown-700 text-white font-semibold"
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
