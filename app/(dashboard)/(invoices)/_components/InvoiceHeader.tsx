'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4">
      <button
        className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default Header;
