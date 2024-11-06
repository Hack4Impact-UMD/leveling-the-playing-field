import { NextResponse } from 'next/server';
import { getSalesforceAccessToken } from '../../utils/salesforce';

export async function POST(request: Request) {
  try {
    const { accessToken, instanceUrl } = await getSalesforceAccessToken();
    const body = await request.json();

    const response = await fetch(
      `${instanceUrl}/services/data/v56.0/sobjects/Opportunity`,
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