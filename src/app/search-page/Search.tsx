"use client";  

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SearchIcon from '@/components/icons/SmallSearchIcon';
import FilterIcon from '@/components/icons/FilterIcon';
import LocationIcon from '@/components/icons/LocationIcon';
import RightArrowIcon from '@/components/icons/RightArrowIcon';

interface Equipment {
  name: string;
  quantity: number;
  sport: string;
  warehouse: string;
}
import { Input } from "@/components/ui/input"

const SearchPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | undefined>(undefined);
  const [selectedSport, setSelectedSport] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<'equipment' | 'location'>('equipment');
  const [appliedFilters, setAppliedFilters] = useState({
    warehouse: 'all',
    sport: 'all'
  });
  

  // Sample data with quantities
  const equipmentList = [
    { name: 'Soccer Ball', quantity: 10, sport: 'Soccer', warehouse: 'Baltimore, Maryland' },
    { name: 'Basketball', quantity: 5, sport: 'Basketball', warehouse: 'College Park, Maryland' },
    { name: 'Tennis Racket', quantity: 15, sport: 'Tennis', warehouse: 'McLean, Virginia' },
  ];
  const warehouses = ['Baltimore, Maryland', 'College Park, Maryland', 'McLean, Virginia'];
  const sports = ['Soccer', 'Basketball', 'Tennis'];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleEquipmentClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsDialogOpen(true); // Open the dialog when equipment is clicked
  };

  const toggleSearchMode = () => {
    setSearchMode(prevMode => prevMode === 'equipment' ? 'location' : 'equipment');
    setSearchTerm('');
    setSelectedWarehouse('all'); // Reset warehouse filter when switching to location mode
  };

  const handleApplyFilters = () => {
    setAppliedFilters({
      warehouse: selectedWarehouse || 'all',
      sport: selectedSport || 'all'
    });
  };

  const resetWarehouse = () => {
    setSelectedWarehouse('all');
    handleApplyFilters();
  };

  const resetSport = () => {
    setSelectedSport('all');
    handleApplyFilters();
  };

  useEffect(() => {
    if ((selectedSport === 'all' || !selectedSport) && (selectedWarehouse === 'all' || !selectedWarehouse)) {
      setFilteredEquipmentList(equipmentList)
    } else {
      setFilteredEquipmentList(applyFilters())
    }
  }, [appliedFilters])
  const [filteredEquipmentList, setFilteredEquipmentList] = useState(equipmentList)

  const applyFilters = () => {
    return equipmentList.filter((item) => {
      const warehouseMatch = searchMode === 'location' || !appliedFilters.warehouse || appliedFilters.warehouse === 'all' || item.warehouse === appliedFilters.warehouse;
      const sportMatch = !appliedFilters.sport || appliedFilters.sport === 'all' || item.sport === appliedFilters.sport;
      const searchMatch = searchMode === 'equipment'
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : item.warehouse.toLowerCase().includes(searchTerm.toLowerCase());
      return warehouseMatch && sportMatch && searchMatch;
    });
  };

  // const filteredEquipmentList = applyFilters();

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-grow border-black bg-teal-light rounded-3xl space-x-10 text-white">
          <div className="absolute left-2 top-1 bottom-2">
            <SearchIcon />
          </div>
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder={`Search by ${searchMode === 'equipment' ? 'Equipment' : 'Location'}`}
            className="pr-15 w-6/11 border-teal-light bg-teal-light rounded-3xl text-white font-ubuntu-condensed"
          />
          <Button
            onClick={toggleSearchMode}
            className="absolute right-0 top-0 bottom-0 bg-teal hover:bg-teal focus:bg-teal rounded-3xl font-ubuntu-condensed px-6"
          >
            {searchMode === 'equipment' ? 'Location' : 'Equipment'}
          </Button>
        </div>
        <Button onClick={handleFilterToggle} className="bg-orange-light hover:bg-orange-light focus:bg-orange-light h-12 rounded-2xl">
          <FilterIcon />
        </Button>
      </div>

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

      {/* Basic information of each warehouse/location */}
      <div className="grid grid-cols-1 gap-4">
        {filteredEquipmentList.map((item) => (
          <Button
            key={item.name}
            onClick={() => handleEquipmentClick(item)}
            className="p-0 rounded-2xl w-full h-full"
            variant="outline"
          >
            <div className="bg-teal w-full h-full flex items-center justify-between pl-4 pt-2 pb-2 pr-1 rounded-2xl">
              <div className="flex flex-col justify-start">
                <span className="font-semibold text-lg mb-2 text-white font-ubuntu-condensed">
                  {searchMode === 'equipment' ? (
                    <div className="flex space-x-2 items-baseline">
                      <span className="font-semibold text-lg mb-2 text-white font-ubuntu-condensed leading-tight">
                        {item.name}
                      </span>
                      <div className="bg-white-dark opacity-50 rounded-3xl text-sm text-black font-ubuntu-condensed leading-tight px-2">
                        {item.sport}
                      </div>
                    </div>
                  ) : (
                    <div className="flex space-x-2 items-baseline">
                      <LocationIcon />
                      <span className="font-semibold text-lg mb-2 text-white font-ubuntu-condensed">
                        {item.warehouse}
                      </span>
                    </div>
                  )}
                </span>
                {searchMode === 'equipment' && (
                  <div className="flex space-x-2">
                    <LocationIcon />
                    <span className="text-sm text-white font-ubuntu-condensed">
                      {`Location(s) Available: ${item.warehouse}`}
                    </span>
                  </div>
                )}
                {searchMode === 'location' && (
                  <span className="text-sm text-white font-ubuntu-condensed">
                    {`Equipment Available: ${item.name}`}
                  </span>
                )}
              </div>
              <RightArrowIcon />
            </div>
          </Button>
        ))}
      </div>

      {/* pop-up box for more information */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-teal text-white font-ubuntu-condensed">
          <DialogHeader>
            <DialogTitle>
              {searchMode === 'equipment' 
                ? `${selectedEquipment?.name} Availability`
                : `Equipment at ${selectedEquipment?.warehouse}`}
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          {selectedEquipment && (
            <div className="p-4 bg-teal text-white font-ubuntu-condensed">
              {searchMode === 'equipment' ? (
                <>
                  <p>Warehouse: {selectedEquipment.warehouse}</p>
                  <p>Sport: {selectedEquipment.sport}</p>
                  <p>Quantity: {selectedEquipment.quantity}</p>
                </>
              ) : (
                <>
                  <p>Sport: {selectedSport === 'all' ? 'All Sports' : selectedSport}</p>
                  <p>Total Equipment: {
                    equipmentList
                      .filter(item => item.warehouse === selectedEquipment.warehouse &&
                                      (selectedSport === 'all' || item.sport === selectedSport))
                      .reduce((total, item) => total + item.quantity, 0)
                  }</p>
                </>
              )}
              <Button onClick={() => setIsDialogOpen(false)} className="mt-4 rounded-2xl bg-orange hover:bg-orange focus:bg-orange">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchPage;
