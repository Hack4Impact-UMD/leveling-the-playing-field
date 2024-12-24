import { APIResponse, SOQLResponse } from "@/types/apiTypes";
import { refreshAccessToken } from "./authorization";

export async function executeSOQLQuery<T>(query: string): Promise<APIResponse<T[]>> {
  try {
    const access_token = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
    const url = new URL("/services/data/v62.0/query", process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN);
    url.searchParams.set("q", query);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`, // Use your Salesforce OAuth token
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error)
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