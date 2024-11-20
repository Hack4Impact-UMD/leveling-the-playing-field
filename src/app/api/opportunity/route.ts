import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/salesforce/authorization';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const accountId = searchParams.get('accountId');
    const status = searchParams.get('status');

    if (!accountId) {
      return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
    }

    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    
    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 401 });
    }

    const query = `SELECT FIELDS(ALL)
                   FROM Opportunity 
                   WHERE AccountId = '${accountId}' 
                   ${status ? `AND StageName = '${status}'` : ''} LIMIT 200`;

    const url = `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/query?q=${encodeURIComponent(query)}`;
    
    console.log('Fetching from URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Salesforce API Error Response:', errorText);
      return NextResponse.json({ error: 'Salesforce API error' }, { status: response.status });
    }

    const data = await response.json();
    
    if (!data || !data.records) {
      return NextResponse.json({ error: 'Invalid response format' }, { status: 500 });
    }

    console.log(data.records)

    const transformedRecords = data.records.map((record: any) => ({
      city: record.City || 'N/A',
      state: record.State || 'N/A',
      dateOfOrder: record.CloseDate,
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      pointOfContact: {
        firstName: record.Name?.split(' ')[0] || 'N/A',
        lastName: record.Name?.split(' ')[1] || '',
      },
      itemsCheckedOut: record.Amount || 0,
      itemList: [],
    }));

    return NextResponse.json({ records: transformedRecords });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 