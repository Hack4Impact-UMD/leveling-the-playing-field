export function getSalesforceAuthURL(): string {
  const authURL = new URL("/services/oauth2/authorize", process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN)
  const searchParams = authURL.searchParams;
  searchParams.set("client_id", process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID || "");
  searchParams.set("redirect_uri", process.env.NEXT_PUBLIC_SALESFORCE_REDIRECT_URI || "");
  searchParams.set("response_type", "code");
  return authURL.toString();
}

export async function getTokensFromAuthCode(authCode: string) {
  const url = new URL("/services/oauth2/token", process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN)
  const searchParams = url.searchParams;
  searchParams.set("code", authCode);
  searchParams.set("grant_type", "authorization_code");
  searchParams.set("client_id", process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID || "");
  searchParams.set("client_secret", process.env.SALESFORCE_CLIENT_SECRET || "");
  searchParams.set("redirect_uri", process.env.NEXT_PUBLIC_SALESFORCE_REDIRECT_URI || "");
  const res = await fetch(url.toString(), { method: "POST" });
  const body = await res.json();
  return {
    refreshToken: body.refresh_token,
    accessToken: body.access_token
  }
}

export async function refreshAccessToken(refreshToken: string) {
  const url = new URL("/services/oauth2/token", process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN);
  const searchParams = url.searchParams;
  searchParams.set("grant_type", "refresh_token");
  searchParams.set("client_id", process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID || "");
  searchParams.set("client_secret", process.env.SALESFORCE_CLIENT_SECRET || "");
  searchParams.set("refresh_token", refreshToken);
  const res = await fetch(url.toString(), { method: "POST" });
  const body = await res.json();
  return body.access_token;
}