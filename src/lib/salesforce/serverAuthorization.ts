import { Role } from "@/types/types";
import { adminAuth } from "../firebase/firebaseAdminConfig";

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
  if (!res.ok) {
    throw Error("Error getting tokens from auth code");
  }
  const body = await res.json();
  return {
    refreshToken: body.refresh_token,
    accessToken: body.access_token
  }
}

export async function getAccessToken() {
  const user = await adminAuth.getUserByEmail(process.env.ADMIN_EMAIL || "");
  const tokens = user.customClaims?.tokens;
  if (!tokens?.refreshToken) {
    throw Error("Refresh token not found. Please contact website admin for help.")
  } else if (tokens?.accessToken && Date.now() / 1000 < tokens?.expirationTime - 10) {
    return tokens?.accessToken;
  }

  const accessToken = await refreshAccessToken(tokens?.refreshToken);
  const expirationTime = await getTokenExpirationTime(accessToken);
  await adminAuth.setCustomUserClaims(user.uid, {
    role: Role.ADMIN,
    tokens: {
      refreshToken: tokens?.refreshToken,
      accessToken,
      expirationTime
    }
  });
  return accessToken;
}

export async function getTokenExpirationTime(accessToken: string) {
  const url = new URL("/services/oauth2/introspect", process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: accessToken,
      client_id: process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID || "",
      client_secret: process.env.SALESFORCE_CLIENT_SECRET || "",
      token_type_hint: "access_token"
    })
  })
  const body = await res.json();
  return body.exp;
}

async function refreshAccessToken(refreshToken: string) {
  const url = new URL("/services/oauth2/token", process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
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