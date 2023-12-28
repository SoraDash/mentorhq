import { randomInt } from 'crypto';

import { faker } from '@faker-js/faker';
import { InvoiceStatus, PrismaClient } from '@prisma/client';
import _ from 'lodash';

const prisma = new PrismaClient();

const generateRandomNumber = (min: number, max: number) => {
  return randomInt(min, max + 1);
};

// Function to generate a code in the format 123-456-789
const generateInvoiceCode = () => {
  const part1 = generateRandomNumber(0, 999).toString().padStart(3, '0');
  const part2 = generateRandomNumber(0, 999).toString().padStart(3, '0');
  const part3 = generateRandomNumber(0, 999).toString().padStart(3, '0');

  return `${part1}-${part2}-${part3}`;
};

async function main(): Promise<void> {
  const firstUser = await prisma.user.findFirst();

  if (!firstUser) {
    console.error('❌ No users found in the database.');

    return;
  }

  const userBillingInfo = await prisma.billingInfo.findFirst({
    where: { userId: firstUser.id },
  });

  let invoicePrefix = userBillingInfo?.invoiceprefix;

  if (!invoicePrefix) {
    // Generate a random prefix if none exists
    invoicePrefix = faker.string.alpha({ length: 3, casing: 'upper' });
  }

  let lastInvoiceNumber = 0;

  // Find the last invoice number for the first user with the same prefix
  const lastInvoice = await prisma.invoice.findFirst({
    where: { userId: firstUser.id, invoice_id: { startsWith: invoicePrefix } },
    orderBy: { invoice_id: 'desc' },
  });

  if (lastInvoice) {
    const lastNumber = parseInt(lastInvoice.invoice_id.split('-')[1]);

    if (!isNaN(lastNumber)) {
      lastInvoiceNumber = lastNumber;
    }
  }

  const numberOfInvoices = 10; // Total number of invoices to create
  const linesPerInvoice = 10; // Number of line items per invoice

  for (let i = 0; i < numberOfInvoices; i++) {
    lastInvoiceNumber++; // Increment the invoice number
    const invoiceId = `${invoicePrefix}-${lastInvoiceNumber
      .toString()
      .padStart(3, '0')}`;

    const invoiceData = {
      invoice_id: invoiceId,
      code: generateInvoiceCode(),
      invoiceDate: faker.date.recent({ days: 30 }),
      dueDate: faker.date.soon({ days: 30 }),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      status: _.sample([
        'DRAFT',
        'PENDING',
        'PAID',
        'OVERDUE',
      ]) as InvoiceStatus,
      userId: firstUser.id,
    };

    try {
      const newInvoice = await prisma.invoice.create({
        data: invoiceData,
      });

      for (let j = 0; j < linesPerInvoice; j++) {
        const lineItemData = {
          service: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          duration: faker.number.int({ min: 15, max: 180 }),
          amount: faker.number.float({ min: 100, max: 1000 }),
          invoiceId: newInvoice.id,
        };

        await prisma.invoiceLine.create({
          data: lineItemData,
        });
      }

      console.log(
        `✅ Created invoice ${invoiceId} with ${linesPerInvoice} line items.`,
      );
    } catch (error: any) {
      console.error(`❌ Failed to seed invoice: ${error.message}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(`❌ Error: ${e.message}`);
    throw e;
  })
  .finally(async () => {
    console.log(
      '🔚 Overall invoice seeding process finished. Disconnecting...',
    );
    await prisma.$disconnect();
  });
