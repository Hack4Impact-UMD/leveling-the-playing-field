import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/salesforce/authorization";
import { getOpportunitiesByAccountId } from "@/lib/salesforce/database/opportunity";
import { isError } from "@/types/apiTypes";
import { Stage } from "@/types/types";

export async function GET(request: NextRequest, { params }: { params: { accountId: string } }) {
  const { accountId } = params;
  const stage: Stage | null = request.nextUrl.searchParams.get('stage') as Stage | null;

  if (!stage) {
    return NextResponse.json(
      { error: 'stage query parameter is required' },
      { status: 400, statusText: 'Bad Request' }
    );
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