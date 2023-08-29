'use server'

import { revalidateTag } from 'next/cache'
import { getUser } from '../auth';


export async function revalidateUserFeatures() {
  // Fetch user's feature data, this is just a mock and might be replaced by actual fetching logic.
  const userFeatures = await getUser();

  if (userFeatures) {
    revalidateTag(`user-${userFeatures.id}`); // Assuming you have a unique cache tag for each user.
  }

  return userFeatures; // Return the new user features.
}
