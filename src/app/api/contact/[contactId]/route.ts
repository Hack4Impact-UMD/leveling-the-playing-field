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




// Contact fields are placeholders currently
// Need to double check about actual fields for a contact

interface dataDrop {
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
}

export async function GET(request: NextRequest, { params }: { params: { contactId: string } }) {
    const contact_id = params.contactId;
    console.log(contact_id);
    const query = `SELECT FIELDS(ALL) FROM Contact WHERE Id = \'${contact_id}\'`;
    const data = await querySalesforce(query);
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  // creating a new Contact in Salesforce
  const contact_data: dataDrop = await request.json();
  const query = `
    INSERT INTO Contact (FirstName, LastName, Email, Phone)
    VALUES ('${contact_data.firstName}', '${contact_data.lastName}', '${contact_data.email}', '${contact_data.phone}')
  `;
  const data = await querySalesforce(query);
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: {contactId: string } }) {
  // updating a given contact with information from the body
  const contact_id = params.contactId;
  const new_data: dataDrop = await request.json()
  console.log(new_data);
  const query = `UPDATE Contact
    SET
      FirstName = '${new_data.firstName}',
      LastName = '${new_data.lastName}',
      Email = '${new_data.email}',
      Phone = '${new_data.phone}'
    WHERE Id = '${contact_id}'`;
  const data = await querySalesforce(query);
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: { params: {contactId: string } }) {
  // deleting a given contact id from salesforce
  const contact_id = params.contactId;
  const query = `DELETE FROM Contact WHERE Id = \'${contact_id}`;
  const data = await querySalesforce(query);
  return NextResponse.json(data);
}