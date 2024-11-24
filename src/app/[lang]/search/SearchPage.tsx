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
import { Product, Market } from "@/types/types";

interface GroupedEquipment {
  category: string;
  products: Product[];
}

const warehouses = [Market.GREATER_WASHINGTON, Market.BALTIMORE, Market.WESTERN_NEW_YORK, Market.PHILADELPHIA, Market.OHIO];

const SearchPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | undefined>(undefined);
  const [selectedSport, setSelectedSport] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState<'equipment' | 'location'>('equipment');
  const [groupedEquipmentList, setGroupedEquipmentList] = useState<GroupedEquipment[]>([]);
  const [appliedFilters, setAppliedFilters] = useState({
    warehouse: 'all',
    sport: 'all'
  });
  const [selectedEquipments, setSelectedEquipments] = useState<Set<string>>(new Set());

  // Sample data with quantities
  const equipmentList: Product[] = [
    { name: 'Soccer Ball', category: 'Soccer', id: "0" },
    { name: 'Basketball', category: 'Basketball', id: "1" },
    { name: 'Tennis Racket', category: 'Tennis', id: "2" },
    { name: 'Tennis Balls', category: 'Tennis', id: "3" },
    { name: 'Tennis Shoes', category: 'Tennis', id: "4" },
    { name: 'Tennis Shoes', category: 'Tennis', id: "5" },
    { name: 'Tennis Shoes', category: 'Tennis', id: "6" }
  ];
  const sports = ['Soccer', 'Basketball', 'Tennis'];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({
      warehouse: selectedWarehouse || 'all',
      sport: selectedSport || 'all'
    });
  };

  const resetSport = () => {
    setSelectedSport('all');
    handleApplyFilters();
  };

  useEffect(() => {
    const groupedEquipment = equipmentList.reduce((acc: GroupedEquipment[], item) => {
      const existingItem = acc.find(g => g.category === item.category);
      if (existingItem) {
        existingItem.products.push(item);
      } else {
        acc.push({
          category: item.category,
          products: [item]
        });
      }
      return acc;
    }, []);
    setGroupedEquipmentList(groupedEquipment);
  }, []);

  const applyFilters = (): Market[] | GroupedEquipment[] => {
    if (searchMode === 'equipment') {
      return groupedEquipmentList.filter((group) => {
        const sportMatch = !appliedFilters.sport || appliedFilters.sport === 'all' || group.category === appliedFilters.sport;
        const searchMatch = group.category.toLowerCase().includes(searchTerm.toLowerCase()) || group.products.some((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return sportMatch && searchMatch;
      });
    } else {
      return warehouses.filter((item: Market) => {
        const searchMatch = item.toLowerCase().includes(searchTerm.toLowerCase());
        return searchMatch;
      });
    }
  };

  const toggleEquipment = (item: GroupedEquipment | Market) => {
    const isGroupedEquipment = (item: any): item is GroupedEquipment => {
      return typeof item === 'object' && item !== null && 'category' in item && 'products' in item;
    };

    const id = isGroupedEquipment(item) ? item.category : item;
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

  return (
    <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 103px)' }}>
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-grow border-black bg-teal-light rounded-3xl text-white">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon size={30} viewBoxSize={44} />
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
        sports = {sports}
        selectedSport = {selectedSport}
        setSelectedSport = {setSelectedSport}
        resetSport = {resetSport}
        handleApplyFilters = {handleApplyFilters}
      />

      {/* Basic information of each warehouse/location */}
      <div className="flex flex-col space-y-2 mt-8"> 
        {applyFilters().map((item) => (
          <ListComponent
            item={item}
            selectedEquipments={selectedEquipments}
            searchMode={searchMode}
            toggleEquipment={toggleEquipment}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
