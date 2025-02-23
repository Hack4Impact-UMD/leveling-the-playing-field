import { NextRequest, NextResponse } from 'next/server';
import { CalendlyEvent, getNewCalendlyEvents } from '@/lib/calendly';
import { APIResponse, isError } from "@/types/apiTypes";
import { executeSOQLQuery } from '@/lib/salesforce/soqlQuery';
import { getAccessToken } from '@/lib/salesforce/serverAuthorization';
import { createOpportunity, getOpportunityById, updateOpportunity } from '@/lib/salesforce/database/opportunity';

export async function GET() {
  try {
    const res: APIResponse<CalendlyEvent[]> = await getNewCalendlyEvents();
    if (isError(res)) {
      return NextResponse.json({ error: res.error }, { status: res.status });
    }   

    const events: CalendlyEvent[] = res.data;
    
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const attendedEvents = events.filter(event => event.event_guests.length !== 0);
    const recentlyUpdatedEvents = attendedEvents.filter(event => new Date(event.updated_at).getTime() >= oneDayAgo);

    recentlyUpdatedEvents.forEach(async (event) => {
      // get account ID from person's email
      if (event.event_guests.length !== 0) {
        const accountIdRes: APIResponse<string[]> = await executeSOQLQuery(`SELECT AccountId
                                                                            FROM Contact
                                                                            WHERE Email = '${event.event_guests[0].email}'
                                                                            LIMIT 1`);

        if (isError(accountIdRes)) { 
          // error
        } else if (accountIdRes.data.length === 0) { 
          // make new opportunity
        } else {
          // check if account ID has an opportunity for that date and warehouse
          const opportunityIdRes: APIResponse<string[]> = await executeSOQLQuery(`SELECT Id FROM Opportunity 
                                                                                  WHERE AccountId = '${accountIdRes.data[0]}'
                                                                                  AND Market__c == "" AND CloseDate=="" 
                                                                                  LIMIT 1`);
          // if no opportunity, make new opportunity
          // else, update opportunity
          if (isError(opportunityIdRes)) {
            // error
          } else if (opportunityIdRes.data.length === 0) {
            // createOpportunity();
          } else {
            const accessToken = await getAccessToken();
            const opportunity = await getOpportunityById(opportunityIdRes.data[0], accessToken);
            // updateOpportunity(opportunityIdRes.data[0], accessToken, body);
          }
        }
      }
    });
  } catch (error) {
    console.error('Calendly API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}