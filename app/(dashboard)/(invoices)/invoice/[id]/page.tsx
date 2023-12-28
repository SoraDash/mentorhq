import LoadingSpinner from '@/components/client/LoadingSpinner';
import { calculateTotal } from '@/lib/invoice/calculations';
import { getInvoiceById } from '@/lib/invoice/invoices';

import InvoicePage from '../../_components/InvoicePage';

type Props = {
  params: {
    id: string;
  };
};

const SingleInvoicePage = async ({ params }: Props) => {
  const invoiceData = await getInvoiceById(params.id);

  if (!invoiceData) return <LoadingSpinner />;

  return <InvoicePage invoiceData={invoiceData} />;
};

export default SingleInvoicePage;
