import XIcon from '@/components/icons/XIcon';
import React from 'react';
import { Equipment, Sport } from './Checkout';

interface EquipmentItemProps {
    equipment: Equipment;
    index: number;
    sport: Sport;
    sportsItemsMap: Map<string, string[]>;
    handleUpdateEquipment: (equipment: Equipment, index: number, e: React.ChangeEvent<HTMLSelectElement>) => void;
    updateEquipmentQuantity: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    removeEquipment: (sport: Sport | "", equipment: Equipment) => void;
}

const EquipmentItem = ({
    equipment,
    index,
    sport,
    sportsItemsMap,
    handleUpdateEquipment,
    updateEquipmentQuantity,
    removeEquipment
}: EquipmentItemProps) => {
    return (
        <div className="flex justify-between space-x-2 items-center w-full">
            <div className="flex-row flex-none items-center bg-white text-white py-2 px-2 rounded-md font-semibold">
                {/* Optional content */}
            </div>
            <select
                value={equipment.name}
                className="bg-green-light flex-auto text-black text-center py-2.5 px-4 rounded-md font-semibold w-40 sm:w-auto"
                onChange={(e) => handleUpdateEquipment(equipment, index, e)}
            >
                <option value="" disabled>Select Equipment</option>
                {sportsItemsMap.get(sport)?.map((item, i) => (
                    <option value={item} key={i}>{item}</option>
                ))}
            </select>
            <input
                type="number"
                min={1}
                placeholder="Quantity"
                value={equipment.quantity}
                onChange={(e) => updateEquipmentQuantity(index, e)}
                className="bg-green-light flex-auto rounded-md text-black border w-16 py-2 px-4 sm:w-12"
            />
            <button
                className="text-red-600 flex-none font-bold py-2 rounded-md text-lg sm:w-auto"
                onClick={() => removeEquipment(sport, equipment)}
            >
                <XIcon />
            </button>
        </div>
    );
};

export default EquipmentItem;
