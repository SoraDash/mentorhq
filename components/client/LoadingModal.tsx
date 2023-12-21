import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

import useStudentSyncText from '@/hooks/useStudentSyncText';

import LoadingSpinner from './LoadingSpinner';

interface LoadingModalProps {
  close: () => void;
  headerText?: string;
  isSyncing: boolean; // Added prop for header text
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  headerText,
  isSyncing,
}) => {
  const syncText = useStudentSyncText(isSyncing);

  return (
    <>
      <Modal
        backdrop="blur"
        hideCloseButton={true}
        isDismissable={false}
        isOpen={isSyncing}
        size="3xl"
      >
        <ModalContent className="flex justify-center items-center">
          <ModalHeader>{headerText}</ModalHeader>
          <ModalBody className="flex flex-col justify-center items-center">
            <LoadingSpinner isInModal={true} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
