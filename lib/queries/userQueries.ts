'use client';

import { User } from '@prisma/client';

export const fetchUser = async (): Promise<User | null> => {
  const response = await fetch('/api/user');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
