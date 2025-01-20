import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/salesforce/authorization';
import { executeSOQLQuery } from '@/lib/salesforce/soqlQuery';
import { APIResponse, isError } from '@/types/apiTypes';
import { createOpportunityLineItem, deleteOpportunity, getOpportunityById, updateOpportunity, updateOpportunityLineItem } from '@/lib/salesforce/database/opportunity';
import { CheckoutItem, Opportunity, OpportunityLineItem, PricebookEntry } from '@/types/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const accessToken = await getAccessToken();
    const res = await getOpportunityById(params.opportunityId, accessToken);
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const { opportunityId } = params;
    const accessToken = await getAccessToken();
    
    const postedCheckRes: APIResponse<Opportunity> = await getOpportunityById(opportunityId, accessToken);
    if (isError(postedCheckRes)) {
      return NextResponse.json({ error: "Error processing request" }, { status: 500 });
    } else if (postedCheckRes.data.StageName === "Posted") {
      return NextResponse.json({ message: "Opportunity is already posted" }, { status: 403 });
    }
    
    let body;
    try { body = await request.json(); } catch (error) { return NextResponse.json({ message: "Bad Request" }, { status: 400 }); }
    if (!body.products || body.products.length === 0) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    const responses = await Promise.all(body.products.map(async (product: CheckoutItem): Promise<APIResponse<{ success: true }>> => {
      const existenceCheckRes: APIResponse<OpportunityLineItem[]> = await executeSOQLQuery(`SELECT Id FROM OpportunityLineItem WHERE OpportunityId = '${opportunityId}' AND PricebookEntryId = '${product.PricebookEntryId}'`);
      if (isError(existenceCheckRes)) {
        return existenceCheckRes;
      }
      const exists = existenceCheckRes.data.length > 0;
      if (exists) {
        return updateOpportunityLineItem(existenceCheckRes.data[0].Id || "", accessToken, { Quantity: product.Quantity });
      }

      const unitPriceRes: APIResponse<{ UnitPrice: number }[]> = await executeSOQLQuery(`SELECT UnitPrice FROM PricebookEntry WHERE Id = '${product.PricebookEntryId}'`)
      return isError(unitPriceRes) ? unitPriceRes :
        createOpportunityLineItem({
          OpportunityId: opportunityId,
          ...product,
          UnitPrice: unitPriceRes.data[0].UnitPrice
        }, accessToken)
    }))

    responses.forEach((res: APIResponse<{ success: true }>) => {
      if (isError(res)) {
        return NextResponse.json({ message: "Unable to checkout all items"}, { status: 500 })
      }
    });

    const res = await updateOpportunity(opportunityId, accessToken, { StageName: "Posted" });
    return NextResponse.json(isError(res) ? res.error : { success: true }, { status: res.status === 204 ? 200 : res.status });
  } catch (error) {
    console.error("Salesforce API Error:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const accessToken = await getAccessToken();
    const res = await deleteOpportunity(params.opportunityId, accessToken);
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error("Salesforce API Error:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
} 