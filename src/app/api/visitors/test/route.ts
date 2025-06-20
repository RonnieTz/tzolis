import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

// Test endpoint to verify visitor tracking is working
export async function GET() {
  try {
    await dbConnect();

    // Get the last 5 visitors for testing
    const recentVisitors = await Visitor.find({})
      .sort({ timestamp: -1 })
      .limit(5)
      .select('visitorId timestamp page -_id');

    return NextResponse.json({
      message: 'Visitor tracking test endpoint',
      recentVisitors,
      totalVisitors: await Visitor.countDocuments(),
    });
  } catch (error) {
    console.error('Error in visitor test endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor data' },
      { status: 500 }
    );
  }
}
