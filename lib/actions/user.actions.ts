"use server";

import { auth } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from "next/cache";
import { NextResponse } from 'next/server';
import { prisma } from '../db';


export async function fetchUser() {
  const user = await currentUser()
  if (!user) return null;
  try {
    const test = await prisma.userAccount.findUnique({
      where: {
        accountId: user.id

      },
    })
    console.log("Running fetchUser")
    if (test) throw new Error("Test")

  } catch (error: any) {

    return new NextResponse(`Failed to fetch user: ${error.message}`, { status: 500 });
  }
}

interface Params {
  username?: string | null | undefined
  email: string;
  ciEmail: string | null | undefined
  name: string | null | undefined
  image: string | null | undefined
  paidPerHour?: number
  github?: string | null | undefined
  slack?: string | null | undefined
  linkedIn?: string | null | undefined
  website?: string | null | undefined
  skype?: string | null | undefined
  twitter?: string | null | undefined
  ciApiKey?: string | null | undefined
  isMentor: boolean
  sendWelcomeEmail?: boolean
  path: string
}

export async function updateUser({
  username,
  ciEmail,
  email,
  name,
  image,
  paidPerHour,
  github,
  slack,
  linkedIn,
  website,
  skype,
  twitter,
  ciApiKey,
  isMentor = false,
  sendWelcomeEmail,
  path
}: Params): Promise<void> {
  console.log({ username, ciEmail, email, name, image, paidPerHour, github, slack, linkedIn, website, skype, twitter, ciApiKey, isMentor, sendWelcomeEmail, path })
  try {
    const { userId } = await auth();
    if (!userId) return;
    await prisma.userAccount.update({
      where: {
        accountId: userId
      },
      data: {
        name,
        username,
        email,
        image: image,
        isOnboarded: true,
        role: isMentor ? "MENTOR" : "USER",
        ciApiKey,
        ciEmail,
        paidPerHour,
        github,
        slack,
        linkedIn,
        website,
        skype,
        twitter,
        sendWelcomeEmail

      }
    })
    if (path === "/profile/edit") {
      revalidatePath(path);
    }

  } catch (error: any) {
    throw new NextResponse(`Failed to update user: ${error.message}`, { status: 500 });
  }
}