'use client';

import React, { useEffect, useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface EditMentorProps {
  buttonName?: string;
  children?: React.ReactNode;
  description?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  title: string;
}

export const EditMentor: React.FC<EditMentorProps> = ({
  buttonName,
  children,
  description,
  side = 'left',
  title,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <Sheet key={title}>
        <SheetTrigger className="text-white">{buttonName}</SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    </>
  );
};
