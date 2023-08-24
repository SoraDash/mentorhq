"use client"

import { AvatarFallback } from '@radix-ui/react-avatar';
import { User } from 'next-auth';
import Image from 'next/image';
import { Avatar } from './ui/avatar';

interface UserAvatarProps {
  user: User
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <Avatar>
      {user.image ? (
        <div className='relative w-full h-full aspect-square'>
          <Image fill src={user.image} alt={user.name || "User Profile"} referrerPolicy='no-referrer' />
        </div>
      ) : (
        <AvatarFallback> <span className='sr-only'>{user?.name}</span></AvatarFallback>
      )}
    </Avatar>
  );
}