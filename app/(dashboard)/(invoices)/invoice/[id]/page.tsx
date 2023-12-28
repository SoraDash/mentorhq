import LoadingSpinner from '@/components/client/LoadingSpinner';
import { columns } from '@/components/client/tables/(invoices)/invoice/columns';
import { DataTable } from '@/components/client/tables/(invoices)/invoice/data-table';
import { calculateTotal } from '@/lib/invoice/calculations';
import { getInvoiceById } from '@/lib/invoice/invoices';

import ActionButton from '../../_components/ActionButton';
import BillingMeta from '../../_components/BillingMeta';
import InvoiceActions from '../../_components/InvoiceActions';
import InvoiceDetails from '../../_components/InvoiceDetails';
import InvoiceFooter from '../../_components/InvoiceFooter';
import Header from '../../_components/InvoiceHeader';
import InvoiceSummary from '../../_components/InvoiceSummary';
import SentToInfo from '../../_components/SendInfoTo';

type Props = {
  params: {
    id: string;
  };
};

const SingleInvoicePage = async ({ params }: Props) => {
  const invoiceData = await getInvoiceById(params.id);
  const invoiceLines = invoiceData?.invoiceLines ?? [];
  const totalAmountDue = calculateTotal(invoiceLines);

  if (!invoiceData || !invoiceLines || !totalAmountDue)
    return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow">
      <Header />
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center">
          <ActionButton status={invoiceData.status} />
        </div>

        <InvoiceActions id={invoiceData.id} status={invoiceData?.status} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4">
          <InvoiceDetails invoice={invoiceData} />
        </div>
        {invoiceData?.BillingContact && (
          <div className="p-4">
            <BillingMeta metaData={invoiceData.BillingContact} />
          </div>
        )}
        {invoiceData?.user?.billingInfo && (
          <div className="p-4">
            <SentToInfo sentToInfo={invoiceData.user.billingInfo} />
          </div>
        )}
      </div>
      <DataTable columns={columns} data={invoiceLines} />
      <InvoiceSummary
        invoiceLines={invoiceLines}
        showStats={true}
        totalAmountDue={totalAmountDue}
      />
      <InvoiceFooter code={invoiceData.code} status={invoiceData?.isPaid} />
    </div>
  );
};

export default SingleInvoicePage;
