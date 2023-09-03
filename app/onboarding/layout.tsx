import OnboardingSidebar from '@/components/client/onboarding/OnboardingSidebar';
import { getAuthSession } from '@/lib/auth/auth';
import React from 'react';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  // if (!session?.user?.isOnboarded) {
  //   return redirect("/dashboard")
  // }


  return (

    <div className='relative h-full'>
      <div className='hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 text-white justify-center'>
        <OnboardingSidebar />
      </div>
      <main className='md:pl-72 flex flex-col min-h-screen'>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;