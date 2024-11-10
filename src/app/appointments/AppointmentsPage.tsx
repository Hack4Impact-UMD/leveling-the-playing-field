//  this relies on the appointments component
"use client";

import React, { useState } from 'react';
import AppointmentsComponent from './Appointment';

export type Appointment = {
  title: string; 
  location: string;
  timeStart: string;
  timeEnd: string;
}


const AppointmentsPage = () => {
    const [isDropclicked, setIsisDropclicked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const appointments: Appointment[] = [
    { title: "Upcoming Appointment", location: "[Insert Warehouse Address]", timeStart: "00:00 p.m", timeEnd: "00:00 p.m" },
    { title: "Upcoming Appointment", location: "[Insert Warehouse Address]", timeStart: "00:00 p.m", timeEnd: "00:00 p.m" },
    { title: "Upcoming Appointment", location: "[Insert Warehouse Address]", timeStart: "00:00 p.m", timeEnd: "00:00 p.m" },
  ];



  const dropDown = () => setIsisDropclicked(!isDropclicked);

  const handleLocationSelect = () => {
    setIsModalOpen(true); 
  };

    return (
    <div className="flex flex-col p-6 bg-gray-100 items-center min-h-screen overflow-auto">
      <div className="flex flex-col mb-6 items-center">
        <div className="bg-[#14676B] mb-2 rounded-full p-4">
          {/* place for calendar icon */}
        </div>
            <h2 className="text-3xl font-bold text-stone-950 font-[Bree_Serif]">Appointments</h2>
        </div>

      <div className="max-w-md w-full">
        {appointments.map((appointment, x) => (
          <AppointmentsComponent key={x} appointment={appointment} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-bold mb-2 text-stone-950 font-[Cabin_Condensed]">Book New Appointment</h3>
        <button className="bg-[#14676B] text-white py-2 px-6 rounded-lg shadow-lg w-[380px]" onClick={dropDown}> 
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
              <button
                className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600"
              >
                Yes
              </button>
              <button
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