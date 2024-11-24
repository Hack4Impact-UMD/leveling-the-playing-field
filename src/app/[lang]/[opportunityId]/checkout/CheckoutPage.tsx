"use client";
import React, { useEffect, useState } from "react";
import SportSection from "./SportSection";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import IconSoccer from "@/components/icons/sports/SoccerIcon";
import IconBaseballOutline from "@/components/icons/sports/BaseballIcon";
import IconTennisBall from "@/components/icons/sports/TennisIcon";
import IconBasketballOutline from "@/components/icons/sports/BasketballIcon";
import { getDict, Locale } from "@/lib/i18n/dictionaries";
import { Product } from "@/types/types";

export interface Equipment {
  name: string,
  quantity: number,
  sport: string
}

const CheckoutPage = ({ lang, opportunityId }: { lang: Locale, opportunityId: number }) => {

  const [selectedEquipment, setSelectedEquipment] = useState<{ sport: string | "", equipment: Equipment[] }[]>([]);
  const [sportsItemsMap, setSportsItemsMap] = useState<Map<string, Product[]>>(new Map<string, Product[]>());

  const removeSelectedEquipment = (sport: string | "", equipment: Equipment) => {
    setSelectedEquipment((prevList) =>
      prevList.map((item) =>
        item.sport === sport
          ? { ...item, equipment: item.equipment.filter((e) => e.name !== equipment.name) }
          : item
      )
    );
  };

  const removeSelectedSport = (sport: string | "") => {
    setSelectedEquipment((prevList) => prevList.filter((item) => item.sport !== sport));
  };

  const selectSport = (index: number, newSport: string) => {
    setSelectedEquipment((prevList) => {
      const sportExists = prevList.some((item, i) => item.sport === newSport && i !== index);

      if (sportExists) return prevList;

      const updatedList = [...prevList];
      updatedList[index] = { equipment: [], sport: newSport };

      return updatedList;
    });
  };


  const addSportSection = (sport: string | "") => {
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

  const getUnselectedSports = (): string[] => {
    if (!sportsItemsMap || sportsItemsMap.size === 0) {
      return [];
    }

    console.log(sportsItemsMap);
    try {
      const allSports = Array.from(Object.keys(sportsItemsMap)) as string[];
      console.log("allSports:", allSports);

      const selectedSports = new Set(selectedEquipment.map((item) => item.sport));
      return allSports.filter((sport) => !selectedSports.has(sport));
    } catch (error) {
      console.error("error getting unselected sports: ", error);
      console.log(typeof (sportsItemsMap));
    }
    return []
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(`/api/opportunity/${opportunityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({ StageName: "Posted" })
      })
      if (!response.ok) {
        console.warn("Failed to checkout")
      }
    } catch (error) {
      console.error("Error when checking out:", error);
    }
  }

  useEffect(() => {
    const loadProductData = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Map<string, Product[]> = await response.json();
        if (data) {
          setSportsItemsMap(data);
        } else {
          console.error("Failed to get products data")
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProductData();
  }, []);

  return (
    <div className="flex flex-col items-center bg-white h-screen p-8 overflow-scroll">
      <h1 className="text-3xl font-bold mb-4 text-black">{getDict(lang).then((d) => d.checkoutPage.addSport.text)}</h1>
      <div className="mb-6 rounded-full w-24 h-24 bg-teal text-white flex items-center justify-center p-4">
        <ShoppingCartIcon />
      </div>
      <div className="w-full max-w-md space-y-4">
        {getUnselectedSports().length > 0 && selectedEquipment.length < 4 && sportsItemsMap && Array.from(Object.keys(sportsItemsMap)).length && (
          <button onClick={() => {
            if (getUnselectedSports().length == 0) {
              return;
            } else {
              addSportSection("");
            }
          }
          } className="w-full bg-teal text-white py-3 rounded-md mt-8 font-semibold">
            {getDict(lang).then((d) => d.checkoutPage.addSport.text)}
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
            selectSport={(newSport: string) => selectSport(index, newSport)}
            lang={lang}
            sportsItemsMap={sportsItemsMap} />
        ))}
      </div>

      <div className="w-full max-w-md mt-auto">
        <button className="w-full bg-teal text-white py-3 rounded-md mt-8 font-semibold"
          onClick={handleCheckout}>
          {getDict(lang).then((d) => d.checkoutPage.checkout.text)}
        </button>
        <div className="w-full mt-20"></div>
      </div>
    </div>
  );
};

export default CheckoutPage;
