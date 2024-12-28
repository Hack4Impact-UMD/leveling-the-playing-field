import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/salesforce/authorization';
import { createOpportunity, getOpportunitiesByAccountId } from '@/lib/salesforce/database/opportunity';
import { isError } from '@/types/apiTypes';
import { Stage } from '@/types/types';

export async function GET(request: NextRequest) {
  const accountId: string | null = request.nextUrl.searchParams.get('accountId');
  const stageName: Stage | null = request.nextUrl.searchParams.get('status') as Stage | null;

  if (!accountId) {
    return NextResponse.json(
      { error: 'accountId query parameter is required' },
      { status: 400, statusText: 'Bad Request' }
    );
  }

  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const res = await getOpportunitiesByAccountId(accountId, stageName === null ? undefined : stageName, accessToken)
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    let body;
    try { body = await req.json(); } catch (error) { return NextResponse.json({ message: "Bad Request" }, { status: 400 }); }
    const res = await createOpportunity(body, accessToken);
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error creating opportunity' }, { status: 500 });
  }
} 