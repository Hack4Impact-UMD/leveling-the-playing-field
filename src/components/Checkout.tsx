"use client"
import React, { useState } from 'react';
import SelectEquipment from './SelectEquipment';

const Checkout = () => {
    const [equipmentList, setEquipmentList] = useState([{ id: 1, name: "Select Equipment", quantity: 1 }]);

    const addEquipment = () => {
        setEquipmentList([...equipmentList, { id: equipmentList.length + 1, name: "Select Equipment", quantity: 1 }]);
    };

    const handleSelect = () => {
        console.log('Equipment selected');
    };

    const handleQuantity = () => {
        console.log('Quantity selected');
    };

    const handleRemove = (id: number) => {
        setEquipmentList(equipmentList.filter(item => item.id !== id));
    };

    return (
        <div className="flex flex-col items-center bg-gray-200 h-screen p-8">
            <div className="mb-6">
                <img src="/lpf-logo.png" alt="LPF Logo" className="w-20 h-auto" />
            </div>
            <h1 className="text-3xl font-bold mb-8 text-black">Checkout</h1>

            <div className="w-full max-w-md space-y-4">
                {equipmentList.map((item) => (
                    <SelectEquipment key={item.id}
                        onSelect={handleSelect}
                        onQuantity={handleQuantity}
                        onRemove={() => handleRemove(item.id)}
                    />
                ))}

                <button
                    onClick={addEquipment}
                    className="w-full bg-teal-700 text-white py-2 px-4 rounded-md font-semibold"
                >
                    + Add Equipment
                </button>
            </div>

            <div className="w-full max-w-md mt-auto">
                <button className="w-full bg-teal-700 text-white py-3 rounded-md font-semibold">
                    CHECKOUT
                </button>
            </div>
        </div>
    );
};

export default Checkout;
