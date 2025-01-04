import React, {Dispatch, SetStateAction} from "react";
import { Button } from "@/components/ui/Button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"

interface FilterProps {
  showFilter: boolean;
  searchMode: String;
  sports: string[];
  warehouses: string[];
  selectedWarehouse: string | undefined;
  selectedSport: string | undefined;
  setSelectedWarehouse: Dispatch<SetStateAction<string | undefined>>;
  setSelectedSport: Dispatch<SetStateAction<string | undefined>>;
  resetWarehouse: () => void;
  resetSport: () => void;
  handleApplyFilters: () => void;
}


const FilterComponent: React.FC<FilterProps> = ({
  showFilter, searchMode, sports, warehouses, selectedWarehouse, selectedSport,
  setSelectedWarehouse, setSelectedSport, resetWarehouse, resetSport, handleApplyFilters }) => {


  return (
    <>
      {showFilter && (
        <div className="p-4 border rounded mb-4 space-y-4 bg-orange-light">
          <h2 className="text-lg font-cabin-condensed text-white">Filter</h2>
          {searchMode === 'equipment' && (
            <div>
              <div className="flex justify-between items-center mb-2 font-cabin-condensed text-white">
                <span>Warehouse Location</span>
                <Button onClick={resetWarehouse} variant="link" size="sm" className="underline text-white">Reset</Button>
              </div>
              <Select onValueChange={setSelectedWarehouse} value={selectedWarehouse}>
                <SelectTrigger className="w-3/4 h-25 rounded-3xl shadow-lg shadow-black-500">
                  <SelectValue placeholder="Select a warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select region</SelectItem>
                  {warehouses.map((warehouse) => (
                    <SelectItem key={warehouse} value={warehouse}>{warehouse}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
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