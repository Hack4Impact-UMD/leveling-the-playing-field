import { NextRequest, NextResponse } from 'next/server';
import { CalendlyEvent, getNewCalendlyEvents } from '@/lib/calendly';
import { APIResponse, isError } from "@/types/apiTypes";
import { Contact } from '@/types/types';
import { executeSOQLQuery } from '@/lib/salesforce/soqlQuery';

export async function GET(req: NextRequest) {
  try {
    const res: APIResponse<CalendlyEvent[]> = await getNewCalendlyEvents();
    if (isError(res)) {
      return NextResponse.json({ error: res.error }, { status: res.status });
    }   

    const events: CalendlyEvent[] = res.data;
    
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentlyUpdatedEvents = events.filter(event => new Date(event.updated_at).getTime() >= oneDayAgo);

    recentlyUpdatedEvents.forEach(async (event) => {
      // get account ID from person's email
      if (event.event_guests.length !== 0) {
        const res: APIResponse<Contact[]> = await executeSOQLQuery(`SELECT AccountId
                                                                    FROM Contact
                                                                    WHERE Email = '${event.event_guests[0].email}'
                                                                    LIMIT 1`);

        if (isError(res)) { 
          // error
        } else if (res.data.length === 0) { 
          // make new opportunity
        } else {
          // check if account ID has an opportunity for that date and warehouse
          const res2: APIResponse<Contact[]> = await executeSOQLQuery(`SELECT Id FROM Opportunity 
                                                                      WHERE AccountId = "" 
                                                                      AND Market__c == "" AND CloseDate==""`);
          // if true, update opportunity
          // else make new opportunity
        }
      }
    });
  } catch (error) {
    console.error('Calendly API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}