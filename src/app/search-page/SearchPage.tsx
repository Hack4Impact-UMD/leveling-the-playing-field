"use client";  

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SearchIcon from '@/components/icons/SearchIcon';
import FilterIcon from '@/components/icons/FilterIcon';
import FilterComponent from './FilterComponent';
import ListComponent from './ListComponent';
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
    <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 103px)' }}>
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-grow border-black bg-teal-light rounded-3xl text-white">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon size={30} viewBoxSize={30} />
          </div>
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder={`Search by ${searchMode === 'equipment' ? 'Equipment' : 'Location'}`}
            className="pl-14 pr-4 w-full border-teal-light2 bg-teal-light2 rounded-3xl text-white font-ubuntu-condensed placeholder:text-white"
          />
        </div>
        <Button 
          onClick={handleFilterToggle} 
          className="bg-orange-light hover:bg-orange-light focus:bg-orange-light w-[45px] h-[50px] rounded-2xl [&_svg]:w-11 [&_svg]:h-11 [&_svg]:-ml-1 [&_svg]:-mt-1"
        >
          <FilterIcon />
        </Button>
      </div>

      <div className="flex items-center space-x-3 mb-4 font-ubuntu-condensed">
        <span className="text-black font-ubuntu-condensed">Sort by:</span>
        <Select 
          onValueChange={(value: "equipment" | "location") => setSearchMode(value)} 
          value={searchMode}
        >
          <SelectTrigger className="w-[135px] bg-teal-light2 text-white rounded-3xl">
            <SelectValue placeholder="Search by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equipment" className="">Equipment</SelectItem>
            <SelectItem value="location" className="">Location</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <FilterComponent 
        showFilter = {showFilter}
        searchMode = {searchMode}
        sports = {sports}
        warehouses = {warehouses}
        selectedWarehouse = {selectedWarehouse}
        selectedSport = {selectedSport}
        setSelectedWarehouse = {setSelectedWarehouse}
        setSelectedSport = {setSelectedSport}
        resetWarehouse = {resetWarehouse}
        resetSport = {resetSport}
        handleApplyFilters = {handleApplyFilters}
      />

      {/* Basic information of each warehouse/location */}
      <div className="flex flex-col space-y-8 mt-8"> 
        {applyFilters().map((item) => (
          <ListComponent
            item={item}
            selectedEquipments={selectedEquipments}
            searchMode={searchMode}
            appliedFilters={appliedFilters}
            groupEquipmentBySport={groupEquipmentBySport}
            toggleEquipment={toggleEquipment}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
