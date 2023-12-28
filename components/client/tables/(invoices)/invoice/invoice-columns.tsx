'use client';

import { InvoiceLine } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const invoiceColumns: ColumnDef<InvoiceLine>[] = [
  {
    accessorKey: 'service',
    header: 'Service',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) =>
      new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'EUR',
      }).format(row?.original?.amount ?? 0),
  },
];
