import { exchangeCodeForToken } from '@/actions/calendly.actions';
import { getAuthSession } from '@/lib/auth/auth';
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
    const user = await prisma.user.update({
      where: {
        id: session?.user?.id
      },
      data: {
        calendly_token: tokenResponse
      },
    });

    return redirect('/dashboard');
  } catch (error) {
    console.log(error)
    return redirect('/dashboard');
  }
}

export async function POST(req: NextRequest, res: NextResponse) { }