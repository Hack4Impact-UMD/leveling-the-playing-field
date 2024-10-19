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
  };

  const resetSport = () => {
    setSelectedSport('all');
  };

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

  const filteredEquipmentList = applyFilters();

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-grow">
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder={`Search by ${searchMode === 'equipment' ? 'Equipment' : 'Location'}`}
            className="pr-20"
          />
          <Button
            onClick={toggleSearchMode}
            className="absolute right-0 top-0 bottom-0"
          >
            {searchMode === 'equipment' ? 'Location' : 'Equipment'}
          </Button>
        </div>
        <Button onClick={handleFilterToggle}>
          Filter
        </Button>
      </div>

      {showFilter && (
        <div className="p-4 border rounded mb-4 space-y-4">
          {searchMode === 'equipment' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Warehouse Location</span>
                <Button onClick={resetWarehouse} variant="outline" size="sm">Reset</Button>
              </div>
              <Select onValueChange={setSelectedWarehouse} value={selectedWarehouse}>
                <SelectTrigger className="w-full">
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
            <div className="flex justify-between items-center mb-2">
              <span>Sport Category</span>
              <Button onClick={resetSport} variant="outline" size="sm">Reset</Button>
            </div>
            <Select onValueChange={setSelectedSport} value={selectedSport}>
              <SelectTrigger className="w-full">
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
            <Button onClick={handleApplyFilters}>Apply</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredEquipmentList.map((item) => (
          <Button
            key={item.name}
            onClick={() => handleEquipmentClick(item)}
            className="p-6 rounded text-left flex flex-col items-start w-full h-auto"
            variant="outline"
          >
            <span className="font-semibold text-lg mb-2">
              {searchMode === 'equipment' ? item.name : item.warehouse}
            </span>
            {searchMode === 'equipment' && (
              <span className="text-sm text-gray-600">
                {`Location(s) Available: ${item.warehouse}`}
              </span>
            )}
            {searchMode === 'location' && (
              <span className="text-sm text-gray-600">
                {`Equipment Available: ${item.name}`}
              </span>
            )}
          </Button>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {searchMode === 'equipment' 
                ? `${selectedEquipment?.name} Availability`
                : `Equipment at ${selectedEquipment?.warehouse}`}
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          {selectedEquipment && (
            <div className="p-4">
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
              <Button onClick={() => setIsDialogOpen(false)} className="mt-4">
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
