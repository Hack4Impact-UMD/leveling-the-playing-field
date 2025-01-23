import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/salesforce/authorization';
import { Contact } from '@/types/types';
import { createContact } from '@/lib/salesforce/database/contact';
import { isError } from '@/types/apiTypes';
import { isAuthenticated } from '@/lib/firebase/serverAuthentication';

export async function POST(req: NextRequest) {
  try {
    const idToken = req.nextUrl.searchParams.get('idToken');
    const decodedToken = await isAuthenticated(idToken);
    const body: Contact = await req.json();
    if (!decodedToken) {
      return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
    } else if (decodedToken.salesforceIds?.accountId !== body.AccountId) {
      return NextResponse.json({ error: "You do not have permission to create this resource." }, { status: 403, statusText: "Forbidden" });
    }
    const accessToken = await getAccessToken();
    const response = await createContact(accessToken, body);
    return NextResponse.json(isError(response) ? response.error : response.data, { status: response.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error creating contact' }, { status: 500 });
  }
}