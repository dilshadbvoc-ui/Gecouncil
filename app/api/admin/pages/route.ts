import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const db = await getDb();
  const filter = page ? { page } : {};
  const doc = await db.collection('page_content').findOne(filter);
  return NextResponse.json(doc || {});
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  if (!page) return NextResponse.json({ error: 'page param required' }, { status: 400 });

  const data = await request.json();
  const db = await getDb();
  await db.collection('page_content').updateOne(
    { page },
    { $set: { page, ...data, updatedAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ success: true });
}
