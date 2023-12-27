import { columns } from '@/components/client/tables/(invoices)/invoice/columns';
import { DataTable } from '@/components/client/tables/(invoices)/invoice/data-table';
import { calculateTotal } from '@/lib/invoice/calculate-total';
import { getInvoiceById } from '@/lib/invoice/invoices';

import ActionButton from '../../_components/ActionButton';
import AmountDue from '../../_components/AmountDue';
import Header from '../../_components/InvoiceHeader';

type Props = {
  params: {
    id: string;
  };
};

const SingleInvoicePage = async ({ params }: Props) => {
  const invoiceData = await getInvoiceById(params.id);
  const invoiceLines = invoiceData?.invoiceLines ?? [];
  const totalAmountDue = calculateTotal(invoiceLines);

  return (
    <div>
      SingleInvoicePage {params.id}
      <Header />
      {invoiceData?.status && <ActionButton status={invoiceData?.status} />}
      <DataTable columns={columns} data={invoiceLines} />
      <AmountDue total={totalAmountDue} />
    </div>
  );
};

export default SingleInvoicePage;
