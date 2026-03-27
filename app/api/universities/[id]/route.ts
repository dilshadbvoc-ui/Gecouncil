import { NextRequest, NextResponse } from 'next/server';
import { getUniversityById, updateUniversity, deleteUniversity } from '@/lib/data-store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const university = await getUniversityById(id);
    if (!university) return NextResponse.json({ error: 'University not found' }, { status: 404 });
    return NextResponse.json(university);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch university' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updated = await updateUniversity(id, data);
    if (!updated) return NextResponse.json({ error: 'University not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update university' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteUniversity(id);
    if (!success) return NextResponse.json({ error: 'University not found' }, { status: 404 });
    return NextResponse.json({ message: 'University deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete university' }, { status: 500 });
  }
}
