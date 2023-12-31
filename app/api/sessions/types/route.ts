import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { studentId: string } },
) {
  const sessions = await prisma.sessionType.findMany({});

  if (!sessions) return NextResponse.json(null, { status: 404 });

  return NextResponse.json(sessions);
}
