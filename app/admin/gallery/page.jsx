'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Filter,
} from 'lucide-react';
import Modal from '../../../components/Modal';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { MotionButton } from '../../../components/MotionWrapper';
import { TableSkeleton } from '../../../components/BrandedSpinner';
import { useToast } from '../../../components/ToastProvider';

const CATEGORIES = ['Strength', 'Cardio', 'Studio', 'Wellness', 'Facility'];

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Strength',
    image_url: '',
    caption: '',
    sort_order: 1,
    is_active: true,
  });

  const toast = useToast();

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success) setGallery(data.data);
    } catch {
      toast.error('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'Strength',
      image_url:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80',
      caption: '',
      sort_order: (gallery.length || 0) + 1,
      is_active: true,
    });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      image_url: item.image_url,
      caption: item.caption || '',
      sort_order: item.sort_order || 0,
      is_active: Boolean(item.is_active),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editingItem);
      const url = isEdit ? `/api/gallery/${editingItem.id}` : '/api/gallery';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isEdit ? 'Media updated' : 'Media uploaded to gallery');
        setIsAddOpen(false);
        setEditingItem(null);
        fetchGallery();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch {
      toast.error('Error saving media item');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/gallery/${deletingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Media item removed');
        setDeletingId(null);
        fetchGallery();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch {
      toast.error('Error deleting media');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-gold-400">
            Visual Assets
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brown-50 mt-1">
            FACILITY GALLERY & MEDIA
          </h1>
        </div>

        <MotionButton
          onClick={handleOpenAdd}
          className="btn-gold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Media Item</span>
        </MotionButton>
      </div>

      {/* Grid of Media */}
      {loading ? (
        <TableSkeleton rows={4} cols={3} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="rounded-2xl glass-panel border-brown-800/80 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-charcoal-950">
                  <Image src={img.image_url} alt={img.title} fill className="object-cover" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-brown-950/80 border border-gold-accent/40 text-[10px] uppercase font-bold text-gold-300 backdrop-blur-md">
                    {img.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-bold font-display text-brown-50 mb-1">{img.title}</h3>
                  {img.caption && <p className="text-xs text-brown-400 line-clamp-2">{img.caption}</p>}
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-brown-900/60 pt-3 flex items-center justify-between">
                <span className="text-xs text-brown-500">Order #{img.sort_order || 1}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(img)}
                    className="p-1.5 rounded-lg bg-brown-900 border border-brown-800 text-brown-300 hover:text-gold-accent transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingId(img.id)}
                    className="p-1.5 rounded-lg bg-brown-900 border border-brown-800 text-brown-400 hover:text-rose-400 transition-colors"
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
        title={editingItem ? 'Edit Media Asset' : 'Add Gallery Media'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Title / Description *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="luxury-input w-full text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="luxury-input w-full text-sm bg-charcoal-900"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Display Order #
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                min="0"
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Image URL *
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              required
              className="luxury-input w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Caption (Optional)
            </label>
            <input
              type="text"
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              className="luxury-input w-full text-sm"
            />
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
              Save Media
            </MotionButton>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Gallery Visual"
        message="Are you sure you want to remove this photo from the public facility gallery?"
      />
    </div>
  );
}
