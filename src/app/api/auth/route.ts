import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";
import { executeSOQLQuery } from "@/lib/salesforce/soqlQuery";
import { APIResponse, isError } from "@/types/apiTypes";
import { Account, Contact, Role } from "@/types/types";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid ID token' }, { status: 401, statusText: "Unauthorized" });
    }
    if (!decodedToken.email) {
      await adminAuth.deleteUser(decodedToken.uid);
      return NextResponse.json({ error: 'User does not have a valid email address' }, { status: 400, statusText: "Bad Request" });
    } else if (!decodedToken.role) {
      const res: APIResponse<Contact[]> = await executeSOQLQuery(`SELECT Id, AccountId
                                                                  FROM Contact
                                                                  WHERE Email = '${decodedToken.email}'
                                                                  LIMIT 1`);
      if (isError(res)) {
        return NextResponse.json({ error: res.error }, { status: res.status });
      } else if (res.data.length === 0) {
        const accountRes: APIResponse<Account[]> = await executeSOQLQuery(`SELECT Id FROM Account WHERE Email__c = '${decodedToken.email}' LIMIT 1`);
        if (isError(accountRes)) {
          return NextResponse.json({ error: accountRes.error }, { status: accountRes.status });
        } else if (accountRes.data.length === 0) {
          await adminAuth.deleteUser(decodedToken.uid);
          return NextResponse.json({ error: "User's email has not been added to an existing organization's account" }, { status: 400, statusText: "Bad Request" });
        }
        
        await adminAuth.setCustomUserClaims(decodedToken.uid, {
          role: Role.USER,
          salesforceIds: {
            accountId: accountRes.data[0].Id,
            contactId: null,
          }
        });
        return NextResponse.json({ message: "User's IDs have been set" }, { status: 200, statusText: "OK" });
      }

      await adminAuth.setCustomUserClaims(decodedToken.uid, {
        role: Role.USER,
        salesforceIds: {
          accountId: res.data[0].AccountId,
          contactId: res.data[0].Id,
        }
      });
      return NextResponse.json({ message: "User's IDs have been set" }, { status: 200, statusText: "OK" });
    }
    return NextResponse.json({ message: "User's IDs were already set" }, { status: 200, statusText: "OK" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500, statusText: "Internal Server Error" });
  }
}