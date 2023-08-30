"use server"
import { Student, User } from '@prisma/client';

export const fetchStudentsFromApi = async (user: User) => {
  const res = await fetch(
    `${process.env.CI_API_URL}?email=${user?.ciEmail || user?.email}&key=${user?.ciApiKey}&students=true`
  );

  if (!res.ok) {
    throw new Error(`Failed fetching data. Status: ${res.status}`);
  }

  const data = await res.json();

  if (data?.status === 'error' || data?.status === 'empty') {
    console.log(data)
    throw new Error(data?.message || 'Failed fetching data');
  }

  return data.students as Student[];
};

