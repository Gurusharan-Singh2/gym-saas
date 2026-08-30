'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  Calendar,
  MessageSquare,
  Image,
  BookOpen,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Dumbbell,
} from 'lucide-react';
import { useToast } from '../ToastProvider';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Members', href: '/admin/members', icon: Users },
  { name: 'Trainers & Coaches', href: '/admin/trainers', icon: UserCheck },
  { name: 'Membership Plans', href: '/admin/plans', icon: CreditCard },
  { name: 'Class Schedules', href: '/admin/classes', icon: Calendar },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Gallery Media', href: '/admin/gallery', icon: Image },
  { name: 'Blog Articles', href: '/admin/blog', icon: BookOpen },
  { name: 'Inquiries', href: '/admin/contact', icon: Mail },
  { name: 'Club Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ user: initialUser, onCloseMobile }) {
  const [currentUser, setCurrentUser] = useState(initialUser || null);
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setCurrentUser(data.user);
          }
        }
      } catch {
        // Fallback
      }
    }
    if (!currentUser) {
      loadUser();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Signed out successfully');
      router.push('/login');
      router.refresh();
    } catch {
      toast.error('Logout failed');
    }
  };

  const displayName = currentUser?.name || 'Alexander Vance';
  const displayRole = currentUser?.role || 'Admin';

  return (
    <aside className="w-64 bg-[#110B07] border-r border-brown-900/80 flex flex-col justify-between h-full p-4 overflow-y-auto shrink-0">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-brown-900/80">
          <div className="w-9 h-9 rounded-xl bg-[#C5A880] flex items-center justify-center shadow-sm">
            <Dumbbell className="w-4 h-4 text-brown-950 transform -rotate-45" />
          </div>
          <div>
            <span className="font-display font-black text-base tracking-wider text-white block leading-tight">
              AURA
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-brown-400">
              ADMIN CONSOLE
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-brown-900/90 text-white border border-[#C5A880]/40 shadow-sm'
                    : 'text-brown-300 hover:text-white hover:bg-brown-900/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#C5A880]' : 'text-brown-400 group-hover:text-brown-200'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Area with Always-Visible Profile & Logout */}
      <div className="pt-6 border-t border-brown-900/80 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-brown-300 hover:text-white hover:bg-brown-900/40 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-brown-400" />
            <span>View Public Site</span>
          </span>
          <span className="text-[10px] text-brown-400 font-mono">New Tab</span>
        </Link>

        {/* User Card */}
        <div className="p-3 rounded-xl bg-brown-950/80 border border-brown-900 space-y-2.5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-brown-900 border border-brown-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
              {displayName[0].toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{displayName}</div>
              <div className="text-[10px] text-brown-400 capitalize">{displayRole}</div>
            </div>
          </div>

          {/* Prominent Dedicated Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-lg bg-brown-900/90 hover:bg-rose-950/60 border border-brown-800 hover:border-rose-800 text-brown-300 hover:text-rose-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
