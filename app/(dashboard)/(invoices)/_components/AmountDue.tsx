import React from 'react';

interface AmountDueProps {
  total: number;
}

const AmountDue = ({ total }: AmountDueProps) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 flex justify-between items-center">
      <h3 className="text-lg font-semibold">Amount Due</h3>
      <p className="text-xl font-bold text-green-600">
        {formatter.format(total)}
      </p>
    </div>
  );
};

export default AmountDue;
