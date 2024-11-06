const SALESFORCE_AUTH_URL = 'https://login.salesforce.com/services/oauth2/token';

export async function getSalesforceAccessToken() {
  const response = await fetch(SALESFORCE_AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_SECRET!,
      refresh_token: process.env.NEXT_PUBLIC_SALESFORCE_REFRESH_TOKEN!,
    }),
  });

  const data = await response.json();
  return {
    accessToken: data.access_token,
    instanceUrl: data.instance_url
  };
} 