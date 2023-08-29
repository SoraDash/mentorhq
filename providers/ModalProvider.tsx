"use client";

import { useEffect, useState } from 'react';
import { OnboardingModal } from '../components/client/modals/OnboardingModal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true) }, [])
  if (!isMounted) return null

  return (
    <OnboardingModal />
  )
}