"use client";
import React, { useEffect, useRef, useState } from "react";
import SportSection from "./SportSection";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import { Product } from "@/types/types";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useAuth } from "@/components/auth/AuthProvider";
import { useI18n } from "@/components/I18nProvider";

export interface Equipment {
  product: Product;  // Contains Product object with id, name, and category
  quantity: number;
}

export interface SportsItems {
  [key: string]: Product[];
}

const CheckoutPage = ({ opportunityId }: { opportunityId: string }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<{ sport: string; equipment: Equipment[] }[]>([]);
  const [sportsItemsMap, setSportsItemsMap] = useState<SportsItems>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [checkoutError, setCheckoutError] = useState<boolean>(false);
  const loadedPosted = useRef<boolean>(false);

  const router = useRouter();
  const auth = useAuth();
  const { dict, locale } = useI18n();

  const removeSelectedEquipment = (sport: string, equipment: Equipment) => {
    setSelectedEquipment((prevList) =>
      prevList.map((item) =>
        item.sport === sport
          ? { ...item, equipment: item.equipment.filter((e) => e.product.id !== equipment.product.id) }
          : item
      )
    );
  };

  const removeSelectedSport = (sport: string) => {
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

  const addSportSection = (sport: string) => {
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

  const handleCheckout = async () => {
    const productList = selectedEquipment.flatMap(({ equipment }) =>
      equipment.map(({ product, quantity }) => ({
        PricebookEntryId: product.id,
        Quantity: quantity,
      }))
    );
    try {
      const response = await fetch(`/api/opportunities/${opportunityId}/checkout?idToken=${auth.token?.token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: productList,
        }),
      });
      if (!response.ok) {
        console.warn("Failed to checkout");
        setCheckoutError(true);
        return;
      }
      router.push(`/${locale}/d/receipts`)
    } catch (error) {
      console.error("Error when checking out:", error);
    }
  };

  useEffect(() => {
    const loadProductData = async () => {
      try {
        const response = await fetch(`/api/products?idToken=${auth.token?.token}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: SportsItems = await response.json();
        setSportsItemsMap(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const loadOpportunityStage = async () => {
      try {
        const response = await fetch(`/api/opportunities/${opportunityId}?idToken=${auth.token?.token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error loading opportunity stage");
        }
        const body = await response.json();
        console.log(body)
        if (body.StageName == "Posted") {
          router.replace(`/${locale}/d/receipts`);
        }
      } catch (error) {
        console.error("Error loading opportunity data:", error)
      } finally {
        loadedPosted.current = true;
      }
    }

    setLoading(true);
    const loadAllData = async () => {
      Promise.all([
        loadOpportunityStage(),
        loadProductData()
      ]).then(() => setLoading(false));
    }
    loadAllData();
  }, []);

  if (loading) return <Loading />;

  const getUnselectedSports = (): string[] => {
    const allSports = Object.keys(sportsItemsMap);
    if (allSports.length === 0) return [];

    try {
      const selectedSports = new Set(selectedEquipment.map((item) => item.sport));
      return allSports.filter((sport) => !selectedSports.has(sport));
    } catch (error) {
      console.error("Error getting unselected sports: ", error);
    }
    return [];
  };

  return (
    <div className="flex flex-col items-center bg-white h-screen p-8 overflow-scroll">
      <h1 className="text-3xl font-bold mb-4 text-black">{dict?.checkoutPage.addSport.text}</h1>
      <div className="mb-6 rounded-full w-24 h-24 bg-teal text-white flex items-center justify-center p-4">
        <ShoppingCartIcon />
      </div>
      <div className="w-full max-w-md space-y-4">
        {getUnselectedSports().length > 0 && selectedEquipment.length < Object.keys(sportsItemsMap).length && Object.keys(sportsItemsMap).length > 0 && (
          <button onClick={() => addSportSection("")} className="w-full bg-teal text-white py-3 rounded-md mt-8 font-semibold">
            {dict?.checkoutPage.addSport.text}
          </button>
        )}
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
            sportsItemsMap={sportsItemsMap}
          />
        ))}
      </div>

      <div className="w-full max-w-md mt-auto">
        <button className="w-full bg-teal text-white py-3 rounded-md mt-8 font-semibold" onClick={handleCheckout}>
          {dict?.checkoutPage.checkout.text}
        </button>
        {checkoutError && <p className="font-cabin font-bold text-red-500">{dict?.checkoutPage.checkoutError.text}</p>}
        <div className="w-full mt-20"></div>
      </div>
    </div>
  );
};

export default CheckoutPage;
