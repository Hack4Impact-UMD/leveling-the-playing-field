import { APIResponse } from "@/types/apiTypes";
import { Account } from "@/types/types";

export async function getAccountById(accountId: string, accessToken: string): Promise<APIResponse<Account>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Account/${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
      status: 500
    }
  }
}

export async function updateAccount(accountId: string, accessToken: string, updates: Omit<Partial<Account>, 'Id'>): Promise<APIResponse<{ success: true }>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v62.0/sobjects/account/${accountId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updates),
      }
    );
    if (!res.ok) {
      const error = await res.json();
      return { error, status: res.status }
    }
    return { data: { success: true }, status: res.status }
  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500
    }
  }
}