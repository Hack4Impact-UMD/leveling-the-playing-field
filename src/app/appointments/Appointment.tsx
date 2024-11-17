import React, { useState } from 'react';
import { Appointment } from './AppointmentsPage';
import EditIcon from '@/components/icons/EditIcon';
import ContactPopup from './ContactPopup';


type AppointmentsComponentProps = {
  appointment: Appointment;
}

const AppointmentsComponent = (props: AppointmentsComponentProps) => {
  const { title, location, timeStart, timeEnd } = props.appointment;
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(prevState => !prevState);
  };
  {isPopupVisible && 
    (<div className='absolute z-index: 10'> 
      <ContactPopup onButtonClick={togglePopup}/>
      </div>)}
  return (
    <div className="relative text-white p-4 rounded-lg mb-4 shadow-lg bg-[#549396] border-2 border-[#14676B]">
     
      <div className="flex items-center mb-2">
        <span className="font-cabin-condensed text-lg">{title}</span>
        <span className="cursor-pointer ml-auto">
          <button
            onClick={togglePopup} // Replace with your actual function
            className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring"
            aria-label="Edit"
          >
            <EditIcon />
          </button>
        </span>
        {isPopupVisible && 
        (<div className='absolute z-index: 10'> 
          <ContactPopup onButtonClick={togglePopup}/>
          </div>)}
      </div>
      <div className="flex items-center text-sm">
        <span>{location}</span>
      </div>
      <div className="flex text-sm items-center">
        <span>{timeStart} - {timeEnd}</span>
      </div>
    </div>
  );
};

export default AppointmentsComponent;
