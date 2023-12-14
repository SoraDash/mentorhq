import useStudentSyncText from "@/hooks/useStudentSyncText";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingModalProps {
  close: () => void;
  isSyncing: boolean;
  headerText?: string; // Added prop for header text
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  isSyncing,
  headerText,
}) => {
  const syncText = useStudentSyncText(isSyncing);

  return (
    <>
      <Modal
        isOpen={isSyncing}
        isDismissable={false}
        backdrop="blur"
        hideCloseButton={true}
        size="3xl">
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
