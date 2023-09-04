import OnboardingSidebar from '@/components/client/onboarding/OnboardingSidebar';
import { getUser } from '@/lib/auth/auth';
import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const monserrat = Montserrat({ weight: "600", subsets: ['latin'] });

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (user?.isOnboarded) {
    return redirect("/dashboard")
  }


  return (

    <div className='relative h-full'>
      <div className='hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 text-white justify-center'>
        <div className='relative w-8 h-8 mr-4'>
          <Image fill alt="logo" src="/logo_only.png" />
        </div>
        <h1 className={cn("text-2xl font-bold", monserrat.className)}>MentorHQ</h1>
        <OnboardingSidebar />
      </div>
      <main className='md:pl-72 flex flex-col min-h-screen'>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;