import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/salesforce/authorization';
import { Contact } from '@/types/types';
import { createContact } from '@/lib/salesforce/database/contact';
import { isError } from '@/types/apiTypes';

export async function POST(request: NextRequest) {
  try {
    const accessToken = await getAccessToken();
    const body: Contact = await request.json();
    const response = await createContact(accessToken, body);
    return NextResponse.json(isError(response) ? response.error : response.data, { status: response.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error creating contact' }, { status: 500 });
  }
}