import { getTokensFromAuthCode } from "@/lib/salesforce/authorization"
import { NextRequest, NextResponse } from "next/server";

// TODO: integrate with Firebase to store refresh & access tokens & add route protection
export async function GET(req: NextRequest) {
  const tokens = await getTokensFromAuthCode(
    req.nextUrl.searchParams.get("code") || ""
  );
  return NextResponse.json(tokens, { status: 200 });
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ErrorResponse {
  message: string;
  error?: string;
}

interface SuccessResponse {
  contacts: Contact[];
}

export async function contactGET(req: NextRequest, { params }: { params: { id: string } }) {
  // requires accountId query parameter - get list of contacts associated with the accountId
}

export async function opportunityGET(req: NextRequest, { params }: { params: { id: string } }) {
  // requires accountId and status query parameters - get list of opportunities associated with the accountId with the given status
}

export async function productGET(req: NextRequest, { params }: { params: { id : string }}) {
  // get the full list of products from the Salesforce Price Book
}

export async function opportunityPOST(req: NextRequest) {
  // loop through all the events of each warehouse’s Calendly calendar and create new opportunities in 
  // Salesforce for new event sign-ups. Delete opportunities if someone has cancelled a signup, update if they’ve rescheduled
}

