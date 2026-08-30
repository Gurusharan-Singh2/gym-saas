import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { trainerSchema } from '../../../../lib/validation';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const trainer = await db.findById('trainers', id);

    if (!trainer) {
      return NextResponse.json(
        { success: false, message: 'Trainer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: trainer,
    });
  } catch (error) {
    console.error('Get trainer error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve trainer details' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = trainerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid trainer data' },
        { status: 400 }
      );
    }

    const updated = await db.update('trainers', id, result.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Trainer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Trainer updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Update trainer error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update trainer' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = await db.delete('trainers', id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Trainer not found or already removed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Trainer deleted successfully',
    });
  } catch (error) {
    console.error('Delete trainer error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete trainer' },
      { status: 500 }
    );
  }
}
