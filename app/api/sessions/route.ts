import { NextRequest, NextResponse } from 'next/server';

import { getUser } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const user = await getUser();

    const sessionData = {
      date: data.date,
      duration: parseInt(data.duration),
      summary: data.summary,
      notes: data.personalNotes,
      type: data.session?.label,
      progress: data.progress?.value,
      submissionType: data.submissionType?.value,
      follow_up: data.follow_up?.value,
      student: {
        connect: { id: data.studentId },
      },
      // Only add project if it's provided and has a value
      ...(data.project &&
        data.project.value && {
          project: {
            connect: { id: data.project.value },
          },
        }),
      // Only add user if it's available
      ...(user &&
        user.id && {
          user: {
            connect: { id: user.id },
          },
        }),
    };

    let sessionResponse;

    if (data.id) {
      // Update existing StudentSession
      sessionResponse = await prisma.studentSession.update({
        where: { id: data.id },
        data: sessionData,
      });
    } else {
      // Create new StudentSession
      sessionResponse = await prisma.studentSession.create({
        data: sessionData,
      });
    }

    console.log('Session response:', sessionResponse);

    return NextResponse.json(sessionResponse);
  } catch (error) {
    console.error('Error in PATCH route:', error);

    return NextResponse.json(
      { message: 'Error processing PATCH request' },
      { status: 500 },
    );
  }
}
