import { NextRequest, NextResponse } from 'next/server';

import generatePDF from '@/lib/invoice/pdfGeneration'; // import your generatePDF function

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { downloadUrl } = await generatePDF(data.invoiceId, data.invoiceCode);

    return NextResponse.json({ downloadUrl }, { status: 200 });
  } catch (error) {
    console.error('Error in POST route:', error);

    return NextResponse.json(
      { message: 'Error processing request' },
      { status: 500 },
    );
  }
}
