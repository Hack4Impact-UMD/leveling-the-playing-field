/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import ContactPopup from "./ContactPopup";
import { Contact, Opportunity } from "@/types/types";
import LocationIcon from "@/components/icons/LocationIcon";
import AppointmentsIcon from "@/components/icons/AppointmentsIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";

type AppointmentProps = {
  appointment: Pick<
    Opportunity,
    "Id" | "Name" | "CloseDate" | "Market__c" | "Primary_Contact__c"
  >;
  contacts: Pick<Contact, "Id" | "Name">[];
  today: boolean;
  handleChangeContact?: (appointmentId: string, contactId: string) => void;
};

const Appointment = (props: AppointmentProps) => {
  const { Id, Name, CloseDate, Market__c, Primary_Contact__c } =
    props.appointment;
  const { contacts, today, handleChangeContact } = props;

  const { locale } = useI18n();
  const router = useRouter();

  return (
    <div className="relative text-white p-4 rounded-lg mb-4 shadow-lg bg-[#549396] border-2 border-[#14676B]">
      <div className="flex items-center mb-2">
        <span className="font-cabin-condensed text-lg">{Name}</span>
        <span className="cursor-pointer ml-auto">
          <div
            onClick={
              today
                ? () =>
                    router.push(`/${locale}/opportunities/${Id}/checkout`)
                : undefined
            }
            className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring"
            aria-label={today ? "Checkout" : "Edit"}
          >
            {today ? (
              <ShoppingCartIcon size={20} color={"black"} opacity={0.6}/>
            ) : (
              <ContactPopup
                appointment={{ Id, Name, Primary_Contact__c }}
                contacts={contacts}
                handleChangeContact={handleChangeContact!}
              />
            )}
          </div>
        </span>
      </div>
      <div className="flex flex-col justify-center text-sm ">
        <span className="flex font-cabin-condensed text-base">
          <div className="pr-2">
            <AppointmentsIcon size={20} color="#14676B" />
          </div>
          {new Date(
            new Date(CloseDate).getTime() +
              new Date().getTimezoneOffset() * 60 * 1000
          ).toLocaleDateString()}
        </span>
        <span className="flex font-cabin-condensed text-base">
          <div className="pr-2">
            <LocationIcon />
          </div>
          {Market__c}
        </span>
        <span className="flex font-cabin-condensed text-base">
          <div className="pr-2">
            <ProfileIcon size={20} color="#14676B" />
          </div>
          {contacts.filter((contact) => contact.Id === Primary_Contact__c)[0]
            ?.Name || "N/A"}
        </span>
      </div>
    </div>
  );
};

export default Appointment;
