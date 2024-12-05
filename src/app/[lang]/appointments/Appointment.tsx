import React from 'react';
import { Appointment } from './AppointmentsPage';

type AppointmentsComponentProps = {
  appointment: Appointment;
}

const AppointmentsComponent = (props: AppointmentsComponentProps) => {
  const { title, location, timeStart, timeEnd } = props.appointment;
  return (

    <div className="text-white p-4 rounded-lg mb-4 shadow-lg bg-[#549396] border-2 border-[#14676B]">
      <div className="flex items-center mb-2">
        <span className="font-semibold text-lg">{title}</span>
        <span className="cursor-pointer ml-auto">
          {}
          icon
        </span>
      </div>
      <div className="flex items-center text-sm">
        <span className="mr-2">icon</span>
        <span>{location}</span>
      </div>
      <div className="flex text-sm items-center">
        <span className="mr-2">icon</span>
        <span>{timeStart} - {timeEnd}</span>
      </div>
    </div>
  );
};

export default AppointmentsComponent;
