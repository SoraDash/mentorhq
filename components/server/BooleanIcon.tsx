import { cn } from '@/lib/utils';
import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface BooleanIconProps {
  condition: boolean;
  missingText?: string;
  successText?: string;
  className?: string;
  centered?: boolean; // New prop
}

export const BooleanIcon: React.FC<BooleanIconProps> = ({
  condition,
  missingText,
  successText,
  className,
  centered = false
}) => {
  const IconComponent = condition ? FaCheck : FaTimes;

  const Icon = (
    <IconComponent className={cn("w-3.5 h-3.5 mr-2", className, {
      "text-green-500 dark:text-green-400": condition,
      "text-red-500 dark:text-red-400": !condition
    })} />
  );

  return (
    <>
      {centered ? (
        <div className="flex justify-center items-center">
          {Icon}
        </div>
      ) : (
        Icon
      )}
      {condition ? missingText : successText}
    </>
  );
};