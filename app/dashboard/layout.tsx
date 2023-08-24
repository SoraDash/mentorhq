import Sidebar from '@/components/Sidebar';
import { NavBar } from '@/components/navbar';


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative h-full'>
      <div className='hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0'>
        <Sidebar />
      </div>
      <main className='md:pl-72'>
        <NavBar />
        {children}
      </main>
    </div>

  );
}

export default DashboardLayout;