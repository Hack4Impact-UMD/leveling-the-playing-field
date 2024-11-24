import XIcon from '@/components/icons/XIcon';
import React, { useEffect, useState } from 'react';
import { Equipment, SportsItems } from './CheckoutPage';
import { getDict, Locale } from '@/lib/i18n/dictionaries';

interface EquipmentItemProps {
    equipment: Equipment;
    index: number;
    sport: string;
    sportsItemsMap: SportsItems;
    handleUpdateEquipment: (equipment: Equipment, index: number, e: React.ChangeEvent<HTMLSelectElement>) => void;
    updateEquipmentQuantity: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    removeEquipment: (sport: string, equipment: Equipment) => void;
    lang: Locale;
}

const EquipmentItem = ({
    equipment,
    index,
    sport,
    sportsItemsMap,
    handleUpdateEquipment,
    updateEquipmentQuantity,
    removeEquipment,
    lang
}: EquipmentItemProps) => {
    const [placeholder, setPlaceholder] = useState("");

    useEffect(() => {
        const loadPlaceholder = async () => {
            const dict = await getDict(lang);
            setPlaceholder(dict.checkoutPage.quantity.text);
        };

        loadPlaceholder();
    }, [lang]);

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
                <option value="" disabled>{getDict(lang).then((d) => d.checkoutPage.selectedEquipment.text)}</option>
                {sportsItemsMap[sport].map((item, i) => (
                    <option value={item.name} key={i}>{item.name}</option>
                ))}
            </select>
            <input
                type="number"
                min={1}
                placeholder={placeholder}
                value={equipment.quantity === 0 ? "" : equipment.quantity}
                onChange={(e) => updateEquipmentQuantity(index, e)}
                onBlur={(e) => {
                    if (e.target.value === "") {
                        e.target.value = "1";
                        updateEquipmentQuantity(index, e);
                    }
                }}
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