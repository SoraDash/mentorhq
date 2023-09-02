import React, { useState } from 'react';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        value={value as string}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none ${className}`}
      />
      <div
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-4 top-1/2 transform -translate-y-1/2 cursor-pointer flex items-center justify-center h-full w-10">
        {showPassword ? <FaEyeSlash className="w-10" /> : <FaEye className="w-10" />}
      </div>
    </div>
  );
}
