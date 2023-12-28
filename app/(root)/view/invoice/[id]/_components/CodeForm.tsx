'use client';

import { Button, Input } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';

type Props = {
  code: string;
  correctCode: string;
};

const CodeForm = ({ code, correctCode }: Props) => {
  const [codeValue, setCodeValue] = useState(code);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleInputChange = (e: any) => {
    setCodeValue(e.target.value);
  };

  const handleClick = () => {
    // Create a new instance of URLSearchParams for a clean query string
    const params = new URLSearchParams();

    // Set the 'code' parameter
    params.set('code', codeValue);

    // Conditionally set the 'error' parameter if the code is incorrect
    if (codeValue !== correctCode) {
      params.set('error', 'invalid_code');
    }

    // Construct the new query string
    const newQueryString = params.toString();

    // Navigate to the same page with the new query string
    router.push(`${pathname}?${newQueryString}`);
  };

  return (
    <form>
      <div>
        <Input
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          label="Code"
          onChange={handleInputChange} // Correct placement of onChange
          type="text"
          value={codeValue}
        />
      </div>

      <div>
        <Button
          className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
          onClick={handleClick}
        >
          View Invoice
        </Button>
        use {correctCode}
      </div>
    </form>
  );
};

export default CodeForm;
