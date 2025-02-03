import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/salesforce/serverAuthorization';
import { deleteContact, getContactById, updateContact } from '@/lib/salesforce/database/contact';
import { isError } from '@/types/apiTypes';
import { hasContactAccess, isAuthenticated } from '@/lib/firebase/serverAuthentication';
import { adminAuth } from '@/lib/firebase/firebaseAdminConfig';
import { executeSOQLQuery } from '@/lib/salesforce/soqlQuery';
import { Contact } from '@/types/types';

export async function GET(req: NextRequest, { params }: { params: { contactId : string } }) {
  try {
    const idToken = req.nextUrl.searchParams.get('idToken');
    const decodedToken = await isAuthenticated(idToken);
    const { contactId } = params;
    if (!decodedToken) {
      return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
    } else if (!(await hasContactAccess(decodedToken, contactId))) {
      return NextResponse.json({ error: "You do not have permission to access this resource." }, { status: 403, statusText: "Forbidden" });
    }
    const accessToken = await getAccessToken();
    const res = await getContactById(params.contactId, accessToken);
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { contactId: string } }) {
  try {
    const idToken = req.nextUrl.searchParams.get('idToken');
    const decodedToken = await isAuthenticated(idToken);
    const { contactId } = params;
    if (!decodedToken) {
      return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
    } else if (!(await hasContactAccess(decodedToken, contactId))) {
      return NextResponse.json({ error: "You do not have permission to update this resource." }, { status: 403, statusText: "Forbidden" });
    }

    const accessToken = await getAccessToken();
    const body: Partial<Contact> = await req.json();
    if (body.Email) {
      const emailRes = await executeSOQLQuery<{ Email: string }>(`SELECT Email FROM Contact WHERE Id = '${params.contactId}'`);
      if (isError(emailRes)) { return NextResponse.json({ error: "Unable to retrieve contact email" }, { status: 500, statusText: "Internal Server Error" }); }
      const email = emailRes.data[0].Email;
      try {
        const user = await adminAuth.getUserByEmail(email);
        await adminAuth.updateUser(user.uid, {
          email: body.Email,
          providersToUnlink: ['google.com'],
        });
        await adminAuth.revokeRefreshTokens(user.uid);
      } catch (error: any) {
        if (error.code !== 'auth/user-not-found') {
          console.error('Unable to update Firebase user profile', error);
          return NextResponse.json({ error: "Unable to update Firebase user profile" }, { status: 500, statusText: "Internal Server Error" });
        }
      }
    }
    const response = await updateContact(params.contactId, accessToken, body);
    return NextResponse.json(isError(response) ? response.error : response.data, { status: response.status === 204 ? 200 : response.status });
  } catch (error) {
    console.error('Error processing request', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { contactId: string } }) {
  try {
    const idToken = req.nextUrl.searchParams.get('idToken');
    const decodedToken = await isAuthenticated(idToken);
    const { contactId } = params;
    if (!decodedToken) {
      return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
    } else if (!(await hasContactAccess(decodedToken, contactId))) {
      return NextResponse.json({ error: "You do not have permission to delete this resource." }, { status: 403, statusText: "Forbidden" });
    }
    const accessToken = await getAccessToken();

    const emailRes = await executeSOQLQuery<{ Email: string }>(`SELECT Email FROM Contact WHERE Id = '${params.contactId}'`)
    if (isError(emailRes)) { return NextResponse.json({ error: "Unable to retrieve contact email" }, { status: 500, statusText: "Internal Server Error" }); }
    const email = emailRes.data[0].Email
    try {
      const user = await adminAuth.getUserByEmail(email);
      await adminAuth.deleteUser(user.uid);
    } catch (error: any) {
      if (error.code !== 'auth/user-not-found') {
        console.error('Unable to delete Firebase user profile', error);
        return NextResponse.json({ error: "Unable to delete Firebase user profile" }, { status: 500, statusText: "Internal Server Error" });
      }
    }
    const response = await deleteContact(params.contactId, accessToken);
    return NextResponse.json(isError(response) ? response.error : response.data, { status: response.status === 204 ? 200 : response.status });
  } catch (error) {
    console.error('Error processing request', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}