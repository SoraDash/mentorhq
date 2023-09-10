"use client";
import { ADMIN_MENU, MAIN_MENU } from '@/lib/menu';
import { cn } from '@/lib/utils';
import { User as PrismaUser } from '@prisma/client';
import { User } from 'next-auth';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { ThemeImage } from '../ThemeImage';

const poppins = Poppins({ weight: "600", subsets: ['latin'] });



interface SidebarProps {
  user?: User | PrismaUser
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(false);


  return (
    <div className='space-y-4 py-4 px-5 flex flex-col h-full bg-navbar text-white'>
      <div className='flex-1 px-3 py-2'>
        <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
          <div className='relative w-full h-20'>
            <Image src="/logo_text_color.png" fill alt="logo" />
            {/* <ThemeImage alt='Logo' srcDark='/logo_only_dark.png' srcLight='/logo_only_light.png' fill /> */}
          </div>
          {/* <h1 className={cn("text-2xl font-bold", poppins.className)}>MentorHQ</h1> */}
        </Link>
        <div className='space-y-1'>
          {MAIN_MENU.map((route) => (
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
            {ADMIN_MENU.map((route) => (
              <Link href={route.href} key={route.href} className={cn('flex justify-start w-full p-3 text-sm font-medium transition rounded-lg cursor-pointer group hover:text-white hover:bg-white/10', pathname === route.href ? "text-white bg-white/10" : 'text-zinc-400')}>
                <div className='flex items-center flex-1'>
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>))}
          </div>
        )}

      </div>
      {!user?.isOnboarded && !isHidden ? (
        <div className="bg-yellow-400 rounded-lg shadow-lg p-6 relative">
          <div className='absolute top-2 right-2  text-gray-800 font-bold py-2 px-4 rounded-full'>
            <CgClose className="h-4 w-4 " onClick={() => {
              setIsHidden(true);
            }} />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Unlock Sync!</h2>
          <p className="text-gray-700 mb-4">
            Get access to students and a personalized experience
          </p>
          <span className="bg-primary-purple hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full" onClick={() => router.replace('/onboarding')}>
            Complete profile!
          </span>
        </div>

      ) : null}

    </div>
  )
}
export default Sidebar; 