import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'gec_salt_2024').digest('hex');
}

// GET - list admin users (no passwords)
export async function GET() {
  try {
    const db = await getDb();
    const users = await db.collection('admin_users').find({}, { projection: { password: 0 } }).toArray();
    return NextResponse.json(users.map(u => ({ ...u, id: u._id.toString(), _id: undefined })));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST - create or update admin user
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });

    const db = await getDb();
    await db.collection('admin_users').updateOne(
      { email },
      { $set: { email, password: hashPassword(password), name: name || 'Admin', role: 'admin', updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json({ success: true, message: `User ${email} saved` });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
}
