'use client';

import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
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
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
        <header>
          <Image
            alt="Logo"
            className="w-20 mx-auto mb-5"
            height={120}
            src="/logos/logo_only_color.png"
            width={120}
          />
        </header>
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
      </div>
    </div>
  );
};

export default CodeForm;
