import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { memberSchema } from '../../../lib/validation';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const status = searchParams.get('status') || '';
    const planId = searchParams.get('plan') || '';

    let members = await db.getTable('members');
    const plans = await db.getTable('membership_plans');

    // Attach plan name
    members = members.map((m) => {
      const plan = plans.find((p) => p.id === Number(m.membership_plan_id));
      return {
        ...m,
        plan_name: plan ? plan.name : 'Unknown Tier',
      };
    });

    if (search) {
      members = members.filter(
        (m) =>
          m.first_name?.toLowerCase().includes(search) ||
          m.last_name?.toLowerCase().includes(search) ||
          m.email?.toLowerCase().includes(search) ||
          m.phone?.includes(search)
      );
    }

    if (status) {
      members = members.filter((m) => m.status === status);
    }

    if (planId) {
      members = members.filter((m) => m.membership_plan_id === Number(planId));
    }

    return NextResponse.json({
      success: true,
      data: members,
      total: members.length,
    });
  } catch (error) {
    console.error('Fetch members error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = memberSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid member data' },
        { status: 400 }
      );
    }

    const newMember = await db.insert('members', result.data);
    return NextResponse.json(
      { success: true, message: 'Member enrolled successfully', data: newMember },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create member error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to enroll member' },
      { status: 500 }
    );
  }
}
