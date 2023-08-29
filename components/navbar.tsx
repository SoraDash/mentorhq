import { getAuthSession, getUserRole } from '@/lib/auth';
import { ThemeToggle } from './ThemeToggle';
import { UserAccountNav } from './UserAccountNav';
import MobileSidebar from './mobile-sidebar';
import { SignInButton } from './SignInButton';

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