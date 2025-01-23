import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/salesforce/authorization';
import { createOpportunity, getOpportunitiesByAccountId } from '@/lib/salesforce/database/opportunity';
import { isError } from '@/types/apiTypes';
import { isAuthenticated } from '@/lib/firebase/serverAuthentication';
import { Opportunity } from '@/types/types';

export async function POST(req: NextRequest) {
  try {
    const idToken = req.nextUrl.searchParams.get('idToken');
    const decodedToken = await isAuthenticated(idToken);
    const body: Opportunity = await req.json();
    if (!decodedToken) {
      return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
    } else if (decodedToken.salesforceIds?.accountId !== body.AccountId) {
      return NextResponse.json({ error: "You do not have permission to create this resource." }, { status: 403, statusText: "Forbidden" });
    }
    const accessToken = await getAccessToken();
    const res = await createOpportunity(body, accessToken);
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error creating opportunity' }, { status: 500 });
  }
} 