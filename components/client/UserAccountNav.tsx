'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@nextui-org/react';
import { User as PrismaUser } from '@prisma/client';
import { Cog, LifeBuoy, LogOut, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface Props {
  user: PrismaUser;
}

export const UserAccountNav = ({ user }: Props) => {
  const router = useRouter();
  const iconClasses =
    'text-xl text-default-500 pointer-events-none flex-shrink-0';

  return (
    <Dropdown
      backdrop="blur"
      placement="bottom-end"
      shouldCloseOnInteractOutside={() => true}
    >
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: user.isPremium,
            src:
              `https://github.com/${user.github}.png` || (user.image as string),
            showFallback: true,
            color: user.isPremium ? 'danger' : 'default',
          }}
          className="transition-transform"
          description={user.email}
          name={user?.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Account Navigation" variant="flat">
        <DropdownItem
          key="profile"
          onClick={() => router.push(`/profile`)}
          startContent={<UserCircle className={iconClasses} />}
        >
          My Profile
        </DropdownItem>
        <DropdownItem
          key="settings"
          startContent={<Cog className={iconClasses} />}
        >
          My Settings
        </DropdownItem>
        <DropdownItem
          className="mb-1"
          key="help_and_feedback"
          showDivider
          startContent={<LifeBuoy className={iconClasses} />}
        >
          Help & Feedback
        </DropdownItem>
        <DropdownItem
          color="danger"
          key="logout"
          onClick={() => signOut()}
          startContent={<LogOut className={iconClasses} />}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
