"use client";
import React, { useState } from "react";
import SelectEquipment from "./SelectEquipment";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";

export type Sport = "soccer" | "tennis" | "baseball" | "basketball"

export interface Equipment {
  name: string,
  quantity: number,
  sport: Sport
}

const Checkout = () => {
  // const [equipmentList, setEquipmentList] = useState([
  //   { id: 1, name: "Select Equipment", quantity: 1 },
  // ]);

  const [equipmentList, setEquipmentList] = useState<{ sport: Sport | "", equipment: Equipment[] }[]>([]);

  const removeEquipment = (sport: Sport | "", equipment: Equipment) => {
    setEquipmentList((prevList) =>
      prevList.map((item) =>
        item.sport === sport
          ? { ...item, equipment: item.equipment.filter((e) => e.name !== equipment.name) }
          : item
      )
    );
  };

  const removeSport = (sport: Sport | "") => {
    setEquipmentList((prevList) => prevList.filter((item) => item.sport !== sport));
  };

  const selectSport = (index: number, newSport: Sport) => {
    setEquipmentList((prevList) => {
      const sportExists = prevList.some((item, i) => item.sport === newSport && i !== index);

      if (sportExists) return prevList;

      const updatedList = [...prevList];
      updatedList[index] = { equipment: [], sport: newSport };

      return updatedList;
    });
  };


  const addSport = (sport: Sport | "") => {
    setEquipmentList((prevList) => {
      if (prevList.some((item) => item.sport !== "" && item.sport === sport)) return prevList;

      return [...prevList, { sport, equipment: [] }];
    });
  };

  const updateEquipmentList = (index: number, newEquipmentList: Equipment[]) => {
    setEquipmentList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = { ...updatedList[index], equipment: newEquipmentList };
      return updatedList;
    });
  };

  return (
    <div className="flex flex-col items-center bg-white h-screen p-8 overflow-scroll">
      <h1 className="text-3xl font-bold mb-4 text-black">Add Equipment</h1>
      <div className="mb-6 rounded-full w-24 h-24 bg-teal text-white flex items-center justify-center p-4">
        <ShoppingCartIcon />
      </div>
      <div className="w-full max-w-md space-y-4">
        <button onClick={() => addSport("")} className="w-full bg-teal text-white py-3 rounded-md mt-8 font-semibold">
          Add Sport
        </button>
        {equipmentList.map(({ sport, equipment }, index) => (
          <SelectEquipment
            key={index}
            sport={sport}
            equipmentList={equipment}
            updateEquipment={(newEquipment: Equipment[]) => updateEquipmentList(index, newEquipment)}
            removeEquipment={removeEquipment}
            removeSport={removeSport}
            selectSport={(newSport: Sport) => selectSport(index, newSport)}
          />
        ))}
        {/* <select
          value={sport}
          onChange={handleSport}
          className="w-full bg-teal text-white py-2 px-4 rounded-md font-semibold text-center"
        >
          <option value="" disabled>Add Sport</option>
          <option value="soccer">Soccer</option>
          <option value="basketball">Basketball</option>
          <option value="baseball">Baseball</option>
          <option value="tennis">Tennis</option>
        </select> */}
        {/* {equipmentList.map((item) => (
          <SelectEquipment
            key={item.id}
            onRemove={() => handleRemove(item.id)}
          />
        ))} */}

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
