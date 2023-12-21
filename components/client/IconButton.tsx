import React from 'react';
import { IconType } from 'react-icons/lib';

interface IconButtonProps {
  children: React.ReactNode;
  color: string;
  icon: IconType;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  color,
  icon: Icon,
  ...props
}) => (
  <button
    className={`w-full flex justify-center items-center space-x-2 px-4 py-2 rounded ${color} hover:${color}/80 transition-colors focus:outline-none`}
    {...props}
  >
    <Icon className="w-6 h-6" />{' '}
    {/* Adjust width and height based on your preference */}
    <span>{children}</span>
  </button>
);
