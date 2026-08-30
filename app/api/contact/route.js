import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { contactSchema } from '../../../lib/validation';

export async function GET() {
  try {
    const submissions = await db.getTable('contact_submissions');
    // Sort newest first
    const sorted = [...submissions].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({
      success: true,
      data: sorted,
    });
  } catch (error) {
    console.error('Fetch contact submissions error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid form data' },
        { status: 400 }
      );
    }

    const newSubmission = await db.insert('contact_submissions', {
      ...result.data,
      is_read: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out. Our concierge team will contact you within 24 hours.',
        data: newSubmission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create contact submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
