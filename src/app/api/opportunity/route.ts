import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/salesforce/authorization';
import { createOpportunity } from '@/lib/salesforce/database/opportunity';
import { isError } from '@/types/apiTypes';

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