import { NavBar } from '@/components/navbar';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/dashboard")
  }
  return (
    <>
      <NavBar />
      HomePage
    </>
  )
}
