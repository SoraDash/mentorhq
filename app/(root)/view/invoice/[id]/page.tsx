import InvoicePage from '@/app/(dashboard)/(invoices)/_components/InvoicePage';
import LoadingSpinner from '@/components/client/LoadingSpinner';
import { getInvoiceById } from '@/lib/invoice/invoices';

import CodeForm from './_components/CodeForm';

type ViewInvoiceProps = {
  params: {
    id: string;
  };
  searchParams: {
    code: string;
    error?: string;
  };
};

const ViewInvoicePublicPage = async (props: ViewInvoiceProps) => {
  const { id } = props.params;
  const code = props.searchParams.code;
  const invoiceData = await getInvoiceById(id);
  const correctCode = invoiceData?.code;
  const isError = props.searchParams.error === 'invalid_code';

  if (!invoiceData || !correctCode) return <LoadingSpinner />;

  return (
    <>
      {code === correctCode ? (
        <InvoicePage invoiceData={invoiceData} publicView={true} />
      ) : (
        <CodeForm code={code} correctCode={correctCode} />
      )}
      {isError && (
        <div className="text-red-500">
          Invalid code entered. Please try again.
        </div>
      )}
    </>
  );
};

export default ViewInvoicePublicPage;
