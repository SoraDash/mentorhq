import { Poppins } from 'next/font/google';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

import OnboardingSidebar from '@/components/client/onboarding/OnboardingSidebar';
import { getUser } from '@/lib/auth/auth';
import { cn } from '@/lib/utils';

const poppins = Poppins({ weight: '600', subsets: ['latin'] });

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  if (user?.isOnboarded) {
    return redirect('/dashboard');
  }

  return (
    <div className="relative h-full">
      <div className="hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 text-white justify-center">
        {/* Adjusted the container div */}
        <div className="relative flex items-center justify-start px-4 py-2">
          {/* Logo - with specified width and height */}
          <Image
            alt="logo"
            height={60} // Adjust this value based on your needs
            src="/logos/logo_only_color.png"
            width={60} // Adjust this value based on your needs
          />

          {/* Title */}
          <h1 className={cn('text-2xl font-bold', poppins.className)}>
            MentorHQ
          </h1>
        </div>

        <OnboardingSidebar />
      </div>
      <main className="md:pl-72 flex flex-col min-h-screen">{children}</main>
    </div>
  );
};

export default DashboardLayout;
