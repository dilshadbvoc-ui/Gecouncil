import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return NextResponse.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    return NextResponse.json({ status: 'error', db: 'disconnected', error: String(error) }, { status: 500 });
  }
}
