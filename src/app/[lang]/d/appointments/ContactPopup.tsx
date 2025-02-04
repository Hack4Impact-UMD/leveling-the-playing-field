import React, { useState, useEffect } from "react";
import EditIcon from "@/components/icons/EditIcon";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";
import XIcon from "@/components/icons/XIcon";
import { Contact, Opportunity } from "@/types/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { useI18n } from "@/components/I18nProvider";

interface ContactPopupProps {
  appointment: Pick<Opportunity, "Id" | "Name" | "Primary_Contact__c">;
  contacts: Pick<Contact, "Id" | "Name">[];
  handleChangeContact: (appointmentId: string, contactId: string) => void;
}

const ContactPopup = ({ appointment, contacts, handleChangeContact }: ContactPopupProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [oldContactIdx, setOldContactIdx] = useState<number | null>(
    appointment.Primary_Contact__c
      ? contacts.findIndex(
          (contact) => contact.Id === appointment.Primary_Contact__c
        )
      : null
  );
  const [contactIdx, setContactIdx] = useState<number | null>(
    appointment.Primary_Contact__c
      ? contacts.findIndex(
          (contact) => contact.Id === appointment.Primary_Contact__c
        )
      : null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const auth = useAuth();
  const { dict } = useI18n();

  const handleConfirm = async () => {
    const res = await fetch(`/api/opportunities/${appointment.Id}?idToken=${auth.token?.token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Primary_Contact__c:
          contactIdx !== null ? contacts[contactIdx].Id : null,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error(error);
      setError("An error occurred. Please try again.");
      return;
    }
    if (contactIdx !== null) {
      handleChangeContact(appointment.Id!, contacts[contactIdx].Id!);
    }
    setIsOpen((open) => !open);
    setOldContactIdx(contactIdx);
    setError("");
  };

  const handleCancel = () => {
    setIsOpen((open) => !open);
    setContactIdx(oldContactIdx);
    setError("");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) {
          handleCancel();
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen((open) => !open)}>
        <DialogTitle className="hidden">Change Primary Contact</DialogTitle>
        <EditIcon size={20} />
      </DialogTrigger>
      <DialogContent
        className="flex flex-col justify-start items-center w-4/5 h-4/7 rounded-md text-black"
        hideClose
        aria-describedby="Dialog to change primary contact of an appointment"
      >
        <DialogClose className="self-end">
          <XIcon />
        </DialogClose>
        <div className="w-4/5">
          <p className="font-cabin-condensed">Primary Contact</p>
          <Select
            value={contactIdx !== null ? contactIdx.toString() : ""}
            onValueChange={(value: string) => {
              setContactIdx(Number(value));
              if (error) {
                setError("");
              }
            }}
          >
            <SelectTrigger className="border-teal-dark text-black">
              <SelectValue className="text-black border-4" placeholder="N/A">
                {contactIdx !== null && contacts[contactIdx].Name}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {contacts.map((contact, i) => (
                <SelectItem className="hover:bg-green" value={i.toString()} key={i}>
                  {contact.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-around items-center w-4/5">
          <button
            className="w-2/5 h-full py-2 text-black bg-orange rounded-md"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <DialogClose className="w-2/5 h-full py-2">
            <button className="w-full h-full py-2 text-black bg-teal-light rounded-md">
              Cancel
            </button>
          </DialogClose>
        </div>
        {error && <p className="w-4/5 text-center text-sm text-red-500">{error}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
