import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { classSchema } from '../../../../lib/validation';

function isTimeOverlap(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const classItem = await db.findById('classes', id);

    if (!classItem) {
      return NextResponse.json(
        { success: false, message: 'Class not found' },
        { status: 404 }
      );
    }

    const trainers = await db.getTable('trainers');
    const trainer = trainers.find((t) => t.id === Number(classItem.trainer_id));

    return NextResponse.json({
      success: true,
      data: {
        ...classItem,
        trainer_name: trainer ? trainer.name : 'Master Coach',
      },
    });
  } catch (error) {
    console.error('Get class error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve class details' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = classSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid class data' },
        { status: 400 }
      );
    }

    const { trainer_id, day_of_week, start_time, end_time } = result.data;

    // Trainer double-booking conflict check (excluding current class)
    const allClasses = await db.getTable('classes');
    const conflict = allClasses.find(
      (c) =>
        c.id !== Number(id) &&
        c.is_active &&
        Number(c.trainer_id) === Number(trainer_id) &&
        c.day_of_week.toLowerCase() === day_of_week.toLowerCase() &&
        isTimeOverlap(start_time, end_time, c.start_time, c.end_time)
    );

    if (conflict) {
      return NextResponse.json(
        {
          success: false,
          message: `Schedule Conflict: The trainer is already booked for "${conflict.title}" on ${day_of_week} (${conflict.start_time} - ${conflict.end_time}).`,
        },
        { status: 409 }
      );
    }

    const updated = await db.update('classes', id, result.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Class not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Class updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Update class error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update class schedule' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = await db.delete('classes', id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Class not found or already removed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Class schedule removed successfully',
    });
  } catch (error) {
    console.error('Delete class error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete class' },
      { status: 500 }
    );
  }
}
