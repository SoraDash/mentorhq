'use client';

import { Avatar } from '@nextui-org/react';
import { Student } from '@prisma/client';
import React from 'react';
import { FaUserEdit } from 'react-icons/fa';

import { IconButton } from './client/IconButton';
import { SocialMediaIcons } from './client/SocialMediaIcons';
import { SyncGithubBio } from './client/tables/admin/mentors/SyncGithubBio';

interface ProfileSidebarProps {
  profile: Student;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ profile }) => {
  return (
    <div className="dark:bg-navbar bg-white shadow rounded-lg p-6">
      <div className="flex flex-col items-center space-y-5">
        <Avatar
          className="transition-transform w-32 h-32"
          name={profile?.name}
          showFallback
          src={`https://github.com/${profile.github}.png`}
        />

        <h1 className="text-xl font-bold">{profile.name}</h1>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="mt-6 grid grid-cols-1 gap-3">
            <IconButton
              color="bg-secondary text-secondary-foreground"
              icon={FaUserEdit}
            >
              Edit
            </IconButton>
            <SyncGithubBio id={profile.id} />
          </div>
        </div>
        <h3 className="text-gray-600 uppercase font-bold tracking-wider my-3 text-left w-full">
          Social
        </h3>
        <div className="flex justify-center items-center gap-6 my-6 w-full">
          <SocialMediaIcons user={profile} />
        </div>
      </div>
    </div>
  );
};
