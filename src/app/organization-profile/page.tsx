"use client"

import { useState } from 'react';
import { Bree_Serif, Cabin_Condensed } from 'next/font/google';
import Image from 'next/image';
import profile_pic from "../_images/profile_pic.svg"
import add_button from "../_images/add_button.svg"

const breeSerif = Bree_Serif({
    subsets: ['latin'],
    weight: '400',
});

const cabinCondensed = Cabin_Condensed({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});


// temp data for testing
const initContacts = [
    { id: 1, name: 'Name1', email: 'contactemail1@gmail.com' },
    { id: 2, name: 'Name2', email: 'contactemail2@gmail.com' },
];

export default function OrganizationProfile() {
    const [contacts, setContacts] = useState(initContacts);

    const handleAddContact = () => {
        const newContact = {
          id: contacts.length + 1,
          name: `Name${contacts.length + 1}`,
          email: `contactemail${contacts.length + 1}@gmail.com`,
        };
        setContacts([...contacts, newContact]);
    };
  
    return (
      <div className="flex flex-col items-center">
        <h2 className={`text-black text-3xl ${breeSerif.className}`}>Organization Profile</h2> 
        
        <div className="w-3/4 flex flex-row justify-start items-center ml-6 mt-6"> 
            <Image className="pt-4" src={profile_pic} alt="profile picture"/>
            <h2 className={`text-black text-4xl ${breeSerif.className}`}>XYZ  Org.</h2> 
        </div>

        <div className="w-3/4 flex flex-row items-center justify-between mt-6 bg-[#14676B99] p-4 rounded-lg">
            <h2 className={`text-black text-2xl font-medium ${cabinCondensed.className}`}>Points of contact</h2>
            <button onClick={handleAddContact}> 
                <Image src={add_button} alt="add button"/>
            </button>
        </div>

        <div className="w-3/4 pl-2">
            {contacts.map((contact) => (
            <div key={contact.id} className="mb-4">
                <div className="flex flex-row justify-between items-center py-2">
                    <div className="flex flex-col">
                        <h3 className={`text-gray-500 text-lg ${cabinCondensed.className}`}>Name</h3>
                        <p className={`text-black text-2xl ${cabinCondensed.className}`}> {contact.name} </p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className={`text-gray-500 text-lg ${cabinCondensed.className}`}>Email</h3>
                        <p className={`text-black text-2xl ${cabinCondensed.className}`}> {contact.email} </p>
                    </div>
                </div>
                <hr className="border-[#00000066] border-2" />
            </div>
            ))}
        </div>
      </div>
    );
};