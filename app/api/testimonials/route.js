import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { testimonialSchema } from '../../../lib/validation';

export async function GET() {
  try {
    const testimonials = await db.getTable('testimonials');
    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error('Fetch testimonials error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = testimonialSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Invalid testimonial data' },
        { status: 400 }
      );
    }

    const newTestimonial = await db.insert('testimonials', result.data);
    return NextResponse.json(
      { success: true, message: 'Testimonial added successfully', data: newTestimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add testimonial' },
      { status: 500 }
    );
  }
}
