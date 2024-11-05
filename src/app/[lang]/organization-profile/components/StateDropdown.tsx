import React from 'react';
import { RegionDropdown } from 'react-country-region-selector';

interface StateDropdownProps {
  country: string;
  state: string;
  onStateChange: (state: string) => void;
}

export default function StateDropdown({ country, state, onStateChange }: StateDropdownProps) {
  return (
    <div className="flex flex-col w-full justify-between mx-2 mt-2">
      <label className="text-gray-500 text-lg font-cabin-condensed">State</label>
      <RegionDropdown
        country={country}
        value={state}
        onChange={(val) => onStateChange(val)}
        className="text-black text-2xl font-cabin-condensed border-2 border-gray-400 rounded-lg w-full bg-transparent"
      />
    </div>
  );
}
