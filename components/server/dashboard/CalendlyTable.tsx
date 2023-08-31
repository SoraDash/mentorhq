import { calendlyColumns } from '@/components/client/tables/calendly/columns';
import { DataTable } from '@/components/client/tables/calendly/data-table';
import { CalendlyEvent } from '@/lib/calendly/types';
import React from 'react';

interface CalendlyTableProps {
  events: CalendlyEvent[]
}

export const CalendlyTable: React.FC<CalendlyTableProps> = async ({ events }) => {
  return (
    <>
      <DataTable columns={calendlyColumns} data={events} />
    </>
  );
}