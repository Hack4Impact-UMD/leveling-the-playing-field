"use client"

import { useEffect, useState } from 'react';
import ProfileIcon from "@/components/icons/ProfileIcon";
import ContactButton from './ContactButton';
import ContactEntry from './ContactEntry';
import ProfileHeader from './ProfileHeader';
import EditableField from './EditableField';
import CountryDropdownComponent from './CountryDropdown';
import StateDropdown from './StateDropdown';
import Loading from '@/components/Loading';

interface Contact {
    id: number;
    name: string;
    phoneNumber: string
    email: string;
}

interface Location {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

// temp data for testing
const initContacts: Contact[] = [
    { id: 1, name: 'Name1', phoneNumber : '000-000-0000', email: 'contactemail1@gmail.com' },
];

//export default function OrganizationProfile() {
export default function OrganizationProfile({ dict }: { dict: any }) {  
    const [orgName, setOrgName] = useState<string>('');
    const [contacts, setContacts] = useState<Contact[]>(initContacts);
    const [location, setLocation] = useState<Location>({
        addressLine1: '100 Sunshine Lane',
        addressLine2: '100 Sunshine Lane',
        city: 'City',
        state: 'Maryland',
        zipCode: '123456',
        country: 'United States',
      });
    const [contactNumber, setContactNumber] = useState<string>('');
    
    // const [location, setLocation] = useState<Location>({
    //     addressLine1: '',
    //     addressLine2: '',
    //     city: '',
    //     state: '',
    //     zipCode: '',
    //     country: '',
    //   });
    // const [contactNumber, setContactNumber] = useState<string>('');
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    const accountId = "001UR00000BaSDxYAN"  //temp 

    useEffect(() => {
        //placeholder values
        setOrgName('XYZ Org.');
        setContactNumber('000-000-0000');
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         setLoading(true);
    //         const accountRes = await fetch(`/api/account/${accountId}`);
    //         const contactRes = await fetch(`/api/contact?accountId=${accountId}`);
    //         if (!accountRes.ok || !contactRes.ok) {
    //           throw new Error("Failed to fetch data");
    //         }
    //         const accountData = await accountRes.json();
    //         const contactData = await contactRes.json();
    
    //         setOrgName(accountData.name);
    //         setContactNumber(accountData.contactNumber);
    //         setLocation({
    //           addressLine1: accountData.location.addressLine1,
    //           addressLine2: accountData.location.addressLine2,
    //           city: accountData.location.city,
    //           state: accountData.location.state,
    //           zipCode: accountData.location.zipCode,
    //           country: accountData.location.country,
    //         });
    //         setContacts(contactData.contacts || []);
    //       } catch (error: any) {
    //         setError(error.message || "Error fetching data");
    //       } finally {
    //         setLoading(false);
    //       }
    //     };
    
    //     if (accountId) {
    //         fetchData();
    //     }
    // }, [accountId]);

    const handleAddContact = () => {
        const newContact: Contact = {
          id: contacts.length + 1,
          name: `Name${contacts.length + 1}`,
          phoneNumber: '000-000-0000',
          email: `contactemail${contacts.length + 1}@gmail.com`,
        };
        setContacts([...contacts, newContact]);
    };

    // const handleAddContact = async () => {
    //     try {
    //       const newContact = { name: "New Contact", phoneNumber: "", email: "" };
    //       const res = await fetch(`/api/contact`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ accountId, ...newContact }),
    //       });
    //       if (!res.ok) throw new Error("Failed to add contact");
    //       const createdContact = await res.json();
    //       setContacts([...contacts, createdContact]);
    //     } catch (error: any) {
    //       alert(error.message || "Error adding contact");
    //     }
    // };

    const handleRemoveContact = (id: number) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
    };

    // const handleRemoveContact = async (id: number) => {
    //     try {
    //       const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
    //       if (!res.ok) throw new Error("Failed to delete contact");
    //       setContacts(contacts.filter((contact) => contact.id !== id));
    //     } catch (error: any) {
    //       alert(error.message || "Error deleting contact");
    //     }
    // };

    const handleEditContact = (updatedContact: Contact) => {
        setContacts(
            contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
        );
    };

    // const handleEditContact = async (updatedContact: Contact) => {
    //     try {
    //       const res = await fetch(`/api/contact/${updatedContact.id}`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(updatedContact),
    //       });
    //       if (!res.ok) throw new Error("Failed to update contact");
    //       setContacts(
    //         contacts.map((contact) =>
    //           contact.id === updatedContact.id ? updatedContact : contact
    //         )
    //       );
    //     } catch (error: any) {
    //       alert(error.message || "Error editing contact");
    //     }
    // };

    // const handleLocationFieldSave = async (field: keyof Location, newValue: string) => {
    //     try {
    //       const updatedLocation = { ...location, [field]: newValue };
    //       const res = await fetch(`/api/account/${accountId}`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ location: updatedLocation }),
    //       });
    //       if (!res.ok) throw new Error("Failed to update location");
    //       setLocation(updatedLocation);
    //     } catch (error : any) {
    //       alert(error.message || "Error saving location");
    //     }
    // };
      
    // const handleCountryChange = async (newCountry: string) => {
    //     try {
    //       const updatedLocation = { ...location, country: newCountry, state: "" };
    //       const res = await fetch(`/api/account/${accountId}`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ location: updatedLocation }),
    //       });
    //       if (!res.ok) throw new Error("Failed to update country");
    //       setLocation(updatedLocation);
    //     } catch (error : any) {
    //       alert(error.message || "Error updating country");
    //     }
    // };
      
    // const handleStateChange = async (newState: string) => {
    //     try {
    //       const updatedLocation = { ...location, state: newState };
    //       const res = await fetch(`/api/account/${accountId}`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ location: updatedLocation }),
    //       });
    //       if (!res.ok) throw new Error("Failed to update state");
    //       setLocation(updatedLocation);
    //     } catch (error : any) {
    //       alert(error.message || "Error updating state");
    //     }
    // };

    // const handleNumberSave = async (newNumber: string) => {
    //     try {
    //       const res = await fetch(`/api/account/${accountId}`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ contactNumber: newNumber }),
    //       });
    //       if (!res.ok) throw new Error("Failed to update number");
    //       setContactNumber(newNumber);
    //     } catch (error : any) {
    //       alert(error.message || "Error saving number");
    //     }
    // };

    // if (loading) {
    //     return <Loading />;
    // } 
    // if (error) {
    //     return <p className="text-red-500">{error}</p>;
    // }


    const handleLocationFieldSave = (field: keyof Location, newValue: string) => {
        setLocation((prevLocation) => ({
          ...prevLocation,
          [field]: newValue,
        }));
    };
    
    const handleCountryChange = (newCountry: string) => {
        setLocation((prevLocation) => ({
          ...prevLocation,
          country: newCountry,
          state: '',
        }));
    };
    
    const handleStateChange = (newState: string) => {
        setLocation((prevLocation) => ({
          ...prevLocation,
          state: newState,
        }));
    };
  

    return (
      <div className="flex flex-col items-center container mx-auto my-6 pb-32">
        <h2 className="text-black text-3xl font-bree-serif">{dict.profilePage.title.text}</h2> 
        
        <div className="flex flex-row justify-start items-center mt-4"> 
            <ProfileIcon color='black'/>
            <h2 className="text-black text-4xl ml-2 font-bree-serif">{orgName}</h2> 
        </div>

        <ProfileHeader title={dict.profilePage.contact.header.text} />
        <div className="w-full pl-2">
            {contacts.map((contact) => (
                <ContactEntry 
                    key={contact.id} 
                    dictLabels={dict.profilePage.contact}
                    dictErrors={dict.profilePage.errors}
                    name={contact.name}    
                    email={contact.email} 
                    phoneNumber={contact.phoneNumber}
                    onEdit={(updatedFields: { name: string; phoneNumber: string; email: string }) =>
                    handleEditContact({ ...contact, ...updatedFields })} 
                    onDelete={() => handleRemoveContact(contact.id)}
                    />
            ))}
        </div>

        <div className="w-full flex flex-row justify-end pt-4">
            <ContactButton
                label={dict.profilePage.contact.button.text}
                onClick={handleAddContact}
            />
        </div>
        
        <ProfileHeader title={dict.profilePage.location.header.text} />
        <EditableField
            error={dict.profilePage.errors.valid.text}
            label={dict.profilePage.location.addressOne.text}
            type="text"
            value={location.addressLine1}
            onSave={(newValue) => handleLocationFieldSave('addressLine1', newValue)}
            required={true}
        />

        <EditableField
            error={dict.profilePage.errors.valid.text}
            label={dict.profilePage.location.addressTwo.text}
            type="text"
            value={location.addressLine2}
            onSave={(newValue) => handleLocationFieldSave('addressLine2', newValue)}
            required={false}
        />

        <div className="w-full flex flex-row space-x-4">
            <div className="basis-2/3">
                <EditableField
                    error={dict.profilePage.errors.locationCity.text}
                    label={dict.profilePage.location.city.text}
                    type="text"
                    value={location.city}
                    pattern={/^[A-Za-z\s]+$/}
                    onSave={(newValue) => handleLocationFieldSave('city', newValue)}
                    required={true}
                />
            </div>

            <div className="basis-1/3">
                <StateDropdown
                    label={dict.profilePage.location.state.text}
                    error={dict.profilePage.errors.required.text}
                    country={location.country}
                    state={location.state}
                    onStateChange={handleStateChange}
                />
            </div>
        </div>    

        <div className="w-full flex flex-row space-x-4">
            <div className="basis-1/2">
                <CountryDropdownComponent
                    label={dict.profilePage.location.country.text}
                    error={dict.profilePage.errors.required.text}
                    country={location.country}
                    onCountryChange={handleCountryChange}
                />  
            </div>

            <div className="basis-1/2">
                <EditableField
                    error={dict.profilePage.errors.locationZipcode.text}
                    label={dict.profilePage.location.zipcode.text}
                    type="text"
                    value={location.zipCode}
                    pattern={/^\d+$/}
                    onSave={(newValue) => handleLocationFieldSave('zipCode', newValue)}
                    required={true}
                />
            </div>
        </div>

        <ProfileHeader title={dict.profilePage.number.header.text} />
        {/* <EditableField
                label="Number"
                type="tel"
                value={contactNumber}
                pattern={/^\d{3}-\d{3}-\d{4}$/}
                onSave={(newNumber: string) => handleNumberSave(newNumber)}
                required={true}
        /> */}
        <EditableField
            error={dict.profilePage.errors.valid.text}
            label={dict.profilePage.number.box.text}
            type="tel"
            value={contactNumber}
            pattern={/^\d{3}-\d{3}-\d{4}$/}
            onSave={(newNumber: string) => setContactNumber(newNumber)}
            required={true}
        />
      </div>
    );
};