"use server"

import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { differenceInDays, differenceInMinutes, endOfMonth, getMonth, getYear, parse, startOfMonth } from 'date-fns';
import { FaCalendar, FaClock, FaEuroSign, FaUsers } from 'react-icons/fa';

import nodeCache from '../cache';
const AsyncLock = require("async-lock");

const lock = new AsyncLock();

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

      const response = await fetch(apiUrl);

      if (!response.ok) { // Check if HTTP status code is not in the 200-299 range
        console.error(`HTTP error occurred with status code: ${response.status}`);
        return {
          error: true,
          message: `HTTP error with status code: ${response.status}`,
          status: response.status
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

// Helper function to convert minutes to HH:MM format
const formatTimeHHMM = (time: string) => {
  const [hours, minutes] = time.split(':');
  return `${hours}h:${minutes}m`;
};

const convertToMinutes = (time: string) => {
  const referenceDate = new Date(0, 0, 0, 0, 0, 0);
  const parsedDate = parse(time, 'HH:mm:ss', referenceDate);
  return differenceInMinutes(parsedDate, referenceDate);
};

export const getLatestStats = async (date?: Date) => {
  const now = new Date();
  const month = date ? getMonth(date) + 1 : getMonth(now) + 1;
  const year = date ? getYear(date) : getYear(now);

  const data = await getBilling(month.toString(), year.toString());

  const sessionCount = parseInt(data.aggregates.session_count);
  const eurosBillable = data.aggregates.euros_billable;

  const averageSessionTimeInMinutes = convertToMinutes(data.aggregates.total_session_time) / sessionCount;

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