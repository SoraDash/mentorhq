'use client';

'use client';

import { useEffect, useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';

import { getCalendlyUser } from '@/actions/calendly.actions';
import { BooleanIcon } from '@/components/server/BooleanIcon';

export default function CalendlyStatus() {
  const [calendlyToken, setCalendlyToken] = useState<string | null>(null);

  useEffect(() => {
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

  if (!calendlyToken) {
    return (
      <div className="inline-flex items-center space-x-2 w-full">
        <span className="flex-grow">Fetching Calendly Status...</span>
        <ImSpinner9 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between space-x-2 w-full">
      <span>Calendly Enabled</span>
      <BooleanIcon
        className="items-center text-center w-6 h-6"
        condition={true}
      />
    </div>
  );
}
