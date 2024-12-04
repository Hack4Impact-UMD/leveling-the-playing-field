import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/salesforce/authorization';
import { deleteContact, getContactById, updateContact } from '@/lib/salesforce/database/contact';
import { isError } from '@/types/apiTypes';

export async function GET(req: NextRequest, { params }: { params: { contactId : string } }) {
  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const res = await getContactById(params.contactId, accessToken);
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { contactId: string } }) {
  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const body = await req.json();
    const response = await updateContact(params.contactId, accessToken, body);
    return NextResponse.json(isError(response) ? response.error : response.data, { status: response.status === 204 ? 200 : response.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { contactId: string } }) {
  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const response = await deleteContact(params.contactId, accessToken);
    return NextResponse.json(isError(response) ? response.error : response.data, { status: response.status === 204 ? 200 : response.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}