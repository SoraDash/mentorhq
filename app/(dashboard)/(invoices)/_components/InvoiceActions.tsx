'use client';

import { InvoiceStatus } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

type InvoiceActionsProps = {
  id: string;
  status: string;
};

const InvoiceActions: React.FC<InvoiceActionsProps> = ({ id, status }) => {
  const router = useRouter();

  const handlePaid = async () => {
    const response = axios.patch(`/api/invoice/${id}`, {
      status: InvoiceStatus.PAID,
      isPaid: true,
    });

    toast.promise(response, {
      loading: 'Working some magic...',
      success: () => {
        router.refresh(); // Refresh the data on the page

        return 'Voilà! The invoice is now marked as paid.';
      },
      error: 'Whoops! Something went awry, and we couldn’t save your changes.',
    });
  };

  return (
    <>
      {status.toUpperCase() !== InvoiceStatus.PAID && (
        <div className="flex justify-end space-x-2">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Edit
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Delete
          </button>
          <button
            className="py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600"
            onClick={handlePaid}
          >
            Mark As Paid
          </button>
        </div>
      )}
    </>
  );
};

export default InvoiceActions;
