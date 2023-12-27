import { InvoiceLine } from '@prisma/client';

// A helper function to calculate the total amount due
export const calculateTotal = (invoiceLines: InvoiceLine[]): number => {
  return invoiceLines.reduce((acc: number, line: InvoiceLine) => {
    const amount = typeof line.amount === 'number' ? line.amount : 0;

    return acc + amount;
  }, 0);
};
