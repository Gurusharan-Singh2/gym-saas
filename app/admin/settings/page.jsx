'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, ShieldCheck, Sparkles, Building, Clock, Globe } from 'lucide-react';
import { SlideUp, MotionButton } from '../../../components/MotionWrapper';
import { BrandedSpinner } from '../../../components/BrandedSpinner';
import { useToast } from '../../../components/ToastProvider';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    site_name: 'AURA ATHLETICS',
    site_tagline: 'The Pinnacle of Strength, Movement & Holistic Wellness',
    contact_email: 'concierge@auragym.com',
    contact_phone: '+1 (800) 555-AURA',
    address: '450 Lexington Avenue, Luxury District, New York, NY 10017',
    hours_weekdays: '05:00 AM – 11:00 PM',
    hours_weekends: '06:00 AM – 10:00 PM',
    instagram_url: 'https://instagram.com/aura_athletics',
    twitter_url: 'https://twitter.com/aura_athletics',
    youtube_url: 'https://youtube.com/@aura_athletics',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && Object.keys(data.data).length > 0) {
          setSettings((prev) => ({ ...prev, ...data.data }));
        }
      } catch {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Club configurations saved successfully');
      } else {
        toast.error(data.message || 'Failed to save settings');
      }
    } catch {
      toast.error('Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <BrandedSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-gold-400">
          Club Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-display text-brown-50 mt-1">
          SITE & FACILITY SETTINGS
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* General Brand Info */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-brown-800/80 space-y-4">
          <h3 className="text-lg font-bold font-display text-brown-50 flex items-center gap-2 pb-3 border-b border-brown-900">
            <Building className="w-5 h-5 text-gold-accent" />
            <span>Brand Identity & Contact</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                name="site_name"
                value={settings.site_name}
                onChange={handleChange}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Brand Tagline
              </label>
              <input
                type="text"
                name="site_tagline"
                value={settings.site_tagline}
                onChange={handleChange}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Concierge Email
              </label>
              <input
                type="email"
                name="contact_email"
                value={settings.contact_email}
                onChange={handleChange}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Concierge Phone
              </label>
              <input
                type="text"
                name="contact_phone"
                value={settings.contact_phone}
                onChange={handleChange}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Flagship Facility Address
            </label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              required
              className="luxury-input w-full text-sm"
            />
          </div>
        </div>

        {/* Operating Hours */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-brown-800/80 space-y-4">
          <h3 className="text-lg font-bold font-display text-brown-50 flex items-center gap-2 pb-3 border-b border-brown-900">
            <Clock className="w-5 h-5 text-gold-accent" />
            <span>Facility Operating Hours</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Weekday Hours (Mon – Fri)
              </label>
              <input
                type="text"
                name="hours_weekdays"
                value={settings.hours_weekdays}
                onChange={handleChange}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Weekend Hours (Sat – Sun)
              </label>
              <input
                type="text"
                name="hours_weekends"
                value={settings.hours_weekends}
                onChange={handleChange}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-brown-800/80 space-y-4">
          <h3 className="text-lg font-bold font-display text-brown-50 flex items-center gap-2 pb-3 border-b border-brown-900">
            <Globe className="w-5 h-5 text-gold-accent" />
            <span>Social Handles & Media</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagram_url"
                value={settings.instagram_url}
                onChange={handleChange}
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Twitter / X URL
              </label>
              <input
                type="url"
                name="twitter_url"
                value={settings.twitter_url}
                onChange={handleChange}
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                YouTube URL
              </label>
              <input
                type="url"
                name="youtube_url"
                value={settings.youtube_url}
                onChange={handleChange}
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <MotionButton
            type="submit"
            disabled={saving}
            className="btn-gold px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Configurations...' : 'Save Settings'}</span>
          </MotionButton>
        </div>
      </form>
    </div>
  );
}
