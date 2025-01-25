export function getSalesforceAuthURL(): URL {
  const authURL = new URL("/services/oauth2/authorize", process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN)
  const searchParams = authURL.searchParams;
  searchParams.set("client_id", process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID || "");
  searchParams.set("redirect_uri", process.env.NEXT_PUBLIC_SALESFORCE_REDIRECT_URI || "");
  searchParams.set("response_type", "code");
  return authURL;
}