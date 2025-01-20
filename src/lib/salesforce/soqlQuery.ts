import { APIResponse, SOQLResponse } from "@/types/apiTypes";
import { getAccessToken } from "./authorization";

export async function executeSOQLQuery<T>(query: string, accessToken?: string): Promise<APIResponse<T[]>> {
  try {
    if (!accessToken) {
      accessToken = await getAccessToken();
    }
    const url = new URL("/services/data/v62.0/query", process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN);
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
      console.error(error)
      return { error, status: response.status };
    }
    const data: SOQLResponse<T> = await response.json();
    return { data: data.records, status: response.status };
  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500
    }
  }
}