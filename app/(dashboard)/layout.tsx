import { CommandMenu } from "@/components/client/CommandSearch";
import Sidebar from "@/components/client/Sidebar";
import { NavBar } from "@/components/server/Navbar";
import { getUser } from "@/lib/auth/auth";

import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  return (
    <div className='relative h-full'>
      <div className='hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0'>
        <Sidebar user={user} />
      </div>
      <main className='md:pl-72'>
        <CommandMenu />
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
