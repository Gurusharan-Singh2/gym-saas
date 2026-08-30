import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { hashPassword, createToken, COOKIE_NAME } from '../../../../lib/auth';
import { registerSchema } from '../../../../lib/validation';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    const { name, email, password, phone } = result.data;
    const users = await db.getTable('users');
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'An account with this email address already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const newUser = await db.insert('users', {
      name,
      email: email.toLowerCase(),
      password_hash: passwordHash,
      role: 'member',
      phone: phone || null,
      avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=8c5e3c&textColor=faf6f0`,
    });

    const tokenPayload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar_url: newUser.avatar_url,
    };

    const token = await createToken(tokenPayload);

    const response = NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: tokenPayload,
      },
      { status: 201 }
    );

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Could not complete registration. Please try again.' },
      { status: 500 }
    );
  }
}
