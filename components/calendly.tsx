"use client"
import { getCalendlyAuthURL, getCalendlyUser } from '@/lib/actions/calendly.actions';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CalendlyAuth() {
  const [authURL, setAuthURL] = useState("");
  const [calendlyToken, setCalendlyToken] = useState(null);

  useEffect(() => {
    async function fetchAuthURL() {
      const url = await getCalendlyAuthURL();
      setAuthURL(url);
    }

    fetchAuthURL();

    async function fetchUserToken() {
      try {
        const userData = await getCalendlyUser();
        if (userData.calendly_token) {
          setCalendlyToken(userData.calendly_token);
        }
      } catch (error) {
        console.error('Error fetching user token:', error);
      }
    }

    fetchUserToken();
  }, []);

  if (authURL && !calendlyToken) {
    return (
      <div>
        <a href={authURL}>Authorize with Calendly</a>
      </div>
    );
  } else if (calendlyToken) {
    return (
      <div>
        <p>You are authenticated with Calendly.</p>
        {/* Display other user data or token details */}
        <pre>{JSON.stringify(calendlyToken, null, 2)}</pre>
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
