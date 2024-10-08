"use client"

import { useState } from 'react';
import { Bree_Serif } from 'next/font/google';
import Image from 'next/image';
import profile_pic from "../_images/profile_pic.svg"
import ContactHeader from './components/ContactHeader';
import ContactEntry from './components/ContactEntry';
import ProfileHeader from './components/ProfileHeader';

const breeSerif = Bree_Serif({
    subsets: ['latin'],
    weight: '400',
});

interface Contact {
    id: number;
    name: string;
    email: string;
}

// temp data for testing
const initContacts: Contact[] = [
    { id: 1, name: 'Name1', email: 'contactemail1@gmail.com' },
    { id: 2, name: 'Name2', email: 'contactemail2@gmail.com' },
];

export default function OrganizationProfile() {
    const [contacts, setContacts] = useState<Contact[]>(initContacts);

    const handleAddContact = () => {
        const newContact: Contact = {
          id: contacts.length + 1,
          name: `Name${contacts.length + 1}`,
          email: `contactemail${contacts.length + 1}@gmail.com`,
        };
        setContacts([...contacts, newContact]);
    };
  
    return (
      <div className="flex flex-col items-center container mx-auto my-12">
        <h2 className={`text-black text-3xl ${breeSerif.className}`}>Organization Profile</h2> 
        
        <div className="w-3/4 flex flex-row justify-start items-center my-4"> 
            <Image className="mt-1" src={profile_pic} alt="profile picture"/>
            <h2 className={`text-black text-4xl ml-2 ${breeSerif.className}`}>XYZ  Org.</h2> 
        </div>

        <ContactHeader onAddContact={handleAddContact} />
        <div className="w-3/4 pl-2">
            {contacts.map((contact) => (
                <ContactEntry key={contact.id} name={contact.name} email={contact.email} />
            ))}
        </div>

        <ProfileHeader title="Location" />

        <ProfileHeader title="Contact Number" />
        
      </div>
    );
};