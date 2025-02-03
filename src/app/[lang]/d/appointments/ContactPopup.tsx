import React, { useState, useEffect } from 'react';
import XIcon from '@/components/icons/XIcon';
import { getDict, Locale } from '@/lib/i18n/dictionaries';
import LoadingPage from '../../loading';

interface ContactPopupProps {
  onButtonClick: () => void;
  opportunityid: string;
  lang: Locale;
}

interface ContactPopupProps {
  onButtonClick: () => void;
  opportunityid: string;
  lang: Locale;
}

const ContactPopup = ({ onButtonClick, opportunityid, lang }: ContactPopupProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dict, setDict] = useState<{ [key: string]: any } | null>(null);
  const [name, setName] = useState('Name');
  const [phoneNumber, setPhoneNumber] = useState('Phone Number');
  const [email, setEmail] = useState('Email');

  // retrieve localization dict
  useEffect(() => {
    const loadDict = async () => {
      try {
        const loadedDict = await getDict(lang);
        setDict(loadedDict);
      } catch (error) {
        console.error('Error loading dictionary:', error);
      }
    };
    loadDict();
  }, [lang]);

  if (!dict) return <LoadingPage />;

  // retrieve contact information
  const fetchContactDetails = async (opportunityId: string) => {
    try {
      const response = await fetch(`/api/opportunity/${opportunityId}`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching opportunity details:", errorData);
        return;
      }

      const data = await response.json();
      setName(data.Name || "Name");
      setPhoneNumber(data.Phone || "Phone Number");
      setEmail(data.Email || "Email");
    } catch (error) {
      console.error("Error fetching opportunity:", error);
    }
  };

  // save and update new contact details
  const handleSave = async (opportunityId: string) => {
    try {
      const body = {
        Name: name,
        Phone: phoneNumber,
        Email: email,
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
    <div>
      <button className="absolute top-2 right-2" onClick={onButtonClick}>
        <XIcon />
      </button>
      <div className="bg-white-dark rounded-xl p-4 w-80 mx-auto shadow-lg text-black">
        <h1 className="text-md font-bold mb-2 text-center font-bree-serif">
          {dict.appointmentsPage.contactPopup.contactTitle.text}
        </h1>

        <div className="flex items-center justify-center mb-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-md font-cabin-condensed border rounded px-2"
          />
        </div>

        <div className="flex items-center justify-center mb-2">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="text-md font-cabin-condensed border rounded px-2"
          />
        </div>

        <div className="flex items-center justify-center mb-2">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-md font-cabin-condensed border rounded px-2"
          />
        </div>

        <div className="flex justify-center text-black">
        <button
          className="bg-green px-6 py-1 rounded-lg font-bree-serif"
          onClick={(e) => {
            e.preventDefault();
            handleSave(opportunityid);
          }}
        >
          {dict.appointmentsPage.contactPopup.save.text}
        </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
