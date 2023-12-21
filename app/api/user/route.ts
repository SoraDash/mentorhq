import { NextResponse } from 'next/server';

import { getAuthSession, getUser } from '@/lib/auth/auth';

export async function GET() {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.redirect('/');
  }

  const user = await getUser();

  return NextResponse.json(user);
}

// Set the revalidation time (in seconds).
export const revalidate = 60;
