import { prisma } from '@/lib/db/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function PATCH(request: NextRequest) {

  try {
    const data = await request.json();
    const { id } = data;
    if (!id) {
      const newSession = await prisma.studentSession.create({
        data: {
          ...data,
        }
      })
      return NextResponse.json(newSession, { status: 201 });
    } else {
      const updatedSession = await prisma.studentSession.update({
        where: { id },
        data: {
          ...data,
        }
      })
      return NextResponse.json(updatedSession, { status: 200 });
    }


  } catch (error) {
    return NextResponse.json("STEP_A_ERROR", { status: 500 })
  }

}
