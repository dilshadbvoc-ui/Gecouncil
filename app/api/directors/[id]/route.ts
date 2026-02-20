import { NextRequest, NextResponse } from 'next/server';
import { getDirectorById, updateDirector, deleteDirector } from '@/lib/data-store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const director = getDirectorById(params.id);
    if (!director) {
      return NextResponse.json({ error: 'Director not found' }, { status: 404 });
    }
    return NextResponse.json(director);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch director' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const updated = updateDirector(params.id, data);
    if (!updated) {
      return NextResponse.json({ error: 'Director not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update director' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = deleteDirector(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Director not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Director deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete director' }, { status: 500 });
  }
}
