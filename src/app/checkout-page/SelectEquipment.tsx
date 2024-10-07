import React, { useState } from 'react';
import IconSoccer from '../svgs/soccer';
import IconBaseballOutline from '../svgs/baseball';
import IconTennisBall from '../svgs/tennis';
import IconBasketballOutline from '../svgs/basketball';

interface Props {
    onRemove: () => void
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

const SelectEquipment = ({ onRemove }: Props) => {
    const [sportSelected, setSportSelected] = useState(false);
    const [quantity, setQuantity] = useState<number>(0);
    const [sport, setSport] = useState<string>("");
    const [equipment, setEquipment] = useState<string>("");

    const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuantity(Number(value));
    };

    const handleSport = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSport(String(value));
        setEquipment("");
        setQuantity(0);
        handleSportSelected(true);
    }

    const handleSportSelected = (value: boolean) => {
        setSportSelected(value);
    }

    const handleEquipment = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setEquipment(String(value));
    }

    return (
        <div className="flex justify-between space-x-2 items-center w-full">
            {!sportSelected ? (
                <select
                    value={sport}
                    onChange={handleSport}
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
                    <button
                        className="flex-row flex-none items-center bg-teal text-white py-2 px-2 rounded-md font-semibold"
                        onClick={() => { handleSportSelected(false); setSport(""); }}
                    >
                        <div className="flex items-center justify-center">
                            {sportsIconsMap.get(sport)}
                        </div>
                    </button>
                    <select
                        value={equipment}
                        className="bg-teal flex-auto text-white text-center py-2.5 px-4 rounded-md font-semibold w-40 sm:w-auto"
                        onChange={handleEquipment}
                    >
                        <option value="" disabled>Select Equipment</option>
                        {
                            sportsItemsMap.get(sport)?.map((item, index) => (
                                <option value={sport} key={index}>{item}</option>
                            ))
                        }
                    </select>
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={handleQuantity}
                        className="border flex-auto rounded-md bg-teal text-white w-16 py-2 px-4 sm:w-12"
                    />
                    <button
                        className="text-red-600 flex-none font-bold py-2 rounded-md text-lg sm:w-auto"
                        onClick={onRemove}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
};

export default SelectEquipment;