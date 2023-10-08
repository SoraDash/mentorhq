import useStudentSyncText from "@/hooks/useStudentSyncText";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

interface LoadingModalProps {
  close: () => void;
  isSyncing: boolean;
}
export const LoadingModal: React.FC<LoadingModalProps> = ({ isSyncing }) => {
  const syncText = useStudentSyncText(isSyncing);

  return (
    <>
      <Modal
        isOpen={isSyncing}
        isDismissable={false}
        backdrop='blur'
        hideCloseButton={true}
        size='2xl'>
        <ModalContent className='flex justify-center items-center'>
          <ModalHeader>Fetching students from Google</ModalHeader>
          <ModalBody className='flex flex-col justify-center items-center'>
            <Image
              width={400}
              height={150}
              src='/logos/logo_text_color.png'
              alt='Logo Spinner'
              className='animate-bounce'
            />
            <h2 className='text-primary font-bold text-3xl text-clip mb-5'>
              {syncText}{" "}
            </h2>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
