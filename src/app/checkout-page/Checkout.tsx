"use client";
import React, { useState } from "react";
import SelectEquipment from "./SelectEquipment";

const Checkout = () => {
  const [equipmentList, setEquipmentList] = useState([
    { id: 1, name: "Select Equipment", quantity: 1 },
  ]);

  const addEquipment = () => {
    setEquipmentList([
      ...equipmentList,
      { id: equipmentList.length + 1, name: "Select Equipment", quantity: 1 },
    ]);
  };

  const handleRemove = (id: number) => {
    setEquipmentList(equipmentList.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col items-center bg-white h-screen p-8 overflow-scroll">
      <div className="mb-6">
        <img src="/_images/logo.png" alt="LPF Logo" className="w-20 h-auto" />
      </div>
      <h1 className="text-3xl font-bold mb-8 text-black">Checkout</h1>

      <div className="w-full max-w-md space-y-4">
        {equipmentList.map((item) => (
          <SelectEquipment
            key={item.id}
            onRemove={() => handleRemove(item.id)}
          />
        ))}

        <button
          onClick={addEquipment}
          className="w-full bg-teal text-white py-2 px-4 rounded-md font-semibold"
        >
          + Add Equipment
        </button>
      </div>

      <div className="w-full max-w-md mt-auto">
        <button className="w-full bg-teal text-white py-3 rounded-md mt-8 font-semibold">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Checkout;
