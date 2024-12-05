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
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code: authCode,
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID || "",
      client_secret: process.env.SALESFORCE_CLIENT_SECRET || "",
      redirect_uri: process.env.NEXT_PUBLIC_SALESFORCE_REDIRECT_URI || "",
    })
  });
  const body = await res.json();
  return {
    refreshToken: body.refresh_token,
    accessToken: body.access_token
  }
}

export async function refreshAccessToken(refreshToken: string) {
  return "00DU8000001jV77!AQEAQE8Kv0wicjDPIZC6Gh0jliTUMkOkua.K56fIdh9epMkDhvFoouj.6pnleRBRn3c3bUUnXJF7mg3OGJ0doZp_iiIEvMf2";
  const url = new URL("/services/oauth2/token", process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID || "",
      client_secret: process.env.SALESFORCE_CLIENT_SECRET || "",
      refresh_token: refreshToken,
    })
  });
  const body = await res.json();
  return body.access_token;
}