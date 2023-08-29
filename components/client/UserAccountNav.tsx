"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { roleConfig } from '@/lib/roleConfig';
import { cn } from '@/lib/utils';
import { Role } from '@prisma/client';
import { LogOut } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { BiCog } from 'react-icons/bi';
import { UserAvatar } from './UserAvatar';

type Props = {
  user: User;
  role: Role
};

export const UserAccountNav = ({ user, role }: Props) => {
  const { color, icon: RoleIcon } = roleConfig[role];
  const router = useRouter();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-4">
        <div className="mb-4">
          Signed in as
          <div className="flex items-center space-x-2 mb-2">

            <p className="font-medium text-lg">{user.name}</p>
            <Tooltip>
              <TooltipTrigger>
                <RoleIcon className={cn("w-5 h-5", color ? color : 'text-white')} />
              </TooltipTrigger>
              <TooltipContent>
                <p className='capitalize'>{role.toLocaleLowerCase()} Account</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="w-[200px] truncate text-sm text-secondary-foreground">
            {user?.email}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => router.push('/settings')}
          className="cursor-pointer flex items-center space-x-2 mb-2"
        >
          <span>Settings</span>
          <BiCog className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            signOut();
          }}
          className="text-red-600 cursor-pointer flex items-center space-x-2"
        >
          <span>Sign out</span>
          <LogOut className="w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
