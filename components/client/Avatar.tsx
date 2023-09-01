"use client";
import { getInitials } from '@/lib/split-name';
import { cn } from '@/lib/utils';
import { Student, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

type Entity = User | Student;

interface AvatarProps {
  entity: Entity;
  className?: string;
  profile?: boolean;
}

const getRandomColor = () => {
  const colors = [
    'bg-red-400', 'bg-green-400', 'bg-blue-400', 'bg-yellow-400',
    'bg-pink-400', 'bg-purple-400', 'bg-indigo-400'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

const handleUserAvatar = (user: User, className: string, profile: boolean) => {
  if (user.image) {
    return (
      <Image className={cn("rounded-full", className)} alt={user.name || "Avatar"} src={user.image} height={profile ? 128 : 40} width={profile ? 128 : 40} />
    );
  } else if (user.github) {
    return (
      <Image className={cn("rounded-full", className)} alt={user.name || "Avatar"} src={`https://github.com/${user.github}.png`} height={profile ? 128 : 40} width={profile ? 128 : 40} />
    );
  } else if (user.name) {
    const initials = getInitials(user.name);
    return (
      <div className={cn(`rounded-full flex items-center justify-center text-white text-sm ${profile ? 'w- 10' : 'h -[128]'}`, getRandomColor(), className)}>
        {initials}
      </div>
    );
  }
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

const Avatar: React.FC<AvatarProps> = ({ className, entity, profile }) => {
  if ('image' in entity) {  // Check for a property unique to User
    return handleUserAvatar(entity as User, className as string, profile as boolean);
  } else {
    return handleStudentAvatar(entity as Student, className as string, profile as boolean);
  }
}

export default Avatar;
