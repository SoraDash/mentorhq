'use client';

import { Button } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';
import * as React from 'react';
import { FC, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';

import { cn } from '@/lib/utils';

import { Icons } from './Icons';
import { useToast } from './ui/use-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    // If there's a session, it means the user is authenticated.
    if (session) {
      setIsLoading(false);
    }
  }, [session]);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn('google');
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      });
    }
  };
  const loginWithGithub = async () => {
    setIsLoading(true);

    try {
      await signIn('github');
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Error',
        description: 'There was an error logging in with Github',
        variant: 'destructive',
      });
    }
  };

  return (
    <div
      className={cn('flex flex-col space-y-5 justify-center', className)}
      {...props}
    >
      <Button
        className="w-full"
        disabled={isLoading}
        isLoading={isLoading}
        onClick={loginWithGoogle}
        size="sm"
        type="button"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        {isLoading ? 'Please wait...' : 'Google'}
      </Button>
      <Button
        className="w-full"
        disabled={isLoading}
        isLoading={isLoading}
        onClick={loginWithGithub}
        size="sm"
        type="button"
      >
        {isLoading ? null : <FaGithub className="h-4 w-4 mr-2" />}
        {isLoading ? 'Please wait...' : 'Github'}
      </Button>
    </div>
  );
};

export default UserAuthForm;
