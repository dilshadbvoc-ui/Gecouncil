import { NextRequest, NextResponse } from 'next/server';
import { getPrograms, createProgram } from '@/lib/data-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const universityId = searchParams.get('universityId') || undefined;
    const programs = await getPrograms({ category, universityId });
    return NextResponse.json(programs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const program = await createProgram(data);
    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}
