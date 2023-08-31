"use client"

import { getCalendlyAuthURL, getCalendlyUser } from '@/actions/calendly.actions';
import { useEffect, useState } from 'react';

export default function CalendlyAuth() {
  const [authURL, setAuthURL] = useState("");
  const [calendlyToken, setCalendlyToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuthURL() {
      const url = await getCalendlyAuthURL();
      setAuthURL(url);
    }

    fetchAuthURL();

    async function fetchUserToken() {
      try {
        const userData = await getCalendlyUser();
        if (userData?.calendly_token) {
          setCalendlyToken(userData?.calendly_token as string);
        }
      } catch (error) {
        console.error('Error fetching user token:', error);
      }
    }

    fetchUserToken();
  }, []);

  if (authURL && !calendlyToken) {
    return (
      <a href={authURL} className='mt-6 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600'>Authorize with Calendly</a>
    );
  } else if (calendlyToken) {
    return (
      <div>
        <p>You are authenticated with Calendly.</p>

        {/* <div className='bg-gray-200 w-96 break'>
          <code>
            {JSON.stringify(calendlyToken, null, 3)}

          </code>
        </div> */}
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
}
