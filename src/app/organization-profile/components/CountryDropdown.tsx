import React from 'react';
import { CountryDropdown } from 'react-country-region-selector';

interface CountryDropdownProps {
  country: string;
  onCountryChange: (country: string) => void;
}

export default function CountryDropdownComponent({ country, onCountryChange }: CountryDropdownProps) {
  return (
    <div className="flex flex-col w-full justify-between mx-2 mt-2">
        <label className="text-gray-500 text-lg font-cabin-condensed">Country</label>
        
        <CountryDropdown
            value={country}
            onChange={(val) => onCountryChange(val)}
            className="text-black text-2xl font-cabin-condensed border-2 border-gray-400 rounded-lg w-full bg-transparent" 
        />
    </div>
  );
}
