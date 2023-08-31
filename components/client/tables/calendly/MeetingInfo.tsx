"use client"
import { useToast } from '@/components/ui/use-toast';
import { CalendlyEvent } from '@/lib/calendly/types';
import React from 'react';

interface MeetingInfoProps {
  event: CalendlyEvent;
  children: React.ReactNode;
}


export const MeetingInfoWithToast: React.FC<MeetingInfoProps> = ({ event, children }) => {
  const { toast } = useToast();

  const copyToClipboard = (meetingURL: string) => {
    window.navigator.clipboard.writeText(meetingURL)
    toast({
      title: "E'voila !",
      description: "You can now paste the link to your meeting",
      variant: "default",
    })
  }

  return (
    <span onClick={() => copyToClipboard(event.location.join_url)}>
      {children}
    </span>
  );
}
