import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { prisma } from '@/lib/db/prisma';
import InvoiceEmail from '@/lib/emails/invoice-email';
import generatePDF from '@/lib/invoice/pdfGeneration';

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  console.log();

  try {
    console.log('Received request for invoice processing');

    const data = await request.json();

    console.log('Request data:', data);

    const generatedPDF = await generatePDF(data.invoiceId, data.invoiceCode);

    console.log('Generated PDF:', generatedPDF);

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: data.invoiceId,
      },
    });

    if (!invoice) {
      console.error('Invoice not found for ID:', data.invoiceId);

      return NextResponse.json(
        { message: 'Invoice not found' },
        { status: 404 },
      );
    }

    console.log('Found invoice:', invoice);

    // Send email with attachment
    const emailResponse = await resend.emails.send({
      from: 'MentorHQ <billing@mentorhq.app>',
      to: ['simen.dehlin@gmail.com'],
      subject: `Your Latest Adventure with DigitalFairytales: Invoice #${data.invoiceCode} Awaits!`,

      attachments: [
        {
          path: generatedPDF.downloadUrl,
          filename: 'invoice.pdf',
        },
      ],
      react: InvoiceEmail({
        code: data.invoiceCode,
        downloadUrl: generatedPDF.downloadUrl,
        dueDate: new Date(invoice.dueDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        id: invoice.id,
        invoice_id: data.invoiceId,

        totalAmount: invoice.totalAmount,
      }),
    });

    emailResponse.error
      ? console.log('Email sent response:', emailResponse.error)
      : console.log('Email sent response:', emailResponse.data);

    return NextResponse.json({ generatePDF }, { status: 200 });
  } catch (error: any) {
    console.error('Error in POST route:', error);

    return NextResponse.json(
      { message: 'Error processing request', error: error.message },
      { status: 500 },
    );
  }
}
