import React from 'react';
interface InvoiceFooterProps {
  code: string;
  status: boolean;
}

const InvoiceFooter = ({ code, status }: InvoiceFooterProps) => {
  return (
    <div className="flex justify-end space-x-2 p-6">
      {!status && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Send Invoice
        </button>
      )}
      <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        Export to PDF
      </button>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        Export to Excel
      </button>
      {code && <div>You are looking at invoice {code} with code</div>}
    </div>
  );
};

export default InvoiceFooter;
