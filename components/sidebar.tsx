"use client";

import { cn } from '@/lib/utils';
import { Code, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, Settings, VideoIcon } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const monserrat = Montserrat({ weight: "600", subsets: ['latin'] });

const routes = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: "text-sky-500" },
  { label: 'Conversation', href: '/conversation', icon: MessageSquare, color: "text-violet-500" },
  { label: 'Image Generation', href: '/image', icon: ImageIcon, color: "text-pink-700" },
  { label: 'Video Generation', href: '/video', icon: VideoIcon, color: "text-orange-700" },
  { label: 'Music Generation', href: '/music', icon: MusicIcon, color: "text-emerald-500" },
  { label: 'Code Generation', href: '/code', icon: Code, color: "text-green-700" },
  { label: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {

}

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='flex-1 px-3 py-2'>
        <Link href='/dashboard' className='flex items-center pl-3 mb-14'><div className='relative w-8 h-8 mr-4'>
          <Image fill alt="logo" src="/logo.png" />

        </div>
          <h1 className={cn("text-2xl font-bold", monserrat.className)}>ReactAIvate</h1>
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
      </div>
    </div >
  );

}
export default Sidebar; 