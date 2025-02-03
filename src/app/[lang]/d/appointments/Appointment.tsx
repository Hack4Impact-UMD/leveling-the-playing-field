/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import EditIcon from '@/components/icons/EditIcon';
import ContactPopup from './ContactPopup';
import { Locale } from '@/lib/i18n/dictionaries';
import { Opportunity } from '@/types/types';
import LocationIcon from '@/components/icons/LocationIcon';

type AppointmentsComponentProps = {
  appointment: Pick<Opportunity, "Id" | "Name" | "CloseDate" | "Market__c">;
  lang: Locale;
};

const AppointmentsComponent = (props: AppointmentsComponentProps) => {
  const { Id, Name, CloseDate, Market__c } = props.appointment;
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(prevState => !prevState);
  };
  {isPopupVisible && 
    (<div className='absolute z-index: 10'> 
      <ContactPopup onButtonClick={togglePopup} opportunityid={''} lang={'en'}/>
      </div>)}

  return (
    <div className="relative text-white p-4 rounded-lg mb-4 shadow-lg bg-[#549396] border-2 border-[#14676B]">
     
      <div className="flex items-center mb-2">
        <span className="font-cabin-condensed text-lg">{Name}</span>
        <span className="cursor-pointer ml-auto">
          <button
            onClick={togglePopup} 
            className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring"
            aria-label="Edit"
          >
            <EditIcon />
          </button>
        </span>
        {isPopupVisible && 
        (<div className='absolute z-index: 10'> 
          <ContactPopup onButtonClick={togglePopup} lang={props.lang} opportunityid={''}/>
          </div>)}
      </div>
      <div className="flex items-center text-sm">
        <span className='flex'>
          <LocationIcon />
          {Market__c}
        </span>
      </div>
    </div>
  );
};

export default AppointmentsComponent;
