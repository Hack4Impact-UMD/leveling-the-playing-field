import { DecodedIdToken } from "firebase-admin/auth";
import { adminAuth } from "./firebaseAdminConfig";
import { executeSOQLQuery } from "../salesforce/soqlQuery";
import { Contact, Opportunity } from "@/types/types";
import { isError } from "@/types/apiTypes";

export async function isAuthenticated(idToken: string | null): Promise<DecodedIdToken | false> {
  if (!idToken) return false;
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    return decodedToken.role ? decodedToken : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function hasAccountAccess(decodedToken: DecodedIdToken, accountId: string): boolean {
  return decodedToken.salesforceIds?.accountId === accountId;
}

export async function hasContactAccess(decodedToken: DecodedIdToken, contactId: string): Promise<boolean> {
  try {
    const res = await executeSOQLQuery<Contact>(`SELECT AccountId FROM Contact WHERE Id = '${contactId}'`);
    if (isError(res)) { return false; }
    return decodedToken.salesforceIds?.accountId === res.data[0].AccountId;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function hasOpportunityAccess(decodedToken: DecodedIdToken, opportunityId: string): Promise<boolean> {
  try {
    const res = await executeSOQLQuery<Opportunity>(`SELECT AccountId FROM Opportunity WHERE Id = '${opportunityId}'`);
    if (isError(res)) { return false; }
    return decodedToken.salesforceIds?.accountId === res.data[0].AccountId;
  } catch (error) {
    console.error(error);
    return false;
  }
}