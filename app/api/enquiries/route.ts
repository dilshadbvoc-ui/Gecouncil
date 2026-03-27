import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries, createEnquiry } from '@/lib/data-store';

export async function GET() {
  try {
    const enquiries = await getEnquiries();
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newEnquiry = await createEnquiry({ ...data, status: 'new' });
    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
  }
}
