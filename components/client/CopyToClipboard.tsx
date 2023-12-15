"use client";
import { toast } from "@/components/ui/use-toast";

export const copyToClipboard = async (meetingURL: string) => {
  await navigator.clipboard.writeText(meetingURL);
  toast({
    title: "E'voila!",
    description: "You can now paste the link to your meeting",
    variant: "success",
    duration: 2500,
  });
};
