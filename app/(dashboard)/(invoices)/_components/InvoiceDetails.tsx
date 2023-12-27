import { Invoice } from '@prisma/client';

interface InvoiceDetailsProps {
  invoice: Invoice;
}

// InvoiceDetails.jsx
const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  const invoiceDate = invoice.invoiceDate
    ? new Date(invoice.invoiceDate).toLocaleDateString('en-GB')
    : '';

  let dueDate = invoice.dueDate
    ? new Date(invoice.dueDate).toLocaleDateString('en-GB')
    : '';

  // If alwaysOnFifth is true, override the dueDate display
  if (invoice.alwaysOnFifth) {
    const nextFifth = new Date(invoice.invoiceDate ?? Date.now());

    nextFifth.setMonth(nextFifth.getMonth() + 1);
    nextFifth.setDate(5); // Set to the 5th of next month
    dueDate = nextFifth.toLocaleDateString('en-GB');
  }

  return (
    <div className="p-6 mb-4">
      <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
      <p className="text-gray-800">#{invoice.invoice_id}</p>
      <p className="text-gray-600">Invoice Date: {invoiceDate}</p>
      <p className="text-gray-600">Payment Due: {dueDate}</p>
      {/* Other details */}
    </div>
  );
};

export default InvoiceDetails;
