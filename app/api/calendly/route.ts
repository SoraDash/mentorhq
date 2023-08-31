import { generateCalendlyEvents } from '@/lib/calendly/fake-events';
import { NextResponse } from 'next/server';

export async function GET() {
  const randomAmount = Math.floor(Math.random() * 10) + 1;
  return NextResponse.json(await generateCalendlyEvents(5))
}