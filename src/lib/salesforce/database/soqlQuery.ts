import { APIResponse } from "@/types/apiTypes";
import { refreshAccessToken } from "../authorization";

export async function executeSOQLQuery(
  query: string
): Promise<APIResponse<any>> {
  try {
    const accessToken = await refreshAccessToken(
      process.env.SALESFORCE_REFRESH_TOKEN || ""
    );
    const url = new URL(
      "/services/data/v62.0/query",
      process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN
    );
    url.searchParams.set("q", query);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use your Salesforce OAuth token
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error,
        status: response.status,
      };
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500,
    };
  }
}
