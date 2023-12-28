import React from 'react';

interface AmountDueSectionProps {
  amountDue: string;
}

const AmountDueSection = ({ amountDue }: AmountDueSectionProps) => (
  <div className="flex justify-between my-2">
    <span>Amount Due</span>
    <span className="text-xl font-bold">{amountDue}</span>
  </div>
);

export default AmountDueSection;
