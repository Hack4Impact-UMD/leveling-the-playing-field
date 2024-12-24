import { APIResponse, SOQLResponse } from "@/types/apiTypes";
import { Contact } from "@/types/types";

export async function getContactById(
  contactId: string,
  accessToken: string
): Promise<APIResponse<Contact>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Contact/${contactId}`,
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
      error: {
        message: "Error processing request",
      },
      status: 500,
    };
  }
}

export async function createContact(
  accessToken: string,
  body: Contact
): Promise<APIResponse<{ success: true }>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Contact`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        error,
        status: response.status,
      };
    }

    return {
      data: { success: true },
      status: response.status,
    } 
  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500,
    }
  }
}

export async function updateContact(
  contactId: string,
  accessToken: string,
  body: any
): Promise<APIResponse<{ success: true }>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Contact/${contactId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      return {
        error,
        status: response.status,
      };
    }

    return {
      data: { success: true },
      status: response.status,
    };
  } catch (error) {
    return {
      error: {
        message: "Error processing request",
      },
      status: 500,
    };
  }
}

export async function deleteContact(
  contactId: string,
  accessToken: string
): Promise<APIResponse<{ success: true }>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_DOMAIN}/services/data/v56.0/sobjects/Contact/${contactId}`,
      {
        method: "DELETE",
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

    return {
      data: { success: true },
      status: response.status,
    };
  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500,
    };
  }
}
