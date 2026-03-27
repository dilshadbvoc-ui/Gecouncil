import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'gec_salt_2024').digest('hex');
}

async function ensureAdminExists(db: Awaited<ReturnType<typeof getDb>>) {
  const existing = await db.collection('admin_users').findOne({ email: 'admin@gecouncil.com' });
  if (!existing) {
    await db.collection('admin_users').insertOne({
      email: process.env.ADMIN_EMAIL || 'admin@gecouncil.com',
      password: hashPassword(process.env.ADMIN_PASSWORD || 'admin123'),
      name: 'Admin',
      role: 'admin',
      createdAt: new Date()
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const db = await getDb();

    // Seed admin if not exists
    await ensureAdminExists(db);

    const user = await db.collection('admin_users').findOne({ email });
    if (!user || user.password !== hashPassword(password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true });
}
