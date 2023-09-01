import Modal from '@/components/client/modals/modal';
import React, { useEffect, useState } from 'react';

interface ModalProviderProps {
  children: React.ReactNode;
}
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {children}
      <Modal />
    </>
  );
}
