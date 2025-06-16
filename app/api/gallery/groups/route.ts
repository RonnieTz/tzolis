import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import GalleryGroup from '@/models/GalleryGroup';

// Helper function to verify auth token
function verifyToken(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      username: string;
      role: string;
    };
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    await dbConnect();
    const groups = await GalleryGroup.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(groups);
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { name, nameGr, description, descriptionGr } = await request.json();

    if (!name || !nameGr) {
      return NextResponse.json(
        { error: 'Name and Greek name are required' },
        { status: 400 }
      );
    }

    const newGroup = new GalleryGroup({
      name,
      nameGr,
      description: description || '',
      descriptionGr: descriptionGr || '',
      images: [],
    });

    await newGroup.save();

    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.error('Gallery group creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
