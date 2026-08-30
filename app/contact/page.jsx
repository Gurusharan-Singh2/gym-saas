'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { SlideUp, MotionButton } from '../../components/MotionWrapper';
import { useToast } from '../../components/ToastProvider';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Private Executive Membership Tour',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        toast.success('Inquiry received. Our concierge team will reach out shortly.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Private Executive Membership Tour',
          message: '',
        });
      } else {
        toast.error(data.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-charcoal-950 text-brown-50 pt-12 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <SlideUp>
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-gold-400">
            Private Concierge
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-brown-50 mt-3 mb-4">
            CONNECT WITH AURA
          </h1>
          <p className="max-w-2xl mx-auto text-brown-300 text-sm sm:text-base leading-relaxed">
            Whether you are arranging a private facility tour, inquiring about corporate executive memberships, or consulting with sports science staff, we welcome your correspondence.
          </p>
        </SlideUp>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information & Hours (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <SlideUp>
              <div className="glass-panel rounded-3xl p-8 border-brown-800/80">
                <h3 className="text-2xl font-bold font-display text-brown-50 mb-6">
                  FLAGSHIP CLUB
                </h3>

                <ul className="space-y-6 text-sm">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brown-900 border border-gold-accent/30 flex items-center justify-center text-gold-accent shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-brown-50 text-base">Clubhouse Location</div>
                      <div className="text-brown-300 mt-1">
                        450 Lexington Avenue, Luxury District
                        <br />
                        New York, NY 10017
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brown-900 border border-gold-accent/30 flex items-center justify-center text-gold-accent shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-brown-50 text-base">Concierge Telephone</div>
                      <div className="text-brown-300 mt-1">+1 (800) 555-AURA (2872)</div>
                      <div className="text-xs text-gold-400 mt-0.5">Direct Member Support Available 24/7</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brown-900 border border-gold-accent/30 flex items-center justify-center text-gold-accent shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-brown-50 text-base">Email Inquiries</div>
                      <div className="text-brown-300 mt-1">concierge@auragym.com</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brown-900 border border-gold-accent/30 flex items-center justify-center text-gold-accent shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-brown-50 text-base">Hours of Operation</div>
                      <div className="text-brown-300 mt-1">
                        <span className="text-brown-100 font-semibold">Monday – Friday:</span> 05:00 AM – 11:00 PM
                      </div>
                      <div className="text-brown-300">
                        <span className="text-brown-100 font-semibold">Saturday – Sunday:</span> 06:00 AM – 10:00 PM
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </SlideUp>
          </div>

          {/* Contact & Inquiries Form (7 Cols) */}
          <div className="lg:col-span-7">
            <SlideUp delay={0.15}>
              <div className="glass-panel rounded-3xl p-8 sm:p-10 border-brown-800/80 shadow-brown-lg">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-brown-50">
                      SEND AN INQUIRY
                    </h3>
                    <p className="text-xs text-brown-400 mt-1">
                      Our membership director will review and reply within one business day.
                    </p>
                  </div>
                  <Sparkles className="w-6 h-6 text-gold-accent" />
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-gold-500/10 border border-gold-accent/40 text-center animate-fade-in">
                    <CheckCircle2 className="w-12 h-12 text-gold-accent mx-auto mb-3" />
                    <h4 className="text-xl font-bold font-display text-brown-50 mb-2">
                      Inquiry Received
                    </h4>
                    <p className="text-xs sm:text-sm text-brown-300 max-w-md mx-auto mb-6">
                      Thank you for contacting AURA ATHLETICS. A private concierge specialist will connect with you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs uppercase font-bold text-gold-400 hover:text-gold-300 underline"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Richard Kensington"
                          className="luxury-input w-full text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="r.kensington@example.com"
                          className="luxury-input w-full text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="luxury-input w-full text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-2">
                          Subject / Inquiry Type
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="luxury-input w-full text-sm bg-charcoal-900"
                        >
                          <option value="Private Executive Membership Tour">
                            Private Executive Membership Tour
                          </option>
                          <option value="3-Day Trial Pass Request">
                            3-Day Trial Pass Request
                          </option>
                          <option value="Personal Coaching Consultation">
                            Personal Coaching Consultation
                          </option>
                          <option value="Corporate / Executive Accounts">
                            Corporate / Executive Accounts
                          </option>
                          <option value="Other Inquiries">Other Inquiries</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Please share your athletic goals, preferred time for a walkthrough, or questions..."
                        className="luxury-input w-full text-sm resize-none"
                      />
                    </div>

                    <MotionButton
                      type="submit"
                      disabled={submitting}
                      className="btn-gold w-full py-4 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'Transmitting Inquiry...' : 'Submit Inquiry'}</span>
                    </MotionButton>
                  </form>
                )}
              </div>
            </SlideUp>
          </div>
        </div>
      </div>
    </div>
  );
}
