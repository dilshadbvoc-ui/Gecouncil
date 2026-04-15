import { NextRequest, NextResponse } from 'next/server';
import { getSiteSettings, upsertSiteSettings } from '@/lib/data-store';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings || {});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const settings = await upsertSiteSettings(data);
    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
