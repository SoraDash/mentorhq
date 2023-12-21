import { FaCalendar, FaClock, FaEuroSign, FaUsers } from 'react-icons/fa';

export interface StatItem {
  color: string;
  content: string;
  icon: keyof typeof ICONS;
  textColor: string;
  title: string;
}

export const ICONS = {
  FaCalendar: FaCalendar,
  FaClock: FaClock,
  FaEuroSign: FaEuroSign,
  FaUsers: FaUsers,
};
