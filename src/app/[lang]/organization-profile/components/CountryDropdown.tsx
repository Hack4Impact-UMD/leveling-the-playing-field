import React, { useEffect, useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import AttentionCircleIcon from '@/components/icons/AttentionCircleIcon';


interface CountryDropdownProps {
  country: string;
  onCountryChange: (country: string) => void;
}

export default function CountryDropdownComponent({ country, onCountryChange }: CountryDropdownProps) {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (val: string) => {
    onCountryChange(val);
    setIsInvalid(!val); 
  };

  useEffect(() => {
    setIsInvalid(!country); 
  }, [country]);

  return (
    <div className="flex flex-col w-full justify-between mx-2 mt-2">
        <label className="text-gray-500 text-lg font-cabin-condensed"><span className="text-red-500">*</span> Country</label>
        
        <CountryDropdown
            value={country}
            onChange={handleChange}
            className={`text-black text-2xl font-cabin-condensed border-2 rounded-lg w-full bg-transparent ${isInvalid ? 'border-red-500' : 'border-gray-400'}`}
        />

        {isInvalid &&
          <div className="flex flex-row items-center space-x-1">
            <AttentionCircleIcon />
            <p className="text-[#00000066] text-[10px]">This field is required</p>
          </div>
        }
    </div>
  );
}