'use client';

import { User as PrismaUser } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';

import { ADMIN_MENU, MAIN_MENU } from '@/lib/menu';
import { cn } from '@/lib/utils';

import CalendlyAuth from './calendly/Calendly';

interface SidebarProps {
  user?: PrismaUser;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="space-y-4 py-4 px-5 flex flex-col h-full bg-navbar text-white">
      <div className="flex-1 px-3 py-2">
        <Link className="flex items-center pl-3 mb-14" href="/dashboard">
          <div className="relative w-full h-20">
            <Image alt="logo" fill priority src="/logos/logo_text_color.png" />
          </div>
        </Link>
        <div className="space-y-1">
          {MAIN_MENU.map((route) => (
            <Link
              className={cn(
                'flex justify-start w-full p-3 text-sm font-medium transition rounded-lg cursor-pointer group hover:text-white hover:bg-white/10',
                pathname === route.href
                  ? 'text-white bg-white/10'
                  : 'text-zinc-400',
              )}
              href={route.href}
              key={route.href}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        {user?.role === 'ADMIN' && (
          <div className="space-y-1 flex-grow mt-10">
            <h2 className="text-center text-md font-medium my-2">Admin Area</h2>
            {ADMIN_MENU.map((route) => (
              <Link
                className={cn(
                  'flex justify-start w-full p-3 text-sm font-medium transition rounded-lg cursor-pointer group hover:text-white hover:bg-white/10',
                  pathname === route.href
                    ? 'text-white bg-white/10'
                    : 'text-zinc-400',
                )}
                href={route.href}
                key={route.href}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      {!user?.isOnboarded && !isHidden ? (
        <div className="bg-yellow-400 rounded-lg shadow-lg p-6 relative">
          <div className="absolute top-2 right-2  text-gray-800 font-bold py-2 px-4 rounded-full">
            <CgClose
              className="h-4 w-4 "
              onClick={() => {
                setIsHidden(true);
              }}
            />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Complete Profile!
          </h2>
          <p className="text-gray-700 mb-4">
            Get access to students and a personalized experience
          </p>
          <span
            className="bg-primary-purple hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full"
            onClick={() => router.replace('/onboarding')}
          >
            Complete profile!
          </span>
        </div>
      ) : null}
      {user?.isOnboarded && !user?.calendly_token && !isHidden ? (
        <div className="bg-purple-700 rounded-lg shadow-lg p-6 relative flex flex-col items-center">
          <div className="absolute top-2 right-2 text-gray-800 font-bold py-2 px-4 rounded-full">
            <CgClose
              className="h-4 w-4 "
              onClick={() => {
                setIsHidden(true);
              }}
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">Unlock Sync!</h2>
          <p className="text-white mb-4 text-center w-full">
            Sync students with calendly
          </p>
          <CalendlyAuth authButtonColor="secondary" />
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
