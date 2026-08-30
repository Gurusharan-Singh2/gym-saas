'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, ArrowRight, Search, BookOpen } from 'lucide-react';
import { SlideUp, StaggerContainer, StaggerItem, MotionButton } from '../../components/MotionWrapper';
import { BrandedSpinner } from '../../components/BrandedSpinner';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch('/api/blog');
        const data = await res.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const categories = ['All', ...new Set(posts.map((p) => p.category))];

  const filteredPosts = posts.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch =
      searchTerm === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-charcoal-950 text-brown-50 pt-12 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <SlideUp>
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-gold-400">
            Evidence-Based Athletic Intel
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-brown-50 mt-3 mb-4">
            THE PERFORMANCE JOURNAL
          </h1>
          <p className="max-w-2xl mx-auto text-brown-300 text-sm sm:text-base leading-relaxed">
            Deep-dives into sports science, contrast therapy protocols, periodization architectures, and precision sports nutrition.
          </p>
        </SlideUp>
      </div>

      {/* Search & Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'btn-gold shadow-gold-sm'
                  : 'bg-brown-900/40 border border-brown-800 text-brown-300 hover:text-brown-100 hover:bg-brown-900/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search performance articles..."
            className="luxury-input w-full pl-10 text-xs"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 flex justify-center">
            <BrandedSpinner size="lg" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-charcoal-900/40 rounded-3xl border border-brown-900">
            <BookOpen className="w-12 h-12 text-brown-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brown-100 mb-1">No articles found</h3>
            <p className="text-brown-400 text-xs">
              Try adjusting your search query or category filter.
            </p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <StaggerItem key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-3xl overflow-hidden glass-panel border-brown-800/80 hover:border-gold-accent/50 transition-all duration-300 hover:shadow-gold-md h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden bg-brown-950">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-brown-950/80 border border-gold-accent/40 text-[10px] uppercase font-bold tracking-wider text-gold-300 backdrop-blur-md">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-brown-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gold-accent" />
                          {post.read_time}
                        </span>
                        <span>•</span>
                        <span>{post.author_name}</span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-brown-50 group-hover:text-gold-accent transition-colors mb-3 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-brown-300 line-clamp-3 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-brown-900/60 pt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-gold-400 group-hover:text-gold-300 inline-flex items-center gap-1.5">
                      <span>Read Full Protocol</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  );
}
