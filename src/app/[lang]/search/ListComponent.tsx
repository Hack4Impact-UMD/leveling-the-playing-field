import React from "react";
import { Button } from "@/components/ui/button"
import { Product, Market } from "@/types/types";
import DownArrowIcon from '@/components/icons/DownArrowIcon';

interface GroupedEquipment {
  category: string;
  products: Product[];
}

interface ListCompProps {
  item: GroupedEquipment | Market;
  selectedEquipments: Set<String>;
  searchMode: String;
  toggleEquipment: (item: GroupedEquipment | Market) => void;
}

const ListComponent: React.FC<ListCompProps> = ({item, selectedEquipments, searchMode, toggleEquipment }) => {
  const isGroupedEquipment = (item: any): item is GroupedEquipment => {
    return typeof item === 'object' && item !== null && 'category' in item && 'products' in item;
  };

  return (
    <div key={isGroupedEquipment(item) ? item.category : item} className="w-full min-h-[80px]">
      {searchMode === "location" ? 
        <div className="w-full flex flex-col bg-teal rounded-2xl">
          <div className="w-full p-4">
            <div className="flex space-x-2 items-center">
              <>
                <span className="text-white font-semibold font-ubuntu-condensed text-lg">
                  {(item as Market)}
                </span>
              </>
            </div>
          </div>
        </div>
      : 
      <Button
        onClick={() => toggleEquipment(item)}
        className="p-0 w-full border-0 block h-auto" 
        variant="outline"
      >
        {!selectedEquipments.has((item as GroupedEquipment).category) ? (
          // Shows by sport
          <div className="bg-teal w-full flex items-center justify-between p-4 rounded-2xl">
            <div className="flex flex-col justify-start w-full">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-lg text-white font-ubuntu-condensed flex items-center">
                  {(item as GroupedEquipment).category}
                </span>
                <DownArrowIcon />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col bg-teal rounded-2xl">
            <div className="w-full p-4 pb-0">
              <div className="flex justify-between space-x-2 items-center">
                <span className="text-white font-semibold font-ubuntu-condensed text-lg">
                  {(item as GroupedEquipment).category}
                </span>
                <DownArrowIcon />
              </div>
            </div>
            
            <div className="p-6 pt-2  w-full">
              <div className="space-y-4 w-full">
                  <div className="space-y-5 text-left">
                    <div className="bg-teal-light2 rounded-xl p-4">
                      {(item as GroupedEquipment).products
                        .map((product) => (
                          <div key={product.name} className="space-y-2 mb-4 last:mb-0 px-4">
                            <li  className="text-white font-cabin-condensed grid grid-cols-2 text-left">
                              <span>{product.name}</span>
                            </li>
                          </div>
                        ))}
                    </div>
                  </div>
              </div>
            </div>
          </div>
        )}
      </Button>
      }
    </div>
  )
}

export default ListComponent;