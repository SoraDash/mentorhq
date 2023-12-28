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
  const isError = props.searchParams.error === 'invalid_code';

  // Determine the error type based on the situation
  let errorType;

  if (!invoiceData) {
    errorType = 'Invoice not found.';
  } else if (isError || code !== invoiceData.code) {
    errorType = 'Invalid code entered. Please try again.';
  }

  // If there is an error type defined, show the CodeForm with the error message
  if (errorType) {
    return (
      <CodeForm
        code={code}
        correctCode={invoiceData?.code || ''}
        error={errorType}
      />
    );
  }

  // If there's no error and the code matches, render the InvoicePage
  if (invoiceData && code === invoiceData.code) {
    return <InvoicePage invoiceData={invoiceData} publicView={true} />;
  }

  return <LoadingSpinner />;
};

export default ViewInvoicePublicPage;
