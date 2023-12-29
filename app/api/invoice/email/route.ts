import { NextRequest, NextResponse } from 'next/server';

import { resend } from '@/lib/emails/resend';
import generatePDF from '@/lib/invoice/pdfGeneration';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const generatedPDF = await generatePDF(data.invoiceId, data.invoiceCode);

    // Send email with attachment
    await resend.emails.send({
      from: 'MentorHQ <billing@mentorhq.app>',
      to: ['simen.dehlin@gmail.com'],
      subject: 'Invoice',
      attachments: [
        {
          path: generatedPDF.downloadUrl,
          filename: 'invoice.pdf',
        },
      ],
      html: '<h1>Thanks for the payment</h1>',
      text: 'Thanks for the payment',
    });

    return NextResponse.json({ generatePDF }, { status: 200 });
  } catch (error) {
    console.error('Error in POST route:', error);

    return NextResponse.json(
      { message: 'Error processing request' },
      { status: 500 },
    );
  }
}
