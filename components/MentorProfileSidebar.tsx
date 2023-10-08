import { cn } from "@/lib/utils";
import { Avatar } from "@nextui-org/react";
import { Prisma, User } from "@prisma/client";
import { capitalize } from "lodash-es";
import React from "react";
import {
  FaChalkboardTeacher,
  FaFileAlt,
  FaGraduationCap,
  FaHammer,
  FaUserEdit,
} from "react-icons/fa";
import { IconButton } from "./client/IconButton";
import { knownRoles } from "./client/RoleDropdown";
import { SocialMediaIcons } from "./client/SocialMediaIcons";
import CalendlyAuth from "./client/calendly/Calendly";
import CalendlyStatus from "./client/calendly/CalendlyStatus";
import { SyncGithubBio } from "./client/tables/admin/mentors/SyncGithubBio";
import { BooleanIcon } from "./server/BooleanIcon";
import { Badge } from "./ui/badge";

interface MentorProfileSidebarProps {
  profile: User & {
    isPremium?: boolean;
    image?: string;
    github?: string;
  };
}

export const MentorProfileSidebar: React.FC<MentorProfileSidebarProps> = ({
  profile,
}) => {
  let RoleIcon = FaChalkboardTeacher;
  let color = "text-gray-600";

  if (profile.role) {
    const roleConfig = knownRoles[profile.role];
    if (roleConfig) {
      RoleIcon = roleConfig.icon;
      color = roleConfig.color;
    }
  }

  return (
    <div className='dark:bg-navbar bg-white shadow rounded-lg p-6'>
      <div className='flex flex-col items-center space-y-5'>
        <Avatar
          isBordered={profile.isPremium ?? false}
          color={profile.isPremium ? "danger" : "default"}
          className='transition-transform w-32 h-32'
          src={
            `https://github.com/${profile.github}.png` ||
            (profile.image as string)
          }
          name={profile?.name as string}
          showFallback
        />

        <h1 className='text-xl font-bold'>{profile.name}</h1>
        <div className='text-gray-600 flex flex-col items-center space-y-3'>
          <div className='flex items-center font-bold'>
            {capitalize(profile.role)}
            <span className={cn("w-5 h-5 ml-1", color)}>
              <RoleIcon />
            </span>
          </div>
          {profile.isPremium && (
            <Badge variant={"premium"}>Premium Member</Badge>
          )}
        </div>

        <div className='mt-6 flex flex-wrap gap-4 justify-center'>
          <div className='mt-6 grid grid-cols-1 gap-3'>
            <IconButton
              color='bg-secondary text-secondary-foreground'
              icon={FaUserEdit}>
              Edit
            </IconButton>
            {profile.github && <SyncGithubBio id={profile.id} />}
            <CalendlyAuth />
            {profile.role === "ADMIN" && (
              <IconButton
                color='bg-red-500 text-white'
                icon={FaHammer}>
                Ban
              </IconButton>
            )}
          </div>
        </div>

        <hr className='my-6 border-t border-gray-300' />
        <h3 className='text-gray-600 uppercase font-bold tracking-wider mb-2 text-left w-full'>
          Stats
        </h3>
        <div className='flex flex-col w-full'>
          <ul className='space-y-2'>
            <li className='flex items-center space-x-2'>
              <FaFileAlt className='text-gray-500' />
              <span className='flex-grow'>Sessions</span>
              <span>{profile._count.studentSession}</span>
            </li>
            <li className='flex items-center space-x-2'>
              <FaGraduationCap className='text-gray-500' />
              <span className='flex-grow'>Students</span>
              <span>{profile._count.students}</span>
            </li>
            <li className='flex items-center space-x-2'>
              <span className='flex-grow'>Onboarding Completed</span>
              <BooleanIcon
                condition={profile.isOnboarded}
                className='items-center text-center w-6 h-6'
              />
            </li>
            <li className='flex items-center space-x-2'>
              <span className='flex-grow'>Premium Member</span>
              <BooleanIcon
                condition={profile.isPremium}
                className='items-center text-center w-6 h-6'
              />
            </li>
            <li className='flex items-center space-x-2'>
              <CalendlyStatus />
            </li>
            <li className='flex items-center space-x-2'>
              <span className='flex-grow'>CI API Key set</span>
              <BooleanIcon
                condition={!!profile.ciApiKey}
                className='items-center text-center w-6 h-6'
              />
            </li>
          </ul>
        </div>

        <h3 className='text-gray-600 uppercase font-bold tracking-wider my-3 text-left w-full'>
          Social
        </h3>
        <div className='flex justify-center items-center gap-6 my-6 w-full'>
          <SocialMediaIcons user={profile} />
        </div>
      </div>
    </div>
  );
};
