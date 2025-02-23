import React, { useState } from "react";
import { Equipment, SportsItems } from "./CheckoutPage";
import XIcon from "@/components/icons/XIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import EquipmentSelector from "./EquipmentSelector";
import EquipmentItem from "./EquipmentItem";
import { useI18n } from "@/components/I18nProvider";

interface Props {
    removeSelectedSport: (sport: string) => void;
    removeSelectedEquipment: (sport: string, equipment: Equipment) => void;
    selectSport: (newSport: string) => void;
    updateSelectedEquipment: (newEquipment: Equipment[]) => void;
    unselectedSports: string[];
    selectedEquipment: Equipment[];
    sport: string;
    sportsItemsMap: SportsItems;
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
}: Props) => {
    const [renderEquipment, setRenderEquipment] = useState<boolean>(true);
    const { dict } = useI18n();

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
        const productId = event.target.value;
        if (!productId || !sport) return;
        const selectedProduct = sportsItemsMap[sport]?.find((product) => product.id === productId);

        if (!selectedProduct) {
            console.warn("Selected product not found");
            return;
        }

        if (selectedEquipment.some((equipment) => equipment.product.id === selectedProduct.id)) {
            return;
        }

        const newEquipment: Equipment = {
            product: selectedProduct,
            quantity: 1,
        };

        updateSelectedEquipment([...selectedEquipment, newEquipment]);
    };

    const handleUpdateEquipment = (oldEquipment: Equipment, index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
        const productId = e.target.value;
        if (!productId || !sport) return;
        const selectedProduct = sportsItemsMap[sport]?.find((product) => product.id === productId);
        if (!selectedProduct) {
            console.warn("Selected product not found");
            return;
        }

        const newEquipment: Equipment = { ...oldEquipment, product: selectedProduct };
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
            (equipment) => !selectedEquipment.map((item) => item.product.id).includes(equipment.id)
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
                                />
                            ))}
                            {getUnselectedEquipment().length > 0 && (
                                <EquipmentSelector
                                    availableEquipment={getUnselectedEquipment()}
                                    handleSelectEquipment={handleSelectNewEquipment}
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
