import React from "react";
import { IconType } from 'react-icons/lib';

interface IconButtonProps {
  color: string;
  icon: IconType;
  children: React.ReactNode;
}
export const IconButton: React.FC<IconButtonProps> = ({ color, icon: Icon, children, ...props }) => (
  <button
    className={`flex justify-center items-center w-full py-3 px-5 rounded ${color} hover:${color}/80 transition-colors focus:outline-none`}
    {...props}
  >
    <Icon className="mr-2" />
    {children}
  </button>
);