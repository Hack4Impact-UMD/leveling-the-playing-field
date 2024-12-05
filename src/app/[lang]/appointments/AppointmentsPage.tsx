"use client";

import React, { useState, useEffect} from 'react';
import AppointmentsComponent from './Appointment';
import AppointmentsIcon from '@/components/icons/AppointmentsIcon';
import { getDict, Locale } from '@/lib/i18n/dictionaries';
import LoadingPage from '@/app/[lang]/loading';
import { useRouter } from 'next/navigation';

export type Appointment = {
  title: string; 
  location: string;
  timeStart: string;
  timeEnd: string;
}




const AppointmentsPage = ({lang}: {lang: Locale}) => {
    const [isDropclicked, setIsisDropclicked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dict, setDict] = useState<{ [key: string]: any } | null>(null);

    const router = useRouter();   

    const appointments: Appointment[] = [
    { title: "Thursday, December 5, 2024", location: "Greater Washington Area", timeStart: "12:00 PM", timeEnd: "12:30 PM" },
    { title: "Saturday, January 4, 2025", location: "Ohio", timeStart: "10:00 AM", timeEnd: "10:00 AM" },
    { title: "Sunday, January 5, 2025", location: "Baltimore", timeStart: "3:30 PM", timeEnd: "4:00 PM" },
  ];

  const dropDown = () => setIsisDropclicked(!isDropclicked);

  const handleLocationSelect = () => {
    router.push("https://calendly.com/lpfdev-h4i/test");
    //setIsModalOpen(true); 
  };
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

    return (
    <div className="flex flex-col p-6 bg-gray-100 items-center min-h-screen overflow-auto">
      <div className="flex flex-col mb-6 items-center">
        <div className="bg-teal mb-2 rounded-full p-6 relative">
          <div className='relative -top-0.5'>
          <AppointmentsIcon />
          </div>
        </div>
            <h2 className="text-3xl font-bree-serif text-stone-950">{dict.appointmentsPage.title.text}</h2>
        </div>

      <div className="max-w-md w-full">
        {appointments.map((appointment, x) => (
          <AppointmentsComponent key={x} appointment={appointment} lang={lang} />
        ))}
      </div>
    

      <div className="mt-4 text-center">
        <h3 className="text-xl font-bree-serif mb-2 text-stone-950">{dict.appointmentsPage.lowerTitle.text}</h3>
        <button className="bg-teal text-white py-2 px-6 rounded-lg shadow-lg w-[380px] font-cabin-condensed" onClick={dropDown}> 
        {dict.appointmentsPage.button.text}
        </button>

        {isDropclicked && (
        <div className="mt-2 w-[380px] overflow-y-auto max-h-40 bg-white rounded-md shadow-lg ">
          {['Greater Washington Area', 'Ohio', 'Baltimore', 'Philadelphia', 'Western New York'].map((location) => (
            <div
              key={location}
              onClick={() => handleLocationSelect()}
              className="py-2 px-4 text-black hover:bg-green-500 cursor-pointer rounded-md"
            >
              {location}
            </div>
          ))}
        </div>
      )}



      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-lg w-80 text-center">
            <h3 className="text-lg font-bold text-stone-950 mb-4">{dict.appointmentsPage.confirmationPopup.confirmationText.text}</h3>
            <div className="flex justify-around">
              <button
                className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600"
              >
                {dict.appointmentsPage.confirmationPopup.yes.text}
              </button>
              <button
                className="bg-gray-400 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-500"
              >
                {dict.appointmentsPage.confirmationPopup.no.text}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
  };

export default AppointmentsPage;