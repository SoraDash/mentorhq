"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { User as PrismaUser } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCog, FaLifeRing, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

interface Props {
  user: PrismaUser;
}
export const UserAccountNav = ({ user }: Props) => {
  const router = useRouter();
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown
      placement='bottom-end'
      backdrop='blur'
      shouldCloseOnInteractOutside={() => true}>
      <DropdownTrigger>
        <User
          as='button'
          avatarProps={{
            isBordered: user.isPremium,
            src:
              `https://github.com/${user.github}.png` || (user.image as string),
            showFallback: true,
            color: user.isPremium ? "danger" : "default",
          }}
          className='transition-transform'
          description={user.email}
          name={user?.name}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label='User Account Navigation'
        variant='flat'>
        <DropdownItem
          key='profile'
          startContent={<FaUserCircle className={iconClasses} />}
          onClick={() => router.push(`/profile`)}>
          My Profile
        </DropdownItem>
        <DropdownItem
          key='settings'
          startContent={<FaCog className={iconClasses} />}>
          My Settings
        </DropdownItem>
        <DropdownItem
          key='help_and_feedback'
          startContent={<FaLifeRing className={iconClasses} />}>
          Help & Feedback
        </DropdownItem>
        <DropdownItem
          key='logout'
          color='danger'
          startContent={<FaSignOutAlt className={iconClasses} />}
          onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
