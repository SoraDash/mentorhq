"use server"
import { ExtendedUser, getAuthSession, getUser } from '@/lib/auth/auth';
import { CalendlyEvent } from '@/lib/calendly/types';
import { prisma } from '@/lib/db/prisma';
import CacheConfig from '@/lib/utils/cacheConfig';
import axios from 'axios';
import startOfToday from 'date-fns/startOfToday';

// Common constants
const CLIENT_ID = process.env.CALENDLY_CLIENT_ID as string;
const CLIENT_SECRET = process.env.CALENDLY_CLIENT_SECRET as string;
const REDIRECT_URL = process.env.CALENDLY_REDIRECT_URL as string;
const TOKEN_INTROSPECT_ENDPOINT = 'https://auth.calendly.com/oauth/introspect';

export async function exchangeCodeForToken(code: string) {
  const tokenEndpoint = 'https://calendly.com/oauth/token';
  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    redirect_uri: REDIRECT_URL,
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

export const getCalendlyAuthURL = async (redirectPath: string = '') => {
  console.log("REDIRECT PATH FROM Actions", redirectPath)
  const user = await getUser();
  await prisma.user.update({
    where: {
      id: user?.id
    }, data: {
      calendly_last_path: redirectPath as string
    }
  })
  return `https://auth.calendly.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}`
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
  const { created_at, expires_in } = token as any;

  // Check if the token has expired or is about to expire
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  if (currentTime >= created_at + expires_in) {
    // Token has expired or is about to expire, introspect to validate
    const introspectionResult = await introspectToken(token as string);
    if (introspectionResult.active) {
      // The token is still valid, you can proceed with using it
      return user;
    } else {
      // We need to refresh this
      return user
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


export const deAuthCalendly = async () => {
  const user = await getUser();
  if (!user) return;
  try {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        calendly_token: {}
      }
    })
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const refreshCalendlyToken = async () => {
  try {
    const user = await getUser() as ExtendedUser;
    console.log("🔄 Refreshing token...");

    const refreshObject = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: user?.calendly_token?.refresh_token
    };

    const response = await axios.post("https://auth.calendly.com/oauth/token", refreshObject);
    const tokenResponse = response.data;

    user.calendly_token = tokenResponse;
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        calendly_token: tokenResponse
      }
    });
    return user?.calendly_token?.access_token;
  } catch (err) {
    console.error("🚫 Error in refreshCalendlyToken:", err);
  }
};


export const checkCalendlyToken = async () => {
  try {
    const user = await getUser() as ExtendedUser;
    console.log("🔍 Checking token");

    const request = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      token: user?.calendly_token?.access_token || '',
    };

    const response = await axios.post("https://auth.calendly.com/oauth/introspect", request);
    const events = response.data;

    if (events.active === false) {
      let outcome = await refreshCalendlyToken();
      return outcome;
    } else {
      return user?.calendly_token?.access_token;
    }
  } catch (error) {
    console.error("🚫 Error in checkCalendlyToken:");
  }
};

export const idByEmail = async (events: any[], token: string) => {
  let sortedCalendlyData: CalendlyEvent[] = [];

  for await (let event of events) {
    if (event.status === "canceled") continue;
    let uri = event.uri.replace("https://api.calendly.com/scheduled_events/", "");
    try {
      const response = await axios.get(`https://api.calendly.com/scheduled_events/${uri}/invitees`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });


      event.student_name = response.data.collection[0]?.name;
      event.student_email = response.data.collection[0]?.email;
      event.cancel_url = response.data.collection[0]?.cancel_url;
      event.reschedule_url = response.data.collection[0]?.reschedule_url;
      event.questions = response.data.collection[0]?.questions_and_answers;

      const student = await prisma.student.findUnique({
        where: {
          email: event.student_email
        }
      });
      if (student) {
        event.studentID = student.id ? student.id : null;
        event.student_name = student.name;
      }

      sortedCalendlyData.push(event);
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        const rateLimitReset = error.response.headers['x-ratelimit-reset'];
        console.error(`🚫 Rate limit exceeded. Waiting for ${rateLimitReset} seconds.`);
        await new Promise(resolve => setTimeout(resolve, rateLimitReset * 1000));
      } else {
        console.error("🚫 Error in idByEmail:", error);
      }
    }
  }
  return sortedCalendlyData;
};



export const getCalendlyEvents = async (bypassCache = false) => {
  try {
    const user = await getUser() as ExtendedUser;
    const userEmail = user?.email; // Assuming user object has an email property
    const { owner } = user?.calendly_token || {};

    if (!owner || !userEmail) return null;

    let checkedUser = await checkCalendlyToken();

    const cacheKey = 'events';
    if (!bypassCache) {
      const cachedEvents = await CacheConfig.get(cacheKey, userEmail);
      if (cachedEvents) {
        console.log("✅ Found events in cache.");
        return cachedEvents;
      }
    }

    // Fetch and process data from Calendly API
    return await fetchAndCacheCalendlyEvents(owner, userEmail, checkedUser!);
  } catch (error) {
    console.error("🚫 Error in getCalendlyEvents:", error);
  }
};

const fetchAndCacheCalendlyEvents = async (
  owner: string,
  userEmail: string,
  checkedUser: string
): Promise<Array<CalendlyEvent> | null> => {
  const args = `&sort=start_time:asc&count=100&min_start_time=`;
  let baseURL = "https://api.calendly.com/scheduled_events?user=";
  const headers = { Authorization: `Bearer ${checkedUser}` };
  const response = await axios.get(`${baseURL}${owner}${args}` + encodeURI(startOfToday().toUTCString()), { headers });
  let events = response.data.collection;

  const returnEntity = await idByEmail(events, checkedUser!);

  console.log(`🗂️ Storing events in cache for user: ${userEmail}`);
  await CacheConfig.set('events', userEmail, returnEntity);

  return returnEntity as CalendlyEvent[];
};

export const refreshCalendlyEventsForUser = async () => {
  const user = await getUser() as ExtendedUser;
  if (!user?.email) {
    console.error("User email is missing.");
    return null;
  }

  // Invalidate the cache
  await CacheConfig.remove('events', user.email);
  console.log(`🔄 Cache for Calendly events cleared for user: ${user.email}`);

  // Refetch the events, bypassing the cache
  return await getCalendlyEvents(true);
};
