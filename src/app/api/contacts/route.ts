import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/salesforce/authorization';
import { Contact } from '@/types/types';
import { createContact } from '@/lib/salesforce/database/contact';
import { isError } from '@/types/apiTypes';

export async function GET(request: NextRequest) {
  const accountId = request.nextUrl.searchParams.get("accountId");

  if (!accountId) {
    return NextResponse.json(
      { error: "accountId query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const accessToken = await refreshAccessToken(
      process.env.SALESFORCE_REFRESH_TOKEN || ""
    );

    const query = `SELECT Id, FirstName, LastName, Email FROM Contact WHERE AccountId = '${accountId}'`;
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN
      }/services/data/v56.0/query?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ contacts: data.records }, { status: 200 });
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