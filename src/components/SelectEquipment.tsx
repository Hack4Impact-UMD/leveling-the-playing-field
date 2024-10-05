import React, { useState } from 'react';

const SelectEquipment = ({ onSelect, onQuantity, onRemove }: any) => {
    const [sportSelected, setSportSelected] = useState(false);

    const handleSportSelect = () => {
        setSportSelected(true);
    };

    return (
        <div className="flex justify-between items-center">
            {!sportSelected ? (
                <button
                    className="flex-1 bg-teal-700 text-white py-2 rounded-md font-semibold"
                    onClick={handleSportSelect}
                >
                    Select Sport
                </button>
            ) : (
                <>
                    <button
                        className="flex-1 bg-teal-700 text-white py-2 px-4 rounded-md mr-4 font-semibold"
                        onClick={onSelect}
                    >
                        Select Equipment
                    </button>
                    <button
                        className="bg-teal-700 text-white py-1 px-2 rounded-md font-semibold"
                        onClick={onQuantity}
                    >
                        Quantity
                    </button>
                    <button
                        className="text-red-600 font-bold ml-2 text-lg"
                        onClick={onRemove}
                    >
                        X
                    </button>
                </>
            )}
        </div>
    );
};

export default SelectEquipment;