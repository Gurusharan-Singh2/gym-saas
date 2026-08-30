'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Clock,
  User,
  CheckCircle2,
} from 'lucide-react';
import Modal from '../../../components/Modal';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { MotionButton } from '../../../components/MotionWrapper';
import { TableSkeleton } from '../../../components/BrandedSpinner';
import { useToast } from '../../../components/ToastProvider';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Strength & Conditioning',
    author_name: 'Marcus Vance',
    read_time: '6 min read',
    cover_image: '',
    excerpt: '',
    content: '',
    is_published: true,
  });

  const toast = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blog');
      const data = await res.json();
      if (data.success) setPosts(data.data);
    } catch {
      toast.error('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      slug: '',
      category: 'Strength & Conditioning',
      author_name: 'Marcus Vance',
      read_time: '6 min read',
      cover_image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80',
      excerpt: '',
      content: '',
      is_published: true,
    });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingPost(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      category: p.category,
      author_name: p.author_name,
      read_time: p.read_time || '5 min read',
      cover_image: p.cover_image,
      excerpt: p.excerpt,
      content: p.content,
      is_published: Boolean(p.is_published),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editingPost);
      const url = isEdit ? `/api/blog/${editingPost.id}` : '/api/blog';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        slug:
          formData.slug ||
          formData.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-'),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isEdit ? 'Article updated' : 'Article published');
        setIsAddOpen(false);
        setEditingPost(null);
        fetchPosts();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch {
      toast.error('Error saving article');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/blog/${deletingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Article deleted');
        setDeletingId(null);
        fetchPosts();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch {
      toast.error('Error deleting article');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-gold-400">
            Editorial Publications
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brown-50 mt-1">
            BLOG & PERFORMANCE PROTOCOLS
          </h1>
        </div>

        <MotionButton
          onClick={handleOpenAdd}
          className="btn-gold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </MotionButton>
      </div>

      {/* Articles Table */}
      <div className="glass-panel rounded-3xl border-brown-800/80 overflow-hidden shadow-brown-md">
        {loading ? (
          <div className="p-8">
            <TableSkeleton rows={4} cols={4} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-charcoal-900 border-b border-brown-900 text-xs uppercase tracking-wider text-gold-400">
                <tr>
                  <th className="p-4 font-bold">Article Title</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Author</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brown-900/60 text-brown-200">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-brown-900/20 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-brown-50">{p.title}</div>
                      <div className="text-xs text-brown-400 font-normal">
                        Slug: /{p.slug} • {p.read_time}
                      </div>
                    </td>
                    <td className="p-4 text-xs font-semibold text-gold-300">{p.category}</td>
                    <td className="p-4 text-xs text-brown-200">{p.author_name}</td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          p.is_published
                            ? 'bg-gold-500/10 text-gold-accent'
                            : 'bg-brown-900 text-brown-400'
                        }`}
                      >
                        {p.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg bg-brown-900 border border-brown-800 text-brown-300 hover:text-gold-accent transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingId(p.id)}
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

      {/* Modal */}
      <Modal
        isOpen={isAddOpen || Boolean(editingPost)}
        onClose={() => {
          setIsAddOpen(false);
          setEditingPost(null);
        }}
        title={editingPost ? 'Edit Performance Article' : 'Draft Performance Article'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Article Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="luxury-input w-full text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Category *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="luxury-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
                Author *
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
                Read Time
              </label>
              <input
                type="text"
                value={formData.read_time}
                onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                className="luxury-input w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Cover Image URL *
            </label>
            <input
              type="url"
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              required
              className="luxury-input w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Short Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
              rows={2}
              className="luxury-input w-full text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brown-300 mb-1.5">
              Full Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={6}
              className="luxury-input w-full text-sm resize-none font-mono"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <MotionButton
              type="button"
              onClick={() => {
                setIsAddOpen(false);
                setEditingPost(null);
              }}
              className="flex-1 py-3 rounded-xl border border-brown-700 bg-brown-900/40 text-brown-200 font-semibold text-xs uppercase"
            >
              Cancel
            </MotionButton>
            <MotionButton
              type="submit"
              className="flex-1 btn-gold py-3 rounded-xl font-bold text-xs uppercase"
            >
              Publish Article
            </MotionButton>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Article"
        message="Are you sure you want to delete this publication? This action will remove it from the public journal."
      />
    </div>
  );
}
