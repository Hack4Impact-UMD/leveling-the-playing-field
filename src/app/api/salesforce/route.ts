import { getTokensFromAuthCode } from "@/lib/salesforce/authentication"
import { NextRequest, NextResponse } from "next/server";

// TODO: integrate with Firebase to store refresh & access tokens & add route protection
export async function GET(req: NextRequest) {
  const tokens = await getTokensFromAuthCode(
    req.nextUrl.searchParams.get("code") || ""
  );
  return NextResponse.json(tokens, { status: 200 });
}