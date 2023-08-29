import { NavBar } from '@/components/server/Navbar';
import Sidebar from '@/components/client/Sidebar';
import { getAuthSession } from '@/lib/auth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { redirect } from 'next/navigation';
import { QueryClient, QueryClientProvider } from 'react-query';


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/")
  }
  return (

    <div className='relative h-full'>
      <div className='hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0'>
        <Sidebar user={session?.user} />
      </div>
      <main className='md:pl-72'>
        <NavBar />
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;