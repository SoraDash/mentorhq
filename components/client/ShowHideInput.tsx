import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Input } from '../ui/input';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  className,
  onChange,
  value,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        className={`w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none ${className}`}
        onChange={onChange}
        type={showPassword ? 'text' : 'password'}
        value={value as string}
      />
      <div
        className="absolute inset-y-0 right-4 top-1/2 transform -translate-y-1/2 cursor-pointer flex items-center justify-center h-full w-10"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <FaEyeSlash className="w-10" />
        ) : (
          <FaEye className="w-10" />
        )}
      </div>
    </div>
  );
};
