'use client';

import { Button } from '@nextui-org/react';
import { Link } from '@nextui-org/react';
import { Invoice } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaCloudDownloadAlt, FaFilePdf } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { MdOutlineSend } from 'react-icons/md';
interface InvoiceFooterProps {
  invoice: Invoice;
}

const InvoiceFooter = ({ invoice }: InvoiceFooterProps) => {
  const router = useRouter();
  const getPDF = async () => {
    const response = axios.post(`/api/invoice/pdf`, {
      invoiceId: invoice.id,
      invoiceCode: invoice.code,
    });

    toast.promise(response, {
      loading: 'Working some magic...',
      success: (data) => {
        window.open(data.data.downloadUrl, '_blank');
        router.refresh();

        return 'Voilà! The invoice is now marked as paid.';
      },
      error: 'Whoops! Something went awry, and we couldn’t save your changes.',
    });
  };
  const sendEmail = async () => {
    const response = axios.post(`/api/invoice/email`, {
      invoiceId: invoice.id,
      invoiceCode: invoice.code,
    });

    toast.promise(response, {
      loading: 'Rocketing your invoice to the customer...',
      success: () => {
        return 'Blast off! Your invoice is now orbiting your customer’s inbox.';
      },
      error: 'Houston, we have a problem. The invoice couldn’t be sent.',
    });
  };

  return (
    <div className="flex justify-end space-x-2 p-6">
      {invoice.downloadUrl && (
        <Button
          as={Link}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          download={invoice.downloadUrl}
          endContent={<FaCloudDownloadAlt />}
          href={invoice.downloadUrl}
          size="md"
        >
          Download PDF
        </Button>
      )}
      <Button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        endContent={<FaFilePdf />}
        onClick={getPDF}
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
          onClick={sendEmail}
          size="md"
        >
          Send Invoice
        </Button>
      )}
    </div>
  );
};

export default InvoiceFooter;
