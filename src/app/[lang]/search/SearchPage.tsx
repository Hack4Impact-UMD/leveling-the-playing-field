"use client";  

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import SearchIcon from '@/components/icons/SearchIcon';
import ListComponent from './ListComponent';
import { Product, Market } from "@/types/types";
import { APIResponse } from '@/types/apiTypes';
import Loading from '@/components/Loading';

interface Equipment {
  name: string;
  quantity: number;
  sport: string;
  warehouse: string;
  totalQuantity?: number; 
  locations?: { warehouse: string; quantity: number }[]; 
}

interface GroupedEquipment {
  category: string;
  products: Product[];
}

const warehouses = [Market.GREATER_WASHINGTON, Market.BALTIMORE, Market.WESTERN_NEW_YORK, Market.PHILADELPHIA, Market.OHIO];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState<'equipment' | 'location'>('equipment');
  const [groupedEquipmentList, setGroupedEquipmentList] = useState<GroupedEquipment[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          const error = await res.json();
          console.error("Error fetching products:", error)
        }
        const data: Record<string, Product[]> = await res.json();
        const groupedProducts: GroupedEquipment[] = Object.entries(data).map(([category, products]) => {
          return { category, products }
        });
        setGroupedEquipmentList(groupedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    setLoading(true);
    fetchProducts().then(() => setLoading(false));
  }, []);

  const applyFilters = (): Market[] | GroupedEquipment[] => {
    if (searchMode === 'equipment') {
      return groupedEquipmentList.filter((group) => {
        const searchMatch = group.category.toLowerCase().includes(searchTerm.toLowerCase()) || group.products.some((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return searchMatch;
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

  if (loading) { return <Loading /> }

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
            placeholder={`Search by ${searchMode === 'equipment' ? 'Category' : 'Location'}`}
            className="pl-14 pr-4 w-full border-teal-light2 bg-teal-light2 rounded-3xl text-white font-ubuntu-condensed placeholder:text-white"
          />
        </div>
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
            <SelectItem value="equipment" className="">Category</SelectItem>
            <SelectItem value="location" className="">Location</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
