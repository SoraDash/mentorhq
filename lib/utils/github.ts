'use server';

import { prisma } from '@/lib/db/prisma';

export const fetchReadmeFromGitHub = async (
  username: string,
): Promise<string | null> => {
  try {
    const url = `https://raw.githubusercontent.com/${username}/${username}/master/README.md`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch README with status: ${response.status}`);
    }

    const data = await response.text();

    return data;
  } catch (error) {
    console.error('Failed to fetch README', error);

    return null;
  }
};

export const getBio = async (id: string, refresh: boolean = false) => {
  if (!id) return null;

  let user = await prisma.user.findUnique({ where: { id } });

  if (!user || !user.github) return null; // Return null if user or user.github is not available

  let bioUpdated = false;
  let bioSame = false;

  // If the user has no bio or if a refresh is forced
  if (!user.bio || refresh) {
    const bio = await fetchReadmeFromGitHub(user.github);

    if (bio && user.bio !== bio) {
      user = await prisma.user.update({
        where: { id },
        data: { bio },
      });
      bioUpdated = true;
    } else if (bio && user.bio === bio) {
      bioSame = true;
    }
  }

  return {
    user,
    bioUpdated,
    bioSame,
  };
};
