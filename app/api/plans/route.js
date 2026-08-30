import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { planSchema } from '../../../lib/validation';

export async function GET() {
  try {
    const plans = await db.getTable('membership_plans');
    const sorted = [...plans].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

    return NextResponse.json({
      success: true,
      data: sorted,
    });
  } catch (error) {
    console.error('Fetch plans error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch membership plans' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = planSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid plan data' },
        { status: 400 }
      );
    }

    const newPlan = await db.insert('membership_plans', result.data);
    return NextResponse.json(
      { success: true, message: 'Plan created successfully', data: newPlan },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create plan error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create plan' },
      { status: 500 }
    );
  }
}
