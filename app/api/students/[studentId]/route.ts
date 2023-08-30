import { getStudent } from '@/lib/students';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { id } = req.params;
  try {
    const student = await getStudent(id);
    if (!student) {
      return new NextResponse('Student not found', { status: 404 });
    }
    return new NextResponse(JSON.stringify(student), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error fetching student:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
