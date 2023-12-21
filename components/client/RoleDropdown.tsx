('');

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsShieldCheck } from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { RiAccountPinCircleLine } from 'react-icons/ri';

import { useToast } from '@/components/ui/use-toast';
import { updateRole } from '@/lib/auth/auth';

type RoleConfig = {
  // eslint-disable-next-line no-unused-vars
  [key in Role]: {
    color: string;
    icon: React.ComponentType;
  };
};

export const knownRoles: RoleConfig = {
  [Role.ADMIN]: { color: 'text-red-500', icon: BsShieldCheck },
  [Role.USER]: { color: 'text-dark-purple', icon: RiAccountPinCircleLine },
  [Role.MENTOR]: { color: 'text-dark-purple', icon: FaChalkboardTeacher },
};

interface RoleDropdownProps {
  currentRole: Role;
  userId: string;
}

export const RoleDropdown: React.FC<RoleDropdownProps> = ({
  currentRole,
  userId,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const dropdownItems = Object.entries(knownRoles).map(
    ([role, { color, icon }]) => ({
      key: role,
      label: role,
      color,
      IconComponent: icon,
    }),
  );

  const CurrentRoleIcon = knownRoles[currentRole].icon;

  const handleRoleChange = async (role: string) => {
    if (role === currentRole) return;

    try {
      const user = await updateRole(userId, role as Role);

      router.refresh();
      toast({
        description: `Success: Updated ${user.firstName}'s role to ${role}!`,
        variant: 'default',
      });
    } catch (error: any) {
      toast({
        title: `Something went wrong`,
        description: `Failed to update role: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dropdown backdrop="blur" showArrow>
      <DropdownTrigger>
        <Button startContent={<CurrentRoleIcon />} variant="light">
          {currentRole}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Roles">
        {dropdownItems.map((item) => (
          <DropdownItem
            key={item.key}
            onClick={() => handleRoleChange(item.key)}
            startContent={<item.IconComponent />}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
