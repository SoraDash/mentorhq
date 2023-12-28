import Image from 'next/image';

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
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
        <header>
          <Image
            alt="Logo"
            className="w-20 mx-auto mb-5"
            height={120}
            src="/logos/logo_only_color.png"
            width={120}
          />
        </header>
        {code === correctCode ? (
          <div>
            You are looking at invoice {props.params.id} with code {correctCode}
          </div>
        ) : (
          <CodeForm code={code} correctCode={correctCode} />
        )}
        {isError && (
          <div className="text-red-500">
            Invalid code entered. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInvoicePublicPage;
