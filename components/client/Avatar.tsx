"use client";
import { getInitials } from '@/lib/split-name';
import { Avatar as NextUIAvatar } from '@nextui-org/react';
import { Student, User } from '@prisma/client';
import React from 'react';

type Entity = (User & { isPremium?: boolean }) | Student;

interface AvatarProps {
  entity: Entity;
  showFallback?: boolean;
}

const handleUserAvatar = (user: User & { isPremium?: boolean }, showFallback?: boolean) => {
  if (!user) return { src: undefined, text: "?" };

  if (user.image) {
    return { src: user.image, text: undefined };
  }

  if (user.github) {
    return { src: `https://github.com/${user.github}.png`, text: undefined };
  }

  return showFallback ? { src: undefined, text: getInitials(user.name as string) } : { src: user.github, text: undefined };
};

const handleStudentAvatar = (student: Student, showFallback?: boolean) => {
  if (student.github) {
    return { src: `https://github.com/${student.github}.png`, text: undefined };
  }

  return showFallback ? { src: undefined, text: getInitials(student.name) } : { src: student.github, text: undefined };
};

const Avatar: React.FC<AvatarProps> = ({ entity, showFallback }) => {
  const isUser = 'image' in entity;
  const avatarData = isUser ? handleUserAvatar(entity as User & { isPremium?: boolean }, showFallback) : handleStudentAvatar(entity as Student, showFallback);
  const isPremium = (entity as User & { isPremium?: boolean }).isPremium;

  return (
    <NextUIAvatar
      src={avatarData.src as string}
      name={avatarData.text}
      size="md"
      isBordered={isPremium}
    />
  );
}

const Avatar: React.FC<AvatarProps> = ({ className, entity, profile, showPremium = false }) => {  // Default to true
  if ('image' in entity) {  // Check for a property unique to User
    return handleUserAvatar(entity as User & { isPremium?: boolean }, className as string, profile as boolean, showPremium);
  } else {
    return handleStudentAvatar(entity as Student, className as string, profile as boolean);
  }
}


export default Avatar;
