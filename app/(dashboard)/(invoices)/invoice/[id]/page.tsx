import LoadingSpinner from '@/components/client/LoadingSpinner';
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

  return <InvoicePage invoiceData={invoiceData} publicView={false} />;
};

export default SingleInvoicePage;
