//  this relies on the appointments component
"use client";

import React, { useState, useEffect } from "react";
import AppointmentsComponent from "./Appointment";
import AppointmentsIcon from "@/components/icons/AppointmentsIcon";
import { Locale } from "@/lib/i18n/dictionaries";
import { useAuth } from "@/components/auth/AuthProvider";
import { Contact, Opportunity, UserClaims } from "@/types/types";

interface AppointmentPageProps {
  lang: Locale;
}

const AppointmentsPage = (props: AppointmentPageProps) => {
  const [isDropClicked, setIsDropClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Pick<Opportunity, 'Id' | 'Name' | 'CloseDate' | 'Market__c'>[]>([]);
  const [contacts, setContacts] = useState<Pick<Contact, 'Id' | 'Name'>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();
  const accountId = (token?.claims.salesforceIds as UserClaims).accountId;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsRes = await fetch(`/api/accounts/${accountId}/opportunities?stage=Site Visit/Call&idToken=${token?.token}`);
        if (!appointmentsRes.ok) {
          throw Error(await appointmentsRes.json());
        }
        const appointments = await appointmentsRes.json();
        setAppointments(appointments.map((appointment: Opportunity) => {
          return {
            Id: appointment.Id,
            Name: appointment.Name,
            CloseDate: appointment.CloseDate,
            Market__c: appointment.Market__c
          }
        }));
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments. Please try again later.");
      }
    };

    const fetchContacts = async () => {
      try {
        const contactsRes = await fetch(`/api/accounts/${accountId}/opportunities?stage=Site Visit/Call&idToken=${token?.token}`);
        if (!contactsRes.ok) {
          throw Error(await contactsRes.json());
        }
        const contacts = await contactsRes.json();
        setContacts(contacts.map((contact: Contact) => {
          return {
            Id: contact.Id,
            Name: contact.Name,
          }
        }));
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to fetch contacts. Please try again later.");
      }
    }

    setLoading(true);
    Promise.all([fetchAppointments(), fetchContacts()]).then(() => setLoading(false));
  }, []);

  const dropDown = () => setIsDropClicked(!isDropClicked);

  const handleLocationSelect = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col p-6 bg-gray-100 items-center min-h-screen overflow-auto">
      <div className="flex flex-col mb-6 items-center">
        <div className="bg-teal mb-2 rounded-full p-6 relative">
          <div className="relative -top-0.5">
            <AppointmentsIcon />
          </div>
        </div>
        <h2 className="text-3xl font-bree-serif text-stone-950">
          Appointments
        </h2>
      </div>

      <div className="max-w-md w-full">
        {appointments.map((appointment, x) => (
          <AppointmentsComponent
            key={x}
            appointment={appointment}
            lang={props.lang}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-xl font-bree-serif mb-2 text-stone-950">
          Book New Appointment
        </h3>
        <button
          className="bg-teal text-white py-2 px-6 rounded-lg shadow-lg w-[380px] font-cabin-condensed"
          onClick={dropDown}
        >
          Select Location
        </button>

        {isDropClicked && (
          <div className="mt-2 w-[380px] overflow-y-auto max-h-40 bg-white rounded-md shadow-lg ">
            {["Warehouse 1", "Warehouse 2", "Warehouse 3", "Warehouse 4"].map(
              (location) => (
                <div
                  key={location}
                  onClick={() => handleLocationSelect()}
                  className="py-2 px-4 text-black hover:bg-green-500 cursor-pointer rounded-md"
                >
                  {location}
                </div>
              )
            )}
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-lg w-80 text-center">
            <h3 className="text-lg font-bold text-stone-950 mb-4">
              Are you sure you want to select this location?
            </h3>
            <div className="flex justify-around">
              <button
                onClick={() =>
                  (window.location.href =
                    "https://calendly.com/signup?gad_source=1")
                }
                className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
