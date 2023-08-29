import { getLatestStats } from '@/lib/billing/stats';
import { NextRequest, NextResponse } from 'next/server';

interface LatestStatsRequest {
  date: Date;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await getLatestStats();
    if (!data) {
      return NextResponse.json({ message: 'No data available' }, { status: 204 });
    } else {
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching latest stats:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}