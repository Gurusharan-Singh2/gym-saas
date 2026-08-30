import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { gallerySchema } from '../../../lib/validation';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let gallery = await db.getTable('gallery');
    if (category && category !== 'All') {
      gallery = gallery.filter((g) => g.category.toLowerCase() === category.toLowerCase());
    }

    const sorted = [...gallery].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

    return NextResponse.json({
      success: true,
      data: sorted,
    });
  } catch (error) {
    console.error('Fetch gallery error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = gallerySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid gallery item data' },
        { status: 400 }
      );
    }

    const newMedia = await db.insert('gallery', result.data);
    return NextResponse.json(
      { success: true, message: 'Image added to gallery', data: newMedia },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create gallery item error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add gallery item' },
      { status: 500 }
    );
  }
}
