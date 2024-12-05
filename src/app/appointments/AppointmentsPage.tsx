//  this relies on the appointments component
import React from 'react';
import AppointmentsComponent from './Appointment';

export type Appointment = {
  title: string; 
  location: string;
  timeStart: string;
  timeEnd: string;
}


const AppointmentsPage = () => {
    const appointments: Appointment[] = [
    { title: "Upcoming Appointment", location: "[Insert Warehouse Address]", timeStart: "00:00 p.m", timeEnd: "00:00 p.m" },
    { title: "Upcoming Appointment", location: "[Insert Warehouse Address]", timeStart: "00:00 p.m", timeEnd: "00:00 p.m" },
    { title: "Upcoming Appointment", location: "[Insert Warehouse Address]", timeStart: "00:00 p.m", timeEnd: "00:00 p.m" },
  ];

  return (
    <div className="flex flex-col p-6 bg-gray-100 items-center min-h-screen">
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
        <button className="bg-[#14676B] text-white py-2 px-6 rounded-lg shadow-lg w-[380px]"> 
          Select Location ▼
        </button>
      </div>
    </div>
  );
  };

export default AppointmentsPage;