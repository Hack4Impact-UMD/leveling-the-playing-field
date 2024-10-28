"use client";  

import { useState, useEffect } from 'react';
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
// import RightArrowIcon from '@/components/icons/RightArrowIcon';
import DownArrowIcon from '@/components/icons/DownArrowIcon';
import { Input } from "@/components/ui/input"

interface Equipment {
  name: string;
  quantity: number;
  sport: string;
  warehouse: string;
  totalQuantity?: number; 
  locations?: { warehouse: string; quantity: number }[]; 
}

interface GroupedEquipment {
  name: string;
  sport: string;
  totalQuantity: number;
  locations: { warehouse: string; quantity: number }[];
}

interface LocationEquipment {
  warehouse: string;
  equipment: { name: string; sport: string; quantity: number }[];
}

const SearchPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | undefined>(undefined);
  const [selectedSport, setSelectedSport] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<GroupedEquipment | LocationEquipment | null>(null);
  const [searchMode, setSearchMode] = useState<'equipment' | 'location'>('equipment');
  const [appliedFilters, setAppliedFilters] = useState({
    warehouse: 'all',
    sport: 'all'
  });
  const [groupedEquipmentList, setGroupedEquipmentList] = useState<GroupedEquipment[]>([]);
  const [locationEquipmentList, setLocationEquipmentList] = useState<LocationEquipment[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<Set<string>>(new Set());

  // Sample data with quantities
  const equipmentList = [
    { name: 'Soccer Ball', quantity: 10, sport: 'Soccer', warehouse: 'Baltimore, Maryland' },
    { name: 'Basketball', quantity: 5, sport: 'Basketball', warehouse: 'College Park, Maryland' },
    { name: 'Tennis Racket', quantity: 15, sport: 'Tennis', warehouse: 'McLean, Virginia' },
    { name: 'Tennis Balls', quantity: 30, sport: 'Tennis', warehouse: 'McLean, Virginia' },
    { name: 'Tennis Shoes', quantity: 5, sport: 'Tennis', warehouse: 'College Park, Maryland' },
    { name: 'Tennis Shoes', quantity: 5, sport: 'Tennis', warehouse: 'McLean, Virginia' },
    { name: 'Tennis Shoes', quantity: 5, sport: 'Tennis', warehouse: 'Baltimore, Maryland' }




  ];
  const warehouses = ['Baltimore, Maryland', 'College Park, Maryland', 'McLean, Virginia'];
  const sports = ['Soccer', 'Basketball', 'Tennis'];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const toggleSearchMode = () => {
    setSearchMode(prevMode => prevMode === 'equipment' ? 'location' : 'equipment');
    setSearchTerm('');
    setSelectedWarehouse('all'); 
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
    const groupedEquipment = equipmentList.reduce((acc: GroupedEquipment[], item) => {
      const existingItem = acc.find(g => g.name === item.name);
      if (existingItem) {
        existingItem.totalQuantity += item.quantity;
        existingItem.locations.push({ warehouse: item.warehouse, quantity: item.quantity });
      } else {
        acc.push({
          name: item.name,
          sport: item.sport,
          totalQuantity: item.quantity,
          locations: [{ warehouse: item.warehouse, quantity: item.quantity }]
        });
      }
      return acc;
    }, []);
    setGroupedEquipmentList(groupedEquipment);

    const locationEquipment = equipmentList.reduce((acc: LocationEquipment[], item) => {
      const existingLocation = acc.find(l => l.warehouse === item.warehouse);
      if (existingLocation) {
        existingLocation.equipment.push({ name: item.name, sport: item.sport, quantity: item.quantity });
      } else {
        acc.push({
          warehouse: item.warehouse,
          equipment: [{ name: item.name, sport: item.sport, quantity: item.quantity }]
        });
      }
      return acc;
    }, []);
    setLocationEquipmentList(locationEquipment);
  }, []);

  useEffect(() => {
    if ((selectedSport === 'all' || !selectedSport) && (selectedWarehouse === 'all' || !selectedWarehouse)) {
      setFilteredEquipmentList(searchMode === 'equipment' ? groupedEquipmentList : locationEquipmentList);
    } else {
      setFilteredEquipmentList(applyFilters());
    }
  }, [appliedFilters, groupedEquipmentList, locationEquipmentList, selectedSport, selectedWarehouse, searchMode]);

  // Update the state type to include both possibilities
  const [filteredEquipmentList, setFilteredEquipmentList] = useState<GroupedEquipment[] | LocationEquipment[]>([]);

  const applyFilters = () => {
    if (searchMode === 'equipment') {
      return groupedEquipmentList.filter((item) => {
        const warehouseMatch = !appliedFilters.warehouse || appliedFilters.warehouse === 'all' || item.locations.some(loc => loc.warehouse === appliedFilters.warehouse);
        const sportMatch = !appliedFilters.sport || appliedFilters.sport === 'all' || item.sport === appliedFilters.sport;
        const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        return warehouseMatch && sportMatch && searchMatch;
      });
    } else {
      return locationEquipmentList.filter((item) => {
        const sportMatch = !appliedFilters.sport || appliedFilters.sport === 'all' || item.equipment.some(e => e.sport === appliedFilters.sport);
        const searchMatch = item.warehouse.toLowerCase().includes(searchTerm.toLowerCase());
        return sportMatch && searchMatch;
      });
    }
  };

  const toggleEquipment = (item: GroupedEquipment | LocationEquipment) => {
    const id = 'warehouse' in item ? item.warehouse : item.name;
    setSelectedEquipments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Add this helper function inside your component
  const groupEquipmentBySport = (equipment: { name: string; sport: string; quantity: number }[]) => {
    return equipment.reduce((acc, item) => {
      if (!acc[item.sport]) {
        acc[item.sport] = [];
      }
      acc[item.sport].push(item);
      return acc;
    }, {} as Record<string, typeof equipment>);
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-grow border-black bg-teal-light rounded-3xl text-white">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder={`Search by ${searchMode === 'equipment' ? 'Equipment' : 'Location'}`}
            className="pl-10 pr-4 w-full border-teal-light bg-teal-light rounded-3xl text-white font-ubuntu-condensed placeholder:text-white"
          />
        </div>
        <Button 
          onClick={handleFilterToggle} 
          className="bg-orange-light hover:bg-orange-light focus:bg-orange-light w-[45px] h-[50px] rounded-2xl [&_svg]:w-11 [&_svg]:h-11 [&_svg]:-ml-1 [&_svg]:-mt-1"
        >
          <FilterIcon />
        </Button>
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <span className="text-black font-ubuntu-condensed">Sort by:</span>
        <Select 
          onValueChange={(value: "equipment" | "location") => setSearchMode(value)} 
          value={searchMode}
        >
          <SelectTrigger className="w-[200px] bg-teal-light text-white rounded-3xl">
            <SelectValue placeholder="Search by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="location">Location</SelectItem>
          </SelectContent>
        </Select>
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
      <div className="flex flex-col space-y-8 mt-8"> 
        {applyFilters().map((item) => (
          <div key={'warehouse' in item ? item.warehouse : item.name} className="w-full min-h-[80px]">
            <Button
              onClick={() => toggleEquipment(item)}
              className="p-0 w-full border-0 block h-auto" 
              variant="outline"
            >
              {!selectedEquipments.has('warehouse' in item ? item.warehouse : item.name) ? (
                <div className="bg-teal w-full flex items-center justify-between p-4 rounded-2xl">
                  <div className="flex flex-col justify-start w-full">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-lg text-white font-ubuntu-condensed flex items-center">
                        {'name' in item ? item.name : (item as LocationEquipment).warehouse}
                        {'sport' in item && (
                          <div className="bg-teal-light rounded-xl inline-block ml-2">
                            <span className="text-white font-ubuntu-condensed text-sm">
                              {(item as GroupedEquipment).sport}
                            </span>
                          </div>
                        )}
                      </span>
                      <DownArrowIcon />
                    </div>
                    <div className="flex items-center space-x-2">
                      <LocationIcon />
                      <span className="text-sm text-white font-ubuntu-condensed">
                        {'locations' in item 
                          ? `${item.locations.length} Locations Available`
                          : `${(item as LocationEquipment).equipment.length} Equipment Available`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col bg-teal rounded-2xl">
                  <div className="w-full p-4">
                    <div className="flex space-x-2 items-center">
                      {searchMode === 'location' ? (
                        <>
                          <span className="text-white font-ubuntu-condensed text-lg">
                            {(item as LocationEquipment).warehouse}
                          </span>
                          {appliedFilters.sport !== 'all' && (
                            <span className="bg-white-dark opacity-50 rounded-3xl px-3 py-1 text-sm text-black font-ubuntu-condensed">
                              {appliedFilters.sport}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <span className="text-white font-ubuntu-condensed text-lg">
                            {(item as GroupedEquipment).name}
                          </span>
                          <div className="bg-teal-light rounded-xl inline-block">
                            <span className="text-white font-ubuntu-condensed text-sm">
                              {(item as GroupedEquipment).sport}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6  w-full">
                    <div className="space-y-4 w-full">
                      {searchMode === 'location' ? (
                        // Location mode content
                        <div className="space-y-6 text-left">
                          <div className="bg-teal-light rounded-xl p-4">
                            <p className="text-white font-ubuntu-condensed text-lg mb-4">Equipment available</p>
                            {Object.entries(groupEquipmentBySport((item as LocationEquipment).equipment))
                              .filter(([sport]) => appliedFilters.sport === 'all' || sport === appliedFilters.sport)
                              .map(([sport, equipment]) => (
                                <div key={sport} className="space-y-2 mb-4 last:mb-0">
                                  <div className="bg-orange-light rounded-xl px-3 py-1 inline-block">
                                    <p className="text-white font-ubuntu-condensed text-left">{sport}</p>
                                  </div>
                                  <ul className="space-y-2">
                                    {equipment.map((eq, index) => (
                                      <li key={index} className="text-white font-ubuntu-condensed grid grid-cols-2 text-left">
                                        <span>{eq.name}</span>
                                        <span>{eq.quantity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : (
                        // Equipment mode content
                        <div className="space-y-4">
                          {(item as GroupedEquipment).locations.map((location, index) => (
                            <div key={index} className="bg-teal-light/20 rounded-xl p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <LocationIcon />
                                <p className="text-white font-ubuntu-condensed">{location.warehouse}</p>
                              </div>
                              <p className="text-white font-ubuntu-condensed text-left">Units available: {location.quantity} units</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
