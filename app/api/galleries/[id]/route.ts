import { NextRequest, NextResponse } from 'next/server';
import { getPageGalleryById, updatePageGallery, deletePageGallery } from '@/lib/data-store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gallery = getPageGalleryById(id);
    if (!gallery) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updated = updatePageGallery(id, data);
    if (!updated) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update gallery' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = deletePageGallery(id);
    if (!success) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete gallery' }, { status: 500 });
  }
}
