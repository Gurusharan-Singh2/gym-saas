import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { memberSchema } from '../../../../lib/validation';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const member = await db.findById('members', id);

    if (!member) {
      return NextResponse.json(
        { success: false, message: 'Member not found' },
        { status: 404 }
      );
    }

    const plans = await db.getTable('membership_plans');
    const plan = plans.find((p) => p.id === Number(member.membership_plan_id));

    return NextResponse.json({
      success: true,
      data: {
        ...member,
        plan_name: plan ? plan.name : 'Unknown Tier',
      },
    });
  } catch (error) {
    console.error('Get member error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve member details' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = memberSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid member data' },
        { status: 400 }
      );
    }

    const updated = await db.update('members', id, result.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Member not found or could not be updated' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Member updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Update member error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update member' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = await db.delete('members', id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Member not found or already removed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Member removed successfully',
    });
  } catch (error) {
    console.error('Delete member error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete member' },
      { status: 500 }
    );
  }
}
