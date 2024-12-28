import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/salesforce/authorization';
import { Contact } from '@/types/types';
import { createContact, getContactsByAccountId } from '@/lib/salesforce/database/contact';
import { isError } from '@/types/apiTypes';

export async function GET(request: NextRequest) {
  const accountId: string | null = request.nextUrl.searchParams.get("accountId");

  if (!accountId) {
    return NextResponse.json(
      { error: "accountId query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const res = await getContactsByAccountId(accountId, accessToken);
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error("Salesforce API Error:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const body: Contact = await request.json();
    const response = await createContact(accessToken, body);
    return NextResponse.json(isError(response) ? response.error : response.data, { status: response.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error creating contact' }, { status: 500 });
  }
}