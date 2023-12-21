import { LayoutDashboard } from 'lucide-react';
import { AiOutlineBarChart } from 'react-icons/ai';
import {
  FaChalkboardTeacher,
  FaFileInvoice,
  FaGraduationCap,
  FaMoneyBillAlt,
} from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { IconType } from 'react-icons/lib';
import { SiGotomeeting } from 'react-icons/si';

export type MenuItem = {
  color?: string;
  href: string;
  icon: IconType;
  label: string;
};

export const MAIN_MENU = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-sky-500',
  },
  {
    label: 'My Students',
    href: '/students',
    icon: FaGraduationCap,
    color: 'text-violet-500',
  },
  {
    label: 'Sessions',
    href: '/sessions',
    icon: SiGotomeeting,
    color: 'text-green-700',
  },
  {
    label: 'Stats',
    href: '/stats',
    icon: AiOutlineBarChart,
    color: 'text-pink-700',
  },
  {
    label: 'Invoices',
    href: '/invoices',
    icon: FaFileInvoice,
    color: 'text-orange-700',
  },
  {
    label: 'Billing',
    href: '/billing',
    icon: FaMoneyBillAlt,
    color: 'text-emerald-500',
  },
  { label: 'Settings', href: '/settings', icon: FiSettings },
];

export const ADMIN_MENU = [
  {
    label: 'Admin Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    color: 'text-sky-500',
  },
  {
    label: 'Students',
    href: '/admin/students',
    icon: FaGraduationCap,
    color: 'text-violet-500',
  },
  {
    label: 'Mentors',
    href: '/admin/mentors',
    icon: FaChalkboardTeacher,
    color: 'text-orange-700',
  },
  { label: 'Site Settings', href: '/admin/settings', icon: FiSettings },
];
