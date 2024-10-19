"use client";
import React, { useState } from "react";
import SelectEquipment from "./SelectEquipment";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";

const Checkout = () => {
  const [equipmentList, setEquipmentList] = useState([
    { id: 1, name: "Select Equipment", quantity: 1 },
  ]);

  const [sport, setSport] = useState<string>("")

  const addEquipment = () => {
    const last = equipmentList.at(equipmentList.length - 1)?.id ?? 0;
    setEquipmentList([
      ...equipmentList,
      { id: last + 1, name: "Select Equipment", quantity: 1 },
    ]);
  };

  const handleRemove = (id: number) => {
    setEquipmentList(equipmentList.filter((item) => item.id !== id));
  };

  const handleSport = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSport(String(value));
  }

  return (
    <div className="flex flex-col items-center bg-white h-screen p-8 overflow-scroll">
      <h1 className="text-3xl font-bold mb-4 text-black">Add Equipment</h1>
      <div className="mb-6 rounded-full w-24 h-24 bg-teal text-white flex items-center justify-center p-4">
        <ShoppingCartIcon />
      </div>

      <div className="w-full max-w-md space-y-4">
        <select
          value={sport}
          onChange={handleSport}
          className="w-full bg-teal text-white py-2 px-4 rounded-md font-semibold text-center"
        >
          <option value="" disabled>Select Sport</option>
          <option value="soccer">Soccer</option>
          <option value="basketball">Basketball</option>
          <option value="baseball">Baseball</option>
          <option value="tennis">Tennis</option>
        </select>
        {equipmentList.map((item) => (
          <SelectEquipment
            key={item.id}
            onRemove={() => handleRemove(item.id)}
          />
        ))}

        {/* <button
          onClick={addEquipment}
          className="w-full bg-teal text-white py-2 px-4 rounded-md font-semibold"
        >
          + Add Equipment
        </button> */}
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
