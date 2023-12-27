'use client';

import React from 'react';

interface ActionButtonProps {
  status: string;
}

const ActionButton = ({ status }: ActionButtonProps) => {
  // Determine the color based on the status
  const statusColor =
    {
      Pending: 'bg-yellow-400',
      Paid: 'bg-green-500',
      Overdue: 'bg-red-500',
      Draft: 'bg-gray-500',
    }[status] || 'bg-gray-200';

  return (
    <div className="flex justify-end p-4">
      <span
        className={`text-white ${statusColor} font-semibold py-2 px-4 rounded-full text-sm`}
      >
        {status}
      </span>
    </div>
  );
};

export default ActionButton;
