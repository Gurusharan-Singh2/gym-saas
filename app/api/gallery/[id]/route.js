import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { gallerySchema } from '../../../../lib/validation';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = gallerySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid gallery data' },
        { status: 400 }
      );
    }

    const updated = await db.update('gallery', id, result.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Update gallery error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update gallery item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = await db.delete('gallery', id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (error) {
    console.error('Delete gallery error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
}
