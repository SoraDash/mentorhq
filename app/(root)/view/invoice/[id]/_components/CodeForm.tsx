'use client';

import { Button, Input } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  code: string;
  correctCode: string;
};

const CodeForm = ({ code, correctCode }: Props) => {
  const [codeValue, setCodeValue] = useState(code);
  const router = useRouter();
  const pathname = usePathname();

  const handleInputChange = (e: any) => {
    setCodeValue(e.target.value);
  };

  const handleClick = () => {
    const params = new URLSearchParams();

    params.set('code', codeValue);

    if (codeValue !== correctCode) {
      params.set('error', 'invalid_code');
    }

    const newQueryString = params.toString();

    router.push(`${pathname}?${newQueryString}`);
  };

  return (
    <form>
      <div>
        <Input
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          label="Code"
          onChange={handleInputChange}
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
