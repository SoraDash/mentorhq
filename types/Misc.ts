import { FaCalendar, FaClock, FaEuroSign, FaUsers } from 'react-icons/fa';

export interface StatItem {
  title: string;
  icon: keyof typeof ICONS;
  content: string;
  color: string;
  textColor: string;
}

export const ICONS = {
  FaCalendar: FaCalendar,
  FaClock: FaClock,
  FaEuroSign: FaEuroSign,
  FaUsers: FaUsers,
};