import { NextRequest, NextResponse } from 'next/server';
import { updateTestimonial, deleteTestimonial } from '@/lib/data-store';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const testimonial = await updateTestimonial(params.id, data);
    if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ok = await deleteTestimonial(params.id);
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
