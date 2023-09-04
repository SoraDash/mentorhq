"use client"
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { getBio } from '@/lib/utils/github';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PiUserSwitchFill } from 'react-icons/pi';

interface SyncGithubBioProps {
  id: string;
}

export const SyncGithubBio: React.FC<SyncGithubBioProps> = ({ id }) => {
  const [bio, setBio] = useState(false)
  const { toast } = useToast();
  const router = useRouter();

  const syncBio = async (refresh: boolean = false) => {
    setBio(true);
    try {
      const result = await getBio(id, refresh);

      if (result?.bioUpdated) {
        toast({
          title: `Success: Updated ${result.user.name}'s bio from GitHub!`,
          variant: "success",
        });
      } else if (result?.user.bio) {
        if (result?.bioSame) {
          toast({
            title: `${result?.user.name}'s GitHub bio is the same as the stored one.`,
            variant: "default",
          });
        } else {
          toast({
            title: `${result?.user.name} already has a bio stored!`,
            variant: "default",
            action: <ToastAction altText='Force Update' onClick={() => syncBio(true)} >Force Update</ToastAction>
          });
        }
      } else {
        toast({
          title: `No bio found for ${result?.user.name} on GitHub!`,
          variant: "default",
        });
      }

    } catch (error: any) {
      toast({
        title: "Error: Something went wrong!",
        description: `Failed to sync bio: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setBio(false);
      router.refresh()
    }
  }


  return (
    <span
      className={`w-full flex justify-center items-center space-x-2 px-4 py-2 rounded transition-colors focus:outline-none bg-secondary text-secondary-foreground hover:bg-secondary/80 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer`}
      onClick={() => syncBio()}
    >
      <PiUserSwitchFill className={`mr-2 ${bio ? 'animate-spin' : ''}`} />
      Sync Github Bio
    </span>

  );
}