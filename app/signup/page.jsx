'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dumbbell, User, Mail, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { SlideUp, MotionButton } from '../../components/MotionWrapper';
import { useToast } from '../../components/ToastProvider';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(`Account created! Welcome, ${data.user.name}.`);
        router.push('/');
      } else {
        toast.error(data.message || 'Registration failed.');
      }
    } catch (err) {
      toast.error('Network error during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#09090B]">
      <div className="max-w-md w-full">
        <SlideUp>
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 shadow-md">
              <Dumbbell className="w-6 h-6 text-black transform -rotate-45" />
            </div>
            <h1 className="text-3xl font-extrabold font-display text-white tracking-tight">
              MEMBER ENROLLMENT
            </h1>
            <p className="text-xs text-zinc-400 mt-1.5 font-medium">
              Create your profile to reserve classes, schedule recovery, and manage membership
            </p>
          </div>

          <div className="bg-[#141418] p-8 rounded-3xl border border-zinc-800 shadow-2xl">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 pointer-events-none flex items-center justify-center">
                    <User className="w-4 h-4 text-zinc-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Richard Kensington"
                    className="w-full bg-[#1A1A20] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 pointer-events-none flex items-center justify-center">
                    <Mail className="w-4 h-4 text-zinc-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="user@example.com"
                    className="w-full bg-[#1A1A20] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 pointer-events-none flex items-center justify-center">
                    <Phone className="w-4 h-4 text-zinc-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#1A1A20] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Choose Password
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 pointer-events-none flex items-center justify-center">
                    <Lock className="w-4 h-4 text-zinc-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full bg-[#1A1A20] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                </div>
              </div>

              <div className="pt-3">
                <MotionButton
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-black text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>{loading ? 'Creating Membership...' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </MotionButton>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-zinc-800/80 text-center">
              <p className="text-xs text-zinc-400">
                Already an enrolled member?{' '}
                <Link
                  href="/login"
                  className="text-white hover:text-zinc-200 font-bold underline transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
