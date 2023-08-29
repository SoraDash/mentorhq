"use server"

import { getAuthSession, getUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { differenceInDays, differenceInMinutes, endOfMonth, getMonth, getYear, parse, startOfMonth } from 'date-fns';
import { FaCalendar, FaClock, FaEuroSign, FaUsers } from 'react-icons/fa';



const getBilling = async (month: string, year: string) => {
  return await lock.acquire("billing", async () => {
    try {
      const session = await getAuthSession();
      if (!session || !session.user?.email) {
        console.debug("No session found or email missing from session.");
        return { error: true, message: 'Not authenticated', status: 401 }
      }

      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      });

      if (!user) {
        console.debug(`No user found for email: ${session.user.email}`);
        return { error: true, message: 'User not found', status: 404 }
      }

      const { email, ciEmail, ciApiKey } = user;

      if (!ciApiKey) {
        console.debug("ciApiKey is missing. Can't proceed with the request.");
        return { error: true, message: 'ciApiKey is required for the request', status: 400 };
      }
      const userEmail = ciEmail || email;

      const cacheKey = `billing:${userEmail}:${month}:${year}`;

      const cachedData = nodeCache.get(cacheKey);
      if (cachedData) {
        console.debug(`Cache HIT for key: ${cacheKey}`);
        return cachedData;
      } else {
        console.debug(`Cache MISS for key: ${cacheKey}`);
      }

      const apiUrl = constructApiUrl(userEmail, ciApiKey, month, year);

      const MAX_RETRIES = 3;
      let retryCount = 0;
      let success = false;
      let response;

      while (retryCount < MAX_RETRIES && !success) {
        try {
          response = await fetch(apiUrl);
          success = true; // If fetch succeeds, set success to true
        } catch (error: any) {
          retryCount++;
          console.error(`Fetch failed. Retry count: ${retryCount}. Error:`, error.message);
          await new Promise(res => setTimeout(res, 3000)); // Wait for 3 seconds before retrying
        }
      }

      if (!success) {
        return {
          error: true,
          message: 'Network error. Could not fetch data after multiple attempts.',
          status: 503 // Service unavailable
        };
      }

      if (!response || !response.ok) { // Check if response is falsy or HTTP status code is not in the 200-299 range
        const status = response ? response.status : 'unknown';
        console.error(`HTTP error occurred with status code: ${status}`);
        return {
          error: true,
          message: `HTTP error with status code: ${status}`,
          status
        };
      }

      const responseData = await response.json();

      // If the data is not an error and is not empty, cache it
      if (responseData.status !== "error" && responseData.status !== "empty") {
        nodeCache.set(cacheKey, responseData);
        console.debug(`Data stored in cache for key: ${cacheKey}`);
      }

      // Now, handle any error conditions
      if (responseData.status === "error") {
        if (responseData.message === "key/email mismatch") {
          return {
            error: true,
            ciApiKey,
            email: email,
            status: 404
          };
        }
        return {
          error: true,
          message: responseData.message || "Unknown error",
          status: 400
        };
      }

      if (responseData.status === "empty") {
        return {
          error: true,
          message: "No data available",
          status: 204
        };
      }

      // If there were no errors and data is not empty, return the data
      return responseData;

    } catch (error: any) {
      console.error(`Error encountered: ${error.message}`);
      return { error: true, message: error.message, status: 500 }
    }
  });
}

function constructApiUrl(email: string, apiKey: string, month: string, year: string): string {
  return `${process.env.CI_API_URL}?email=${email}&key=${apiKey}&month=${month}&year=${year}`;
}


const convertToMinutes = (time: string) => {
  const referenceDate = new Date(0, 0, 0, 0, 0, 0);
  const parsedDate = parse(time, 'HH:mm:ss', referenceDate);
  return differenceInMinutes(parsedDate, referenceDate);
};

export const getLatestStats = async (date?: Date) => {
  const user = await getUser();
  if (!user?.ciApiKey) return null;
  const now = new Date();
  const month = date ? getMonth(date) + 1 : getMonth(now) + 1;
  const year = date ? getYear(date) : getYear(now);

  const data = await getBilling(month.toString(), year.toString());
  if (!data) return null

  const sessionCount = parseInt(data?.aggregates?.session_count);
  const eurosBillable = data?.aggregates?.euros_billable;

  const averageSessionTimeInMinutes = convertToMinutes(data?.aggregates?.total_session_time) / sessionCount;

  return [
    {
      title: 'Total Students',
      icon: FaUsers,
      content: data?.details?.length.toString(),
      color: 'bg-green-100',
      textColor: 'text-green-500',
    },
    {
      title: 'Sessions This Month',
      icon: FaCalendar,
      content: sessionCount?.toString(),
      color: 'bg-blue-100',
      textColor: 'text-blue-500',
    },
    {
      title: 'Amount (billable)',
      icon: FaEuroSign,
      content: eurosBillable,
      color: 'bg-yellow-100',
      textColor: 'text-yellow-500',
    },
    {
      title: 'Total Session Time',
      icon: FaClock,
      content: data.aggregates.total_session_time,
      color: 'bg-red-100',
      textColor: 'text-red-500',
    },
    {
      title: 'Average Session Time',
      icon: FaClock,
      content: averageSessionTimeInMinutes + ' mins',
      color: 'bg-purple-100',
      textColor: 'text-purple-500',
    },
  ];
};