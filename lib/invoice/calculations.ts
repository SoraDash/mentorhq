import { InvoiceLine } from '@prisma/client';

import { convertDuration } from '../generate-url';

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

export const calculateTimeDifference = (time1: string, time2: string) => {
  // Convert HH:MM:SS into total minutes for both times
  const minutes1 = timeToMinutes(time1);
  const minutes2 = timeToMinutes(time2);

  // Calculate the absolute difference in minutes
  const difference = Math.abs(minutes1 - minutes2);

  // Convert the difference back into HH:MM:SS
  return convertDuration(difference.toString());
};

const timeToMinutes = (time: string) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);

  return hours * 60 + minutes + seconds / 60;
};

export const convertToTotalMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
};
