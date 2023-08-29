import { differenceInMinutes, getMonth, getYear, parse } from 'date-fns';
import { FaCalendar, FaClock, FaEuroSign, FaUsers } from 'react-icons/fa';
import { getUserBySession } from '../db/user';
import { getBilling } from './billing';

export const getLatestStats = async (date?: Date) => {
  const user = await getUserBySession();
  if (!user?.ciApiKey) return null;
  const now = new Date();
  const month = date ? getMonth(date) + 1 : getMonth(now) + 1;
  const year = date ? getYear(date) : getYear(now);

  const data = await getBilling(month.toString(), year.toString());
  if (!data) return null

  const sessionCount = parseInt(data?.aggregates?.session_count);
  const eurosBillable = data?.aggregates?.euros_billable;

  const averageSessionTimeInMinutes = convertToMinutes(data?.aggregates?.total_session_time) / sessionCount;

  return [
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
      content: sessionCount?.toString(),
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
      content: data.aggregates.total_session_time,
      color: 'bg-red-100',
      textColor: 'text-red-500',
    },
    {
      title: 'Average Session Time',
      icon: FaClock,
      content: averageSessionTimeInMinutes + ' mins',
      color: 'bg-purple-100',
      textColor: 'text-purple-500',
    },
  ];
};

const convertToMinutes = (time: string) => {
  const referenceDate = new Date(0, 0, 0, 0, 0, 0);
  const parsedDate = parse(time, 'HH:mm:ss', referenceDate);
  return differenceInMinutes(parsedDate, referenceDate);
};