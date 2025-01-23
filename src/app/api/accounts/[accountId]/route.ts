import { hasAccountAccess, isAuthenticated } from '@/lib/firebase/serverAuthentication';
import { getAccessToken } from '@/lib/salesforce/authorization';
import { getAccountById, updateAccount } from '@/lib/salesforce/database/account';
import { isError } from '@/types/apiTypes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { accountId: string } }) {
    try {
        const idToken = req.nextUrl.searchParams.get("idToken");
        const decodedToken = await isAuthenticated(idToken);
        const { accountId } = params;
        if (!decodedToken) {
            return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
        } else if (!hasAccountAccess(decodedToken, accountId)) {
            return NextResponse.json({ error: "You do not have permission to access this resource." }, { status: 403, statusText: "Forbidden" });
        }
        const accessToken = await getAccessToken();
        const res = await getAccountById(accountId, accessToken);
        return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
    } catch (error) {
        console.error('Salesforce API Error:', error);
        return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { accountId: string } }) {
    try {
        const idToken = req.nextUrl.searchParams.get('idToken');
        const decodedToken = await isAuthenticated(idToken);
        const { accountId } = params;
        if (!decodedToken) {
            return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
        } else if (!hasAccountAccess(decodedToken, accountId)) {
            return NextResponse.json({ error: "You do not have permission to update this resource." }, { status: 403, statusText: "Forbidden" });
        }
        const accessToken = await getAccessToken();
        const body = await req.json();
        const response = await updateAccount(params.accountId, accessToken, body);
        return NextResponse.json(isError(response) ? response.error : response.data, { status: response.status === 204 ? 200 : response.status });
    } catch (error) {
        console.error('Salesforce API Error:', error);
        return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
    }
}
