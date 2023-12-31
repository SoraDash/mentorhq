import { InvoiceLine } from '@prisma/client';

import { getLatestStats } from '../billing/stats';
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
  if (!time1 || !time2) {
    console.warn('Invalid input for time calculation', { time1, time2 });

    return '00:00:00';
  }

  const minutes1 = timeToMinutes(time1);
  const minutes2 = timeToMinutes(time2);

  if (isNaN(minutes1) || isNaN(minutes2)) {
    console.warn('Invalid time conversion', { minutes1, minutes2 });

    return '00:00:00';
  }

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

export const formatCurrency = (
  amount: number,
  locale: string = 'en-US',
  currency: string = 'EUR',
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const processInvoiceSummary = async (
  invoiceLines: InvoiceLine[],
  totalAmountDue: number,
) => {
  const stats = await getLatestStats();

  if (!stats || !stats.stats) {
    console.error('No session found or email missing from session.');

    return null;
  }

  // Calculate the total minutes from invoice lines
  const totalMinutes = calculateTotalMinutesFromLines(invoiceLines);

  // Convert total minutes to HH:MM:SS format
  const formattedTime = convertDuration(totalMinutes.toString());

  // Format the total amount due as currency
  const formattedAmountDue = formatCurrency(totalAmountDue);

  // Find the relevant stats for billing and session time
  const amountBillableStat = stats.stats.find(
    (stat) => stat.title === 'Amount (billable)',
  );
  const totalSessionTimeStat = stats.stats.find(
    (stat) => stat.title === 'Total Session Time',
  );

  // Calculate financial discrepancy if available
  const financialDiscrepancyValue = amountBillableStat
    ? totalAmountDue -
      parseFloat(amountBillableStat.content.replace(/[€,]/g, ''))
    : null;
  const formattedFinancialDiscrepancy = financialDiscrepancyValue
    ? formatCurrency(financialDiscrepancyValue)
    : '';

  // Ensure totalSessionTimeStat is in the correct format before proceeding
  const expectedSessionTime = totalSessionTimeStat
    ? convertToTotalMinutes(totalSessionTimeStat.content)
    : 0;

  // Convert expected session time to HH:MM:SS format
  const formattedExpectedSessionTime = convertDuration(
    expectedSessionTime.toString(),
  );

  // Calculate time discrepancy
  const timeDiscrepancy = calculateTimeDifference(
    formattedTime,
    formattedExpectedSessionTime,
  );

  return {
    formattedAmountDue,
    formattedTime,
    timeDiscrepancy,
    amountBillableStat,
    formattedFinancialDiscrepancy,
    totalMinutes,
    totalSessionTimeStat,
  };
};

export const calculateTotalMinutesFromLines = (
  invoiceLines: InvoiceLine[],
): number => {
  return invoiceLines.reduce((acc, line) => acc + (line.duration || 0), 0);
};
