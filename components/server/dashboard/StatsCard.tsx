import React from 'react';
import { FaCalendar, FaClock, FaEuroSign, FaUsers } from 'react-icons/fa';
import TimeUsageCard from './TimeUsageCard'; // Assuming TimeUsageCard is in the same directory

interface StatItem {
  title: string;
  icon: keyof typeof ICONS;
  content: string;
  color: string;
  textColor: string;
}

interface StatsCardProps {
  stats: StatItem[];
}

const ICONS = {
  FaCalendar: FaCalendar,
  FaClock: FaClock,
  FaEuroSign: FaEuroSign,
  FaUsers: FaUsers,
};
export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  const averageSessionTimeStat = stats.find(stat => stat.title === 'Average Session Time');
  const averageSessionTimeInMinutes = parseFloat(averageSessionTimeStat?.content || '0');

  return (
    <div className="flex flex-row space-x-4 overflow-x-auto lg:grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 lg:space-x-0 lg:overflow-visible">
      {stats.map((card, idx) => {
        const Icon = ICONS[card.icon];  // Use the ICONS mapping to get the actual component

        if (!Icon) return null;  // If the icon is not found in the mapping, don't render it

        return (
          <div key={idx} className="flex p-3">
            <div className="flex p-4 bg-light-white border border-coolGray-100 rounded-md shadow-dashboard w-full">
              <div className={`flex-shrink-0 ${card.color} ${card.textColor} p-3 rounded-md`}>
                <Icon size={24} />
              </div>
              <div className="flex flex-col ml-4">
                <h2 className="font-semibold text-xl text-gray-900 dark:text-white tracking-tighter">{card.content}</h2>
                <p className="text-xs font-medium text-coolGray-500 mt-1">{card.title}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};