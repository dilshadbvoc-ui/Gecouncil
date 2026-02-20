import { NextRequest, NextResponse } from 'next/server';
import { getUniversities, createUniversity } from '@/lib/data-store';

export async function GET() {
  try {
    const universities = getUniversities();
    return NextResponse.json(universities);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch universities' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newUniversity = createUniversity(data);
    return NextResponse.json(newUniversity, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create university' }, { status: 500 });
  }
}
