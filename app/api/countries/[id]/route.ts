import { NextRequest, NextResponse } from 'next/server';
import { getCountryById, updateCountry, deleteCountry } from '@/lib/data-store';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const country = await getCountryById(params.id);
    if (!country) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(country);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch country' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const country = await updateCountry(params.id, data);
    if (!country) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(country);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update country' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ok = await deleteCountry(params.id);
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete country' }, { status: 500 });
  }
}
