"use client"

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { User } from 'next-auth';
import { User as PrismUser } from '@prisma/client'
import React from 'react';

interface MobileSidebarProps {
  user: User | PrismUser
}
const MobileSidebar: React.FC<MobileSidebarProps> = ({ user }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  return (
    <Sheet>
      <SheetTrigger className='md:hidden'>
        <Menu className='text-[#fde8ef] dark:text-[#ee327b]' />
      </SheetTrigger>
      <SheetContent side="left" className='p-0'>
        <Sidebar user={user} />
      </SheetContent>
    </Sheet>

  );
}


export default MobileSidebar;