import { getAccessToken } from "@/lib/salesforce/authorization";
import { getContactsByAccountId } from "@/lib/salesforce/database/contact";
import { isError } from "@/types/apiTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { accountId: string } }) {
  try {
    const { accountId } = params;
    const accessToken = await getAccessToken();
    const res = await getContactsByAccountId(accountId, accessToken);
    return NextResponse.json(isError(res) ? res.error : res.data, { status: res.status });
  } catch (error) {
    console.error("Salesforce API Error:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}