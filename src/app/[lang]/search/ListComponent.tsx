import React from "react";
import { Button } from "@/components/ui/Button"
import DownArrowIcon from '@/components/icons/DownArrowIcon';
import LocationIcon from '@/components/icons/LocationIcon';

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

interface FilterValues {
  warehouse: String;
  sport: String;
}

interface EquipmentItem {
  name: string;
  sport: string;
  quantity: number;
}

interface ListCompProps {
  item: GroupedEquipment | LocationEquipment;
  selectedEquipments: Set<String>;
  searchMode: String;
  appliedFilters: FilterValues;
  // equipment: String[];
  groupEquipmentBySport: (equipment: EquipmentItem[]) => Record<string, EquipmentItem[]>;
  toggleEquipment: (item: GroupedEquipment | LocationEquipment) => void;
}

const ListComponent: React.FC<ListCompProps> = ({item, selectedEquipments, searchMode, appliedFilters, groupEquipmentBySport, toggleEquipment }) => {
  return (
    <div key={'warehouse' in item ? item.warehouse : item.name} className="w-full min-h-[80px]">
      <Button
        onClick={() => toggleEquipment(item)}
        className="p-0 w-full border-0 block h-auto" 
        variant="outline"
      >
        {!selectedEquipments.has('warehouse' in item ? item.warehouse : item.name) ? (
          // Shows by sport
          <div className="bg-teal w-full flex items-center justify-between p-4 rounded-2xl">
            <div className="flex flex-col justify-start w-full">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-lg text-white font-ubuntu-condensed flex items-center">
                  {'name' in item ? item.name : (item as LocationEquipment).warehouse}
                  {'sport' in item && (
                    <div className="bg-teal-light2 px-3 -py-5 rounded-xl inline-block ml-2">
                      <span className="text-white font-semibold font-ubuntu-condensed text-sm">
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
                    <span className="text-white font-semibold font-ubuntu-condensed text-lg">
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
                    <span className="text-white font-semibold font-ubuntu-condensed text-lg">
                      {(item as GroupedEquipment).name}
                    </span>
                    <div className="bg-teal-light2 px-3 rounded-xl inline-block">
                      <span className="text-white font-semibold font-ubuntu-condensed text-sm">
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
                  <div className="space-y-5 text-left">
                    <div className="bg-teal-light2 rounded-xl p-4">
                      <div className="flex items-center [&_svg]:w-5 [&_svg]:h-5 leading-none">
                        <p className="text-white align-middle font-ubuntu-condensed text-lg mb-4 pl-2 pt-4">Equipment Available</p>
                      </div>
                      {Object.entries(groupEquipmentBySport((item as LocationEquipment).equipment))
                        .filter(([sport]) => appliedFilters.sport === 'all' || sport === appliedFilters.sport)
                        .map(([sport, equipment]) => (
                          <div key={sport} className="space-y-2 mb-4 last:mb-0 px-4">
                            <div className="bg-orange-light rounded-xl px-4 inline-block">
                              <p className="text-white font-semibold font-ubuntu-condensed text-left">{sport}</p>
                            </div>
                            <ul className="space-y-2">
                              {equipment.map((eq, index) => (
                                <li key={index} className="text-white font-cabin-condensed grid grid-cols-2 text-left">
                                  <span>{eq.name}</span>
                                  <span>{eq.quantity} Units Available</span>
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
                      <div key={index} className="bg-teal-light2 rounded-xl p-2 -mt-8">
                        <div className="flex items-center space-x-2 mb-2 pt-1 [&_svg]:w-5 [&_svg]:h-5 [&_svg]:fill-orange">
                          <LocationIcon color="#FF753B" />
                          <p className="text-white text-lg font-ubuntu-condensed -pl-2">{location.warehouse}</p>
                        </div>
                        <span className="inline-flex justify-between items-center w-full p-2">
                          <p className="text-white font-cabin-condensed pl-5">Units Available:</p>
                          <p className="text-white font-cabin-condensed pr-10">{location.quantity} units</p>
                        </span>
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
  )
}

export default ListComponent;