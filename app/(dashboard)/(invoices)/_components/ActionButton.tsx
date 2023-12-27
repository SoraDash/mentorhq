'use client';

import React from 'react';

interface ActionButtonProps {
  status: string;
}

const ActionButton = ({ status }: ActionButtonProps) => {
  // Determine the color based on the status
  const statusColor =
    {
      PENDING: 'bg-yellow-400',
      PAID: 'bg-green-500',
      OVERDUE: 'bg-red-500',
      DRAFT: 'bg-gray-500',
    }[status] || 'bg-gray-200';


  return (
    <div className="flex justify-end p-4">
      <span
        className={`text-white ${statusColor} font-semibold py-2 px-4 rounded-full text-md`}
      >
        {status}
      </span>
    </div>
  );
};

export default ActionButton;
