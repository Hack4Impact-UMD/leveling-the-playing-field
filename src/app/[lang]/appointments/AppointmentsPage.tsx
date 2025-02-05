/* eslint-disable @typescript-eslint/no-unused-vars */
//  this relies on the appointments component
"use client";

import React, { useState , useEffect} from 'react';
import AppointmentsComponent from './Appointment';
import AppointmentsIcon from '@/components/icons/AppointmentsIcon';
import ContactPopup from './ContactPopup';
import { fetchContactDetails } from '../appointments/ContactPopup';
import { useAuth } from ''; 
import { Locale } from '@/lib/i18n/dictionaries';
export type Appointment = {
  title: string; 
  location: string;
  timeStart: string;
  timeEnd: string;
}
export interface ContactPopupProps {
  onButtonClick: () => void;
  opportunityid: string;
  lang: Locale;
}


const AppointmentsPage = () => {
    const { accountId } = useAuth(); 
    const [name,setName] = useState('Name');
    const [phoneNumber,setPhoneNumber] = useState('Phone Number');
    const [email,setEmail] = useState('Email');
    const [isDropclicked, setIsisDropclicked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    // const { token } = useAuth();
    // let idToken = token?.token;
    // idToken=token.salesforceIds?.accountId(edited);
    const idToken="123";
      useEffect(() => {
        
          const fetchAppointments = async () => {
              try {
                 const contactResponse = await fetch(`/api/accounts/${accountId}/opportunities?stage=Site Visit/Call&idToken=${idToken}`, {
                      method: 'GET',
                  });
  
              if (!contactResponse.ok) {
                  throw new Error('Failed to fetch contact');
              }
  
              const endcontactId = await contactResponse.json(); 

                  const response = await fetch(`/api/contact/${endcontactId}`, {
                      method: 'GET',
                  });
                  const data= await response.json();

                  interface itemty {
                    title?: string;
                    location?: string;
                    timeStart?: string;
                    timeEnd?: string;
                  }
                  const newAppointments: Appointment[] = data.map((item: itemty) => ({
                    title: item.title || "Upcoming Appointment",
                    location: item.location || "[Insert Warehouse Address]",
                    timeStart: item.timeStart || "00:00 p.m",
                    timeEnd: item.timeEnd || "00:00 p.m",
                }));
              setAppointments(newAppointments);
              } catch (err) {
                  console.error('Error fetching appointments:', err);
              }
          };

          
          fetchAppointments();

});


  //   const appointments: Appointment[] = [
  //   { title: "Upcoming Appointment", location: "[Insert Warehouse Address]", timeStart: "00:00 p.m", timeEnd: "00:00 p.m" },
  //   { title: "Upcoming Appointment", location: "[Insert Warehouse Address]", timeStart: "00:00 p.m", timeEnd: "00:00 p.m" },
  //   { title: "Upcoming Appointment", location: "[Insert Warehouse Address]", timeStart: "00:00 p.m", timeEnd: "00:00 p.m" },
  // ];



  const dropDown = () => setIsisDropclicked(!isDropclicked);

  const handleLocationSelect = () => {
    setIsModalOpen(true); 
    async function loadContactDetails() {
      try {
        await fetchContactDetails(idToken,setName,setPhoneNumber,setEmail);
      } catch (err) {
        console.error(err);
      }
    }
    loadContactDetails();
  };

    return (
    <div className="flex flex-col p-6 bg-gray-100 items-center min-h-screen overflow-auto">
      <div className="flex flex-col mb-6 items-center">
        <div className="bg-teal mb-2 rounded-full p-6 relative">
          <div className='relative -top-0.5'> 
          <AppointmentsIcon/>
          </div>
        </div>
            <h2 className="text-3xl font-bree-serif text-stone-950">Appointments</h2>
        </div>

      <div className="max-w-md w-full">
        {appointments.map((appointment, x) => (
          <AppointmentsComponent key={x} appointment={appointment} lang={'en'} />
        ))}
      </div>
    

      <div className="mt-4 text-center">
        <h3 className="text-xl font-bree-serif mb-2 text-stone-950">Book New Appointment</h3>
        <button className="bg-teal text-white py-2 px-6 rounded-lg shadow-lg w-[380px] font-cabin-condensed" onClick={dropDown}> 
          Select Location 
        </button>

        {isDropclicked && (
        <div className="mt-2 w-[380px] overflow-y-auto max-h-40 bg-white rounded-md shadow-lg ">
          {['Warehouse 1', 'Warehouse 2', 'Warehouse 3', 'Warehouse 4'].map((location) => (
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
            <h3 className="text-lg font-bold text-stone-950 mb-4">Are you sure you want to select this location?</h3>
            <div className="flex justify-around">
              <button onClick={() => window.location.href = 'https://calendly.com/signup?gad_source=1'}  className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600"
              >
              Yes
              </button>
              <button onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
  };

export default AppointmentsPage;