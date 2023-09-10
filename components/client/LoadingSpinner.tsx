"use client"
import { EMOJI, LOADING_TEXT } from '@/constants/loading-text';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LoadingSpinner() {
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

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='animate-bounce'>
        <Image width={240} height={240} src="/logo_text_color.png" alt="Logo Spinner" />

      </div>


      <h2 className='text-primary  mt-9 font-bold text-lg text-clip'>{loadingText} </h2>
    </div>
  )
}