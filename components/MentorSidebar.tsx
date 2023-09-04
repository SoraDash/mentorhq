import Avatar from '@/components/client/Avatar';
import { MentorWithCount } from '@/lib/admin/mentors';
import { StudentWithCounts } from '@/lib/students';
import { cn } from '@/lib/utils';
import { capitalize } from 'lodash-es';
import React from 'react';
import { FaChalkboardTeacher, FaFileAlt, FaGraduationCap, FaHammer, FaUserEdit } from 'react-icons/fa';
import { IconButton } from './client/IconButton';
import { knownRoles } from './client/RoleDropdown';
import { SocialMediaIcons } from './client/SocialMediaIcons';
import { FetchGithubBio } from './client/tables/admin/mentors/github-bio';

type ProfileWithCounts = MentorWithCount | StudentWithCounts

interface MentorSidebarProps {
  profile: ProfileWithCounts;
}

export const MentorSidebar: React.FC<MentorSidebarProps> = ({ profile }) => {

  const isMentor = (profile: ProfileWithCounts): profile is MentorWithCount => {
    return (profile as MentorWithCount)._count !== undefined;
  };

  let RoleIcon = FaChalkboardTeacher;
  let color = "text-gray-600";

  if (isMentor(profile) && profile.role) {
    const roleConfig = knownRoles[profile.role];
    if (roleConfig) {
      RoleIcon = roleConfig.icon;
      color = roleConfig.color;
    }
  }

  return (
    <div className="dark:bg-navbar bg-white shadow rounded-lg p-6">
      <div className="flex flex-col items-center">
        <Avatar entity={profile} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" profile />

        <h1 className="text-xl font-bold">{profile.name}</h1>
        {isMentor(profile) && profile.role && (
          <p className="text-gray-600 flex items-center font-bold">{capitalize(profile.role)}
            <span className={cn("w-5 h-5 ml-1", color ? color : 'text-gray-600')}>
              <RoleIcon />
            </span>
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="mt-6 grid grid-cols-1 gap-4">
            <IconButton color="bg-secondary text-secondary-foreground" icon={FaUserEdit}>
              Edit
            </IconButton>
            {isMentor(profile) && (
              <div className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 py-3 px-5 rounded flex justify-center items-center">
                <FetchGithubBio id={profile.id} />
              </div>
            )}
            {isMentor(profile) && profile.role === 'ADMIN' && (
              <IconButton color="bg-red-500 text-white" icon={FaHammer}>
                Ban
              </IconButton>
            )}
          </div>
        </div>
      </div>

      {isMentor(profile) && (
        <>
          <hr className="my-6 border-t border-gray-300" />
          <div className="flex flex-col">
            <span className="text-gray-600 uppercase font-bold tracking-wider mb-2">Stats</span>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaFileAlt className="text-gray-500" />
                <span className="flex-grow">Sessions</span>
                <span>{profile._count.studentSession}</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaGraduationCap className="text-gray-500" />
                <span className="flex-grow">Students</span>
                <span>{profile._count.students}</span>
              </li>
            </ul>
          </div>
        </>
      )}

      <span className="text-gray-600 uppercase font-bold tracking-wider my-3">Social</span>
      <div className="flex justify-center items-center gap-6 my-6">
        <SocialMediaIcons user={profile} />
      </div>
    </div>
  );
}
