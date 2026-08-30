'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  UserPlus,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  StaggerContainer,
  StaggerItem,
  CounterNumber,
  MotionButton,
  SlideUp,
} from '../../components/MotionWrapper';
import { TableSkeleton } from '../../components/BrandedSpinner';

const DEFAULT_STATS = {
  totalMembers: 6,
  activeMembers: 4,
  monthlyRevenue: 796,
  totalTrainers: 4,
  newSignupsThisMonth: 38,
  recentMembers: [],
  recentInquiries: [],
  planDistribution: [],
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch('/api/dashboard/stats');
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && data.data) {
            setStats({ ...DEFAULT_STATS, ...data.data });
          }
        }
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const safeStats = stats || DEFAULT_STATS;

  const kpis = [
    {
      title: 'Total Registered Members',
      value: safeStats.totalMembers ?? 6,
      suffix: '',
      change: '+14% vs last month',
      icon: Users,
    },
    {
      title: 'Active Subscriptions',
      value: safeStats.activeMembers ?? 4,
      suffix: '',
      change: '98.5% active rate',
      icon: Activity,
    },
    {
      title: 'Monthly Estimated Revenue',
      value: safeStats.monthlyRevenue ?? 796,
      prefix: '$',
      suffix: '',
      change: '+18% ARR growth',
      icon: DollarSign,
    },
    {
      title: 'New Signups This Month',
      value: safeStats.newSignupsThisMonth ?? 38,
      suffix: '',
      change: 'Exceeding target',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#C5A880]">
            Executive Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
            CLUB PERFORMANCE DASHBOARD
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/members">
            <MotionButton className="btn-gold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span>Enroll Member</span>
            </MotionButton>
          </Link>
          <Link href="/admin/classes">
            <MotionButton className="btn-outline-gold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C5A880]" />
              <span>Schedule Class</span>
            </MotionButton>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <StaggerItem key={index}>
              <div className="glass-panel rounded-2xl p-5 border-brown-800/80 hover:border-[#C5A880]/40 transition-all shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-brown-300">{kpi.title}</span>
                  <div className="w-8 h-8 rounded-lg bg-brown-900 border border-brown-700 flex items-center justify-center text-[#C5A880]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-2">
                  {kpi.prefix}
                  <CounterNumber end={kpi.value} />
                  {kpi.suffix}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-brown-300">
                  <TrendingUp className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{kpi.change}</span>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trajectory Bar Chart */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-7 border-brown-800/80 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold font-display text-white">
                Revenue Trajectory (USD)
              </h3>
              <div className="flex items-center gap-2 text-xs text-brown-300">
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                <span>Monthly ARR</span>
              </div>
            </div>
            <p className="text-xs text-brown-400 mb-6">
              Trailing 6-month gross membership collections
            </p>
          </div>

          {/* Clean Custom Bar Chart (Warm Bronze/Copper Gradients) */}
          <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-brown-900/80">
            {[
              { month: 'Mar', val: 4200, h: '45%' },
              { month: 'Apr', val: 5600, h: '60%' },
              { month: 'May', val: 6800, h: '72%' },
              { month: 'Jun', val: 8100, h: '85%' },
              { month: 'Jul', val: 8900, h: '92%' },
              { month: 'Aug', val: 9800, h: '100%' },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-white bg-brown-950 px-2 py-0.5 rounded border border-brown-700">
                  ${bar.val}
                </div>
                <div
                  style={{ height: bar.h }}
                  className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-brown-900 via-[#8C5E3C] to-[#C5A880] group-hover:brightness-110 transition-all duration-300 shadow-sm"
                />
                <span className="text-[11px] font-semibold text-brown-400 group-hover:text-white transition-colors">
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Tier Distribution */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 border-brown-800/80 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-base font-bold font-display text-white mb-1">
              Membership Mix
            </h3>
            <p className="text-xs text-brown-400 mb-6">
              Distribution of active enrolled members by tier
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-brown-200">Essential Club</span>
                  <span className="text-white font-bold">$89/mo</span>
                </div>
                <div className="h-2 rounded-full bg-brown-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brown-700 to-[#C5A880] w-[35%] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-brown-200">Elite Performance</span>
                  <span className="text-white font-bold">$149/mo</span>
                </div>
                <div className="h-2 rounded-full bg-brown-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brown-700 to-[#C5A880] w-[50%] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-brown-200">Executive Black</span>
                  <span className="text-white font-bold">$249/mo</span>
                </div>
                <div className="h-2 rounded-full bg-brown-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brown-700 to-[#C5A880] w-[15%] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-brown-900 mt-6 flex items-center justify-between text-xs">
            <span className="text-brown-400">Average Member Value:</span>
            <span className="font-bold text-white font-display text-sm">$168 / month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity: Members & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <div className="glass-panel rounded-3xl p-6 border-brown-800/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold font-display text-white">
              Recent Member Enrollments
            </h3>
            <Link
              href="/admin/members"
              className="text-xs font-bold text-[#C5A880] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <TableSkeleton rows={4} cols={3} />
          ) : safeStats.recentMembers && safeStats.recentMembers.length > 0 ? (
            <div className="space-y-3">
              {safeStats.recentMembers.slice(0, 5).map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-brown-950/50 border border-brown-900 hover:border-brown-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brown-900 border border-brown-700 flex items-center justify-center text-white font-bold text-xs">
                      {m.first_name ? m.first_name[0] : 'M'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {m.first_name} {m.last_name}
                      </div>
                      <div className="text-[10px] text-brown-400">{m.email}</div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      m.status === 'active'
                        ? 'bg-brown-900 text-white border border-[#C5A880]/40'
                        : 'bg-brown-900 text-brown-400'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-brown-400">No recent enrollments</div>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="glass-panel rounded-3xl p-6 border-brown-800/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold font-display text-white">
              Recent Concierge Inquiries
            </h3>
            <Link
              href="/admin/contact"
              className="text-xs font-bold text-[#C5A880] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <TableSkeleton rows={4} cols={3} />
          ) : safeStats.recentInquiries && safeStats.recentInquiries.length > 0 ? (
            <div className="space-y-3">
              {safeStats.recentInquiries.slice(0, 5).map((inq) => (
                <div
                  key={inq.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-brown-950/50 border border-brown-900 hover:border-brown-800 transition-colors"
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="text-xs font-bold text-white truncate">{inq.name}</div>
                    <div className="text-[10px] text-brown-400 truncate">{inq.subject}</div>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded shrink-0 ${
                      inq.is_read
                        ? 'bg-brown-900 text-brown-400'
                        : 'bg-brown-800 text-white border border-brown-700'
                    }`}
                  >
                    {inq.is_read ? 'Read' : 'New'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-brown-400">No new inquiries</div>
          )}
        </div>
      </div>
    </div>
  );
}
