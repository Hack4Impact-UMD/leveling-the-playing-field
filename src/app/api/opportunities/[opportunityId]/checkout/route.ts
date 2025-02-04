import { hasOpportunityAccess, isAuthenticated } from "@/lib/firebase/serverAuthentication";
import { getOpportunityById, updateOpportunity, updateOpportunityLineItem, createOpportunityLineItem } from "@/lib/salesforce/database/opportunity";
import { getAccessToken } from "@/lib/salesforce/serverAuthorization";
import { executeSOQLQuery } from "@/lib/salesforce/soqlQuery";
import { APIResponse, isError } from "@/types/apiTypes";
import { CheckoutItem, Opportunity, OpportunityLineItem } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { opportunityId: string } }
) {
  try {
    const idToken = req.nextUrl.searchParams.get("idToken");
    const decodedToken = await isAuthenticated(idToken);
    const { opportunityId } = params;
    if (!decodedToken) {
      return NextResponse.json(
        { error: "You are not authenticated." },
        { status: 401, statusText: "Unauthorized" }
      );
    } else if (!(await hasOpportunityAccess(decodedToken, opportunityId))) {
      return NextResponse.json(
        { error: "You do not have permission to update this resource." },
        { status: 403, statusText: "Forbidden" }
      );
    }

    const accessToken = await getAccessToken();
    const postedCheckRes: APIResponse<Opportunity> = await getOpportunityById(
      opportunityId,
      accessToken
    );
    if (isError(postedCheckRes)) {
      return NextResponse.json(
        { error: "Error processing request" },
        { status: 500 }
      );
    } else if (postedCheckRes.data.StageName === "Posted") {
      return NextResponse.json(
        { message: "Opportunity is already posted" },
        { status: 403 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }
    if (!body.products || body.products.length === 0) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    const responses = await Promise.all(
      body.products.map(
        async (
          product: CheckoutItem
        ): Promise<APIResponse<{ success: true }>> => {
          const existenceCheckRes: APIResponse<OpportunityLineItem[]> =
            await executeSOQLQuery(
              `SELECT Id FROM OpportunityLineItem WHERE OpportunityId = '${opportunityId}' AND PricebookEntryId = '${product.PricebookEntryId}'`
            );
          if (isError(existenceCheckRes)) {
            return existenceCheckRes;
          }
          const exists = existenceCheckRes.data.length > 0;
          if (exists) {
            return updateOpportunityLineItem(
              existenceCheckRes.data[0].Id || "",
              accessToken,
              { Quantity: product.Quantity }
            );
          }

          const unitPriceRes: APIResponse<{ UnitPrice: number }[]> =
            await executeSOQLQuery(
              `SELECT UnitPrice FROM PricebookEntry WHERE Id = '${product.PricebookEntryId}'`
            );
          return isError(unitPriceRes)
            ? unitPriceRes
            : createOpportunityLineItem(
                {
                  OpportunityId: opportunityId,
                  ...product,
                  UnitPrice: unitPriceRes.data[0].UnitPrice,
                },
                accessToken
              );
        }
      )
    );

    responses.forEach((res: APIResponse<{ success: true }>) => {
      if (isError(res)) {
        return NextResponse.json(
          { message: "Unable to checkout all items" },
          { status: 500 }
        );
      }
    });

    const res = await updateOpportunity(opportunityId, accessToken, {
      StageName: "Posted",
    });
    return NextResponse.json(isError(res) ? res.error : { success: true }, {
      status: res.status === 204 ? 200 : res.status,
    });
  } catch (error) {
    console.error("Salesforce API Error:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
