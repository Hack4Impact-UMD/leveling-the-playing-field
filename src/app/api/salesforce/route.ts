import { refreshAccessToken } from '@/lib/salesforce/authorization';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_SALESFORCE_CLIENT_ID = String(process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID);
const NEXT_PUBLIC_SALESFORCE_CLIENT_SECRET = String(process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_SECRET);
const SALESFORCE_REFRESH_TOKEN = String(process.env.SALESFORCE_REFRESH_TOKEN)

async function getSalesforceToken() {
    const response = await fetch('https://login.salesforce.com/services/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: NEXT_PUBLIC_SALESFORCE_CLIENT_ID,
            client_secret: NEXT_PUBLIC_SALESFORCE_CLIENT_SECRET,
            refresh_token: SALESFORCE_REFRESH_TOKEN,
        })
    });

    const data = await response.json();
    return data.access_token;
}

async function querySalesforce(query: string, access_token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v62.0/query?q=${encodeURIComponent(query)}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    const data = await response.json();
    console.log(data.records);
    return data
}

async function updateAccount(accountId: string, request: NextRequest) {
    const access_token = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");

    const requestBody = await request.json();
    const response = await fetch(`${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v62.0/sobjects/account/${accountId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify(requestBody)
    })
    return response;
}

export async function GET(request: NextRequest, { params }: { params: { accountId: string } }) {
    const account_id = params.accountId;
    const access_token = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const query = `SELECT FIELDS(ALL) FROM Account WHERE Id = \'${account_id}\'`;
    const data = await querySalesforce(query, access_token);
    return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: { accountId: string } }) {
    const account_id = params.accountId;

    const response = await updateAccount(account_id, request);
    if (response.status / 100 === 2) {
      return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
    }
    return NextResponse.json({ message: response.statusText }, { status: 500 });
}