"use client";  

import SearchIcon from "./icons/SearchIcon";
import ProfileIcon from "./icons/ProfileIcon";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import ReceiptIcon from "./icons/ReceiptIcon";
import SelectedReceiptIcon from "./icons/SelectedRecieptIcon";
import SelectedShoppingCartIcon from "./icons/SelectedShoppingCart";
import SelectedProfileIcon from "./icons/SelectedProfileIcon";
import SelectedSearchIcon from "./icons/SelectedSearchIcon";
import React, { useState } from "react";

type IconButtonProps = {
    defaultIcon: React.ReactNode;
    selectedIcon: React.ReactNode;
    label: string;
    isSelected: boolean;
    onClick: () => void;
};

function IconButton({ defaultIcon, selectedIcon, label, isSelected, onClick }: IconButtonProps) {
    return (
        <div
            className={`group text-white flex flex-col items-center p-4 rounded-mini hover:bg-teal-light ${isSelected ? "bg-teal-dark" : ""}`}
            onClick={onClick}
        >
            <button className="group-hover:text-white-dark">
                {isSelected ? selectedIcon : defaultIcon}
            </button>
            <h1 className="text-sm mt-2 group-hover:text-white-dark">{label}</h1>
        </div>
    );
}

export default function NavBar() {
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

    const handleIconClick = (label: string) => {
        setSelectedIcon((prevSelected) => (prevSelected === label ? null : label));
    };

    return (
        <div className="bg-teal fixed bottom-0 w-full flex flex-row pb-2 pt-2 justify-around items-center rounded-t-custom">
            <IconButton
                defaultIcon={<ProfileIcon size={50} viewBoxSize={75} fillColor="currentColor" />
            }
                selectedIcon={<SelectedProfileIcon />}
                label="Profile"
                isSelected={selectedIcon === "Profile"}
                onClick={() => handleIconClick("Profile")}
            />

            <IconButton
                defaultIcon={<SearchIcon size={50} viewBoxSize={60} fillColor="currentColor" transform='translate(5,5)'/>
            }
                selectedIcon={<SelectedSearchIcon />}
                label="Search"
                isSelected={selectedIcon === "Search"}
                onClick={() => handleIconClick("Search")}
            />

            <IconButton
                defaultIcon={<ShoppingCartIcon size={50} viewBoxSize={50} fillColor="currentColor" />}
                selectedIcon={<SelectedShoppingCartIcon /> }
                label="Appointments"
                isSelected={selectedIcon === "Appointments"}
                onClick={() => handleIconClick("Appointments")}
            />

            <IconButton
                defaultIcon={<ReceiptIcon size={50} viewBoxSize={65} fillColor="currentColor" transform='translate(7,7)'/>
            }
                selectedIcon={<SelectedReceiptIcon />}
                label="Receipts"
                isSelected={selectedIcon === "Receipts"}
                onClick={() => handleIconClick("Receipts")}
            />
        </div>
    );
}
