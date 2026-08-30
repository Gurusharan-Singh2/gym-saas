import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { planSchema } from '../../../../lib/validation';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const plan = await db.findById('membership_plans', id);

    if (!plan) {
      return NextResponse.json(
        { success: false, message: 'Membership plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error('Get plan error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve plan details' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = planSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid plan data' },
        { status: 400 }
      );
    }

    const updated = await db.update('membership_plans', id, result.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Plan updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Update plan error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update plan' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = await db.delete('membership_plans', id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Plan not found or already removed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Plan removed successfully',
    });
  } catch (error) {
    console.error('Delete plan error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete plan' },
      { status: 500 }
    );
  }
}
