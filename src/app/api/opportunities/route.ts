import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/salesforce/authorization';
import { createOpportunity, getOpportunitiesByAccountId } from '@/lib/salesforce/database/opportunity';
import { isError } from '@/types/apiTypes';
import { Stage } from '@/types/types';

export async function GET(request: NextRequest) {
  const accountId: string | null = request.nextUrl.searchParams.get('accountId');
  const stage: Stage | null = request.nextUrl.searchParams.get('stage') as Stage | null;

  if (!accountId || !stage) {
    return NextResponse.json(
      { error: 'accountId and stage query parameters are required' },
      { status: 400, statusText: 'Bad Request' }
    );
  }

  try {
    const accessToken = await getAccessToken();
    const res = await getOpportunitiesByAccountId(accountId, stage, accessToken)
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const accessToken = await getAccessToken();
    let body;
    try { body = await req.json(); } catch (error) { return NextResponse.json({ message: "Bad Request" }, { status: 400 }); }
    const res = await createOpportunity(body, accessToken);
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error creating opportunity' }, { status: 500 });
  }
} 