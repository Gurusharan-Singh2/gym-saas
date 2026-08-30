'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Users,
} from 'lucide-react';
import Modal from '../../../components/Modal';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { MotionButton } from '../../../components/MotionWrapper';
import { TableSkeleton } from '../../../components/BrandedSpinner';
import { useToast } from '../../../components/ToastProvider';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CATEGORIES = ['Strength', 'HIIT', 'Pilates', 'Boxing', 'Yoga', 'Recovery'];

export default function AdminClassesPage() {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('All');

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Strength',
    level: 'All Levels',
    duration_minutes: 50,
    capacity: 16,
    intensity: 'High',
    image_url: '',
    trainer_id: 1,
    day_of_week: 'Monday',
    start_time: '07:00',
    end_time: '07:50',
    is_active: true,
  });

  const toast = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [classRes, trainerRes] = await Promise.all([
        fetch('/api/classes'),
        fetch('/api/trainers'),
      ]);
      const classJson = await classRes.json();
      const trainerJson = await trainerRes.json();

      if (classJson.success) setClasses(classJson.data);
      if (trainerJson.success) setTrainers(trainerJson.data);
    } catch {
      toast.error('Failed to load classes or trainers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Strength',
      level: 'All Levels',
      duration_minutes: 50,
      capacity: 16,
      intensity: 'High',
      image_url: '',
      trainer_id: trainers[0]?.id || 1,
      day_of_week: selectedDay !== 'All' ? selectedDay : 'Monday',
      start_time: '08:00',
      end_time: '08:50',
      is_active: true,
    });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingClass(c);
    setFormData({
      title: c.title,
      description: c.description,
      category: c.category,
      level: c.level,
      duration_minutes: c.duration_minutes || 45,
      capacity: c.capacity || 16,
      intensity: c.intensity || 'Medium',
      image_url: c.image_url || '',
      trainer_id: c.trainer_id,
      day_of_week: c.day_of_week,
      start_time: c.start_time,
      end_time: c.end_time,
      is_active: Boolean(c.is_active),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editingClass);
      const url = isEdit ? `/api/classes/${editingClass.id}` : '/api/classes';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isEdit ? 'Class schedule updated' : 'New class scheduled successfully');
        setIsAddOpen(false);
        setEditingClass(null);
        fetchData();
      } else {
        toast.error(data.message || 'Scheduling conflict or error');
      }
    } catch {
      toast.error('Error saving class schedule');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/classes/${deletingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Class session removed');
        setDeletingId(null);
        fetchData();
      } else {
        toast.error(data.message || 'Failed to remove class');
      }
    } catch {
      toast.error('Error deleting class session');
    }
  };

  const filtered = classes.filter((c) => {
    if (selectedDay === 'All') return true;
    return c.day_of_week === selectedDay;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-gold-400">
            Timetable Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brown-50 mt-1">
            CLASS SCHEDULES
          </h1>
        </div>

        <MotionButton
          onClick={handleOpenAdd}
          className="btn-gold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Session</span>
        </MotionButton>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-brown-900">
        <button
          onClick={() => setSelectedDay('All')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            selectedDay === 'All'
              ? 'btn-gold shadow-gold-sm'
              : 'bg-brown-900/40 text-brown-300 hover:text-brown-100'
          }`}
        >
          Full Week ({classes.length})
        </button>
        {DAYS.map((day) => {
          const count = classes.filter((c) => c.day_of_week === day).length;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedDay === day
                  ? 'btn-gold shadow-gold-sm'
                  : 'bg-brown-900/40 text-brown-300 hover:text-brown-100'
              }`}
            >
              <span>{day}</span>
              <span className="text-[10px] opacity-80">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Classes Table */}
      <div className="glass-panel rounded-3xl border-brown-800/80 overflow-hidden shadow-brown-md">
        {loading ? (
          <div className="p-8">
            <TableSkeleton rows={5} cols={5} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-brown-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brown-100 mb-1">No sessions found</h3>
            <p className="text-brown-400 text-xs">Schedule a session for this day or change filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-charcoal-900 border-b border-brown-900 text-xs uppercase tracking-wider text-gold-400">
                <tr>
                  <th className="p-4 font-bold">Session & Discipline</th>
                  <th className="p-4 font-bold">Day & Time</th>
                  <th className="p-4 font-bold">Assigned Coach</th>
                  <th className="p-4 font-bold">Level / Capacity</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brown-900/60 text-brown-200">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-brown-900/20 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-brown-50">{c.title}</div>
                      <div className="text-xs text-gold-400">{c.category} • {c.intensity} Intensity</div>
                    </td>
                    <td className="p-4 text-xs font-semibold text-brown-200">
                      <div className="flex items-center gap-1.5 text-gold-300">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{c.start_time} – {c.end_time}</span>
                      </div>
                      <div className="text-brown-400 font-normal">{c.day_of_week}</div>
                    </td>
                    <td className="p-4 text-xs font-semibold text-brown-100">
                      {c.trainer_name || 'Assigned Coach'}
                    </td>
                    <td className="p-4 text-xs">
                      <div>{c.level}</div>
                      <div className="text-brown-400">Max {c.capacity} Athletes</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          c.is_active
                            ? 'bg-gold-500/10 text-gold-accent'
                            : 'bg-brown-900 text-brown-400'
                        }`}
                      >
                        {c.is_active ? 'Scheduled' : 'Cancelled'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="p-1.5 rounded-lg bg-brown-900 border border-brown-800 text-brown-300 hover:text-gold-accent transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingId(c.id)}
                          className="p-1.5 rounded-lg bg-brown-900 border border-brown-800 text-brown-400 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddOpen || Boolean(editingClass)}
        onClose={() => {
          setIsAddOpen(false);
          setEditingClass(null);
        }}
        title={editingClass ? 'Modify Class Schedule' : 'Schedule Studio Session'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Session Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Category / Discipline *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="luxury-input w-full text-sm bg-charcoal-900"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Assigned Master Coach *
              </label>
              <select
                value={formData.trainer_id}
                onChange={(e) =>
                  setFormData({ ...formData, trainer_id: Number(e.target.value) })
                }
                className="luxury-input w-full text-sm bg-charcoal-900"
              >
                {trainers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.title})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Day of Week *
              </label>
              <select
                value={formData.day_of_week}
                onChange={(e) => setFormData({ ...formData, day_of_week: e.target.value })}
                className="luxury-input w-full text-sm bg-charcoal-900"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Start Time (HH:MM) *
              </label>
              <input
                type="text"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                required
                placeholder="08:00"
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                End Time (HH:MM) *
              </label>
              <input
                type="text"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                required
                placeholder="08:50"
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Level
              </label>
              <input
                type="text"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                placeholder="All Levels"
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Max Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: Number(e.target.value) })
                }
                min="1"
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Intensity
              </label>
              <select
                value={formData.intensity}
                onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
                className="luxury-input w-full text-sm bg-charcoal-900"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Maximum">Maximum</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="luxury-input w-full text-sm resize-none"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <MotionButton
              type="button"
              onClick={() => {
                setIsAddOpen(false);
                setEditingClass(null);
              }}
              className="flex-1 py-3 rounded-xl border border-brown-700 bg-brown-900/40 text-brown-200 font-semibold text-xs uppercase"
            >
              Cancel
            </MotionButton>
            <MotionButton
              type="submit"
              className="flex-1 btn-gold py-3 rounded-xl font-bold text-xs uppercase"
            >
              Save Schedule
            </MotionButton>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Cancel Scheduled Class"
        message="Are you sure you want to cancel and remove this scheduled session? Enrolled athletes will be notified."
      />
    </div>
  );
}
