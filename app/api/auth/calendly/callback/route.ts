import { exchangeCodeForToken } from '@/actions/calendly.actions';
import { getAuthSession, getUser } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const tokenResponse = await exchangeCodeForToken(code as string);
    await prisma.user.update({
      where: {
        id: session?.user?.id
      },
      data: {
        calendly_token: tokenResponse
      },
    });
  } catch (error) {
    console.log(error)
  } finally {
    const user = await getUser();
    redirect(user?.calendly_last_path as string);
  }
}