import { InvoiceLine } from '@prisma/client';
import React from 'react';

import { convertDuration } from '@/lib/generate-url';

interface SummaryProps {
  invoiceLines: InvoiceLine[];
  totalAmountDue: number;
}

const InvoiceSummary: React.FC<SummaryProps> = ({
  invoiceLines,
  totalAmountDue,
}) => {
  // Calculate total minutes and convert to HH:MM:SS
  const totalMinutes = invoiceLines.reduce(
    (acc, line) => acc + (line.duration || 0),
    0,
  );
  const formattedTime = convertDuration(totalMinutes.toString());

  // Format the total amount due
  const amountFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-4">
      <div className="grid grid-rows-2 gap-4">
        {/* Amount Due */}
        <div className="flex justify-between">
          <h3 className="text-lg">Amount Due</h3>
          <p className="text-xl font-bold ">
            {amountFormatter.format(totalAmountDue)}
          </p>
        </div>

        {/* Total Duration */}
        <div className="flex justify-between">
          <h3 className="text-lg">Total Duration</h3>
          <p className="text-xl font-bold ">
            {formattedTime} ({totalMinutes} MIN)
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary;
