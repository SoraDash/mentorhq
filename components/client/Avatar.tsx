"use client";
import { getInitials } from '@/lib/split-name';
import { cn } from '@/lib/utils';
import { Student, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import { MdWorkspacePremium } from 'react-icons/md';

type Entity = (User & { isPremium?: boolean }) | Student;

interface AvatarProps {
  entity: Entity;
  className?: string;
  profile?: boolean;
  showPremium?: boolean
}

const getRandomColor = () => {
  const colors = [
    'bg-red-400', 'bg-green-400', 'bg-blue-400', 'bg-yellow-400',
    'bg-pink-400', 'bg-purple-400', 'bg-indigo-400'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

const handleUserAvatar = (user: User & { isPremium?: boolean }, className: string, profile: boolean, showPremium: boolean = false) => {
  return (
    <div className="relative">
      {user.image ? (
        <Image className={cn("rounded-full", className)} alt={user.name || "Avatar"} src={user.image} height={profile ? 128 : 40} width={profile ? 128 : 40} />
      ) : user.github ? (
        <Image className={cn("rounded-full", className)} alt={user.name || "Avatar"} src={`https://github.com/${user.github}.png`} height={profile ? 128 : 40} width={profile ? 128 : 40} />
      ) : user.name ? (
        <div className={cn(`rounded-full flex items-center justify-center text-white text-sm ${profile ? 'w- 10' : 'h -[128]'}`, getRandomColor(), className)}>
          {getInitials(user.name)}
        </div>
      ) : null}

      {/* If the user is a premium member and showPremium is true, render the star on the top-right corner */}
      {user.isPremium && showPremium && (
        <div className='absolute bottom-0 right-2 transform translate-x-1/2 -translate-y-1/2'>
          <MdWorkspacePremium className='text-primary-purple w-6 h-6' />
        </div>
      )}
    </div>
  );
}


const handleStudentAvatar = (student: Student, className: string, profile: boolean) => {
  if (student.github) {
    return (
      <Image className={cn("rounded-full", className)} alt={student.name || "Avatar"} src={`https://github.com/${student.github}.png`} height={profile ? 128 : 40} width={profile ? 128 : 40} />
    );
  } else {
    const initials = getInitials(student.name);
    return (
      <div className={cn(`rounded-full flex items-center justify-center text-white text-sm ${profile ? 'w- 10' : 'h -[128]'}`, getRandomColor(), className)} >
        {initials}
      </div>
    );
  }
}

const Avatar: React.FC<AvatarProps> = ({ className, entity, profile, showPremium = false }) => {  // Default to true
  if ('image' in entity) {  // Check for a property unique to User
    return handleUserAvatar(entity as User & { isPremium?: boolean }, className as string, profile as boolean, showPremium);
  } else {
    return handleStudentAvatar(entity as Student, className as string, profile as boolean);
  }
}


export default Avatar;
