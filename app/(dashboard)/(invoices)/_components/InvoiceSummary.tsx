import { InvoiceLine } from '@prisma/client';
import React from 'react';

import { getLatestStats } from '@/lib/billing/stats';
import { convertDuration } from '@/lib/generate-url';
import {
  calculateTimeDifference,
  convertToTotalMinutes,
} from '@/lib/invoice/calculations';

interface SummaryProps {
  invoiceLines: InvoiceLine[];
  showStats?: boolean;
  totalAmountDue: number;
}

const InvoiceSummary = async ({
  invoiceLines,
  showStats = false,
  totalAmountDue,
}: SummaryProps) => {
  const stats = await getLatestStats();

  const totalMinutes = invoiceLines.reduce(
    (acc, line) => acc + (line.duration || 0),
    0,
  );
  const formattedTime = convertDuration(totalMinutes.toString());

  const amountFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  });

  const formattedAmountDue = amountFormatter.format(totalAmountDue);

  // Extract the required stats data
  const amountBillableStat = stats?.stats?.find(
    (stat) => stat.title === 'Amount (billable)',
  );
  const totalSessionTimeStat = stats?.stats?.find(
    (stat) => stat.title === 'Total Session Time',
  );

  const timeDiscrepancy = totalSessionTimeStat
    ? calculateTimeDifference(formattedTime, totalSessionTimeStat.content)
    : null;

  const financialDiscrepancyValue = amountBillableStat
    ? totalAmountDue -
      parseFloat(amountBillableStat.content.replace(/[€,]/g, ''))
    : null;

  const formattedFinancialDiscrepancy = financialDiscrepancyValue
    ? amountFormatter.format(financialDiscrepancyValue)
    : null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Amount Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Financial Summary</h3>
          <div className="flex justify-between my-2">
            <span>Amount Due</span>
            <span className="text-xl font-bold ">{formattedAmountDue}</span>
          </div>
          <div className="flex justify-between my-2">
            <span>Expected Amount (Stats)</span>
            <span className="text-xl font-bold">
              {amountBillableStat?.content}
            </span>
          </div>
          {financialDiscrepancyValue && (
            <div className="flex justify-between my-2">
              <span>Total Discrepancy</span>
              <span
                className={`text-xl font-bold ${
                  financialDiscrepancyValue !== 0
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {formattedFinancialDiscrepancy}
              </span>
            </div>
          )}
        </div>

        {/* Time Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Time Summary (API Data)</h3>
          <div className="flex justify-between my-2">
            <span>Total Session Time</span>
            <span className="text-xl font-bold ">
              {formattedTime} ({totalMinutes} MIN)
            </span>
          </div>
          {totalSessionTimeStat && (
            <div className="flex justify-between my-2">
              <span>Total Time (Stats)</span>
              <span className="text-xl font-bold ">
                {totalSessionTimeStat.content} (
                {convertToTotalMinutes(totalSessionTimeStat.content)} MIN)
              </span>
            </div>
          )}
          {timeDiscrepancy && showStats && (
            <div className="flex justify-between my-2 text-red-500">
              <span>Time Discrepancy</span>
              <span className="text-xl font-bold">
                {timeDiscrepancy} ({convertToTotalMinutes(timeDiscrepancy)} MIN)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary;
