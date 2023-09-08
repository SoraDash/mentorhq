import { SignInButton } from '@/components/client/SignInButton';
import { UserAccountNav } from '@/components/client/UserAccountNav';
import MobileSidebar from '@/components/client/mobile-sidebar';
import { getUser, getUserRole } from '@/lib/auth/auth';
import { SwitchTheme } from '../client/SwitchTheme';

export const NavBar = async () => {
  const user = await getUser();
  const role = await getUserRole();
  return (
    <div className='flex items-center p-4'>
      {user && <MobileSidebar user={user} />}
      <div className='flex justify-end w-full'>
        <SwitchTheme />
        <div className='flex items-center mx-3'>
          {user ?
            <UserAccountNav user={user} role={role || "USER"} /> : <SignInButton />
          }
        </div>
      </div>
    </div>
  );
}