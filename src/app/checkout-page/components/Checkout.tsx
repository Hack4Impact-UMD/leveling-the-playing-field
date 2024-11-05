"use client";
import React, { useState } from "react";
import SportSection from "../SportSection";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import IconSoccer from "../../../components/icons/sports/SoccerIcon";
import IconBaseballOutline from "../../../components/icons/sports/BaseballIcon";
import IconTennisBall from "../../../components/icons/sports/TennisIcon";
import IconBasketballOutline from "../../../components/icons/sports/BasketballIcon";

export type Sport = "soccer" | "tennis" | "baseball" | "basketball"

export interface Equipment {
  name: string,
  quantity: number,
  sport: Sport
}


export const sportsIconsMap = new Map<string, JSX.Element>([
  ['soccer', <IconSoccer key="soccer"/>],
  ['baseball', <IconBaseballOutline key="baseball" className="w-6 h-6" />],
  ['tennis', <IconTennisBall key="tennis"/>],
  ['basketball', <IconBasketballOutline key="basketball"/>]
]);

export const sportsItemsMap = new Map<string, string[]>([
  ['soccer', ['Soccer Cleats', 'Soccer Ball']],
  ['baseball', ['Baseball Mitts', 'Baseball Bat']],
  ['tennis', ['Tennis Rackets', 'Tennis Ball']],
  ['basketball', ['Basketball', 'Basketball Shoes']]
]);

const Checkout = () => {

  const [selectedEquipment, setSelectedEquipment] = useState<{ sport: Sport | "", equipment: Equipment[] }[]>([]);

  const removeSelectedEquipment = (sport: Sport | "", equipment: Equipment) => {
    setSelectedEquipment((prevList) =>
      prevList.map((item) =>
        item.sport === sport
          ? { ...item, equipment: item.equipment.filter((e) => e.name !== equipment.name) }
          : item
      )
    );
  };

  const removeSelectedSport = (sport: Sport | "") => {
    setSelectedEquipment((prevList) => prevList.filter((item) => item.sport !== sport));
  };

  const selectSport = (index: number, newSport: Sport) => {
    setSelectedEquipment((prevList) => {
      const sportExists = prevList.some((item, i) => item.sport === newSport && i !== index);

      if (sportExists) return prevList;

      const updatedList = [...prevList];
      updatedList[index] = { equipment: [], sport: newSport };

      return updatedList;
    });
  };


  const addSportSection = (sport: Sport | "") => {
    setSelectedEquipment((prevList) => {
      if (prevList.some((item) => item.sport !== "" && item.sport === sport)) return prevList;

      return [...prevList, { sport, equipment: [] }];
    });
  };

  const updateSelectedEquipment = (index: number, newEquipmentList: Equipment[]) => {
    setSelectedEquipment((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = { ...updatedList[index], equipment: newEquipmentList };
      return updatedList;
    });
  };

  const getUnselectedSports = (): Sport[] => {
    const allSports = Array.from(sportsItemsMap.keys()) as Sport[];

    const selectedSports = new Set(selectedEquipment.map((item) => item.sport));
    return allSports.filter((sport) => !selectedSports.has(sport));
  };

  return (
    <div className="flex flex-col items-center bg-white h-screen p-8 overflow-scroll">
      <h1 className="text-3xl font-bold mb-4 text-black">Add Equipment</h1>
      <div className="mb-6 rounded-full w-24 h-24 bg-teal text-white flex items-center justify-center p-4">
        <ShoppingCartIcon />
      </div>
      <div className="w-full max-w-md space-y-4">
        {getUnselectedSports().length > 0 && selectedEquipment.length < 4 && Array.from(sportsItemsMap.keys()).length && (
          <button onClick={() => {
            if (getUnselectedSports().length == 0) {
              return;
            } else {
              addSportSection("");
            }
          }
          } className="w-full bg-teal text-white py-3 rounded-md mt-8 font-semibold">
            Add Category
          </button>)
        }
        {selectedEquipment.map(({ sport, equipment }, index) => (
          <SportSection
            key={sport === "" ? sport + index : sport}
            sport={sport}
            selectedEquipment={equipment}
            unselectedSports={getUnselectedSports()}
            updateSelectedEquipment={(newEquipment: Equipment[]) => updateSelectedEquipment(index, newEquipment)}
            removeSelectedEquipment={removeSelectedEquipment}
            removeSelectedSport={removeSelectedSport}
            selectSport={(newSport: Sport) => selectSport(index, newSport)}
          />
        ))}
      </div>

      <div className="w-full max-w-md mt-auto">
        <button className="w-full bg-teal text-white py-3 rounded-md mt-8 font-semibold">
          CHECKOUT
        </button>
        <div className="w-full mt-20"></div>
      </div>
    </div>
  );
};

export default Checkout;
