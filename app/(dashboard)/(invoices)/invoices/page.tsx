// components/InvoiceTable.tsx
import React from 'react';

import { columns } from '@/components/client/tables/invoices/columns';
import { DataTable } from '@/components/client/tables/invoices/data-table';
import { getAllInvoices } from '@/lib/invoice/invoices';

// Component to render the invoice with all sections
const Invoice: React.FC = async () => {
  const invoiceData = await getAllInvoices();

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {invoiceData && <DataTable columns={columns} data={invoiceData} />}
    </div>
  );
};

export default Invoice;
