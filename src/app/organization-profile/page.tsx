"use client"

import { useEffect, useState } from 'react';
import { Bree_Serif } from 'next/font/google';
import Image from 'next/image';
import profile_pic from "../_images/profile_pic.svg"
import ContactHeader from './components/ContactHeader';
import ContactEntry from './components/ContactEntry';
import ProfileHeader from './components/ProfileHeader';
import { Cabin_Condensed } from 'next/font/google';

const cabinCondensed = Cabin_Condensed({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

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
    const [location, setLocation] = useState<string>('');
    const [contactNumber, setContactNumber] = useState<string>('');

    useEffect(() => {
        // placeholder location
        setLocation('100 Sunshine Lane City State ZipCode');
    }, []);

    useEffect(() => {
        // placeholder number
        setContactNumber('000-000-0000');
    }, []);

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
        <div className="w-3/4">
            <div className="flex flex-row justify-between items-center py-2">
                <div className="flex flex-col">
                    <h3 className={`text-gray-500 text-lg ${cabinCondensed.className}`}>Location</h3>
                    <p className={`text-black text-2xl ${cabinCondensed.className}`}>{location}</p>
                </div>
            </div>
            <hr className="border-[#00000066] border-2" />
        </div>

        <ProfileHeader title="Contact Number" />
        <div className="w-3/4">
            <div className="flex flex-row justify-between items-center py-2">
                <div className="flex flex-col">
                    <h3 className={`text-gray-500 text-lg ${cabinCondensed.className}`}>Phone Number</h3>
                    <p className={`text-black text-2xl ${cabinCondensed.className}`}>{contactNumber}</p>
                </div>
            </div>
            <hr className="border-[#00000066] border-2" />
        </div>
        
      </div>
    );
};