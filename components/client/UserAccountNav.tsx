"use client"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";
import { User as PrismaUser, Role } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaCog, FaLifeRing, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { knownRoles } from './RoleDropdown';

interface Props {
  user: PrismaUser
  role: Role
}
export const UserAccountNav = ({ user, role }: Props) => {
  const router = useRouter();
  const Icon = knownRoles[role].icon as IconType;
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";


  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User
          as="button"

          avatarProps={{
            isBordered: user.isPremium,
            src: user.github as string || user.image as string,
            showFallback: true,
            color: user.isPremium ? "danger" : "default",
          }}
          className="transition-transform"
          description={user.email}
          name={user?.name}
        />

      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="team_settings" startContent={<FaUserCircle className={iconClasses} />}>My Profile</DropdownItem>
        <DropdownItem key="settings" startContent={<FaCog className={iconClasses} />}>
          My Settings
        </DropdownItem>
        <DropdownItem key="help_and_feedback" startContent={<FaLifeRing className={iconClasses} />}>
          Help & Feedback
        </DropdownItem>
        <DropdownItem key="logout" color="danger" startContent={<FaSignOutAlt className={iconClasses} />} onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
