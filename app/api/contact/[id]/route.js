import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const updated = await db.update('contact_submissions', id, {
      is_read: Boolean(body.is_read),
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry status updated',
      data: updated,
    });
  } catch (error) {
    console.error('Update contact submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update inquiry status' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = await db.delete('contact_submissions', id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Inquiry not found or already removed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    console.error('Delete contact submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
