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

export type Sport = "soccer" | "tennis" | "baseball" | "basketball"

export interface Equipment {
  name: string,
  quantity: number,
  sport: Sport
}

export const sportsIconsMap = new Map<string, JSX.Element>([
  ['soccer', <IconSoccer key="soccer" />],
  ['baseball', <IconBaseballOutline key="baseball" className="w-6 h-6" />],
  ['tennis', <IconTennisBall key="tennis" />],
  ['basketball', <IconBasketballOutline key="basketball" />]
]);

export const sportsItemsMap = new Map<string, string[]>([
  ['soccer', ['Soccer Cleats', 'Soccer Ball']],
  ['baseball', ['Baseball Mitts', 'Baseball Bat']],
  ['tennis', ['Tennis Rackets', 'Tennis Ball']],
  ['basketball', ['Basketball', 'Basketball Shoes']]
]);

const CheckoutPage = ({ lang, opportunityId }: { lang: Locale, opportunityId: number }) => {

  const [selectedEquipment, setSelectedEquipment] = useState<{ sport: Sport | "", equipment: Equipment[] }[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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
        const response = await fetch('/api/product'); // Hit the endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json(); // Parse JSON data

        console.log('Products:', data); // Use the data (e.g., set state here)
        setProducts(data);
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
        {getUnselectedSports().length > 0 && selectedEquipment.length < 4 && Array.from(sportsItemsMap.keys()).length && (
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
            selectSport={(newSport: Sport) => selectSport(index, newSport)}
            lang={lang}
          />
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
