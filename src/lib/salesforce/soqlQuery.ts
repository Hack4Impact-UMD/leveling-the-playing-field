import { refreshAccessToken } from "./authorization";

export async function executeSOQLQuery(query: string) {
  const access_token = await refreshAccessToken(process.env.SALESFORCE_REFRESH_TOKEN || "");
  const url = new URL("/services/data/v62.0/query", process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN);
  console.log(access_token)
  url.searchParams.set("q", query);
  console.log(`Bearer ${access_token}`)
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`, // Use your Salesforce OAuth token
      "Content-Type": "application/json",
    },
  });
  console.log(response)
  if (!response.ok) {
    throw new Error(`Salesforce API error: ${response.statusText}`);
  }
  return response.json();
}