"use client";

import useOnboardingModal from '@/hooks/useOnboardingModal';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Zap } from 'lucide-react';
import { User } from 'next-auth';
import { User as PrismaUser } from '@prisma/client'
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineBarChart } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { FaChalkboardTeacher, FaFileInvoice, FaGraduationCap, FaMoneyBillAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { SiGotomeeting } from 'react-icons/si';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import React from 'react';

const monserrat = Montserrat({ weight: "600", subsets: ['latin'] });

const routes = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: "text-sky-500" },
  { label: 'Students', href: '/students', icon: FaGraduationCap, color: "text-violet-500" },
  { label: 'Stats', href: '/stats', icon: AiOutlineBarChart, color: "text-pink-700" },
  { label: 'Invoices', href: '/video', icon: FaFileInvoice, color: "text-orange-700" },
  { label: 'Billing', href: '/music', icon: FaMoneyBillAlt, color: "text-emerald-500" },
  { label: 'Sessions', href: '/code', icon: SiGotomeeting, color: "text-green-700" },
  { label: 'Settings', href: '/settings', icon: FiSettings },
]
const adminRoutes = [
  { label: 'Admin Dashboard', href: '/admin', icon: LayoutDashboard, color: "text-sky-500" },
  { label: 'Student', href: '/admin/students', icon: FaGraduationCap, color: "text-violet-500" },
  { label: 'Mentors', href: '/admin/mentors', icon: FaChalkboardTeacher, color: "text-orange-700" },
  { label: 'Site Settings', href: '/admin/settings', icon: FiSettings },
]

interface SidebarProps {
  user?: User | PrismaUser
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const modal = useOnboardingModal();


  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='flex-1 px-3 py-2'>
        <Link href='/dashboard' className='flex items-center pl-3 mb-14'><div className='relative w-8 h-8 mr-4'>
          <Image fill alt="logo" src="/logo_only.png" />

        </div>
          <h1 className={cn("text-2xl font-bold", monserrat.className)}>MentorHQ</h1>
        </Link>
        <div className='space-y-1'>
          {routes.map((route) => (
            <Link href={route.href} key={route.href} className={cn('flex justify-start w-full p-3 text-sm font-medium transition rounded-lg cursor-pointer group hover:text-white hover:bg-white/10', pathname === route.href ? "text-white bg-white/10" : 'text-zinc-400')}>
              <div className='flex items-center flex-1'>
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>))}
        </div>
        {user?.role === "ADMIN" && (
          <div className='space-y-1 flex-grow mt-10'>
            <h2 className='text-center text-md font-medium my-2'>Admin Area</h2>
            {adminRoutes.map((route) => (
              <Link href={route.href} key={route.href} className={cn('flex justify-start w-full p-3 text-sm font-medium transition rounded-lg cursor-pointer group hover:text-white hover:bg-white/10', pathname === route.href ? "text-white bg-white/10" : 'text-zinc-400')}>
                <div className='flex items-center flex-1'>
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>))}
          </div>
        )}

      </div>
      {/* Alert box for non-mentor users */}
      {!user?.isOnboarded && !isHidden ? (
        <Alert variant={"destructive"} onClick={modal.onOpen}>
          {/* Icon and Text */}
          <CgClose className="h-4 w-4" onClick={() => {
            setIsHidden(true);
          }} />
          <AlertTitle>Unlock Your Mentor Mastery!</AlertTitle>
          <AlertDescription>
            Get access to students and a personalized experience
            <Button size="lg" variant="ghost" className="w-full">
              Complete profile!
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>

          </AlertDescription>

        </Alert>
      ) : null}
    </div>
  )
}
export default Sidebar; 