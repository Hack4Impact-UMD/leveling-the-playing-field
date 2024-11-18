"use client"

import { useEffect, useState } from 'react';
import ProfileIcon from '@/components/icons/ProfileIcon'
import ContactButton from './components/ContactButton';
import ContactEntry from './components/ContactEntry';
import ProfileHeader from './components/ProfileHeader';
import EditableField from './components/EditableField';
import CountryDropdownComponent from './components/CountryDropdown';
import StateDropdown from './components/StateDropdown';
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


export default function OrganizationProfile() {
    const [orgName, setOrgName] = useState<string>('');
    const [contacts, setContacts] = useState<Contact[]>(initContacts);
    //const [location, setLocation] = useState<string>('');
    const [location, setLocation] = useState<Location>({
        addressLine1: '100 Sunshine Lane',
        addressLine2: '100 Sunshine Lane',
        city: 'City',
        state: 'Maryland',
        zipCode: '123456',
        country: 'United States',
      });
    const [contactNumber, setContactNumber] = useState<string>('');

    useEffect(() => {
        //placeholder values
        setOrgName('XYZ Org.');
        setContactNumber('000-000-0000');
    }, []);

    const handleAddContact = () => {
        const newContact: Contact = {
          id: contacts.length + 1,
          name: `Name${contacts.length + 1}`,
          phoneNumber: '000-000-0000',
          email: `contactemail${contacts.length + 1}@gmail.com`,
        };
        setContacts([...contacts, newContact]);
    };

    const handleRemoveContact = (id: number) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
    };

    const handleEditContact = (updatedContact: Contact) => {
        setContacts(
            contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
        );
    };

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
        <h2 className="text-black text-3xl font-bree-serif">Organization Profile</h2> 
        
        <div className="flex flex-row justify-start items-center mt-4"> 
            <ProfileIcon color='black'/>
            <h2 className="text-black text-4xl ml-2 font-bree-serif">{orgName}</h2> 
        </div>

        <ProfileHeader title="Points of contact" />
        <div className="w-full pl-2">
            {contacts.map((contact) => (
                <ContactEntry 
                    key={contact.id} 
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
                label="Add Contact"
                onClick={handleAddContact}
            />
        </div>
        
        <ProfileHeader title="Location" />
        <EditableField
            label="Address Line 1"
            type="text"
            value={location.addressLine1}
            onSave={(newValue) => handleLocationFieldSave('addressLine1', newValue)}
            required={true}
        />

        <EditableField
            label="Address Line 2"
            type="text"
            value={location.addressLine2}
            onSave={(newValue) => handleLocationFieldSave('addressLine2', newValue)}
            required={false}
        />

        <div className="w-full flex flex-row space-x-4">
            <div className="basis-2/3">
                <EditableField
                    label="City"
                    type="text"
                    value={location.city}
                    pattern={/^[A-Za-z\s]+$/}
                    onSave={(newValue) => handleLocationFieldSave('city', newValue)}
                    required={true}
                />
            </div>

            <div className="basis-1/3">
                <StateDropdown
                    country={location.country}
                    state={location.state}
                    onStateChange={handleStateChange}
                />
            </div>
        </div>    

        <div className="w-full flex flex-row space-x-4">
            <div className="basis-1/2">
                <CountryDropdownComponent
                    country={location.country}
                    onCountryChange={handleCountryChange}
                />  
            </div>

            <div className="basis-1/2">
                <EditableField
                    label="Zipcode"
                    type="text"
                    value={location.zipCode}
                    pattern={/^\d+$/}
                    onSave={(newValue) => handleLocationFieldSave('zipCode', newValue)}
                    required={true}
                />
            </div>
        </div>

        <ProfileHeader title="Contact Number" />
        <EditableField
                label="Number"
                type="tel"
                value={contactNumber}
                pattern={/^\d{3}-\d{3}-\d{4}$/}
                onSave={(newNumber: string) => setContactNumber(newNumber)}
                required={true}
        />
      </div>
    );
};