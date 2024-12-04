import { NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/salesforce/authorization';
import { executeSOQLQuery } from '@/lib/salesforce/soqlQuery';

interface QueryResponse<T> {
  totalSize: number;
  done: boolean;
  records: Array<T>;
}

interface OpportunityProduct {
  pricebookEntryId: string;
  quantity: number;
}

export async function GET(
  request: Request,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Opportunity/${params.opportunityId}`,
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
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

async function updateOpportunityProducts(opportunityId: string, products: OpportunityProduct[]) {
  const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
  const salesforceDomain = process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN;

  try {
    for (const product of products) {
      const { pricebookEntryId, quantity } = product;

      const existingLineItemData: QueryResponse<{ Id: string }> = await executeSOQLQuery(`SELECT Id FROM OpportunityLineItem WHERE OpportunityId='${opportunityId}' AND PricebookEntryId='${pricebookEntryId}'`);

      if (existingLineItemData.records.length > 0) {
        const existingLineItemId = existingLineItemData.records[0].Id;

        const updateResponse = await fetch(
          `${salesforceDomain}/services/data/v56.0/sobjects/OpportunityLineItem/${existingLineItemId}`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Quantity: quantity,
            }),
          }
        );

        if (!updateResponse.ok) {
          const error = await updateResponse.json();
          console.error('Error updating OpportunityLineItem:', error);
          throw new Error('Error updating OpportunityLineItem');
        }
      } else {
        const createResponse = await fetch(
          `${salesforceDomain}/services/data/v56.0/sobjects/OpportunityLineItem`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              OpportunityId: opportunityId,
              PricebookEntryId: pricebookEntryId,
              Quantity: quantity,
            }),
          }
        );

        if (!createResponse.ok) {
          const error = await createResponse.json();
          console.error('Error creating OpportunityLineItem:', error);
          throw new Error('Error creating OpportunityLineItem');
        }
      }
    }
  } catch (error) {
    console.error('Error updating Opportunity products:', error);
    throw error;
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const body = await request.json();
    if (body.products) {
      await updateOpportunityProducts(params.opportunityId, body.products);
    }

    const filteredBody = Object.fromEntries(
      Object.entries(body).filter(([key]) => key !== 'products')
    );

    console.log("filtered:", filteredBody);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Opportunity/${params.opportunityId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredBody),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const accessToken = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Opportunity/${params.opportunityId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
} 