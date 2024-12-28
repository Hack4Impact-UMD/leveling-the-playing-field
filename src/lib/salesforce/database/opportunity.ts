import { APIResponse, SOQLResponse } from "@/types/apiTypes";
import { Opportunity, OpportunityLineItem } from "@/types/types";

export async function getOpportunityById(
  opportunityId: string,
  accessToken: string
): Promise<APIResponse<Opportunity>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Opportunity/${opportunityId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return {
        error,
        status: res.status,
      };
    }

    const data = await res.json();
    return { data, status: res.status };
  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500,
    };
  }
}

export async function createOpportunity(
  opportunity: Opportunity,
  accessToken: string
): Promise<APIResponse<{ success: true }>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Opportunity`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(opportunity),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return { error, status: response.status };
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500,
    };
  }
}

export async function updateOpportunity(
  opportunityId: string,
  accessToken: string,
  body: any
): Promise<APIResponse<{ success: true }>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Opportunity/${opportunityId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const error = await res.json();
      return { error, status: res.status };
    }
    return { data: { success: true }, status: res.status };
  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500,
    };
  }
}

export async function deleteOpportunity(
  opportunityId: string,
  accessToken: string
): Promise<APIResponse<{ success: true }>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Opportunity/${opportunityId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return { error, status: res.status };
    }
    return { data: { success: true }, status: res.status };
  } catch (error) {
    console.error("Salesforce API Error:", error);
    return {
      error: { message: "Error processing request" },
      status: 500,
    };
  }
}

export async function createOpportunityLineItem(
  opportunityLineItem: OpportunityLineItem,
  accessToken: string
): Promise<APIResponse<{ success: true }>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/OpportunityLineItem`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(opportunityLineItem),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return {
        error,
        status: res.status,
      };
    }
    return { data: { success: true }, status: res.status };
  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500,
    };
  }
}

export async function updateOpportunityLineItem(
  opportunityLineItemId: string,
  accessToken: string,
  body: any
): Promise<APIResponse<{ success: true }>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/OpportunityLineItem/${opportunityLineItemId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const error = await res.json();
      return { error, status: res.status };
    }
    return { data: { success: true }, status: res.status };
  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500,
    };
  }
}
