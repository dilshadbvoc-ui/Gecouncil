import { NextRequest, NextResponse } from 'next/server';

// Example data - replace with database queries
const programs = [
  {
    id: 1,
    name: 'Computer Science',
    university: 'MIT',
    country: 'USA',
    duration: '4 years',
    tuition: '$53,790/year',
  },
  {
    id: 2,
    name: 'Business Administration',
    university: 'Harvard',
    country: 'USA',
    duration: '4 years',
    tuition: '$54,269/year',
  },
  {
    id: 3,
    name: 'Engineering',
    university: 'Stanford',
    country: 'USA',
    duration: '4 years',
    tuition: '$56,169/year',
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const country = searchParams.get('country');

    let filteredPrograms = programs;

    if (query) {
      filteredPrograms = filteredPrograms.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.university.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (country) {
      filteredPrograms = filteredPrograms.filter(
        (p) => p.country.toLowerCase() === country.toLowerCase()
      );
    }

    return NextResponse.json({ programs: filteredPrograms }, { status: 200 });
  } catch (error) {
    console.error('Programs API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
