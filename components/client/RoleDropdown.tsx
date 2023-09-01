import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateRole } from '@/lib/auth/auth';
import { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { BsShieldCheck } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { useToast } from '@/components/ui/use-toast';

import React from 'react';

type RoleConfig = {
  // eslint-disable-next-line no-unused-vars
  [key in Role]: {
    color: string;
    icon: React.ComponentType;
  };
};


export const knownRoles: RoleConfig = {
  [Role.ADMIN]: { color: "text-red-500", icon: BsShieldCheck },
  [Role.USER]: { color: "text-dark-purple", icon: RiAccountPinCircleLine },
  [Role.MENTOR]: { color: "text-dark-purple", icon: FaGraduationCap },
};

interface RoleDropdownProps {
  userId: string;
  currentRole: Role;
}
export const RoleDropdown: React.FC<RoleDropdownProps> = ({ userId, currentRole }) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleRoleChange = async (role: string) => {
    if (role === currentRole) return;
    //TODO:  We need a modal to show the user the changes they are about to make
    try {
      const user = await updateRole(userId, role as Role)
      router.refresh();
      toast({
        description: `Success: Updated ${user.firstName}'s role to ${role}!`,
        variant: "success",
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
    <>
      <Select onValueChange={(value) => handleRoleChange(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={currentRole} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available Roles</SelectLabel>
            {Object.values(Role).map(role => (
              <SelectItem
                value={role}
                key={role}
              >
                {role}
                {/* Here you can add icons and colors based on role */}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select >
    </>
  );
}

