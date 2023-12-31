import { redirect } from 'next/navigation';

import { NavBar } from '@/components/server/Navbar';
import { getAuthSession } from '@/lib/auth/auth';

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) {
    return redirect('/dashboard');
  }

  return (
    <>
      <NavBar />
      HomePage
    </>
  );
}
