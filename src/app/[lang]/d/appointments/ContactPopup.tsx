import React, { useState, useEffect } from "react";
import { getDict, Locale } from "@/lib/i18n/dictionaries";
import LoadingPage from "../../loading";
import EditIcon from "@/components/icons/EditIcon";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/Dialog";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";
import XIcon from "@/components/icons/XIcon";
import { Contact } from "@/types/types";

interface ContactPopupProps {
  opportunityId: string;
  contacts: Pick<Contact, "Id" | "Name">[];
  lang: Locale;
}

const ContactPopup = ({
  opportunityId,
  contacts,
  lang,
}: ContactPopupProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dict, setDict] = useState<{ [key: string]: any } | null>(null);
  const [contactIdx, setContactIdx] = useState<number | null>(null);

  // retrieve localization dict
  useEffect(() => {
    const loadDict = async () => {
      try {
        const loadedDict = await getDict(lang);
        setDict(loadedDict);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      }
    };
    loadDict();
  }, [lang]);

  if (!dict) return <LoadingPage />;

  // save and update new contact details

  const handleSave = async (opportunityId: string) => {
    try {
      const body = {
        
      };

      const response = await fetch(`/api/opportunity/${opportunityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating opportunity:", errorData);
        return;
      }

      console.log("Opportunity updated successfully!");
    } catch (error) {
      console.error("Error during save:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <DialogTitle className="hidden">Change Primary Contact</DialogTitle>
        <EditIcon size={20} />
      </DialogTrigger>
      <DialogContent
        className="flex flex-col justify-start items-center w-4/5 h-1/3 rounded-md text-black"
        hideClose
        aria-describedby="Dialog to change primary contact of an appointment"
      >
        <DialogClose className="self-end">
          <XIcon />
        </DialogClose>
        <div className="w-4/5">
          <p className="font-cabin-condensed">Primary Contact</p>
          <Select value={contactIdx !== null ? contactIdx.toString() : ""} onValueChange={(value: string) => setContactIdx(Number(value))}>
            <SelectTrigger className="border-teal-dark text-black">
              <SelectValue className="text-black border-4" placeholder="N/A">
                {contactIdx !== null && contacts[contactIdx].Name}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {contacts.map((contact, i) => (
                <SelectItem className="hover:bg-green" value={i.toString()}>{contact.Name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
