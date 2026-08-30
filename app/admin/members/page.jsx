'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Filter,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  CreditCard,
} from 'lucide-react';
import Modal from '../../../components/Modal';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { MotionButton } from '../../../components/MotionWrapper';
import { BrandedSpinner, TableSkeleton } from '../../../components/BrandedSpinner';
import { useToast } from '../../../components/ToastProvider';

export default function AdminMembersPage() {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    membership_plan_id: 2,
    status: 'active',
    join_date: new Date().toISOString().split('T')[0],
    expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    emergency_contact: '',
  });

  const toast = useToast();

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/members', window.location.origin);
      if (search) url.searchParams.set('search', search);
      if (statusFilter) url.searchParams.set('status', statusFilter);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) setMembers(json.data);

      const plansRes = await fetch('/api/plans');
      const plansJson = await plansRes.json();
      if (plansJson.success) setPlans(plansJson.data);
    } catch (err) {
      toast.error('Failed to load member records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMembers();
  };

  const handleOpenAdd = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      membership_plan_id: plans[0]?.id || 2,
      status: 'active',
      join_date: new Date().toISOString().split('T')[0],
      expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      emergency_contact: '',
    });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (member) => {
    setEditingMember(member);
    setFormData({
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email,
      phone: member.phone,
      membership_plan_id: member.membership_plan_id || 2,
      status: member.status || 'active',
      join_date: member.join_date ? member.join_date.split('T')[0] : '',
      expiry_date: member.expiry_date ? member.expiry_date.split('T')[0] : '',
      emergency_contact: member.emergency_contact || '',
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editingMember);
      const url = isEdit ? `/api/members/${editingMember.id}` : '/api/members';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isEdit ? 'Member details updated' : 'New member enrolled successfully');
        setIsAddOpen(false);
        setEditingMember(null);
        fetchMembers();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch {
      toast.error('Error saving member record');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/members/${deletingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Member record deleted');
        setDeletingId(null);
        fetchMembers();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch {
      toast.error('Error deleting member record');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#C5A880]">
            Member Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
            MANAGE MEMBERS
          </h1>
        </div>

        <MotionButton
          onClick={handleOpenAdd}
          className="btn-gold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Enroll New Member</span>
        </MotionButton>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border-brown-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="luxury-input w-full pl-10 text-xs"
          />
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="luxury-input text-xs bg-charcoal-900 w-full md:w-44"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="frozen">Frozen</option>
            <option value="expired">Expired</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Members Table / Mobile Cards */}
      <div className="glass-panel rounded-3xl border-brown-800/80 overflow-hidden shadow-brown-md">
        {loading ? (
          <div className="p-8">
            <TableSkeleton rows={5} cols={5} />
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-brown-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brown-100 mb-1">No members found</h3>
            <p className="text-brown-400 text-xs">Try adjusting your filters or enroll a new member.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-charcoal-900 border-b border-brown-900 text-xs uppercase tracking-wider text-gold-400">
                <tr>
                  <th className="p-4 font-bold">Athlete</th>
                  <th className="p-4 font-bold">Contact</th>
                  <th className="p-4 font-bold">Tier / Plan</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Expiration</th>
                  <th className="p-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brown-900/60 text-brown-200">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-brown-900/20 transition-colors">
                    <td className="p-4 font-semibold text-brown-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brown-900 border border-gold-accent/30 flex items-center justify-center text-gold-accent font-bold text-xs">
                          {m.first_name ? m.first_name[0] : 'M'}
                        </div>
                        <div>
                          <div>{m.first_name} {m.last_name}</div>
                          <div className="text-[11px] text-brown-400 font-normal">ID #{m.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-xs">
                      <div>{m.email}</div>
                      <div className="text-brown-400">{m.phone}</div>
                    </td>
                    <td className="p-4 text-xs font-semibold text-gold-300">
                      {m.plan_name || 'Executive Plan'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                          m.status === 'active'
                            ? 'bg-gold-500/10 text-gold-accent border border-gold-accent/40'
                            : m.status === 'frozen'
                            ? 'bg-amber-950/60 text-amber-300 border border-amber-800'
                            : 'bg-brown-900 text-brown-400'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-brown-300">
                      {m.expiry_date ? m.expiry_date.split('T')[0] : '2026-01-15'}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(m)}
                          className="p-1.5 rounded-lg bg-brown-900 border border-brown-800 text-brown-300 hover:text-gold-accent hover:bg-brown-800 transition-colors"
                          title="Edit member"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingId(m.id)}
                          className="p-1.5 rounded-lg bg-brown-900 border border-brown-800 text-brown-400 hover:text-rose-400 hover:bg-brown-950 transition-colors"
                          title="Delete member"
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

      {/* Add / Edit Member Modal */}
      <Modal
        isOpen={isAddOpen || Boolean(editingMember)}
        onClose={() => {
          setIsAddOpen(false);
          setEditingMember(null);
        }}
        title={editingMember ? 'Edit Athlete Record' : 'Enroll New Athlete'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                First Name *
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Membership Plan *
              </label>
              <select
                value={formData.membership_plan_id}
                onChange={(e) =>
                  setFormData({ ...formData, membership_plan_id: Number(e.target.value) })
                }
                className="luxury-input w-full text-sm bg-charcoal-900"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.price_monthly}/mo)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Membership Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="luxury-input w-full text-sm bg-charcoal-900"
              >
                <option value="active">Active</option>
                <option value="frozen">Frozen</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Join Date
              </label>
              <input
                type="date"
                value={formData.join_date}
                onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Expiration Date
              </label>
              <input
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Emergency Contact & Phone
            </label>
            <input
              type="text"
              value={formData.emergency_contact}
              onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
              placeholder="e.g. Victoria Sterling (+1 555-987-6543)"
              className="luxury-input w-full text-sm"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <MotionButton
              type="button"
              onClick={() => {
                setIsAddOpen(false);
                setEditingMember(null);
              }}
              className="flex-1 py-3 rounded-xl border border-brown-700 bg-brown-900/40 text-brown-200 font-semibold text-xs uppercase"
            >
              Cancel
            </MotionButton>
            <MotionButton
              type="submit"
              className="flex-1 btn-gold py-3 rounded-xl font-bold text-xs uppercase"
            >
              Save Member
            </MotionButton>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Remove Member Record"
        message="Are you sure you want to remove this athlete record from the active roster? Membership access will be suspended immediately."
      />
    </div>
  );
}
