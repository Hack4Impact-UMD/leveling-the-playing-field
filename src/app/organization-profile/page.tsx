"use client"

import { useEffect, useState } from 'react';
import ProfileIcon from '@/components/icons/ProfileIcon'
import ContactButton from './components/ContactButton';
import ContactEntry from './components/ContactEntry';
import ProfileHeader from './components/ProfileHeader';
import EditableField from './components/EditableField';
interface Contact {
    id: number;
    name: string;
    phoneNumber: string
    email: string;
}

// temp data for testing
const initContacts: Contact[] = [
    { id: 1, name: 'Name1', phoneNumber : '000-000-0000', email: 'contactemail1@gmail.com' },
];

export default function OrganizationProfile() {
    const [orgName, setOrgName] = useState<string>('');
    const [contacts, setContacts] = useState<Contact[]>(initContacts);
    const [location, setLocation] = useState<string>('');
    const [contactNumber, setContactNumber] = useState<string>('');

    useEffect(() => {
        //placeholder values
        setOrgName('XYZ Org.');
        setLocation('100 Sunshine Lane City State ZipCode');
        setContactNumber('000-000-0000');
    }, []);

    const handleAddContact = () => {
        const newContact: Contact = {
          id: contacts.length + 1,
          name: `Name${contacts.length + 1}`,
          phoneNumber: '000-000-000',
          email: `contactemail${contacts.length + 1}@gmail.com`,
        };
        setContacts([...contacts, newContact]);
    };

    // const handleRemoveContact = () => {
    //     if (contacts.length > 0) {
    //         setContacts(contacts.slice(0, -1));
    //       }
    // };

    const handleEditContact = (updatedContact: Contact) => {
        setContacts(
            contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
        );
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
                    key={contact.id} name={contact.name}    
                    email={contact.email} 
                    phoneNumber={contact.phoneNumber}
                    onEdit={(updatedFields: { name: string; phoneNumber: string; email: string }) =>
                    handleEditContact({ ...contact, ...updatedFields })
                } />
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
                label="Location"
                type="text"
                value={location}
                onSave={(newLocation: string) => setLocation(newLocation)}
        />

        <ProfileHeader title="Contact Number" />
        <EditableField
                label="Number"
                type="tel"
                value={contactNumber}
                pattern={/^\d{3}-\d{3}-\d{4}$/}
                onSave={(newNumber: string) => setContactNumber(newNumber)}
        />
      </div>
    );
};