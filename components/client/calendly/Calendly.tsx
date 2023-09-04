"use client";

import { getCalendlyAuthURL, getCalendlyUser, deAuthCalendly } from '@/actions/calendly.actions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TbCalendarCog, TbCalendarX } from 'react-icons/tb';

export default function CalendlyAuth() {
  const [authURL, setAuthURL] = useState("");
  const [calendlyToken, setCalendlyToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deAuthRequested, setDeAuthRequested] = useState(false);  // new state
  const router = useRouter();

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

  if (!loading && authURL && !calendlyToken) {
    return (
      <a href={authURL} className='px-6 py-2 bg-secondary text-secondary-foreground'>
        <TbCalendarCog className='inline-block mr-2' />
        Authorize with Calendly
      </a>
    );
  }

  if (calendlyToken) {
    return (
      <button onClick={() => setDeAuthRequested(true)} className='px-6 py-2 bg-red-500 text-white'>
        <TbCalendarX className='inline-block mr-2' />
        De-Authorize Calendly
      </button>
    );
  }

  return null;
}
