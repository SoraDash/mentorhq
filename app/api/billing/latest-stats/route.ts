import { getLatestStats } from '@/lib/actions/billing.actions';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const dateParam = url.searchParams.get('date');
  try {
    const date = dateParam ? new Date(dateParam) : undefined;
    const data = await getLatestStats(date);
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