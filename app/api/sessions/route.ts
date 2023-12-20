import { prisma } from '@/lib/db/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const { studentId } = data;

    // Check for existing session today
    const today = new Date().toISOString().split('T')[0];
    let existingSession = await prisma.project.findFirst({
      where: {
        studentId,
        created_at: today,
      },
    });

    if (existingSession) {
      // Update existing session
      const updatedSession = await prisma.studentSession.update({
        where: { id: existingSession.id },
        data: {
          ...data,
        },
      });
      return NextResponse.json(updatedSession, { status: 200 });
    } else {
      // Create new session with default data
      const newSession = await prisma.studentSession.create({
        data: {
          studentId: studentId,
          // Add other default values here
          ...data,
        },
      });
      return NextResponse.json(newSession, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json("Error processing request", { status: 500 });
  }
}
