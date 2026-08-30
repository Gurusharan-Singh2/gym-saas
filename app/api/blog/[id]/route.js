import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { blogSchema } from '../../../../lib/validation';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = blogSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid article data' },
        { status: 400 }
      );
    }

    const updated = await db.update('blog_posts', id, result.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Article updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = await db.delete('blog_posts', id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
