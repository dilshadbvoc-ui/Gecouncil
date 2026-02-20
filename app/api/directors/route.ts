import { NextRequest, NextResponse } from 'next/server';
import { getDirectors, createDirector } from '@/lib/data-store';

export async function GET() {
  try {
    const directors = getDirectors();
    return NextResponse.json(directors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch directors' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newDirector = createDirector(data);
    return NextResponse.json(newDirector, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create director' }, { status: 500 });
  }
}
