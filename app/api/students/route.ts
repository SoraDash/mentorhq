// api/students.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  studentsFromGoogleSheets,
  getStudents,
  getStudent,
  syncStudentsWithDatabase
} from '@/lib/students/students';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const students = await getStudents();
    return new NextResponse(JSON.stringify(students), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error fetching students:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await syncStudentsWithDatabase();
    return new NextResponse('Sync successful', { status: 200 });
  } catch (error) {
    console.error('Error syncing students:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
