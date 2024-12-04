import { NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/salesforce/authorization';

export async function GET() {
  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");

    const query = `
      SELECT Id, Name, ProductCode, UnitPrice 
      FROM PricebookEntry 
      WHERE IsActive = true
    `;
    console.log('SOQL Query:', query);

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
    return NextResponse.json({ products: data.records }, { status: 200 });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
