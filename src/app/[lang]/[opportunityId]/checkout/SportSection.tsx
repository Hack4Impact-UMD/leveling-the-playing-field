import React, { useState } from "react";
import { Equipment, SportsItems } from "./CheckoutPage";
import XIcon from "@/components/icons/XIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import EquipmentSelector from "./EquipmentSelector";
import EquipmentItem from "./EquipmentItem";

interface Props {
    removeSelectedSport: (sport: string | "") => void;
    removeSelectedEquipment: (sport: string | "", equipment: Equipment) => void;
    selectSport: (newSport: string) => void;
    updateSelectedEquipment: (newEquipment: Equipment[]) => void;
    unselectedSports: string[];
    selectedEquipment: Equipment[];
    sport: string | "";
    sportsItemsMap: SportsItems;
    dict: { [key: string]: any };
}

const SportSection = ({
    removeSelectedSport,
    removeSelectedEquipment,
    selectSport,
    updateSelectedEquipment,
    unselectedSports,
    sport,
    selectedEquipment,
    sportsItemsMap,
    dict,
}: Props) => {
    const [renderEquipment, setRenderEquipment] = useState<boolean>(true);

    const updateEquipmentQuantity = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            event.target.value = "0";
        }
        let value = Number(event.target.value);
        if (value < 0) {
            value = 1;
        }
        const updatedEquipmentList = [...selectedEquipment];
        updatedEquipmentList[index].quantity = value;
        updateSelectedEquipment(updatedEquipmentList);
    };

    const handleSportSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "") {
            return;
        }
        const selectedSport = e.target.value as string;
        selectSport(selectedSport);
    };

    const handleSelectNewEquipment = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (!value || !sport) return;

        const newEquipment: Equipment = { name: value, quantity: 1, sport: sport };
        if (selectedEquipment.some((equipment) => equipment.name === value && equipment.sport === sport)) {
            return;
        }
        updateSelectedEquipment([...selectedEquipment, newEquipment]);
    };

    const handleUpdateEquipment = (oldEquipment: Equipment, index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (!value || !sport) return;

        const newEquipment: Equipment = { ...oldEquipment, name: value };
        const updatedList = [...selectedEquipment];
        updatedList[index] = newEquipment;
        updateSelectedEquipment(updatedList);
    };

    const getUnselectedEquipment = () => {
        const allEquipment = sportsItemsMap[sport];
        if (!allEquipment) {
            return [];
        }

        return allEquipment.filter(
            (equipment) => !selectedEquipment.map((item) => item.name).includes(equipment.name)
        );
    };

    return (
        <div className="flex flex-col space-y-2">
            {sport === "" ? (
                <select
                    value={sport}
                    onChange={handleSportSelect}
                    className="flex-1 bg-teal-light text-black text-center py-2.5 rounded-md font-semibold w-full sm:w-auto"
                >
                    <option value="" disabled>
                        {dict.checkoutPage.selectSport.text}
                    </option>
                    {unselectedSports.map((sportItem) => (
                        <option value={sportItem} key={sportItem}>
                            {sportItem.charAt(0).toUpperCase() + sportItem.slice(1)}
                        </option>
                    ))}
                </select>
            ) : (
                <>
                    <div className="flex justify-between space-x-2 items-center w-full">
                        <div className="flex flex-row flex-1 justify-between items-center text-left bg-green text-black py-2 pl-6 px-2 rounded-md font-semibold">
                            <span>
                                {dict.checkoutPage.selected.text} {sport.charAt(0).toUpperCase() + sport.slice(1)}
                            </span>
                            <button onClick={() => setRenderEquipment((prev) => !prev)}>
                                {renderEquipment ? <MinusIcon /> : <PlusIcon />}
                            </button>
                        </div>
                        <button
                            className="text-red-600 flex-none font-bold py-2 rounded-md text-lg sm:w-auto"
                            onClick={() => removeSelectedSport(sport)}
                        >
                            <XIcon />
                        </button>
                    </div>
                    {renderEquipment && (
                        <>
                            {selectedEquipment.map((equipment, index) => (
                                <EquipmentItem
                                    key={index}
                                    equipment={equipment}
                                    index={index}
                                    sport={sport}
                                    sportsItemsMap={sportsItemsMap}
                                    handleUpdateEquipment={handleUpdateEquipment}
                                    updateEquipmentQuantity={updateEquipmentQuantity}
                                    removeEquipment={removeSelectedEquipment}
                                    dict={dict}
                                />
                            ))}
                            {getUnselectedEquipment().length > 0 && (
                                <EquipmentSelector
                                    availableEquipment={getUnselectedEquipment()}
                                    handleSelectEquipment={handleSelectNewEquipment}
                                    dict={dict}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default SportSection;
