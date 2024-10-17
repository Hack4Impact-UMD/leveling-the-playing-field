"use client";  

import SearchIcon from "./icons/SearchIcon";
import ProfileIcon from "./icons/ProfileIcon";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import ReceiptIcon from "./icons/ReceiptIcon";
import React, { useState } from "react";

type IconButtonProps = {
    defaultIcon: React.ReactNode;
    selectedIcon: React.ReactNode;
    isSelected: boolean;
    onClick: () => void;
};

function IconButton({ defaultIcon, selectedIcon, isSelected, onClick }: IconButtonProps) {
    return (
        <div
            className={`group flex flex-col items-center p-4 rounded-mini hover:bg-teal-light`}
            onClick={onClick}
        >
            <button className="${isSelected ? text-white : text-teal} group-hover:text-white-dark">
                {isSelected ? selectedIcon : defaultIcon}
            </button>
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
                defaultIcon={<ProfileIcon size={50} viewBoxSize={75}/>
            }
                selectedIcon={<ProfileIcon size = {50} viewBoxSize = {75} showCircle/>}
                isSelected={selectedIcon === "Profile"}
                onClick={() => handleIconClick("Profile")}
            />

            <IconButton
                defaultIcon={<SearchIcon size={50} viewBoxSize={60}  transform='translate(10,10)'/>
            }
                selectedIcon={<SearchIcon size = {50} viewBoxSize = {60}  transform = 'translate(5,5)' showCircle/>}
              
                isSelected={selectedIcon === "Search"}
                onClick={() => handleIconClick("Search")}
            />

            <IconButton
                defaultIcon={<ShoppingCartIcon size={55} viewBoxSize={50}  />}
                selectedIcon={<ShoppingCartIcon size={55} viewBoxSize={50} showCircle/> }
                
                isSelected={selectedIcon === "Appointments"}
                onClick={() => handleIconClick("Appointments")}
            />

            <IconButton
                defaultIcon={<ReceiptIcon size={50} viewBoxSize={65} transform="translate(7,7)" />
            }
                selectedIcon={<ReceiptIcon size={50} viewBoxSize={65}  transform='translate(7,7)' showCircle/>}
                
                isSelected={selectedIcon === "Receipts"}
                onClick={() => handleIconClick("Receipts")}
            />
        </div>
    );
}
