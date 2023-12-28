import { Button } from '@nextui-org/react';
import { Link } from '@nextui-org/react';
import { Invoice } from '@prisma/client';
import { IoEyeSharp } from 'react-icons/io5';
import { MdOutlineSend } from 'react-icons/md';
interface InvoiceFooterProps {
  invoice: Invoice;
}

const InvoiceFooter = ({ invoice }: InvoiceFooterProps) => {
  return (
    <div className="flex justify-end space-x-2 p-6">
      {!invoice.isPaid && (
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          endContent={<MdOutlineSend />}
          size="md"
        >
          Send Invoice
        </Button>
      )}
      <Button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        Export to PDF
      </Button>
      <Button
        as={Link}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        endContent={<IoEyeSharp />}
        href={`/view/invoice/${invoice.id}?code=${invoice.code}`}
        target="_blank"
      >
        View Public Invoice
      </Button>
    </div>
  );
};

export default InvoiceFooter;
