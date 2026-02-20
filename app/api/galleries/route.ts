import { NextRequest, NextResponse } from 'next/server';
import { getPageGalleries, createPageGallery } from '@/lib/data-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    
    const galleries = getPageGalleries(page || undefined);
    return NextResponse.json(galleries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch galleries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newGallery = createPageGallery(data);
    return NextResponse.json(newGallery, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create gallery' }, { status: 500 });
  }
}
