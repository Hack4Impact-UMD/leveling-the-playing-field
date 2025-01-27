import React from 'react';
import EditIcon from '@/components/icons/EditIcon';
import XIcon from '@/components/icons/XIcon';

interface ContactPopupProps {
    onButtonClick: () => void; // onButtonClick is a function with no parameters and no return value
  }

export default function ContactPopup({ onButtonClick }: ContactPopupProps) {
    return (
        <div>
        <button className="absolute top-2 right-2" onClick={onButtonClick}>
            <XIcon />
        </button>
        <div className="bg-white-dark rounded-xl p-4 w-80 mx-auto shadow-lg text-black">
            <h1 className="text-md font-bold mb-3 text-center font-bree-serif">Current Pickup Contact</h1>
           
            <div className="flex items-center justify-center">
                <h2 className="text-md mr-2 font-cabin-condensed">Name</h2>
                <EditIcon />
            </div>
            
            <div className="flex items-center justify-center">
                <h2 className="text-md mr-2 font-cabin-condensed">Phone Number</h2>
                <EditIcon />
            </div>
            
            <div className="flex items-center justify-center">
                <h2 className="text-md mr-2 font-cabin-condensed">Email</h2>
                <EditIcon />
            </div>

            <div className="flex justify-around text-black">
                <button className="bg-orange px-6 py-1 rounded-lg font-bree-serif">Yes</button>
                <button className="bg-teal-light px-6 py-1  rounded-lg font-bree-serif">No</button>
            </div>
        </div>
        </div>
    );
}
