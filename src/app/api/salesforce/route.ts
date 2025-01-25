import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";
import { isAdmin, isAuthenticated } from "@/lib/firebase/serverAuthentication";
import { getTokensFromAuthCode } from "@/lib/salesforce/serverAuthorization"
import { Role } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const state = JSON.parse(req.nextUrl.searchParams.get("state") || "{}");
    const { idToken } = state;
    const decodedToken = await isAuthenticated(idToken);
    if (!decodedToken) { return NextResponse.json({ error: "You are not authenticated." }, { status: 401, statusText: "Unauthorized" }); }
    if (!isAdmin(decodedToken)) { return NextResponse.json({ error: "You do not permission to perform this action." }, { status: 403, statusText: "Forbidden" }); }
    const tokens = await getTokensFromAuthCode(req.nextUrl.searchParams.get("code") || "");
    await adminAuth.setCustomUserClaims(decodedToken.uid, {
      role: Role.ADMIN,
      tokens: {
        refreshToken: tokens.refreshToken,
      }
    })
    return NextResponse.json({ message: "Successfully updated refresh token" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error processing request. Please try again." }, { status: 500, statusText: "Internal Server Error" });
  }
}