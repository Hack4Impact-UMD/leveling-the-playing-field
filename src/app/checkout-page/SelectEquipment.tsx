import React, { useState } from 'react';
import IconSoccer from '../svgs/soccer';
import IconBaseballOutline from '../svgs/baseball';
import IconTennisBall from '../svgs/tennis';
import IconBasketballOutline from '../svgs/basketball';
import { Sport, Equipment } from './Checkout';

interface Props {
    removeSport: (sport: Sport | "") => void,
    removeEquipment: (sport: Sport | "", equipment: Equipment) => void,
    selectSport: (newSport: Sport) => void,
    updateEquipment: (newEquipment: Equipment[]) => void,
    equipmentList: Equipment[],
    sport: Sport | ""
}

const sportsIconsMap = new Map<string, JSX.Element>([
    ['soccer', <IconSoccer key="soccer" className="w-6 h-6" />],
    ['baseball', <IconBaseballOutline key="baseball" className="w-6 h-6" />],
    ['tennis', <IconTennisBall key="tennis" className="w-6 h-6" />],
    ['basketball', <IconBasketballOutline key="basketball" className="w-6 h-6" />]
]);

const sportsItemsMap = new Map<string, string[]>([
    ['soccer', ['Soccer Cleats']],
    ['baseball', ['Baseball Mitts']],
    ['tennis', ['Tennis Rackets']],
    ['basketball', ['Basketball']]
]);

const SelectEquipment = ({ removeSport, removeEquipment, selectSport, updateEquipment, sport, equipmentList }: Props) => {

    const handleQuantity = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(event.target.value);
        if (value < 1) {
            value = 1;
        }
        const updatedEquipmentList = [...equipmentList];
        updatedEquipmentList[index].quantity = value;
        updateEquipment(updatedEquipmentList);
    };
    const handleSportSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "") {
            return;
        }
        const selectedSport = e.target.value as Sport;
        selectSport(selectedSport);
    };

    const handleAddEquipment = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (!value || !sport) return;

        const newEquipment: Equipment = { name: value, quantity: 0, sport: sport };
        if (equipmentList.some((equipment) => equipment.name === value && equipment.sport === sport)) {
            return;
        }
        updateEquipment([...equipmentList, newEquipment])
    };

    return (
        <div className="flex flex-col space-y-2">
            {sport === "" ? (
                <select
                    value={sport}
                    onChange={handleSportSelect}
                    className="flex-1 bg-teal text-white text-center py-2.5 rounded-md font-semibold w-full sm:w-auto"
                >
                    <option value="" disabled>Select Sport</option>
                    <option value="soccer">Soccer</option>
                    <option value="basketball">Basketball</option>
                    <option value="baseball">Baseball</option>
                    <option value="tennis">Tennis</option>
                </select>
            ) : (
                <>
                    <div className="flex-1 bg-teal text-white text-center py-2.5 rounded-md font-semibold w-full sm:w-auto">
                        {sport}
                    </div>
                    {equipmentList.map((equipment, index) => (
                        <div key={index} className="flex justify-between space-x-2 items-center w-full">
                            <button
                                className="flex-row flex-none items-center bg-teal text-white py-2 px-2 rounded-md font-semibold"
                            >
                                <div className="flex items-center justify-center">
                                    {sportsIconsMap.get(sport)}
                                </div>
                            </button>
                            <select
                                value={equipment.name}
                                className="bg-teal flex-auto text-white text-center py-2.5 px-4 rounded-md font-semibold w-40 sm:w-auto"
                                onChange={handleAddEquipment}
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
                                onChange={(e) => handleQuantity(index, e)}
                                className="bg-teal flex-auto rounded-md text-white border w-16 py-2 px-4 sm:w-12"
                            />
                            <button
                                className="text-red-600 flex-none font-bold py-2 rounded-md text-lg sm:w-auto"
                                onClick={() => removeEquipment(sport, equipment)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1-3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-between space-x-2 items-center w-full">
                        <select
                            value={""}
                            className="bg-teal flex-auto text-white text-center py-2.5 px-4 rounded-md font-semibold w-40 sm:w-auto"
                            onChange={handleAddEquipment}
                        >
                            <option value="" disabled>Select Equipment</option>
                            {sportsItemsMap.get(sport)?.map((item, i) => (
                                <option value={item} key={i}>{item}</option>
                            ))}
                        </select>
                    </div>
                </>
            )
            }
        </div >
    );
};

export default SelectEquipment;
