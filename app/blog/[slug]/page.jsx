'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, User, Calendar, Share2, Sparkles } from 'lucide-react';
import { SlideUp, MotionButton } from '../../../components/MotionWrapper';
import { BrandedSpinner } from '../../../components/BrandedSpinner';
import { useToast } from '../../../components/ToastProvider';

export default function BlogPostDetail() {
  const params = useParams();
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const res = await fetch(`/api/blog?slug=${slug}`);
        const data = await res.json();
        if (data.success) {
          setPost(data.data);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchPost();
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Article link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-charcoal-950">
        <BrandedSpinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-charcoal-950">
        <h2 className="text-2xl font-bold font-display text-brown-50 mb-3">Article Not Found</h2>
        <p className="text-brown-300 text-sm mb-6">
          The requested publication could not be retrieved.
        </p>
        <Link href="/blog">
          <MotionButton className="btn-gold px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold">
            Back to Journal
          </MotionButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-charcoal-950 text-brown-50 pt-8 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-brown-400 hover:text-gold-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </Link>
        </div>

        {/* Category & Title */}
        <SlideUp>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-400">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-brown-50 mt-2 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-brown-900 text-xs text-brown-400">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-brown-200">By {post.author_name}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-accent" />
                {post.read_time}
              </span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brown-900 border border-brown-800 text-brown-200 hover:text-gold-accent transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Intel</span>
            </button>
          </div>
        </SlideUp>

        {/* Hero Cover Image */}
        <div className="relative h-[420px] w-full rounded-3xl overflow-hidden border border-brown-800/80 mb-12 shadow-brown-lg">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-brown-200 text-base sm:text-lg leading-relaxed space-y-6">
          <p className="text-xl text-brown-100 font-medium leading-relaxed italic border-l-2 border-gold-accent pl-6 py-1">
            {post.excerpt}
          </p>

          <div className="whitespace-pre-line pt-4 text-brown-200 leading-relaxed font-normal">
            {post.content}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-brown-950 to-charcoal-900 border border-gold-accent/30 text-center">
          <Sparkles className="w-6 h-6 text-gold-accent mx-auto mb-3" />
          <h3 className="text-2xl font-bold font-display text-brown-50 mb-2">
            EXPERIENCE EVIDENCE-BASED TRAINING
          </h3>
          <p className="text-xs sm:text-sm text-brown-300 max-w-md mx-auto mb-6">
            Put these performance protocols into practice at our flagship facility under master coaching.
          </p>
          <Link href="/pricing">
            <MotionButton className="btn-gold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold">
              Claim 3-Day Executive Pass
            </MotionButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
