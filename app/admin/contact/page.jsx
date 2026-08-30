'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Eye,
  MessageSquare,
} from 'lucide-react';
import Modal from '../../../components/Modal';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { TableSkeleton } from '../../../components/BrandedSpinner';
import { useToast } from '../../../components/ToastProvider';

export default function AdminContactPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingItem, setViewingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const toast = useToast();

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) setInquiries(data.data);
    } catch {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const toggleRead = async (item) => {
    try {
      const res = await fetch(`/api/contact/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: !item.is_read }),
      });
      const data = await res.json();
      if (data.success) {
        toast.info(item.is_read ? 'Marked as unread' : 'Marked as read');
        fetchInquiries();
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleOpenDetail = async (item) => {
    setViewingItem(item);
    if (!item.is_read) {
      await fetch(`/api/contact/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: true }),
      });
      fetchInquiries();
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/contact/${deletingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Inquiry deleted');
        setDeletingId(null);
        fetchInquiries();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch {
      toast.error('Error deleting inquiry');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-gold-400">
            Prospect & Member Correspondence
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brown-50 mt-1">
            CONCIERGE INQUIRIES
          </h1>
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl border-brown-800/80 overflow-hidden shadow-brown-md">
        {loading ? (
          <div className="p-8">
            <TableSkeleton rows={4} cols={4} />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-16">
            <Mail className="w-12 h-12 text-brown-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brown-100 mb-1">No inquiries</h3>
            <p className="text-brown-400 text-xs">All messages have been processed.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-charcoal-900 border-b border-brown-900 text-xs uppercase tracking-wider text-gold-400">
                <tr>
                  <th className="p-4 font-bold">Contact Name</th>
                  <th className="p-4 font-bold">Subject / Inquiry</th>
                  <th className="p-4 font-bold">Date Received</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brown-900/60 text-brown-200">
                {inquiries.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-brown-900/20 transition-colors ${
                      !item.is_read ? 'bg-gold-500/5 font-semibold' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="text-brown-50 font-bold">{item.name}</div>
                      <div className="text-xs text-brown-400 font-normal">{item.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-brown-100">{item.subject}</div>
                      <div className="text-xs text-brown-400 font-normal truncate max-w-xs">
                        {item.message}
                      </div>
                    </td>
                    <td className="p-4 text-xs text-brown-300">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleRead(item)}
                        className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded ${
                          item.is_read
                            ? 'bg-brown-900 text-brown-400'
                            : 'bg-gold-500/20 text-gold-accent border border-gold-accent/40'
                        }`}
                      >
                        {item.is_read ? 'Read' : 'New Message'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="p-1.5 rounded-lg bg-brown-900 border border-brown-800 text-brown-300 hover:text-gold-accent transition-colors"
                          title="View Message"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingId(item.id)}
                          className="p-1.5 rounded-lg bg-brown-900 border border-brown-800 text-brown-400 hover:text-rose-400 transition-colors"
                          title="Delete"
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

      {/* View Detail Modal */}
      <Modal
        isOpen={Boolean(viewingItem)}
        onClose={() => setViewingItem(null)}
        title={viewingItem?.subject || 'Inquiry Details'}
      >
        {viewingItem && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-charcoal-950 border border-brown-900">
              <div>
                <span className="text-[10px] uppercase font-bold text-brown-400 block mb-1">
                  Full Name
                </span>
                <span className="font-bold text-brown-50">{viewingItem.name}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-brown-400 block mb-1">
                  Email Address
                </span>
                <span className="font-bold text-gold-300">{viewingItem.email}</span>
              </div>
              {viewingItem.phone && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-brown-400 block mb-1">
                    Phone
                  </span>
                  <span className="text-brown-100">{viewingItem.phone}</span>
                </div>
              )}
              <div>
                <span className="text-[10px] uppercase font-bold text-brown-400 block mb-1">
                  Date
                </span>
                <span className="text-brown-300">
                  {new Date(viewingItem.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-brown-400 block mb-1.5">
                Message Content
              </span>
              <div className="p-4 rounded-xl bg-charcoal-950 border border-brown-900 text-brown-200 leading-relaxed whitespace-pre-wrap">
                {viewingItem.message}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <a
                href={`mailto:${viewingItem.email}?subject=Re: ${encodeURIComponent(viewingItem.subject)}`}
                className="btn-gold px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Inquiry"
        message="Are you sure you want to permanently delete this message inquiry?"
      />
    </div>
  );
}
