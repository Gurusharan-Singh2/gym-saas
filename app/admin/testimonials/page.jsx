'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import Modal from '../../../components/Modal';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { MotionButton } from '../../../components/MotionWrapper';
import { TableSkeleton } from '../../../components/BrandedSpinner';
import { useToast } from '../../../components/ToastProvider';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    author_name: '',
    author_title: '',
    avatar_url: '',
    quote: '',
    rating: 5,
    is_approved: true,
    is_featured: false,
  });

  const toast = useToast();

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success) setTestimonials(data.data);
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      author_name: '',
      author_title: 'Executive Member',
      avatar_url:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      quote: '',
      rating: 5,
      is_approved: true,
      is_featured: false,
    });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingItem(t);
    setFormData({
      author_name: t.author_name,
      author_title: t.author_title,
      avatar_url: t.avatar_url || '',
      quote: t.quote,
      rating: t.rating || 5,
      is_approved: Boolean(t.is_approved),
      is_featured: Boolean(t.is_featured),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editingItem);
      const url = isEdit ? `/api/testimonials/${editingItem.id}` : '/api/testimonials';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isEdit ? 'Testimonial updated' : 'Testimonial published');
        setIsAddOpen(false);
        setEditingItem(null);
        fetchTestimonials();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch {
      toast.error('Error saving testimonial');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/testimonials/${deletingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Testimonial removed');
        setDeletingId(null);
        fetchTestimonials();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch {
      toast.error('Error deleting testimonial');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-gold-400">
            Social Proof
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brown-50 mt-1">
            MEMBER TESTIMONIALS & REVIEWS
          </h1>
        </div>

        <MotionButton
          onClick={handleOpenAdd}
          className="btn-gold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </MotionButton>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <TableSkeleton rows={4} cols={3} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl glass-panel border-brown-800/80 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {t.avatar_url ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold-accent/40 shrink-0">
                        <Image
                          src={t.avatar_url}
                          alt={t.author_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brown-900 border border-brown-700 flex items-center justify-center text-gold-accent font-bold text-sm">
                        {t.author_name ? t.author_name[0] : 'M'}
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-bold font-display text-brown-50">
                        {t.author_name}
                      </h3>
                      <p className="text-xs text-gold-400">{t.author_title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-gold-accent">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-accent" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-brown-200 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-brown-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      t.is_approved
                        ? 'bg-gold-500/10 text-gold-accent'
                        : 'bg-brown-900 text-brown-400'
                    }`}
                  >
                    {t.is_approved ? 'Approved' : 'Hidden'}
                  </span>
                  {t.is_featured && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-brown-900 border border-gold-accent/40 text-gold-300">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-2 rounded-lg bg-brown-900 border border-brown-800 text-brown-300 hover:text-gold-accent transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingId(t.id)}
                    className="p-2 rounded-lg bg-brown-900 border border-brown-800 text-brown-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isAddOpen || Boolean(editingItem)}
        onClose={() => {
          setIsAddOpen(false);
          setEditingItem(null);
        }}
        title={editingItem ? 'Edit Review' : 'Add Testimonial'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Author Name *
              </label>
              <input
                type="text"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Author Title / Profession *
              </label>
              <input
                type="text"
                value={formData.author_title}
                onChange={(e) => setFormData({ ...formData, author_title: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Avatar Photo URL
              </label>
              <input
                type="url"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Star Rating (1 - 5)
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="luxury-input w-full text-sm bg-charcoal-900"
              >
                <option value="5">5 Stars ★★★★★</option>
                <option value="4">4 Stars ★★★★☆</option>
                <option value="3">3 Stars ★★★☆☆</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Quote & Experience *
            </label>
            <textarea
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              required
              rows={4}
              className="luxury-input w-full text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="is_approved"
                checked={formData.is_approved}
                onChange={(e) => setFormData({ ...formData, is_approved: e.target.checked })}
                className="w-4 h-4 rounded border-brown-700 accent-gold-accent bg-charcoal-900"
              />
              <label htmlFor="is_approved" className="text-xs font-semibold text-brown-200">
                Approved for Public Display
              </label>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 rounded border-brown-700 accent-gold-accent bg-charcoal-900"
              />
              <label htmlFor="is_featured" className="text-xs font-semibold text-brown-200">
                Featured on Homepage Carousel
              </label>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <MotionButton
              type="button"
              onClick={() => {
                setIsAddOpen(false);
                setEditingItem(null);
              }}
              className="flex-1 py-3 rounded-xl border border-brown-700 bg-brown-900/40 text-brown-200 font-semibold text-xs uppercase"
            >
              Cancel
            </MotionButton>
            <MotionButton
              type="submit"
              className="flex-1 btn-gold py-3 rounded-xl font-bold text-xs uppercase"
            >
              Save Review
            </MotionButton>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message="Are you sure you want to remove this member review?"
      />
    </div>
  );
}
