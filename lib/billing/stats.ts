import { getUserBySession } from '@/lib/db/user';
import { getMonth, getYear } from 'date-fns';
import { getBilling } from './billing';
import { FaUsers, FaCalendar, FaEuroSign, FaClock } from 'react-icons/fa';

export const getLatestStats = async () => {
  const user = await getUserBySession();
  if (!user?.ciApiKey) return { status: 'empty', message: 'No user session found.' };

  const now = new Date();
  const month = getMonth(now) + 1;
  const year = getYear(now);

  const data = await getBilling(month.toString(), year.toString());
  if (!data || !data?.aggregates) return { status: 'empty', message: 'No billing data available.' };

  const sessionCount = parseInt(data?.aggregates?.session_count);
  const eurosBillable = data?.aggregates?.euros_billable;

  let averageSessionTimeInMinutes = 0;
  if (sessionCount && data?.aggregates?.total_session_time) {
    averageSessionTimeInMinutes = convertToMinutes(data?.aggregates?.total_session_time) / sessionCount;
  }

  const stats = [
    {
      title: 'Total Students',
      icon: FaUsers,
      content: data?.details?.length.toString(),
      color: 'bg-green-100',
      textColor: 'text-green-500',
    },
    {
      title: 'Sessions This Month',
      icon: FaCalendar,
      content: isNaN(sessionCount) ? null : sessionCount?.toString(),
      color: 'bg-blue-100',
      textColor: 'text-blue-500',
    },
    {
      title: 'Amount (billable)',
      icon: FaEuroSign,
      content: eurosBillable,
      color: 'bg-yellow-100',
      textColor: 'text-yellow-500',
    },
    {
      title: 'Total Session Time',
      icon: FaClock,
      content: data.aggregates?.total_session_time,
      color: 'bg-red-100',
      textColor: 'text-red-500',
    },
    {
      title: 'Average Session Time',
      icon: FaClock,
      content: averageSessionTimeInMinutes === 0 ? null : `${averageSessionTimeInMinutes.toFixed(2)} mins`,
      color: 'bg-purple-100',
      textColor: 'text-purple-500',
    },
  ].filter(stat => stat.content !== null && stat.content !== undefined);  // Filter out stats with null or undefined content

  return { status: 'success', stats };
}

const convertToMinutes = (time: string): number => {
  if (!time) return 0;

  const [hours, minutes, seconds] = time.split(':').map(Number);
  return (hours * 60) + minutes + (seconds / 60);
};