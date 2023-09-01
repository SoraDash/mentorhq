import { fetchReadmeFromGitHub } from '@/lib/utils/github';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

  const { id } = await req.json()
  return NextResponse.json(await fetchReadmeFromGitHub(id))
}