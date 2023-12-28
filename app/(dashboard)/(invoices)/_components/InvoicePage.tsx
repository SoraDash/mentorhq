import {
  BillingContact,
  BillingInfo,
  Invoice,
  InvoiceLine,
} from '@prisma/client';
import React from 'react';

import { invoiceColumns } from '@/components/client/tables/(invoices)/invoice/invoice-columns';
import { InvoiceDataTable } from '@/components/client/tables/(invoices)/invoice/invoice-data-table';
import { calculateTotal } from '@/lib/invoice/calculations';

import ActionButton from './ActionButton';
import BillingMeta from './BillingMeta';
import InvoiceActions from './InvoiceActions';
import InvoiceDetails from './InvoiceDetails';
import InvoiceFooter from './InvoiceFooter';
import Header from './InvoiceHeader';
import InvoiceSummary from './InvoiceSummary';
import SentToInfo from './SendInfoTo';

type Props = {
  invoiceData: Invoice & {
    BillingContact: BillingContact | null;
    invoiceLines: InvoiceLine[];
    user: {
      billingInfo: BillingInfo | null;
    };
  };
  publicView: boolean;
};

const InvoicePage = (props: Props) => {
  const invoiceLines = props.invoiceData?.invoiceLines ?? [];
  const totalAmountDue = calculateTotal(invoiceLines);

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow">
      {!props.publicView && <Header />}
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center">
          <ActionButton status={props.invoiceData.status} />
        </div>
        {!props.publicView && (
          <InvoiceActions
            id={props.invoiceData.id}
            status={props.invoiceData?.status}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4">
          <InvoiceDetails invoice={props.invoiceData} />
        </div>
        {props.invoiceData?.BillingContact && (
          <div className="p-4">
            <BillingMeta metaData={props.invoiceData.BillingContact} />
          </div>
        )}
        {props.invoiceData?.user?.billingInfo && (
          <div className="p-4">
            <SentToInfo sentToInfo={props.invoiceData.user.billingInfo} />
          </div>
        )}
      </div>
      <InvoiceDataTable columns={invoiceColumns} data={invoiceLines} />
      <InvoiceSummary
        invoiceLines={invoiceLines}
        publicView={props.publicView}
        totalAmountDue={totalAmountDue}
      />
      {!props.publicView && (
        <InvoiceFooter status={props.invoiceData?.isPaid} />
      )}
    </div>
  );
};

export default InvoicePage;
