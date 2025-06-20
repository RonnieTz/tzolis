import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

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

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = verifyToken(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const now = new Date();
    const stats = {
      hour: { total: 0, unique: 0 },
      day: { total: 0, unique: 0 },
      week: { total: 0, unique: 0 },
      month: { total: 0, unique: 0 },
      year: { total: 0, unique: 0 },
      allTime: { total: 0, unique: 0 },
    };

    // Calculate time boundaries
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    // Get total visitors for each time period
    const [
      hourTotal,
      dayTotal,
      weekTotal,
      monthTotal,
      yearTotal,
      allTimeTotal,
    ] = await Promise.all([
      Visitor.countDocuments({ timestamp: { $gte: oneHourAgo } }),
      Visitor.countDocuments({ timestamp: { $gte: oneDayAgo } }),
      Visitor.countDocuments({ timestamp: { $gte: oneWeekAgo } }),
      Visitor.countDocuments({ timestamp: { $gte: oneMonthAgo } }),
      Visitor.countDocuments({ timestamp: { $gte: oneYearAgo } }),
      Visitor.countDocuments(),
    ]);

    // Get unique visitors for each time period using visitorId instead of ip
    const [
      hourUnique,
      dayUnique,
      weekUnique,
      monthUnique,
      yearUnique,
      allTimeUnique,
    ] = await Promise.all([
      Visitor.distinct('visitorId', { timestamp: { $gte: oneHourAgo } }).then(
        (ids) => ids.length
      ),
      Visitor.distinct('visitorId', { timestamp: { $gte: oneDayAgo } }).then(
        (ids) => ids.length
      ),
      Visitor.distinct('visitorId', { timestamp: { $gte: oneWeekAgo } }).then(
        (ids) => ids.length
      ),
      Visitor.distinct('visitorId', { timestamp: { $gte: oneMonthAgo } }).then(
        (ids) => ids.length
      ),
      Visitor.distinct('visitorId', { timestamp: { $gte: oneYearAgo } }).then(
        (ids) => ids.length
      ),
      Visitor.distinct('visitorId').then((ids) => ids.length),
    ]);

    stats.hour = { total: hourTotal, unique: hourUnique };
    stats.day = { total: dayTotal, unique: dayUnique };
    stats.week = { total: weekTotal, unique: weekUnique };
    stats.month = { total: monthTotal, unique: monthUnique };
    stats.year = { total: yearTotal, unique: yearUnique };
    stats.allTime = { total: allTimeTotal, unique: allTimeUnique };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor statistics' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = verifyToken(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { period } = await request.json();

    if (!period) {
      return NextResponse.json(
        { error: 'Period is required' },
        { status: 400 }
      );
    }

    const now = new Date();
    let deleteQuery = {};

    // Define the time boundaries for deletion
    switch (period) {
      case 'hour':
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        deleteQuery = { timestamp: { $gte: oneHourAgo } };
        break;
      case 'day':
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        deleteQuery = { timestamp: { $gte: oneDayAgo } };
        break;
      case 'week':
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        deleteQuery = { timestamp: { $gte: oneWeekAgo } };
        break;
      case 'month':
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        deleteQuery = { timestamp: { $gte: oneMonthAgo } };
        break;
      case 'year':
        const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        deleteQuery = { timestamp: { $gte: oneYearAgo } };
        break;
      case 'allTime':
        deleteQuery = {}; // Delete all records
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid period specified' },
          { status: 400 }
        );
    }

    const result = await Visitor.deleteMany(deleteQuery);

    return NextResponse.json({
      message: `Successfully deleted ${result.deletedCount} visitor records for ${period}`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error deleting visitor data:', error);
    return NextResponse.json(
      { error: 'Failed to delete visitor data' },
      { status: 500 }
    );
  }
}
