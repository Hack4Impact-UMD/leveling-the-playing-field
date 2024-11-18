import { NextRequest, NextResponse } from 'next/server';
import { Contact } from '../../../../types';

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

async function querySalesforce(query: string) {
    const access_token = await getSalesforceToken();

    const response = await fetch(`https://connect-customization-2394.my.salesforce.com/services/data/v62.0/query?q=${encodeURIComponent(query)}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    const data = await response.json();
    console.log(data.records); // Logs retrieved records
    return data
}


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const contact_id = params.id;
    console.log(contact_id);
    const query = `SELECT FIELDS(ALL) FROM Contact WHERE Id = \'${contact_id}\'`;
    const data = await querySalesforce(query);
    return NextResponse.json(data);
}

async function postSalesforce(request: NextRequest) {
  const access_token = await getSalesforceToken();
  
  const requestBody = await request.body;
  const response = await fetch(`https://connect-customization-2394.my.salesforce.com/services/data/v62.0/sobjects/contact`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
      },
      body: requestBody
  })
  console.log(response);
  const data = await response.json();
  console.log(data.records);
  return data;
}

export async function POST(request: NextRequest) {
  // creating a new Contact in Salesforce
  // const body: Contact = request.body;
  const data = await postSalesforce(request);
  console.log(data);
  return NextResponse.json(data);


  const contact_data = await request.json();
  const query = `
    INSERT INTO Contact (FirstName, LastName, Email, Phone)
    VALUES ('${contact_data.firstName}', '${contact_data.lastName}', '${contact_data.email}', '${contact_data.phone}')
  `;
}



async function putSalesforce(contactId: string, request: NextRequest) {
  const access_token = await getSalesforceToken();
  
  const requestBody = await request.body;
  const response = await fetch(`https://connect-customization-2394.my.salesforce.com/services/data/v62.0/sobjects/contact/${contactId}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
      },
      body: requestBody
  })
  console.log(response);
  const data = await response.json();
  console.log(data.records);
  return data;
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const contact_id = params.id;
  const data = await putSalesforce(contact_id, request);
  console.log(data);
  return NextResponse.json(data);
}

async function deleteSalesforce(contactId: string, request: NextRequest) {
  const access_token = await getSalesforceToken();
  
  const requestBody = await request.body;
  const response = await fetch(`https://connect-customization-2394.my.salesforce.com/services/data/v62.0/sobjects/contact/${contactId}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
      },
      body: requestBody
  })
  console.log(response);
  const data = await response.json();
  console.log(data.records);
  return data;
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // deleting a given contact id from salesforce
  const contact_id = params.id;
  const data = await deleteSalesforce(contact_id, request);
  return NextResponse.json(data);
}