import { prisma } from '@/lib/db/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { studentId: string } }) {

  const { studentId } = params

  const student = await prisma.student.findUnique({
    where: {
      id: studentId
    },
    include: {
      projects: true,
      Course: true
    }
  })
  return NextResponse.json(student)
}