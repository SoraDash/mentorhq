'use client';

import { Chip } from '@nextui-org/react';
import { Invoice } from '@prisma/client';
import { InvoiceStatus } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'invoice_id',
    header: 'Invoice Number',
  },
  {
    accessorFn: (row) => row.invoiceDate?.toLocaleDateString(),
    id: 'invoiceDate',
    header: 'Date Issued',
  },
  {
    accessorFn: (row) => row.dueDate?.toLocaleDateString(),
    id: 'dueDate',
    header: 'Due Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const statusColors: {
        [key in InvoiceStatus]:
          | 'default'
          | 'warning'
          | 'secondary'
          | 'success'
          | 'danger'
          | 'primary'
          | undefined;
      } = {
        DRAFT: 'warning',
        PENDING: 'secondary',
        PAID: 'success',
        OVERDUE: 'danger',
      };

      const color = statusColors[row.original.status] || 'default';

      return <Chip color={color}>{row.original.status}</Chip>;
    },
  },
];
