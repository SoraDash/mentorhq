"use server"

import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import axios from 'axios';
import NodeCache from 'node-cache';
import { FaCalendar, FaClock, FaEuroSign, FaUsers } from 'react-icons/fa';

const billingCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 }); // Cache for 1 hour, check every 10 minutes

const getBilling = async (month: string, year: string) => {
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

    const cachedData = billingCache.get(cacheKey);
    if (cachedData) {
      console.debug(`Cache HIT for key: ${cacheKey}`);
      return cachedData;
    } else {
      console.debug(`Cache MISS for key: ${cacheKey}`);
    }

    const apiUrl = constructApiUrl(userEmail, ciApiKey, month, year);
    console.debug(`Fetching data from API: ${apiUrl}`);

    const response = await axios.get(apiUrl);

    // If the data is not an error and is not empty, cache it
    if (response.data.status !== "error" && response.data.status !== "empty") {
      billingCache.set(cacheKey, response.data);  // Cache the data right away
      console.debug(`Data stored in cache for key: ${cacheKey}`);

    }

    // Now, handle any error conditions
    if (response.data.status === "error") {
      if (response.data.message === "key/email mismatch") {
        return {
          error: true,
          ciApiKey,
          email: email,
          status: 404
        };
      }
      return {
        error: true,
        message: response.data.message || "Unknown error",
        status: 400
      };
    }

    if (response.data.status === "empty") {
      return {
        error: true,
        message: "No data available",
        status: 204
      };
    }

    // If there were no errors and data is not empty, return the data
    return response.data;


  } catch (error: any) {
    console.error(`Error encountered: ${error.message}`);
    return { error: true, message: error.message, status: 500 }
  }
}

function constructApiUrl(email: string, apiKey: string, month: string, year: string): string {
  return `${process.env.CI_API_URL}?email=${email}&key=${apiKey}&month=${month}&year=${year}`;
}

export const getLatestStats = async () => {
  const data = await getBilling("11", "2022");
  const sessionCount = parseInt(data?.aggregates?.session_count);
  const totalSessionTime = data?.aggregates?.total_session_time;
  const eurosBillable = data?.aggregates?.euros_billable;
  const averageSession = sessionCount / data?.details?.length;

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
      title: 'Session Time',
      icon: FaClock,
      content: totalSessionTime,
      color: 'bg-red-100',
      textColor: 'text-red-500',
    },
    {
      title: 'Average Session',
      icon: FaClock,
      content: averageSession?.toFixed(2),
      color: 'bg-purple-100',
      textColor: 'text-purple-500',
    },
  ];
};