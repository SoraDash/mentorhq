'use client';

import { Student, User } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { BiGlobe } from 'react-icons/bi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';

const socialMediaConfig = [
  {
    key: 'github',
    label: 'Visit GitHub Profile',
    IconComponent: FaGithub,
  },
  {
    key: 'linkedIn',
    label: 'Visit LinkedIn Profile',
    IconComponent: FaLinkedin,
  },
  {
    key: 'twitter',
    label: 'Visit Twitter Profile',
    IconComponent: FaTwitter,
  },
  {
    key: 'email',
    label: 'Email Student',
    IconComponent: HiOutlineMailOpen,
  },
  {
    key: 'website',
    label: 'Visit Website',
    IconComponent: BiGlobe,
  },
];

type ExtendedUser = User & {
  [key: string]: any;
};

type ExtendedStudent = Student & {
  [key: string]: any;
};

interface SocialMediaIconsProps {
  user: ExtendedUser | ExtendedStudent;
}

export const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ user }) => {
  return (
    <div className="flex justify-between w-full space-x-2">
      {socialMediaConfig.map((social) => {
        if (user[social.key]) {
          return (
            <Link
              aria-label={social.label}
              className={`text-gray-700 hover:text-primary-purple`}
              href={user[social.key]}
              key={social.key}
              rel="noopener noreferrer"
              target="_blank"
            >
              <social.IconComponent className="h-6 w-6" />
            </Link>
          );
        }

        return null;
      })}
    </div>
  );
};
