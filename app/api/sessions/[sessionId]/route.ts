// In /api/sessions/[sessionId].ts
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sessionId: string } },
) {
  try {
    const { sessionId } = params;

    // Deleting the session using Prisma
    await prisma.studentSession.delete({
      where: {
        id: sessionId,
      },
    });

    const responseMessage = `Session with id ${sessionId} deleted successfully`;

    console.log(responseMessage);

    return NextResponse.json({ message: responseMessage }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE route:', error);

    // You might want to check for specific error types, like record not found
    return NextResponse.json(
      { message: 'Error processing DELETE request' },
      {
        status: 500,
      },
    );
  }
}
