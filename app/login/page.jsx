'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dumbbell, Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { SlideUp, MotionButton } from '../../components/MotionWrapper';
import { useToast } from '../../components/ToastProvider';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(`Welcome back, ${data.user.name}!`);
        if (data.user.role === 'admin' || data.user.role === 'staff') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (err) {
      toast.error('Network error during authentication');
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Account Switcher
  const fillCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@auragym.com');
      setPassword('Admin@12345');
    } else if (role === 'staff') {
      setEmail('staff@auragym.com');
      setPassword('Staff@12345');
    } else if (role === 'member') {
      setEmail('member@auragym.com');
      setPassword('Member@12345');
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
              PORTAL AUTHENTICATION
            </h1>
            <p className="text-xs text-zinc-400 mt-1.5 font-medium">
              Sign in to manage club reservations or administrative operations
            </p>
          </div>

          {/* Quick Demo Credentials Switcher */}
          <div className="mb-6 p-4 rounded-2xl bg-[#141418] border border-zinc-800 backdrop-blur-md">
            <div className="text-[11px] uppercase font-bold text-zinc-300 mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>One-Click Demo Accounts</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillCredentials('admin')}
                className="px-2.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-bold text-white hover:bg-white hover:text-black hover:border-white transition-all shadow-sm"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('staff')}
                className="px-2.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-bold text-white hover:bg-white hover:text-black hover:border-white transition-all shadow-sm"
              >
                Staff
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('member')}
                className="px-2.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-bold text-white hover:bg-white hover:text-black hover:border-white transition-all shadow-sm"
              >
                Member
              </button>
            </div>
          </div>

          {/* Main Login Card */}
          <div className="bg-[#141418] p-8 rounded-3xl border border-zinc-800 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-4">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="user@auragym.com"
                    className="w-full bg-[#1A1A20] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 pointer-events-none flex items-center justify-center">
                    <Lock className="w-4 h-4 text-zinc-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#1A1A20] border border-zinc-800 rounded-xl py-3 pl-12 pr-11 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-zinc-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-3">
                <MotionButton
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-black text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span className="text-black font-extrabold text-xs tracking-wider">
                    {loading ? 'Authenticating...' : 'SIGN IN'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
                </MotionButton>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-zinc-800/80 text-center">
              <p className="text-xs text-zinc-400">
                New to AURA Athletics?{' '}
                <Link
                  href="/signup"
                  className="text-white hover:text-zinc-200 font-bold underline transition-colors"
                >
                  Create Membership
                </Link>
              </p>
            </div>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
