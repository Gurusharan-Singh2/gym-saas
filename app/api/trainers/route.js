import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { trainerSchema } from '../../../lib/validation';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty')?.toLowerCase() || '';

    let trainers = await db.getTable('trainers');

    if (specialty) {
      trainers = trainers.filter((t) => {
        const specialties = Array.isArray(t.specialties) ? t.specialties : [];
        return specialties.some((s) => s.toLowerCase().includes(specialty));
      });
    }

    return NextResponse.json({
      success: true,
      data: trainers,
      total: trainers.length,
    });
  } catch (error) {
    console.error('Fetch trainers error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch trainers' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = trainerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid trainer data' },
        { status: 400 }
      );
    }

    const newTrainer = await db.insert('trainers', result.data);
    return NextResponse.json(
      { success: true, message: 'Trainer added successfully', data: newTrainer },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create trainer error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add trainer' },
      { status: 500 }
    );
  }
}
