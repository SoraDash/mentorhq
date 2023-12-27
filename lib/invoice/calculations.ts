import { InvoiceLine } from '@prisma/client';

// A helper function to calculate the total amount due
export const calculateTotal = (invoiceLines: InvoiceLine[]): number => {
  return invoiceLines.reduce((acc: number, line: InvoiceLine) => {
    const amount = typeof line.amount === 'number' ? line.amount : 0;

    return acc + amount;
  }, 0);
};

export const calculateDueDate = (createDate: Date, alwaysOnFifth: boolean) => {
  if (alwaysOnFifth) {
    const dueDate = new Date(
      createDate.getFullYear(),
      createDate.getMonth() + 1,
      5,
    );

    return dueDate;
  }

  const dueDate = new Date(createDate);

  dueDate.setDate(dueDate.getDate() + 30);

  return dueDate;
};
