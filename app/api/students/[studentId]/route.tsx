import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { studentId: string } },
) {
  const { studentId } = params;

  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
    include: {
      projects: true,
      course: true,
    },
  });

  if (!student) return NextResponse.json(null, { status: 404 });

  return NextResponse.json(student);
}
