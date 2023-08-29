import { getAuthSession, getUserRole } from '@/lib/auth/auth';
import { SignInButton } from '@/components/client/SignInButton';
import { ThemeToggle } from '@/components/client/ThemeToggle';
import { UserAccountNav } from '@/components/client/UserAccountNav';
import MobileSidebar from '@/components/client/mobile-sidebar';

export const NavBar = async () => {
  const session = await getAuthSession();
  const role = await getUserRole();
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar />
      <div className='flex justify-end w-full'>
        <ThemeToggle className='mr-3' />
        <div className='flex items-center'>
          {session?.user ?
            <UserAccountNav user={session.user} role={role || "USER"} /> : <SignInButton />
          }
        </div>
      </div>
    </div>
  );
}