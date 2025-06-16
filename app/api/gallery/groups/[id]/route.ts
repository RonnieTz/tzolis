import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import GalleryGroup from '@/models/GalleryGroup';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '@/lib/firebase';

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = verifyToken(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const group = await GalleryGroup.findById(id);
    if (!group) {
      return NextResponse.json(
        { error: 'Gallery group not found' },
        { status: 404 }
      );
    }

    // Delete all images from Firebase Storage
    for (const image of group.images) {
      try {
        const imageRef = ref(storage, `gallery/${group._id}/${image.filename}`);
        await deleteObject(imageRef);
      } catch (error) {
        console.error('Error deleting image from Firebase:', error);
      }
    }

    await GalleryGroup.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Gallery group deleted successfully' });
  } catch (error) {
    console.error('Gallery group deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = verifyToken(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const group = await GalleryGroup.findById(id);
    if (!group) {
      return NextResponse.json(
        { error: 'Gallery group not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadedImages = [];

    for (const file of files) {
      if (file.size === 0) continue;

      const filename = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `gallery/${group._id}/${filename}`);

      const buffer = await file.arrayBuffer();
      const snapshot = await uploadBytes(storageRef, buffer);
      const downloadURL = await getDownloadURL(snapshot.ref);

      uploadedImages.push({
        url: downloadURL,
        filename: filename,
        uploadedAt: new Date(),
      });
    }

    group.images.push(...uploadedImages);
    await group.save();

    return NextResponse.json({
      message: 'Images uploaded successfully',
      images: uploadedImages,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = verifyToken(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { filename } = await request.json();
    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const group = await GalleryGroup.findById(id);
    if (!group) {
      return NextResponse.json(
        { error: 'Gallery group not found' },
        { status: 404 }
      );
    }

    // Find the image to delete
    const imageIndex = group.images.findIndex(
      (image: { filename: string }) => image.filename === filename
    );

    if (imageIndex === -1) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Delete image from Firebase Storage
    try {
      const imageRef = ref(storage, `gallery/${group._id}/${filename}`);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image from Firebase:', error);
      return NextResponse.json(
        { error: 'Failed to delete image from storage' },
        { status: 500 }
      );
    }

    // Remove image from database
    group.images.splice(imageIndex, 1);
    await group.save();

    return NextResponse.json({
      message: 'Image deleted successfully',
      filename,
    });
  } catch (error) {
    console.error('Image deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
