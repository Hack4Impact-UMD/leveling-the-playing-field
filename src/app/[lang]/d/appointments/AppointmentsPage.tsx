//  this relies on the appointments component
"use client";

import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import AppointmentsIcon from "@/components/icons/AppointmentsIcon";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Contact,
  MARKETS,
  Market,
  Opportunity,
  UserClaims,
} from "@/types/types";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";

//TODO: Replace Calendly links with correct ones
const marketToCalendlyLink: Record<Market, string> = {
  [Market.BALTIMORE]:
    "https://calendly.com/d/cks-n9m-tnp/greater-washington-equipment-pickup",
  [Market.GREATER_WASHINGTON]:
    "https://calendly.com/d/cks-n9m-tnp/greater-washington-equipment-pickup",
  [Market.OHIO]:
    "https://calendly.com/d/cks-n9m-tnp/greater-washington-equipment-pickup",
  [Market.PHILADELPHIA]:
    "https://calendly.com/d/cks-n9m-tnp/greater-washington-equipment-pickup",
  [Market.WESTERN_NEW_YORK]:
    "https://calendly.com/d/cks-n9m-tnp/greater-washington-equipment-pickup",
};

const AppointmentsPage = () => {
  const [isDropClicked, setIsDropClicked] = useState(false);
  const [todayAppointments, setTodayAppointments] = useState<
    Pick<
      Opportunity,
      "Id" | "Name" | "CloseDate" | "Market__c" | "Primary_Contact__c"
    >[]
  >([]);
  const [appointments, setAppointments] = useState<
    Pick<
      Opportunity,
      "Id" | "Name" | "CloseDate" | "Market__c" | "Primary_Contact__c"
    >[]
  >([]);
  const [contacts, setContacts] = useState<Pick<Contact, "Id" | "Name">[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { dict } = useI18n();
  const router = useRouter();
  const { token } = useAuth();
  const accountId = (token?.claims.salesforceIds as UserClaims).accountId;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsRes = await fetch(
          `/api/accounts/${accountId}/opportunities?stage=Site Visit/Call&idToken=${token?.token}`
        );
        if (!appointmentsRes.ok) {
          throw Error(await appointmentsRes.json());
        }
        const appointments = (await appointmentsRes.json())
          .sort((a: Opportunity, b: Opportunity) => {
            if (a.CloseDate === b.CloseDate) {
              return a.Name.localeCompare(b.Name);
            }
            return (
              new Date(a.CloseDate).getTime() - new Date(b.CloseDate).getTime()
            );
          })
          .map((appointment: Opportunity) => {
            return {
              Id: appointment.Id,
              Name: appointment.Name,
              CloseDate: appointment.CloseDate,
              Market__c: appointment.Market__c,
              Primary_Contact__c: appointment.Primary_Contact__c,
            };
          });
        setTodayAppointments(
          appointments.filter((appointment: Opportunity) => {
            const now = new Date();
            const timeZoneOffset = now.getTimezoneOffset() * 60 * 1000;
            const appointmentDate = new Date(appointment.CloseDate);
            return (
              appointmentDate.getTime() + timeZoneOffset <= now.getTime() &&
              now.getTime() <=
                appointmentDate.getTime() + timeZoneOffset + 1000 * 60 * 60 * 24
            );
          })
        );
        setAppointments(
          appointments.filter(
            (appointment: Opportunity) =>
              new Date(appointment.CloseDate).getTime() > new Date().getTime()
          )
        );
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments. Please try again later.");
      }
    };

    const fetchContacts = async () => {
      try {
        const contactsRes = await fetch(
          `/api/accounts/${accountId}/contacts?stage=Site Visit/Call&idToken=${token?.token}`
        );
        if (!contactsRes.ok) {
          throw Error(await contactsRes.json());
        }
        const contacts = await contactsRes.json();
        setContacts(
          contacts.map((contact: Contact) => {
            return {
              Id: contact.Id,
              Name: contact.Name,
            };
          })
        );
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to fetch contacts. Please try again later.");
      }
    };

    setLoading(true);
    Promise.all([fetchAppointments(), fetchContacts()]).then(() =>
      setLoading(false)
    );
  }, []);

  const handleChangeContact = (appointmentId: string, contactId: string) => {
    setAppointments((appointments) =>
      appointments.map((appointment) => {
        return appointment.Id === appointmentId
          ? { ...appointment, Primary_Contact__c: contactId }
          : appointment;
      })
    );
  };

  const dropDown = () => setIsDropClicked(!isDropClicked);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col p-6 bg-gray-100 items-center min-h-screen overflow-auto">
      <div className="flex flex-col mb-6 items-center">
        <div className="bg-teal mb-2 rounded-full p-6 relative">
          <div className="relative -top-0.5">
            <AppointmentsIcon />
          </div>
        </div>
        <h2 className="text-3xl font-bree-serif text-stone-950">
          {dict.appointmentsPage.title.text}
        </h2>
      </div>

      {error ? (
        <div className="w-full">
          <p className="text-center text-red-500 font-cabin-condensed text-base">
            {error}
          </p>
        </div>
      ) : (
        <>
          {todayAppointments.length > 0 && (
            <div className="max-w-md w-full">
              <h3 className="text-xl font-bree-serif mb-2 text-stone-950">
                {dict.appointmentsPage.todayAppointments.text}
              </h3>
              {todayAppointments.map((appointment, i) => (
                <Appointment
                  key={i}
                  appointment={appointment}
                  contacts={contacts}
                  today={true}
                />
              ))}
            </div>
          )}
          {appointments.length > 0 && (
            <div className="max-w-md w-full">
              <h3 className="text-xl font-bree-serif mb-2 text-stone-950">
                {dict.appointmentsPage.upcomingAppointments.text}
              </h3>
              {appointments.map((appointment, x) => (
                <Appointment
                  key={x}
                  appointment={appointment}
                  contacts={contacts}
                  today={false}
                  handleChangeContact={handleChangeContact}
                />
              ))}
            </div>
          )}
        </>
      )}

      <div className="mt-4 text-center">
        <h3 className="text-xl font-bree-serif mb-2 text-stone-950">
          {dict.appointmentsPage.bookNewAppointment.text}
        </h3>
        <button
          className="bg-teal text-white py-2 px-6 rounded-lg shadow-lg w-[380px] font-cabin-condensed"
          onClick={dropDown}
        >
          {dict.appointmentsPage.button.text}
        </button>

        {isDropClicked && (
          <div className="mt-2 w-[380px] overflow-y-auto max-h-40 bg-white rounded-md shadow-lg ">
            {MARKETS.map((market) => (
              <div
                key={market}
                onClick={() => router.push(marketToCalendlyLink[market])}
                className="py-2 px-4 text-black hover:bg-green-500 cursor-pointer rounded-md"
              >
                {market}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
