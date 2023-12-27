import { BillingContact } from '@prisma/client';
import React from 'react';

interface BillingInfoProps {
  metaData: BillingContact;
}

const BillingMeta = ({ metaData }: BillingInfoProps) => {
  return (
    <div className="max-w-md">
      <div className="p-6 mb-4 text-sm">
        <h3 className="text-lg font-semibold mb-2">Bill To</h3>
        <p className=" text-gray-600 mb-4">{metaData.email}</p>
        <p className="text-gray-800">{metaData.name}</p>
        <p className="text-gray-600">{metaData.address_1}</p>
        {metaData.address_2 && (
          <p className="text-gray-600">{metaData.address_2}</p>
        )}
        <p className="text-gray-600">{metaData.city}</p>
        <p className="text-gray-600">{metaData.postcode}</p>
        <p className="text-gray-600">{metaData.country}</p>
      </div>
    </div>
  );
};

export default BillingMeta;
