import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db/prisma';

// Handler for PATCH request to update an invoice's paid status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data = await request.json();
    const { isPaid } = data;

    // Update the invoice in the database
    const updatedInvoice = await prisma.invoice.update({
      where: { id },
      data: { ...data, isPaid },
    });

    console.log('Updated invoice:', updatedInvoice);

    return NextResponse.json(updatedInvoice, { status: 200 });
  } catch (error) {
    console.error('Error in PATCH route:', error);

    return NextResponse.json(
      { message: 'Error processing PATCH request' },
      { status: 500 },
    );
  }
}
