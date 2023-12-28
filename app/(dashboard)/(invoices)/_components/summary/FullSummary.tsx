import React from 'react';

import AmountDueSection from './AmountDue';
import DiscrepancySection from './DiscrepancySection';
import StatSection from './StatSection';

interface FullSummaryProps {
  amountBillable: string;
  financialDiscrepancy: string;
  formattedAmountDue: string;
  formattedTime: string;
  timeDiscrepancy: string;
  totalMinutes: number;
  totalSessionTimeStat: any;
}
const FullSummary = ({
  amountBillable,
  financialDiscrepancy,
  formattedAmountDue,
  formattedTime,
  timeDiscrepancy,
  totalSessionTimeStat,
}: FullSummaryProps) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col col-span-2">
      <h3 className="text-lg font-semibold">Financial Summary</h3>
      <AmountDueSection amountDue={formattedAmountDue} />
      <StatSection label="CI Expected Amount" value={amountBillable} />
      <DiscrepancySection
        label="Total Discrepancy"
        value={financialDiscrepancy}
      />
    </div>
    <div className="flex flex-col col-span-2">
      <h3 className="text-lg font-semibold">Time Summary</h3>
      <StatSection label="Total Session Time" value={formattedTime} />
      <StatSection
        label="CI Expected Session Time"
        value={totalSessionTimeStat?.content}
      />
      <DiscrepancySection label="Time Discrepancy" value={timeDiscrepancy} />
    </div>
  </div>
);

export default FullSummary;
