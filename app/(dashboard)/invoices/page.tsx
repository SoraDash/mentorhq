// components/InvoiceTable.tsx
import { faker } from '@faker-js/faker';
import React from 'react';

interface LineItem {
  description: string;
  id: number;
  quantity: number;
  total: number;
  unitPrice: number;
}

interface InvoiceHeader {
  dateIssued: string;
  dueDate: string;
  invoiceNumber: string;
}

interface InvoiceRecipient {
  address: string;
  email: string;
  name: string;
}

interface PaymentDetails {
  accountNumber: string;
  bankName: string;
  notes: string;
  paymentTerms: string;
  sortCode: string;
  totalDue: string;
}

// Generate some fake data for the table
const generateFakeData = (): LineItem[] => {
  let items: LineItem[] = [];

  for (let i = 0; i < 5; i++) {
    items.push({
      id: i,
      description: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 5 }),
      unitPrice: parseFloat(faker.commerce.price()),
      total: 0, // Calculate this based on quantity and unit price
    });
  }

  // Calculate the total for each line item
  items = items.map((item) => ({
    ...item,
    total: item.quantity * item.unitPrice,
  }));

  return items;
};

// Generate some fake data for the invoice sections
const generateInvoiceHeader = (): InvoiceHeader => {
  return {
    invoiceNumber: `#${faker.number.hex(6).toUpperCase()}`,
    dateIssued: faker.date.recent(30).toLocaleDateString(),
    dueDate: faker.date.soon(30).toLocaleDateString(),
  };
};

const generateInvoiceRecipient = (): InvoiceRecipient => {
  return {
    name: faker.person.fullName(),
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
    email: faker.internet.email(),
  };
};

const generatePaymentDetails = (): PaymentDetails => {
  return {
    totalDue: faker.commerce.price(1000, 5000, 2, '$'),
    bankName: faker.company.name(),
    accountNumber: faker.finance.account(),
    sortCode: faker.finance.routingNumber(),
    paymentTerms: 'Net 30 Days',
    notes: 'Thank you for your business.',
  };
};

// Component to render the invoice with all sections
const Invoice: React.FC = () => {
  const header = generateInvoiceHeader();
  const recipient = generateInvoiceRecipient();
  const payment = generatePaymentDetails();
  const lineItems = generateFakeData();
  const totalAmount = lineItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <header className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold mb-2">Invoice</h1>
          <div>
            <p>{recipient.name}</p>
            <p>{recipient.address}</p>
            <p>{recipient.email}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-bold">Invoice #{header.invoiceNumber}</h2>
          <p>Date Issued: {header.dateIssued}</p>
          <p>Due Date: {header.dueDate}</p>
        </div>
      </header>

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="text-left font-semibold">
            <th className="p-4 border-b-2 border-gray-200 bg-gray-50">Item</th>
            <th className="p-4 border-b-2 border-gray-200 bg-gray-50">
              Quantity
            </th>
            <th className="p-4 border-b-2 border-gray-200 bg-gray-50">
              Unit Price
            </th>
            <th className="p-4 border-b-2 border-gray-200 bg-gray-50">
              Sub Total
            </th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, index) => (
            <tr
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              key={item.id}
            >
              <td className="p-4 border-b border-gray-200">
                {item.description}
              </td>
              <td className="p-4 border-b border-gray-200">{item.quantity}</td>
              <td className="p-4 border-b border-gray-200">
                ${item.unitPrice.toFixed(2)}
              </td>
              <td className="p-4 border-b border-gray-200">
                ${item.total.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="font-semibold">
          <tr>
            <td className="p-4">Total</td>
            <td />
            <td />
            <td className="p-4">${totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <footer className="mt-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">Payment Details:</p>
            <p>Bank Name: {payment.bankName}</p>
            <p>Account Number: {payment.accountNumber}</p>
            <p>Sort Code: {payment.sortCode}</p>
            <p>Terms: {payment.paymentTerms}</p>
            <p>{payment.notes}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">Total Due: {payment.totalDue}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Invoice;
