import { getAuthSession } from '@/lib/auth';
import { ThemeToggle } from './ThemeToggle';
import { UserAccountNav } from './UserAccountNav';
import MobileSidebar from './mobile-sidebar';
import { SignInButton } from './SignInButton';

export const NavBar = async () => {
  const session = await getAuthSession();
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar />
      <div className='flex justify-end w-full'>
        {/* <UserButton afterSignOutUrl='/' /> */}
        <ThemeToggle className='mr-3' />
        <div className='flex items-center'>
          {session?.user ?
            <UserAccountNav user={session.user} /> : <SignInButton />
          }
        </div>
      </div>
    </div>
  );
}