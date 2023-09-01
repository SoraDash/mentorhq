"use client"
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { getBio } from '@/lib/utils/github';
import React, { useState } from 'react';
import { PiUserSwitchFill } from 'react-icons/pi';

interface FetchGithubBioProps {
  id: string;
}

export const FetchGithubBio: React.FC<FetchGithubBioProps> = ({ id }) => {
  const [bio, setBio] = useState(false)
  const { toast } = useToast();

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
    }
  }


  return (
    <div
      className='relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer'
      onClick={() => syncBio()}
    >
      <PiUserSwitchFill className={`mr-2 ${bio ? 'animate-spin' : ''}`} />
      Sync Github Bio
    </div>
  );
}