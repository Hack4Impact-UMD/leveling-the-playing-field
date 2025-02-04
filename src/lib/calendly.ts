import { APIResponse } from "@/types/apiTypes";

export type CalendlyGuest = {
    email: string;
}

export type CalendlyEvent = {
    event_guests: CalendlyGuest[];
    updated_at: string;
}

export async function getNewCalendlyEvents(): Promise<APIResponse<CalendlyEvent[]>> {
  try {
    const response = await fetch(
      `api.calendly.com/scheduled_events?organization=${process.env.CALENDLY_ORGANIZATION_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_ACCESS_TOKEN}`,
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
    const events: CalendlyEvent[] = data.collections;

    return {
      data: events,
      status: response.status,
    };

  } catch (error) {
    return {
      error: { message: "Error processing request" },
      status: 500
    }
  }
}