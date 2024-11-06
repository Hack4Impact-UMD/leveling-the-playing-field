import { NextResponse } from 'next/server';
import { getSalesforceAccessToken } from '../../../utils/salesforce';

export async function GET(
  request: Request,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const { accessToken, instanceUrl } = await getSalesforceAccessToken();
    const response = await fetch(
      `${instanceUrl}/services/data/v56.0/sobjects/Opportunity/${params.opportunityId}`,
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
    return NextResponse.json(data);
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const { accessToken, instanceUrl } = await getSalesforceAccessToken();
    const body = await request.json();

    const response = await fetch(
      `${instanceUrl}/services/data/v56.0/sobjects/Opportunity/${params.opportunityId}`,
      {
        method: 'PATCH',
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const { accessToken, instanceUrl } = await getSalesforceAccessToken();
    
    const response = await fetch(
      `${instanceUrl}/services/data/v56.0/sobjects/Opportunity/${params.opportunityId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
} 