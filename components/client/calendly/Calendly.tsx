"use client";

import { deAuthCalendly, getCalendlyAuthURL, getCalendlyUser } from '@/actions/calendly.actions';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TbCalendarCog, TbCalendarX } from 'react-icons/tb';

type ButtonColors = 'secondary' | 'danger' | 'default' | 'primary' | 'success' | 'warning' | undefined;
type ButtonSize = "sm" | "md" | "lg" | undefined


type CalendlyAuthProps = {
  authButtonColor?: ButtonColors,
  authButtonSize?: ButtonSize,
  deAuthButtonColor?: ButtonColors,
  deAuthButtonSize?: ButtonSize,
  iconClass?: string
}

export default function CalendlyAuth({
  authButtonColor = 'secondary',
  authButtonSize = 'md',
  deAuthButtonColor = 'danger',
  deAuthButtonSize = 'md',
  iconClass = 'inline-block mr-2'
}: CalendlyAuthProps) {
  const [authURL, setAuthURL] = useState("");
  const [calendlyToken, setCalendlyToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deAuthRequested, setDeAuthRequested] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchAuthURL(redirectPath: string) {
      const url = await getCalendlyAuthURL(redirectPath);
      setAuthURL(url);
    }

    async function fetchUserToken() {
      try {
        const userData = await getCalendlyUser();
        if (userData?.calendly_token) {
          setCalendlyToken(userData?.calendly_token as string);
        }
        router.refresh();
      } catch (error) {
        console.error('Error fetching user token:', error);
      } finally {
        setLoading(false);
      }
    }
    const currentPath = window.location.pathname;
    console.log('currentPath:', currentPath)
    fetchAuthURL(currentPath);
    fetchUserToken();
  }, [router]);

  // New useEffect for de-authorization
  useEffect(() => {
    if (!deAuthRequested) return;

    async function handleDeAuth() {
      try {
        await deAuthCalendly();
        setCalendlyToken(null);
        router.refresh();
      } catch (error) {
        console.error('Error de-authorizing:', error);
      }
      setDeAuthRequested(false);  // reset the state after the process is completed
    }

    handleDeAuth();
  }, [deAuthRequested, router]);

  useEffect(() => {
    // Check if the current path matches the stored redirect path
    const storedRedirectPath = localStorage.getItem('calendlyRedirectPath');

    if (storedRedirectPath && storedRedirectPath === window.location.pathname) {
      // Display success toast
      toast({
        title: 'Calendly Authorization Success',
        description: 'You have successfully authorized with Calendly.',
        variant: 'success'
      });

      // Clear the redirect path from local storage to prevent showing the toast again in the future
      localStorage.removeItem('calendlyRedirectPath');
    }
  }, [toast]);

  const handleAuth = () => {
    toast({
      title: 'Calendly Authorization',
      description: 'We are currently redirecting you to Calendly to authorize your account.',
      variant: 'default'
    });
    localStorage.setItem('calendlyRedirectPath', window.location.pathname);
    window.location.href = authURL;
  }
  if (!loading && authURL && !calendlyToken) {
    return (
      <Button variant='solid' color={ authButtonColor } size={ authButtonSize } onClick={ handleAuth }>
        <TbCalendarCog className={ iconClass } />
        Authorize with Calendly
      </Button>
    );
  }

  if (calendlyToken) {
    return (
      <Button variant='ghost' color={ deAuthButtonColor } size={ deAuthButtonSize } onClick={ () => setDeAuthRequested(true) }>
        <TbCalendarX className={ iconClass } />
        De-Authorize Calendly
      </Button>
    );
  }

  return null;
}
