import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

// Helper function to create a consistent hash from IP address
function hashIpAddress(ip: string): string {
  // Use a salt to make the hash more secure (should be in environment variables in production)
  const salt =
    process.env.VISITOR_HASH_SALT || 'default-salt-change-in-production';
  return crypto
    .createHash('sha256')
    .update(ip + salt)
    .digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Get IP address from request headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || 'unknown';

    // Create anonymous but consistent visitor ID from IP
    const visitorId = hashIpAddress(ip);

    // Get user agent
    const userAgent = request.headers.get('user-agent') || '';

    // Get page from request body (optional)
    const body = await request.json().catch(() => ({}));
    const page = body.page || 'home';

    // Save visitor data with hashed ID
    const visitor = new Visitor({
      visitorId,
      userAgent,
      page,
    });

    await visitor.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}
