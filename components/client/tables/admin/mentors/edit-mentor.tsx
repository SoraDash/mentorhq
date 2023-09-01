"use client"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import React, { useEffect, useState } from 'react';

interface EditMentorProps {
  title: string;
  description?: string;
  buttonName?: string;
  children?: React.ReactNode;
  side?: 'left' | 'right' | "top" | "bottom";
}

export const EditMentor: React.FC<EditMentorProps> = ({ title, buttonName, children, description, side = "left" }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null

  return (
    <>
      <Sheet key={title}>
        <SheetTrigger className='text-white'>{buttonName}</SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>
              {description}
            </SheetDescription>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    </>
  );
}