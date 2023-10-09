"use server"
import { getUser } from '@/lib/auth/auth';
import { getUserByEmail } from '@/lib/db/user';
import { lock } from '@/lib/utils/asyncLock';
import Cache from '@/lib/utils/cacheConfig';


export const getBilling = async (month: string, year: string) => {
  return await lock.acquire("billing", async () => {
    try {
      const session = await getUser();
      if (!session || !session.email) {
        console.debug("No session found or email missing from session.");
        return { error: true, message: 'Not authenticated', status: 401 }
      }

      const user = await getUserByEmail(session.email);

      if (!user) {
        console.debug(`No user found for email: ${session.email}`);
        return { error: true, message: 'User not found', status: 404 }
      }

      const { email, ciEmail, ciApiKey } = user;

      if (!ciApiKey) {
        console.debug("ciApiKey is missing. Can't proceed with the request.");
        return { error: true, message: 'ciApiKey is required for the request', status: 400 };
      }
      const userEmail = ciEmail || email;

      // Check if data is cached
      const cachedData = await Cache.get("billing", user.email);
      if (cachedData) {
        return cachedData;
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
          console.log("Success got some data")
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
        Cache.set("billing", user.email, responseData);
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