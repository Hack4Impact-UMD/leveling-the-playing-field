import { NextResponse, NextRequest } from 'next/server';
import { refreshAccessToken } from '@/lib/salesforce/authorization';
export async function GET(request: NextRequest) {
  const accountId = request.nextUrl.searchParams.get('accountId');
  const status = request.nextUrl.searchParams.get('status');

  if (!accountId || !status) {
    return NextResponse.json(
      { error: 'accountId and status query parameters are required' },
      { status: 400 }
    );
  }

  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const query = `SELECT Id, Name, StageName, CloseDate FROM Opportunity WHERE AccountId = '${accountId}' AND StageName = '${status}'`;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/query?q=${encodeURIComponent(query)}`,
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
    return NextResponse.json({ opportunities: data.records }, { status: 200 });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const body = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Opportunity`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error creating opportunity' }, { status: 500 });
  }
} 