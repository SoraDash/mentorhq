"use client"
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { User } from 'next-auth';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { PiShootingStarFill } from 'react-icons/pi';

interface UserAvatarProps {
  user: User & { isPremium?: boolean };
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <div className='relative'>
      <Avatar>
        {user.image ? (
          <div className='relative w-full h-full aspect-square'>
            <Image fill src={user.image} alt={user.name || "User Profile"} referrerPolicy='no-referrer' />
          </div>
        ) : (
          <AvatarFallback><span className='sr-only'>{user?.name}</span></AvatarFallback>
        )}
      </Avatar>

      {/* If the user is a premium member, render the star on the top-right corner */}
      {user.isPremium && (
        <div className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2'>
          <PiShootingStarFill className='text-yellow-500 w-6 h-6' />
        </div>
      )}
    </div>
  );
}
