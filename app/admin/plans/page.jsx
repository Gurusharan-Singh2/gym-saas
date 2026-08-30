'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Sparkles,
  DollarSign,
} from 'lucide-react';
import Modal from '../../../components/Modal';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { MotionButton } from '../../../components/MotionWrapper';
import { TableSkeleton } from '../../../components/BrandedSpinner';
import { useToast } from '../../../components/ToastProvider';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tag_line: '',
    price_monthly: 99,
    price_yearly: 990,
    features: 'Full gym floor access\nSteam and sauna amenities\nAURA mobile app access',
    is_popular: false,
    is_active: true,
    sort_order: 1,
  });

  const toast = useToast();

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/plans');
      const data = await res.json();
      if (data.success) setPlans(data.data);
    } catch {
      toast.error('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      slug: '',
      tag_line: '',
      price_monthly: 99,
      price_yearly: 990,
      features: 'Full gym floor access\nSteam and sauna amenities\nAURA mobile app access',
      is_popular: false,
      is_active: true,
      sort_order: (plans.length || 0) + 1,
    });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      slug: plan.slug,
      tag_line: plan.tag_line,
      price_monthly: plan.price_monthly,
      price_yearly: plan.price_yearly,
      features: Array.isArray(plan.features) ? plan.features.join('\n') : plan.features || '',
      is_popular: Boolean(plan.is_popular),
      is_active: Boolean(plan.is_active),
      sort_order: plan.sort_order || 0,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editingPlan);
      const url = isEdit ? `/api/plans/${editingPlan.id}` : '/api/plans';
      const method = isEdit ? 'PUT' : 'POST';

      const featuresArray = formData.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        features: featuresArray,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isEdit ? 'Membership plan updated' : 'Membership plan created');
        setIsAddOpen(false);
        setEditingPlan(null);
        fetchPlans();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch {
      toast.error('Error saving plan');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/plans/${deletingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Membership tier deleted');
        setDeletingId(null);
        fetchPlans();
      } else {
        toast.error(data.message || 'Failed to delete plan');
      }
    } catch {
      toast.error('Error deleting plan');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-gold-400">
            Pricing Structure
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brown-50 mt-1">
            MEMBERSHIP PLANS & TIERS
          </h1>
        </div>

        <MotionButton
          onClick={handleOpenAdd}
          className="btn-gold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Plan</span>
        </MotionButton>
      </div>

      {/* Grid of Plans */}
      {loading ? (
        <TableSkeleton rows={3} cols={3} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const features = Array.isArray(plan.features) ? plan.features : [];

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between glass-panel border transition-all ${
                  plan.is_popular
                    ? 'border-gold-accent shadow-gold-sm bg-charcoal-900'
                    : 'border-brown-800/80'
                }`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-gold-500 text-brown-950 font-black text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Popular Tier</span>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-display text-brown-50">{plan.name}</h3>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        plan.is_active
                          ? 'bg-gold-500/10 text-gold-accent'
                          : 'bg-brown-900 text-brown-400'
                      }`}
                    >
                      {plan.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </div>

                  <p className="text-xs text-brown-300 mb-6">{plan.tag_line}</p>

                  <div className="flex items-baseline gap-1.5 mb-6 pb-4 border-b border-brown-900">
                    <span className="text-3xl font-black font-display text-gold-300">
                      ${plan.price_monthly}
                    </span>
                    <span className="text-xs text-brown-400">/mo (${plan.price_yearly}/yr)</span>
                  </div>

                  <ul className="space-y-2.5 mb-8 text-xs text-brown-200">
                    {features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-accent shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-brown-900 flex items-center justify-between">
                  <span className="text-xs text-brown-400 font-semibold">
                    Order #{plan.sort_order || 1}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(plan)}
                      className="p-2 rounded-lg bg-brown-900 border border-brown-800 text-brown-300 hover:text-gold-accent transition-colors"
                      title="Edit Plan"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingId(plan.id)}
                      className="p-2 rounded-lg bg-brown-900 border border-brown-800 text-brown-400 hover:text-rose-400 transition-colors"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Plan Modal */}
      <Modal
        isOpen={isAddOpen || Boolean(editingPlan)}
        onClose={() => {
          setIsAddOpen(false);
          setEditingPlan(null);
        }}
        title={editingPlan ? 'Edit Membership Tier' : 'Create Membership Tier'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Plan Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Slug (URL Identifier)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="essential-club"
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Tagline / Subheading *
            </label>
            <input
              type="text"
              value={formData.tag_line}
              onChange={(e) => setFormData({ ...formData, tag_line: e.target.value })}
              required
              className="luxury-input w-full text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Monthly Price ($) *
              </label>
              <input
                type="number"
                value={formData.price_monthly}
                onChange={(e) =>
                  setFormData({ ...formData, price_monthly: Number(e.target.value) })
                }
                required
                min="0"
                step="0.01"
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Yearly Price ($) *
              </label>
              <input
                type="number"
                value={formData.price_yearly}
                onChange={(e) =>
                  setFormData({ ...formData, price_yearly: Number(e.target.value) })
                }
                required
                min="0"
                step="0.01"
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Features (One Feature Per Line) *
            </label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              required
              rows={5}
              className="luxury-input w-full text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="is_popular"
                checked={formData.is_popular}
                onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                className="w-4 h-4 rounded border-brown-700 accent-gold-accent bg-charcoal-900"
              />
              <label htmlFor="is_popular" className="text-xs font-semibold text-brown-200">
                Mark as "Most Popular" Tier
              </label>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 rounded border-brown-700 accent-gold-accent bg-charcoal-900"
              />
              <label htmlFor="is_active" className="text-xs font-semibold text-brown-200">
                Active in Public Catalog
              </label>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <MotionButton
              type="button"
              onClick={() => {
                setIsAddOpen(false);
                setEditingPlan(null);
              }}
              className="flex-1 py-3 rounded-xl border border-brown-700 bg-brown-900/40 text-brown-200 font-semibold text-xs uppercase"
            >
              Cancel
            </MotionButton>
            <MotionButton
              type="submit"
              className="flex-1 btn-gold py-3 rounded-xl font-bold text-xs uppercase"
            >
              Save Tier
            </MotionButton>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Membership Tier"
        message="Are you sure you want to delete this pricing tier? Existing members on this plan will maintain their records."
      />
    </div>
  );
}
