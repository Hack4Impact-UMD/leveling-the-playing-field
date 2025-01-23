import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/salesforce/authorization";
import { getOpportunitiesByAccountId } from "@/lib/salesforce/database/opportunity";
import { isError } from "@/types/apiTypes";
import { Stage } from "@/types/types";
import { hasAccountAccess, isAuthenticated } from "@/lib/firebase/serverAuthentication";

export async function GET(req: NextRequest, { params }: { params: { accountId: string } }) {
  const idToken = req.nextUrl.searchParams.get("idToken");
  const decodedToken = await isAuthenticated(idToken);
  const { accountId } = params;
  if (!decodedToken) {
    return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" });
  } else if (!hasAccountAccess(decodedToken, accountId)) {
    return NextResponse.json({ error: "You do not have permission to access this resource." }, { status: 403, statusText: "Forbidden" });
  }

  const stage: Stage | null = req.nextUrl.searchParams.get('stage') as Stage | null;
  if (!stage) {
    return NextResponse.json({ error: "Stage query parameter is required." }, { status: 400, statusText: "Bad Request" });
  }

  try {
    const accessToken = await getAccessToken();
    const res = await getOpportunitiesByAccountId(accountId, stage, accessToken)
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error('Salesforce API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}