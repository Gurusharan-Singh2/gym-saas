import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { blogSchema } from '../../../lib/validation';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');

    let posts = await db.getTable('blog_posts');

    if (slug) {
      const post = posts.find((p) => p.slug === slug);
      if (!post) {
        return NextResponse.json(
          { success: false, message: 'Article not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: post,
      });
    }

    if (category && category !== 'All') {
      posts = posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error('Fetch blog posts error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = blogSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid article data' },
        { status: 400 }
      );
    }

    const newPost = await db.insert('blog_posts', {
      ...result.data,
      published_at: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Article published successfully', data: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create blog post error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to publish article' },
      { status: 500 }
    );
  }
}
