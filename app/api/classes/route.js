import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { classSchema } from '../../../lib/validation';

function isTimeOverlap(startA, endA, startB, endB) {
  // HH:MM string comparison
  return startA < endB && startB < endA;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const day = searchParams.get('day');
    const category = searchParams.get('category')?.toLowerCase();
    const trainerId = searchParams.get('trainer');

    let classes = await db.getTable('classes');
    const trainers = await db.getTable('trainers');

    // Attach trainer name and photo
    classes = classes.map((c) => {
      const trainer = trainers.find((t) => t.id === Number(c.trainer_id));
      return {
        ...c,
        trainer_name: trainer ? trainer.name : 'Master Coach',
        trainer_photo: trainer ? trainer.photo_url : null,
      };
    });

    if (day) {
      classes = classes.filter((c) => c.day_of_week.toLowerCase() === day.toLowerCase());
    }

    if (category) {
      classes = classes.filter((c) => c.category.toLowerCase() === category);
    }

    if (trainerId) {
      classes = classes.filter((c) => c.trainer_id === Number(trainerId));
    }

    // Sort by day then time
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    classes.sort((a, b) => {
      const dayDiff = dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week);
      if (dayDiff !== 0) return dayDiff;
      return a.start_time.localeCompare(b.start_time);
    });

    return NextResponse.json({
      success: true,
      data: classes,
      total: classes.length,
    });
  } catch (error) {
    console.error('Fetch classes error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch classes' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = classSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid class data' },
        { status: 400 }
      );
    }

    const { trainer_id, day_of_week, start_time, end_time } = result.data;

    // Trainer double-booking conflict check
    const allClasses = await db.getTable('classes');
    const conflict = allClasses.find(
      (c) =>
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

    const newClass = await db.insert('classes', result.data);
    return NextResponse.json(
      { success: true, message: 'Class scheduled successfully', data: newClass },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create class error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to schedule class' },
      { status: 500 }
    );
  }
}
