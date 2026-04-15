import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, createTestimonial } from '@/lib/data-store';

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const testimonial = await createTestimonial(data);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
