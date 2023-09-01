"use client"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import React from 'react';

interface UnifiedModalProps {
  modalType?: 'sheet' | 'dialog';
  title?: string;
  buttonName?: string;
  children?: React.ReactNode;
  description?: string;
  content?: React.ReactNode;
  isOpen?: boolean;
  closeModal: () => void;
}

const UnifiedModal: React.FC<UnifiedModalProps> = ({
  modalType = 'sheet',
  title,
  buttonName,
  children,
  description,
  content,
  isOpen,
  closeModal
}) => {


  const renderSheet = () => (
    <Sheet key={title} open={isOpen} onOpenChange={closeModal}>
      <SheetTrigger className='text-white'>
        <span className="mr-2">
          {children}
        </span>
        {buttonName}
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  );

  const renderDialog = () => (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {content}
      </DialogContent>
    </Dialog>
  );

  return modalType === 'sheet' ? renderSheet() : renderDialog();
};

export default UnifiedModal;
