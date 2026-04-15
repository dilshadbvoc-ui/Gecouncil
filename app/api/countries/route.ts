import { NextRequest, NextResponse } from 'next/server';
import { getCountries, createCountry } from '@/lib/data-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const countries = await getCountries({ category });
    return NextResponse.json(countries);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const country = await createCountry(data);
    return NextResponse.json(country, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create country' }, { status: 500 });
  }
}
