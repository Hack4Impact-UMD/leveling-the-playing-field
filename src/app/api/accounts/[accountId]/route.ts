import { getAccessToken } from '@/lib/salesforce/authorization';
import { getAccountById, updateAccount } from '@/lib/salesforce/database/account';
import { isError } from '@/types/apiTypes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { accountId: string } }) {
    try {
        const accessToken = await getAccessToken();
        const res = await getAccountById(params.accountId, accessToken);
        return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
    } catch (error) {
        console.error('Salesforce API Error:', error);
        return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { accountId: string } }) {
    try {
        const accessToken = await getAccessToken();
        const body = await request.json();
        const response = await updateAccount(params.accountId, accessToken, body);
        return NextResponse.json(isError(response) ? response.error : response.data, { status: response.status === 204 ? 200 : response.status });
    } catch (error) {
        console.error('Salesforce API Error:', error);
        return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
    }
}
