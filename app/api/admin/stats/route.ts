import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    const [universities, directors, galleries, enquiries, newEnquiries] = await Promise.all([
      db.collection('universities').countDocuments(),
      db.collection('directors').countDocuments(),
      db.collection('galleries').countDocuments(),
      db.collection('enquiries').countDocuments(),
      db.collection('enquiries').countDocuments({ status: 'new' }),
    ]);
    return NextResponse.json({ universities, directors, galleries, enquiries, newEnquiries });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ universities: 0, directors: 0, galleries: 0, enquiries: 0, newEnquiries: 0 });
  }
}
