"use client"

import { getCalendlyAuthURL, getCalendlyUser } from '@/actions/calendly.actions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TbCalendarCog } from 'react-icons/tb';

export default function CalendlyAuth() {
  const [authURL, setAuthURL] = useState("");
  const [calendlyToken, setCalendlyToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchAuthURL() {
      const url = await getCalendlyAuthURL();
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

    fetchAuthURL();
    fetchUserToken();
  }, [router]);

  if (!loading && authURL && !calendlyToken) {
    return (
      <a href={authURL} className='px-6 py-2 bg-secondary text-secondary-foreground'>
        <TbCalendarCog className='inline-block mr-2' />
        Authorize with Calendly
      </a>
    );
  }

  return null;
}
