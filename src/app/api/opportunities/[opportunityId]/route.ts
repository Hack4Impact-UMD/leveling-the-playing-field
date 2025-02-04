import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/salesforce/serverAuthorization';
import { executeSOQLQuery } from '@/lib/salesforce/soqlQuery';
import { APIResponse, isError } from '@/types/apiTypes';
import { createOpportunityLineItem, deleteOpportunity, getOpportunityById, updateOpportunity, updateOpportunityLineItem } from '@/lib/salesforce/database/opportunity';
import { CheckoutItem, Opportunity, OpportunityLineItem, PricebookEntry } from '@/types/types';
import { hasOpportunityAccess, isAuthenticated } from '@/lib/firebase/serverAuthentication';

export async function GET(
  req: NextRequest,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const idToken = req.nextUrl.searchParams.get('idToken');
    const decodedToken = await isAuthenticated(idToken);
    const { opportunityId } = params;
    if (!decodedToken) {
      return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
    } else if (!(await hasOpportunityAccess(decodedToken, opportunityId))) {
      return NextResponse.json({ error: "You do not have permission to access this resource." }, { status: 403, statusText: "Forbidden" });
    }
    const accessToken = await getAccessToken();
    const res = await getOpportunityById(params.opportunityId, accessToken);
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const idToken = req.nextUrl.searchParams.get('idToken');
    const decodedToken = await isAuthenticated(idToken);
    const { opportunityId } = params;
    if (!decodedToken) {
      return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
    } else if (!(await hasOpportunityAccess(decodedToken, opportunityId))) {
      return NextResponse.json({ error: "You do not have permission to update this resource." }, { status: 403, statusText: "Forbidden" });
    }

    const updates = await req.json();
    const accessToken = await getAccessToken();
    const res = await updateOpportunity(opportunityId, accessToken, updates);
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
  req: NextRequest,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const idToken = req.nextUrl.searchParams.get('idToken');
    const decodedToken = await isAuthenticated(idToken);
    const { opportunityId } = params;
    if (!decodedToken) {
      return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
    } else if (!(await hasOpportunityAccess(decodedToken, opportunityId))) {
      return NextResponse.json({ error: "You do not have permission to delete this resource." }, { status: 403, statusText: "Forbidden" });
    }
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