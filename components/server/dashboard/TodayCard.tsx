import { User } from '@prisma/client';
import React from 'react';
import { FaCalendar } from 'react-icons/fa';

interface TodayCardProps {
  user: User
}
export const TodayCard: React.FC<TodayCardProps> = ({ user }) => {
  const today = new Date();
  const formattedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })}`;

  return (
    <div className="p-3 bg-light-white border border-coolGray-100 rounded-md shadow-dashboard flex items-center">
      <div className="bg-blue-100 text-blue-500 p-3 rounded-md">
        <FaCalendar size={24} />
      </div>
      <div className="flex flex-col ml-4">
        <h2>Hi {user.firstName}</h2>
        <h2 className="font-semibold text-xl text-gray-900 dark:text-white tracking-tighter">Today is {formattedDate}</h2>
      </div>
    </div>
  );
}
