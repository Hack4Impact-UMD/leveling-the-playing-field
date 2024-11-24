import React, {Dispatch, SetStateAction} from "react";
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterProps {
  showFilter: boolean;
  sports: string[];
  selectedSport: string | undefined;
  setSelectedSport: Dispatch<SetStateAction<string | undefined>>;
  resetSport: () => void;
  handleApplyFilters: () => void;
}

const FilterComponent: React.FC<FilterProps> = ({
  showFilter, sports, selectedSport, setSelectedSport, resetSport, handleApplyFilters }) => {


  return (
    <>
      {showFilter && (
        <div className="p-4 border rounded mb-4 space-y-4 bg-orange-light">
          <h2 className="text-lg font-cabin-condensed text-white">Filter</h2>
          {/* Filter section */}
          <div>
            <div className="flex justify-between items-center mb-2 font-cabin-condensed">
              <span className="text-white">Sport Category</span>
              <Button onClick={resetSport} variant="link" size="sm" className="underline text-white">Reset</Button>
            </div>
            <Select onValueChange={setSelectedSport} value={selectedSport}>
              <SelectTrigger className="w-3/4 h-10 rounded-3xl shadow-lg shadow-black-500">
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Select sport</SelectItem>
                {sports.map((sport) => (
                  <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleApplyFilters} className="bg-teal-light h-5 rounded-3xl font-cabin-condensed underline">Apply</Button>
          </div>
        </div>
      )}
    </>
  )
}

export default FilterComponent;