import { Button } from '@nextui-org/react';
import { Link } from '@nextui-org/react';
import { Invoice } from '@prisma/client';
import { FaFilePdf } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { MdOutlineSend } from 'react-icons/md';
interface InvoiceFooterProps {
  invoice: Invoice;
}

const InvoiceFooter = ({ invoice }: InvoiceFooterProps) => {
  return (
    <div className="flex justify-end space-x-2 p-6">
      <Button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        endContent={<FaFilePdf />}
        size="md"
      >
        Export to PDF
      </Button>
      <Button
        as={Link}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        endContent={<IoEyeSharp />}
        href={`/view/invoice/${invoice.id}?code=${invoice.code}`}
        size="md"
        target="_blank"
      >
        View Public Invoice
      </Button>
      {!invoice.isPaid && (
        <Button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          endContent={<MdOutlineSend />}
          size="md"
        >
          Send Invoice
        </Button>
      )}
    </div>
  );
};

export default InvoiceFooter;
