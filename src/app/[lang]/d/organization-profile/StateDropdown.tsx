import React, { useEffect, useState } from 'react';
import { RegionDropdown } from 'react-country-region-selector';
import AttentionCircleIcon from '@/components/icons/AttentionCircleIcon';

interface StateDropdownProps {
  label: any;
  error: any;
  country: string;
  state: string;
  onStateChange: (state: string) => void;
}

export default function StateDropdown({ label, error, country, state, onStateChange }: StateDropdownProps) {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (val: string) => {
    onStateChange(val);
    setIsInvalid(!val);
  };

  useEffect(() => {
    setIsInvalid(!state); 
  }, [state]);

  return (
    <div className="flex flex-col w-full justify-between mx-2 mt-2">
      <label className="text-gray-500 text-lg font-cabin-condensed"><span className="text-red-500">*</span>{label}</label>
      <RegionDropdown
        country={country}
        value={state}
        onChange={handleChange}
        classes={`text-black text-2xl font-cabin-condensed border-2 rounded-lg w-full bg-transparent ${isInvalid ? 'border-red-500' : 'border-gray-400'}`}
      />

      {isInvalid &&
        <div className="flex flex-row items-center space-x-1">
          <AttentionCircleIcon />
          <p className="text-[#00000066] text-[10px]">{error}</p>
        </div>
      }
    </div>
  );
}
