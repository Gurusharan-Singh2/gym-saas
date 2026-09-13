import { NextResponse } from 'next/server';
import { WORKOUT_SPLIT, ALL_EXERCISES } from '../../../lib/workoutData';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const day = searchParams.get('day');
    const difficulty = searchParams.get('difficulty');
    const muscle = searchParams.get('muscle');

    // If day is requested, return that specific day split
    if (day) {
      const dayData = WORKOUT_SPLIT.find(
        (d) => d.day.toLowerCase() === day.toLowerCase()
      );
      if (!dayData) {
        return NextResponse.json(
          { success: false, error: 'Day not found' },
          { status: 404 }
        );
      }

      let filteredDay = { ...dayData };
      if (difficulty && difficulty !== 'all') {
        filteredDay.muscles = filteredDay.muscles.map((m) => ({
          ...m,
          exercises: m.exercises.filter(
            (e) => e.difficulty.toLowerCase() === difficulty.toLowerCase()
          ),
        }));
      }

      return NextResponse.json({ success: true, data: filteredDay });
    }

    // Filter flat exercise list if filters are applied
    let exercises = [...ALL_EXERCISES];

    if (difficulty && difficulty !== 'all') {
      exercises = exercises.filter(
        (e) => e.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    if (muscle && muscle !== 'all') {
      exercises = exercises.filter(
        (e) =>
          e.muscle.toLowerCase().includes(muscle.toLowerCase()) ||
          e.muscleGroupId?.toLowerCase() === muscle.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      split: WORKOUT_SPLIT,
      exercises,
      totalExercises: ALL_EXERCISES.length,
    });
  } catch (error) {
    console.error('Workouts API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workouts' },
      { status: 500 }
    );
  }
}
