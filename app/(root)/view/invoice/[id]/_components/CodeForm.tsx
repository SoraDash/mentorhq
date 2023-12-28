'use client';

import { Button, Input } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';

type Props = {
  code: string;
};

const CodeForm = ({ code }: Props) => {
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
    const queryString = createQueryString('code', codeValue);

    router.push(pathname + '?' + queryString);
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
      </div>
    </form>
  );
};

export default CodeForm;
