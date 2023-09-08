import { useToast } from '@/components/ui/use-toast';
import { updateRole } from '@/lib/auth/auth';
import { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { BsShieldCheck } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import React from 'react';

type RoleConfig = {
  [key in Role]: {
    color: string;
    icon: React.ComponentType;
  };
};

export const knownRoles: RoleConfig = {
  [Role.ADMIN]: { color: "text-red-500", icon: BsShieldCheck },
  [Role.USER]: { color: "text-dark-purple", icon: RiAccountPinCircleLine },
  [Role.MENTOR]: { color: "text-dark-purple", icon: FaChalkboardTeacher },
};

interface RoleDropdownProps {
  userId: string;
  currentRole: Role;
}

export const RoleDropdown: React.FC<RoleDropdownProps> = ({ userId, currentRole }) => {
  const { toast } = useToast();
  const router = useRouter();

  const dropdownItems = Object.entries(knownRoles).map(([role, { color, icon }]) => ({
    key: role,
    label: role,
    color,
    IconComponent: icon,
  }));

  const CurrentRoleIcon = knownRoles[currentRole].icon;

  const handleRoleChange = async (role: string) => {
    if (role === currentRole) return;
    try {
      const user = await updateRole(userId, role as Role);
      router.refresh();
      toast({
        description: `Success: Updated ${user.firstName}'s role to ${role}!`,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: `Something went wrong`,
        description: `Failed to update role: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dropdown backdrop='blur' showArrow>
      <DropdownTrigger>
        <Button variant="light" startContent={<CurrentRoleIcon />}>
          {currentRole}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Roles">
        {dropdownItems.map(item => (
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
}
