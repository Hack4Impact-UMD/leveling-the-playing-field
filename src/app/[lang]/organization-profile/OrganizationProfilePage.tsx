"use client"

import { useEffect, useState } from 'react';
import ProfileIcon from "@/components/icons/ProfileIcon";
import ContactEntry from './ContactEntry';
import ProfileHeader from './ProfileHeader';
import EditableField from './EditableField';
import CountryDropdownComponent from './CountryDropdown';
import StateDropdown from './StateDropdown';
import Loading from '@/components/Loading';
import { Account, Contact } from '@/types/types';
import AddContactModal from './AddContactModal';

export default function OrganizationProfilePage({ dict }: { dict: any }) {  
    const [account, setAccount] = useState<Account>();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const accountId = "001U800000FYoL8IAL";  //temp 

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const res = await fetch(`/api/accounts/${accountId}`);
                if (!res.ok) {
                    const error = await res.json();
                    console.log("Error fetching account", error);
                }
                const data: Account = await res.json();
                setAccount(data);
            } catch (error) {
                console.error("Error fetching account", error);
            }
        }

        const fetchContacts = async () => {
            try {
                const res = await fetch(`/api/contacts?accountId=${accountId}`);
                if (!res.ok) {
                    const error = await res.json();
                    console.error("Error fetching contacts", error);
                }
                const data: Contact[] = await res.json();
                setContacts(data);
            } catch (error) {
                console.error("Error fetching contacts", error);
            }
        }

        setLoading(true);
        Promise.all([fetchAccount(), fetchContacts()]).then(() => setLoading(false));
    }, []);

    const handleAddContact = async (newContact: Partial<Contact>) => {
        try {
          let res = await fetch(`/api/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ AccountId: accountId, ...newContact }),
          });
          if (!res.ok) { alert("Failed to create contact. Please try again later.") }

          res = await fetch(`/api/contacts?accountId=${accountId}`)
          const newContacts = await res.json();
          setContacts(newContacts);
        } catch (error: any) {
          alert(error.message || "Error adding contact");
          console.error(error)
        }
    };

    const handleRemoveContact = async (id: string) => {
        try {
          const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
          if (!res.ok) { alert("Failed to delete contact. Please try again later."); }
          setContacts(contacts.filter((contact) => contact.Id !== id));
        } catch (error: any) {
          alert(error.message || "Error deleting contact");
        }
    };

    const handleEditContact = async (contactId: string, updates: Partial<Contact>) => {
        try {
          const res = await fetch(`/api/contacts/${contactId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
          });
          if (!res.ok) { alert("Failed to update contact. Please try again later."); }
          setContacts(
            contacts.map((contact) =>
              contact.Id === contactId ? { ...contact, ...updates} : contact
            )
          );
        } catch (error: any) {
          alert(error.message || "Error editing contact");
        }
    };

    const handleEditAccount = async (updates: Partial<Account>) => {
        try {
            const res = await fetch(`/api/accounts/${accountId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });
            console.log(res)
            if (!res.ok) { alert("Failed to update account. Please try again later."); }
            setAccount({ ...account, ...updates } as Account)
        } catch (error: any) {
            alert(error.message || "Error editing account.");
        }
    }
  
    if (loading) { return <Loading /> }

    return (
      <div className="flex flex-col items-center container mx-auto my-6 pb-32">
        <h2 className="text-black text-3xl font-bree-serif">{dict.profilePage.title.text}</h2> 
        
        <div className="flex flex-row justify-start items-center mt-4"> 
            <ProfileIcon color='black'/>
            <h2 className="text-black text-4xl ml-2 font-bree-serif">{account?.Name}</h2> 
        </div>

        <ProfileHeader title={dict.profilePage.contact.header.text} />
        <div className="w-full pl-2">
            {contacts.map((contact) => (
                <ContactEntry 
                    key={contact.Id} 
                    dictLabels={dict.profilePage.contact}
                    dictErrors={dict.profilePage.errors}
                    firstName={contact.FirstName}
                    lastName={contact.LastName}
                    email={contact.Email} 
                    phoneNumber={contact.Phone}
                    onEdit={(updates: Partial<Contact>) => handleEditContact(contact.Id!, updates)} 
                    onDelete={() => handleRemoveContact(contact.Id!)}
                    />
            ))}
        </div>

        <div className="w-full flex flex-row justify-end pt-4">
            <AddContactModal dict={dict} handleAddContact={handleAddContact}/>
        </div>
        
        <ProfileHeader title={dict.profilePage.location.header.text} />
        <EditableField
            error={dict.profilePage.errors.valid.text}
            label={dict.profilePage.location.addressOne.text}
            type="text"
            value={account?.BillingStreet || ""}
            onSave={(street: string) => handleEditAccount({ BillingStreet: street })}
            required={true}
        />

        <div className="w-full flex flex-row space-x-4">
            <div className="basis-2/3">
                <EditableField
                    error={dict.profilePage.errors.locationCity.text}
                    label={dict.profilePage.location.city.text}
                    type="text"
                    value={account?.BillingCity || ""}
                    pattern={/^[A-Za-z\s]+$/}
                    onSave={(city: string) => handleEditAccount({ BillingCity: city })}
                    required={true}
                />
            </div>

            <div className="basis-1/3">
                <StateDropdown
                    label={dict.profilePage.location.state.text}
                    error={dict.profilePage.errors.required.text}
                    country={account?.BillingCountry || ""}
                    state={account?.BillingState || ""}
                    onStateChange={(state: string) => handleEditAccount({ BillingState: state })}
                />
            </div>
        </div>    

        <div className="w-full flex flex-row space-x-4">
            <div className="basis-1/2">
                <CountryDropdownComponent
                    label={dict.profilePage.location.country.text}
                    error={dict.profilePage.errors.required.text}
                    country={account!.BillingCountry}
                    onCountryChange={(country: string) => handleEditAccount({ BillingCountry: country, BillingState: "" })}
                />  
            </div>

            <div className="basis-1/2">
                <EditableField
                    error={dict.profilePage.errors.locationZipcode.text}
                    label={dict.profilePage.location.zipcode.text}
                    type="text"
                    value={account!.BillingPostalCode}
                    pattern={/^\d+$/}
                    onSave={(postalCode: string) => handleEditAccount({ BillingPostalCode: postalCode })}
                    required={true}
                />
            </div>
        </div>

        <ProfileHeader title={dict.profilePage.number.header.text} />
        <EditableField
            error={dict.profilePage.errors.valid.text}
            label={dict.profilePage.number.box.text}
            type="tel"
            value={account?.Phone || ""}
            pattern={/^\d{3}-\d{3}-\d{4}$/}
            onSave={(newNumber: string) => handleEditAccount({ Phone: newNumber })}
            required={true}
        />
      </div>
    );
};