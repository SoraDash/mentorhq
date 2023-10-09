import React from "react";
import { IconType } from "react-icons/lib";

interface StatsCardProps {
  stats?: {
    title: string;
    icon: IconType;
    content: string;
    color: string;
    textColor: string;
  }[];
  status?: "success" | "empty";
  message?: string;
}
export const StatsCard: React.FC<StatsCardProps> = ({
  stats,
  status,
  message,
}) => {
  if (status === "empty" || message) {
    return (
      <div className='p-4 bg-red-100 text-red-700 border border-red-200 rounded-md'>
        {message}
      </div>
    );
  }

  if (!stats || stats.length === 0) return null;

  return (
    <div className='flex flex-row space-x-4 overflow-x-auto lg:grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:space-x-0 lg:overflow-visible'>
      {stats?.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className='flex p-3'>
            <div className='flex p-4 bg-light-white border border-coolGray-100 rounded-md shadow-dashboard w-full'>
              <div
                className={`flex-shrink-0 ${card.color} ${card.textColor} p-3 rounded-md`}>
                <Icon size={24} />
              </div>
              <div className='flex flex-col ml-4'>
                <h2 className='font-semibold text-xl text-gray-900 dark:text-white tracking-tighter'>
                  {card.content}
                </h2>
                <p className='text-xs font-medium text-coolGray-500 mt-1'>
                  {card.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
