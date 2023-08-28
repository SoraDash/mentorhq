"use server"
import { getAuthSession } from '../auth';
import { prisma } from '../db';

// Common constants
const CLIENT_ID = process.env.CALENDLY_CLIENT_ID as string;
const CLIENT_SECRET = process.env.CALENDLY_CLIENT_SECRET as string;
const TOKEN_INTROSPECT_ENDPOINT = 'https://auth.calendly.com/oauth/introspect';

export async function exchangeCodeForToken(code: string) {
  const tokenEndpoint = 'https://calendly.com/oauth/token';
  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/auth/calendly/callback`,
    grant_type: 'authorization_code'
  };

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch access token');
  }

  const result = await response.json();
  return result;
}

export const getCalendlyAuthURL = async () => {
  const redirectURI = encodeURIComponent(`${process.env.NEXT_PUBLIC_URL}/api/auth/calendly/callback`);

  return `https://calendly.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectURI}&response_type=code`;
}

export const getCalendlyUser = async () => {
  const session = await getAuthSession();
  const user = await prisma.user.findFirst({
    where: {
      id: session?.user?.id
    },
    select: {
      calendly_token: true
    }
  });

  // Check if user has calendly_token
  if (!user?.calendly_token) {
    return null;
  }

  const token = user.calendly_token;
  const { created_at, expires_in } = token;

  // Calculate the current time
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the token has expired or is about to expire
  if (currentTime >= created_at + expires_in) {
    // Token has expired or is about to expire, introspect to validate
    const introspectionResult = await introspectToken(token);
    if (introspectionResult.active) {
      // The token is still valid, you can proceed with using it
      return user;
    } else {
      throw new Error('Token is no longer valid');
    }
  }

  // Token is still within its validity period
  return user;
}

export async function introspectToken(token: string) {
  const data = new URLSearchParams();
  data.append('client_id', CLIENT_ID);
  data.append('client_secret', CLIENT_SECRET);
  data.append('token', token);

  const response = await fetch(TOKEN_INTROSPECT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error('Failed to introspect token');
  }

  const result = await response.json();
  return result;
}
