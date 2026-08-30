'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Check,
} from 'lucide-react';
import {
  SlideUp,
  StaggerContainer,
  StaggerItem,
  MotionButton,
} from '../../components/MotionWrapper';
import { BrandedSpinner } from '../../components/BrandedSpinner';

const COMPARISON_FEATURES = [
  { name: 'Strength & Eleiko Iron Floor Access', essential: true, elite: true, executive: true },
  { name: 'Cardio Deck & Woodway Suites', essential: true, elite: true, executive: true },
  { name: 'Eucalyptus Steam & Locker Amenities', essential: true, elite: true, executive: true },
  { name: 'AURA Mobile App & Workout Log', essential: true, elite: true, executive: true },
  { name: 'Unlimited Studio Classes (HIIT, Boxing, Pilates)', essential: false, elite: true, executive: true },
  { name: 'Nordic Recovery Circuit (Sauna & Plunge)', essential: false, elite: true, executive: true },
  { name: 'InBody 770 Biometric Scans', essential: false, elite: 'Bi-Weekly', executive: 'Weekly' },
  { name: 'Complimentary Guest Passes', essential: false, elite: '2 / Month', executive: 'Unlimited' },
  { name: '1-on-1 Master Coach Personal Training', essential: false, elite: false, executive: '4 Sessions / Mo' },
  { name: 'Reserved Walnut Locker & Laundry', essential: false, elite: false, executive: true },
  { name: 'VIP Rooftop Member Lounge Access', essential: false, elite: false, executive: true },
  { name: 'Nutrition & Biometric Strategy Sessions', essential: false, elite: false, executive: true },
];

const FAQS = [
  {
    q: 'Can I trial the facility before committing to an annual membership?',
    a: 'Yes. We offer a complimentary 3-Day Executive Trial Pass that grants complete access to all strength floors, studio classes, and our Nordic recovery spa suite.',
  },
  {
    q: 'Are there initiation fees or long-term lock-in contracts?',
    a: 'No initiation fees, no cancellation penalties. Monthly memberships operate on a 30-day rolling term, while annual memberships receive a 20% upfront discount.',
  },
  {
    q: 'Is there a limit on membership capacity?',
    a: 'Yes. To protect the serene atmosphere and eliminate equipment wait times, AURA maintains a strict membership cap. Once reached, prospective members join our waitlist.',
  },
  {
    q: 'Can I freeze my membership if I travel frequently?',
    a: 'Executive and Elite members may freeze their memberships for up to 90 days per calendar year without penalty via the Member Portal or Concierge desk.',
  },
  {
    q: 'How does personal training work in the Executive Black tier?',
    a: 'Executive members receive four 60-minute 1-on-1 private sessions monthly with their dedicated Master Coach, including periodized programming and biometric tracking.',
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    async function fetchPlans() {
      try {
        setLoading(true);
        const res = await fetch('/api/plans');
        const data = await res.json();
        if (data.success) {
          setPlans(data.data);
        }
      } catch (err) {
        console.error('Error fetching plans:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-charcoal-950 text-brown-50 pt-12 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <SlideUp>
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-gold-400">
            Membership Privileges
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-brown-50 mt-3 mb-4">
            TRANSPARENT TIERS, <br />
            <span className="gold-gradient-text">UNRIVALED PRIVILEGE</span>
          </h1>
          <p className="max-w-2xl mx-auto text-brown-300 text-sm sm:text-base mb-8">
            Choose the level of access that aligns with your athletic ambitions. All tiers include full facility privileges and zero initiation fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-charcoal-900 border border-brown-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                billingCycle === 'monthly'
                  ? 'btn-gold shadow-gold-sm'
                  : 'text-brown-400 hover:text-brown-100'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                billingCycle === 'yearly'
                  ? 'btn-gold shadow-gold-sm'
                  : 'text-brown-400 hover:text-brown-100'
              }`}
            >
              <span>Annual Commitment</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-brown-950 text-gold-accent font-extrabold">
                SAVE 20%
              </span>
            </button>
          </div>
        </SlideUp>
      </div>

      {/* Tier Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {loading ? (
          <div className="py-20 flex justify-center">
            <BrandedSpinner size="lg" />
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const price =
                billingCycle === 'monthly'
                  ? plan.price_monthly
                  : Math.round(plan.price_yearly / 12);
              const features = Array.isArray(plan.features) ? plan.features : [];

              return (
                <StaggerItem key={plan.id}>
                  <div
                    className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-full transition-all duration-300 ${
                      plan.is_popular
                        ? 'bg-charcoal-900 border-2 border-gold-accent shadow-gold-md lg:scale-105 z-10'
                        : 'glass-panel border-brown-800/80 hover:border-brown-700'
                    }`}
                  >
                    {plan.is_popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-brown-950 font-black text-[11px] uppercase tracking-widest shadow-gold-sm flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Most Popular Choice</span>
                      </div>
                    )}

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold font-display text-brown-50 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-brown-300 mb-6 leading-relaxed">
                        {plan.tag_line}
                      </p>

                      <div className="flex items-baseline gap-1.5 mb-8 pb-6 border-b border-brown-800/80">
                        <span className="text-4xl sm:text-5xl font-black font-display text-gold-300">
                          ${price}
                        </span>
                        <span className="text-xs text-brown-400 font-semibold uppercase tracking-wider">
                          / Month {billingCycle === 'yearly' && '(Billed Annually)'}
                        </span>
                      </div>

                      <ul className="space-y-3.5 mb-8 text-sm">
                        {features.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-brown-200">
                            <CheckCircle2 className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={`/signup?plan=${plan.id}`} className="w-full">
                      <MotionButton
                        className={`w-full py-4 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 ${
                          plan.is_popular ? 'btn-gold' : 'btn-outline-gold'
                        }`}
                      >
                        <span>Enroll in {plan.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </MotionButton>
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <SlideUp className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-400">
            Tier Breakdown
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-brown-50 mt-2">
            DETAILED FEATURE MATRIX
          </h2>
        </SlideUp>

        <div className="overflow-x-auto rounded-2xl border border-brown-800/80 glass-panel">
          <table className="w-full text-left text-sm">
            <thead className="bg-charcoal-900 border-b border-brown-800/80 text-xs uppercase tracking-wider text-gold-400">
              <tr>
                <th className="p-5 font-bold">Privilege / Feature</th>
                <th className="p-5 text-center font-bold">Essential Club</th>
                <th className="p-5 text-center font-bold text-gold-300">Elite Performance</th>
                <th className="p-5 text-center font-bold">Executive Black</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brown-900/60 text-brown-200">
              {COMPARISON_FEATURES.map((row, idx) => (
                <tr key={idx} className="hover:bg-brown-900/20 transition-colors">
                  <td className="p-4 font-semibold text-brown-100">{row.name}</td>

                  {/* Essential */}
                  <td className="p-4 text-center">
                    {typeof row.essential === 'boolean' ? (
                      row.essential ? (
                        <Check className="w-5 h-5 text-gold-accent mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-brown-600 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs font-bold text-brown-300">{row.essential}</span>
                    )}
                  </td>

                  {/* Elite */}
                  <td className="p-4 text-center bg-brown-900/20">
                    {typeof row.elite === 'boolean' ? (
                      row.elite ? (
                        <Check className="w-5 h-5 text-gold-accent mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-brown-600 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs font-bold text-gold-400">{row.elite}</span>
                    )}
                  </td>

                  {/* Executive */}
                  <td className="p-4 text-center">
                    {typeof row.executive === 'boolean' ? (
                      row.executive ? (
                        <Check className="w-5 h-5 text-gold-accent mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-brown-600 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs font-bold text-brown-100">{row.executive}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-400">
            Frequently Answered Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-brown-50 mt-2">
            MEMBERSHIP INQUIRIES
          </h2>
        </SlideUp>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-brown-800/80 glass-panel overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base text-brown-50">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gold-accent shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-brown-300 leading-relaxed border-t border-brown-900/60 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
