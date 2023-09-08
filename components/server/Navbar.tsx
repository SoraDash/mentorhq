import { SignInButton } from '@/components/client/SignInButton';
import { UserAccountNav } from '@/components/client/UserAccountNav';
import MobileSidebar from '@/components/client/mobile-sidebar';
import { getAuthSession, getUserRole } from '@/lib/auth/auth';
import { SwitchTheme } from '../client/SwitchTheme';

export const NavBar = async () => {
  const session = await getAuthSession();
  const role = await getUserRole();
  return (
    <div className='flex items-center p-4'>
      {session?.user && <MobileSidebar user={session?.user} />}
      <div className='flex justify-end w-full'>
        <SwitchTheme />
        <div className='flex items-center ml-3'>
          {session?.user ?
            <UserAccountNav user={session.user} role={role || "USER"} /> : <SignInButton />
          }
        </div>
      </div>
    </div>
  );
}