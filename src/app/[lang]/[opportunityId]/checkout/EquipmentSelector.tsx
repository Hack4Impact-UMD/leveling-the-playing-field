import { Product } from "@/types/types";
import React from "react";

interface EquipmentSelectorProps {
    availableEquipment: Product[];
    handleSelectEquipment: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    dict: { [key: string]: any };
}

const EquipmentSelector = ({ availableEquipment, handleSelectEquipment, dict }: EquipmentSelectorProps) => {
    return (
        <div className="flex justify-between space-x-2 items-center w-full">
            <div className="flex-row flex-none items-center bg-white text-white py-2 px-2 rounded-md font-semibold">
                {/* Optional content */}
            </div>
            <select
                value={""}
                className="bg-white-dark flex-auto text-black text-center py-2.5 px-4 rounded-md font-semibold w-40 sm:w-auto"
                onChange={handleSelectEquipment}
            >
                <option value="" disabled>
                    {dict.checkoutPage.selectedEquipment.text}
                </option>
                {availableEquipment.map((item, i) => (
                    <option value={item.id} key={i}>
                        {item.name}
                    </option>
                ))}
            </select>
            <div className="flex-none font-bold py-2 rounded-md text-lg sm:w-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1-3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                </svg>
            </div>
        </div>
    );
};

export default EquipmentSelector;
