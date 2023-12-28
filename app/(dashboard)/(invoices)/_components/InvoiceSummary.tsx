import { InvoiceLine } from '@prisma/client';

import { processInvoiceSummary } from '@/lib/invoice/calculations';

import AmountDueSection from './summary/AmountDue';
import FullSummary from './summary/FullSummary';

interface SummaryProps {
  invoiceLines: InvoiceLine[];
  publicView: boolean;
  totalAmountDue: number;
}

const InvoiceSummary = async ({
  invoiceLines,
  publicView,
  totalAmountDue,
}: SummaryProps) => {
  const summaryData = await processInvoiceSummary(invoiceLines, totalAmountDue);

  if (!summaryData) return <div>Something went wrong</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-4">
      {publicView ? (
        <AmountDueSection amountDue={summaryData.formattedAmountDue} />
      ) : (
        <FullSummary
          amountBillable={summaryData.amountBillableStat?.content}
          financialDiscrepancy={summaryData.formattedFinancialDiscrepancy}
          formattedAmountDue={summaryData.formattedAmountDue}
          formattedTime={summaryData.formattedTime}
          timeDiscrepancy={summaryData.timeDiscrepancy}
          totalMinutes={summaryData.totalMinutes}
          totalSessionTimeStat={summaryData.totalSessionTimeStat}
        />
      )}
    </div>
  );
};

export default InvoiceSummary;
