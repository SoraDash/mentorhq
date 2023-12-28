import { promises as fsPromises } from 'fs';
import path from 'path';

import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

import { prisma } from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const url = `${process.env.NEXT_PUBLIC_URL}/view/invoice/${data.invoiceId}?code=${data.invoiceCode}`;

    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });
    const downloadsDir = path.resolve('./public/downloads');
    const filePath = path.join(downloadsDir, `invoice-${data.invoiceId}.pdf`);

    // Ensure the downloads directory exists
    await fsPromises.mkdir(downloadsDir, { recursive: true });

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      path: `invoice-${data.invoiceID}.pdf`,
      format: 'A4',
    });

    await fsPromises.writeFile(filePath, pdfBuffer);

    await browser.close();
    await prisma.invoice.update({
      where: {
        id: data.invoiceId,
      },
      data: {
        downloadUrl: `${process.env.NEXT_PUBLIC_URL}/downloads/invoice-${data.invoiceId}.pdf`,
      },
    });

    return NextResponse.json(
      {
        downloadUrl: `${process.env.NEXT_PUBLIC_URL}/downloads/invoice-${data.invoiceId}.pdf`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in POST route:', error);

    return NextResponse.json(
      { message: 'Error processing PATCH request' },
      { status: 500 },
    );
  }
}
