"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User as PrismUser } from "@prisma/client";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

interface MobileSidebarProps {
  user: PrismUser;
}
const MobileSidebar: React.FC<MobileSidebarProps> = ({ user }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <Sheet>
      <SheetTrigger className='md:hidden'>
        <Menu className='text-[#fde8ef] dark:text-[#ee327b]' />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='p-0'>
        <Sidebar user={user} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
