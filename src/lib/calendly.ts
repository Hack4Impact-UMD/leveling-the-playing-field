import { APIResponse } from "@/types/apiTypes";

export type CalendlyGuest = {
  email: string;
}

export type CalendlyEvent = {
  event_guests: CalendlyGuest[];
  updated_at: string;
  name: string;
}

export async function getNewCalendlyEvents(): Promise<APIResponse<CalendlyEvent[]>> {
  try {
    const yesterdayISOString = new Date(Date.now() - 86400000).toISOString().replace('Z', '.000000Z');

    const response = await fetch(
      `api.calendly.com/scheduled_events?organization=${process.env.CALENDLY_ORGANIZATION_ID}
                                        &count=100&min_start_date=${yesterdayISOString}`,
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