'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { EMOJI, LOADING_TEXT } from '@/constants/loading-text';

export default function LoadingSpinner({ isInModal = false }) {
  const generateLoadingText = () => {
    const text = LOADING_TEXT[Math.floor(Math.random() * LOADING_TEXT.length)];
    const emojiString = EMOJI[Math.floor(Math.random() * EMOJI.length)];

    return `${emojiString} ${text}`;
  };

  // Get a random loading text initially
  const initialLoadingText = generateLoadingText();

  const [loadingText, setLoadingText] = useState(initialLoadingText);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingText(generateLoadingText());
    }, 2000);

    return () => clearInterval(loadingInterval);
  }, []);

  const containerClass = isInModal
    ? 'flex flex-col items-center justify-center' // simplified styling for modal context
    : 'flex flex-col items-center justify-center min-h-screen'; // existing styling for standalone

  return (
    <div className={containerClass}>
      <div className="animate-bounce">
        <Image
          alt="Logo Spinner"
          height={240}
          src="/logos/logo_text_color.png"
          width={240}
        />
      </div>

      <h2 className="text-primary  mt-9 font-bold text-lg text-clip">
        {loadingText}{' '}
      </h2>
    </div>
  );
}
