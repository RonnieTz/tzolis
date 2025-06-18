import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BusinessSettings from '@/models/BusinessSettings';

export async function GET() {
  try {
    await dbConnect();
    const settings = await BusinessSettings.getSettings();

    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching business settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch business settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    let settings = await BusinessSettings.findOne();

    if (!settings) {
      settings = new BusinessSettings(body);
    } else {
      Object.assign(settings, body);
      settings.lastUpdated = new Date();
    }

    await settings.save();

    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error updating business settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update business settings' },
      { status: 500 }
    );
  }
}
