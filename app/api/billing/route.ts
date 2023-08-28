import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import NodeCache from 'node-cache';

const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 }); // Cache for 1 hour, check every 10 minutes

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await getAuthSession();
    if (!session || !session.user?.email) {
      console.debug("No session found or email missing from session.");
      return NextResponse.json({ error: true, message: 'Not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      console.debug(`No user found for email: ${session.user.email}`);
      return NextResponse.json({ error: true, message: 'User not found' }, { status: 404 });
    }

    const { email, ciEmail, ciApiKey } = user;

    if (!ciApiKey) {
      console.debug("ciApiKey is missing. Can't proceed with the request.");
      return NextResponse.json({ error: true, message: 'ciApiKey is required for the request' }, { status: 400 });
    }

    const { month, year } = getCurrentMonthAndYear(req);
    const userEmail = ciEmail || email;

    // Construct cache key
    const cacheKey = `billing:${userEmail}:${month}:${year}`;

    // Check if data is in cache
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      return NextResponse.json(cachedData, {
        status: 200,
        headers: {
          'Cache-Control': 's-maxage=3600, stale-while-revalidate'
        }
      });
    }

    const apiUrl = constructApiUrl(userEmail, ciApiKey, month, year);
    console.debug(`Fetching data from API: ${apiUrl}`);

    const response = await axios.get(apiUrl);

    if (response.data.status === "error" || response.data.status === "empty") {
      if (response.data.message === "key/email mismatch") {
        return NextResponse.json({
          error: true,
          ciApiKey,
          email: email
        }, { status: 404 });
      }

      return NextResponse.json({ message: response.data.message });
    }

    // If response data is valid, cache it
    myCache.set(cacheKey, response.data);

    return NextResponse.json(response.data, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate'
      }
    });

  } catch (error: any) {
    console.error(`Error encountered: ${error.message}`);
    return NextResponse.json({ error: true, message: error.message }, { status: 500 });
  }
}

function getCurrentMonthAndYear(req: NextRequest): { month: string, year: string } {
  const host = req.headers.get('host') || '';
  const url = new URL(req.url, `http://${host}`);
  const month = url.searchParams.get('month') || (new Date().getMonth() + 1).toString();
  const year = url.searchParams.get('year') || new Date().getFullYear().toString();
  return { month, year };
}


function constructApiUrl(email: string, apiKey: string, month: string, year: string): string {
  return `${process.env.CI_API_URL}?email=${email}&key=${apiKey}&month=${month}&year=${year}`;
}
