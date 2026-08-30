'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  XCircle,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react';
import Modal from '../../../components/Modal';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { MotionButton } from '../../../components/MotionWrapper';
import { TableSkeleton } from '../../../components/BrandedSpinner';
import { useToast } from '../../../components/ToastProvider';

export default function AdminTrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    specialties: 'Olympic Lifting, Hypertrophy, Biomechanics',
    experience_years: 5,
    photo_url: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    is_active: true,
  });

  const toast = useToast();

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/trainers');
      const data = await res.json();
      if (data.success) setTrainers(data.data);
    } catch {
      toast.error('Failed to load coaches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      title: 'Master Coach',
      bio: '',
      specialties: 'Strength, HIIT, Conditioning',
      experience_years: 5,
      photo_url:
        'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&auto=format&fit=crop&q=80',
      instagram: '',
      twitter: '',
      linkedin: '',
      is_active: true,
    });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTrainer(t);
    setFormData({
      name: t.name,
      title: t.title,
      bio: t.bio,
      specialties: Array.isArray(t.specialties) ? t.specialties.join(', ') : t.specialties || '',
      experience_years: t.experience_years || 1,
      photo_url: t.photo_url || '',
      instagram: t.instagram || '',
      twitter: t.twitter || '',
      linkedin: t.linkedin || '',
      is_active: Boolean(t.is_active),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editingTrainer);
      const url = isEdit ? `/api/trainers/${editingTrainer.id}` : '/api/trainers';
      const method = isEdit ? 'PUT' : 'POST';

      const specialtiesArray = formData.specialties
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        specialties: specialtiesArray,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isEdit ? 'Trainer profile updated' : 'Master coach added to faculty');
        setIsAddOpen(false);
        setEditingTrainer(null);
        fetchTrainers();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch {
      toast.error('Error saving coach record');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/trainers/${deletingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Trainer removed from faculty');
        setDeletingId(null);
        fetchTrainers();
      } else {
        toast.error(data.message || 'Failed to remove trainer');
      }
    } catch {
      toast.error('Error deleting coach record');
    }
  };

  const filtered = trainers.filter(
    (t) =>
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-gold-400">
            Faculty Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brown-50 mt-1">
            TRAINERS & COACHES
          </h1>
        </div>

        <MotionButton
          onClick={handleOpenAdd}
          className="btn-gold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Master Coach</span>
        </MotionButton>
      </div>

      {/* Grid of Coaches */}
      {loading ? (
        <TableSkeleton rows={4} cols={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((trainer) => (
            <div
              key={trainer.id}
              className="rounded-2xl glass-panel border-brown-800/80 overflow-hidden p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-gold-accent/40 shrink-0 shadow-gold-sm">
                    <Image
                      src={trainer.photo_url}
                      alt={trainer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-brown-50">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-gold-400 font-medium">{trainer.title}</p>
                    <span className="text-[10px] text-brown-400">
                      {trainer.experience_years}+ Yrs Experience
                    </span>
                  </div>
                </div>

                <p className="text-xs text-brown-300 line-clamp-3 mb-4 leading-relaxed">
                  {trainer.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {(trainer.specialties || []).map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brown-900 border border-brown-800 text-brown-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-brown-900 flex items-center justify-between">
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    trainer.is_active
                      ? 'bg-gold-500/10 text-gold-accent'
                      : 'bg-brown-900 text-brown-400'
                  }`}
                >
                  {trainer.is_active ? 'Active Coach' : 'Inactive'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(trainer)}
                    className="p-1.5 rounded-lg bg-brown-900 border border-brown-800 text-brown-300 hover:text-gold-accent transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingId(trainer.id)}
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

      {/* Add / Edit Coach Modal */}
      <Modal
        isOpen={isAddOpen || Boolean(editingTrainer)}
        onClose={() => {
          setIsAddOpen(false);
          setEditingTrainer(null);
        }}
        title={editingTrainer ? 'Edit Master Coach' : 'Add New Master Coach'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Full Name *
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
                Professional Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Photo URL *
            </label>
            <input
              type="url"
              value={formData.photo_url}
              onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
              required
              className="luxury-input w-full text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Experience (Years)
              </label>
              <input
                type="number"
                value={formData.experience_years}
                onChange={(e) =>
                  setFormData({ ...formData, experience_years: Number(e.target.value) })
                }
                min="0"
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Active Status
              </label>
              <select
                value={formData.is_active ? '1' : '0'}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.value === '1' })
                }
                className="luxury-input w-full text-sm bg-charcoal-900"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Specialties (Comma Separated) *
            </label>
            <input
              type="text"
              value={formData.specialties}
              onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
              required
              placeholder="Olympic Lifting, Biomechanics, Hypertrophy"
              className="luxury-input w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Biography & Background *
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
              rows={4}
              className="luxury-input w-full text-sm resize-none"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <MotionButton
              type="button"
              onClick={() => {
                setIsAddOpen(false);
                setEditingTrainer(null);
              }}
              className="flex-1 py-3 rounded-xl border border-brown-700 bg-brown-900/40 text-brown-200 font-semibold text-xs uppercase"
            >
              Cancel
            </MotionButton>
            <MotionButton
              type="submit"
              className="flex-1 btn-gold py-3 rounded-xl font-bold text-xs uppercase"
            >
              Save Coach Profile
            </MotionButton>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Remove Master Coach"
        message="Are you sure you want to remove this coach profile? Any assigned scheduled classes may need reassignment."
      />
    </div>
  );
}
