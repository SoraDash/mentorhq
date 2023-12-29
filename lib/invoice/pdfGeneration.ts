// pdfGenerator.js
import { promises as fsPromises } from 'fs';
import path from 'path';

import puppeteer from 'puppeteer';

import { prisma } from '@/lib/db/prisma';

async function generatePDF(invoiceId: string, invoiceCode: string) {
  const existingInvoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
  });

  if (existingInvoice && existingInvoice.downloadUrl) {
    return { id: invoiceId, downloadUrl: existingInvoice.downloadUrl };
  }

  const url = `${process.env.NEXT_PUBLIC_URL}/view/invoice/${invoiceId}?code=${invoiceCode}`;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  const downloadsDir = path.resolve('./public/downloads');
  const filePath = path.join(downloadsDir, `invoice-${invoiceId}.pdf`);

  // Ensure the downloads directory exists
  await fsPromises.mkdir(downloadsDir, { recursive: true });

  const pdfBuffer = await page.pdf({
    format: 'A4',
  });

  await fsPromises.writeFile(filePath, pdfBuffer);
  await browser.close();

  const downloadUrl = `${process.env.NEXT_PUBLIC_URL}/downloads/invoice-${invoiceId}.pdf`;

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { downloadUrl },
  });

  return { id: invoiceId, downloadUrl };
}

export default generatePDF;
