import React from "react";
import { IconType } from 'react-icons/lib';

interface IconButtonProps {
  color: string;
  icon: IconType;
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ color, icon: Icon, children, ...props }) => (
  <button
    className={`w-full flex justify-center items-center space-x-2 px-4 py-2 rounded ${color} hover:${color}/80 transition-colors focus:outline-none`}
    {...props}
  >
    <Icon className="w-6 h-6" /> {/* Adjust width and height based on your preference */}
    <span>{children}</span>
  </button>
);
