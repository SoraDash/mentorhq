import { BillingContact, BillingInfo } from '@prisma/client';
import React from 'react';

interface BillingInfoProps {
  billing: BillingContact;
}

const BillingInfo = ({ billing }: BillingInfoProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <h3 className="text-lg font-semibold mb-4">Bill To</h3>
      <p className="text-gray-800">{billing.name}</p>
      <p className="text-gray-600">{billing.address_1}</p>
      {billing.address_2 && (
        <p className="text-gray-600">{billing.address_2}</p>
      )}
      <p className="text-gray-600">{billing.city}</p>
      <p className="text-gray-600">{billing.postcode}</p>
      <p className="text-gray-600">{billing.country}</p>
    </div>
  );
};

export default BillingInfo;
