'use server';

import { Invoice, InvoiceLine } from '@prisma/client';

import { prisma } from '@/lib/db/prisma';

// Fetches all invoices
export const getAllInvoices = async () => {
  return await prisma.invoice.findMany({
    include: {
      BillingContact: true,
      invoiceLines: true,
      user: {
        include: {
          billingInfo: true,
        },
      },
    },
  });
};

// Fetches a single invoice by its ID
export const getInvoiceById = async (
  invoiceId: string,
): Promise<Invoice | null> => {
  return await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      BillingContact: true, // Include related BillingContact
      invoiceLines: true, // Include related InvoiceLines
    },
  });
};

// Fetches all line items for a specific invoice
export const getLineItemsByInvoiceId = async (
  invoiceId: string,
): Promise<InvoiceLine[]> => {
  return await prisma.invoiceLine.findMany({
    where: { invoiceId: invoiceId },
  });
};

// Fetches all invoices for a specific user
export const getInvoicesByUserId = async (
  userId: string,
): Promise<Invoice[]> => {
  return await prisma.invoice.findMany({
    where: { userId: userId },
    include: {
      BillingContact: true, // Include related BillingContact
      invoiceLines: true, // Include related InvoiceLines
    },
  });
};
