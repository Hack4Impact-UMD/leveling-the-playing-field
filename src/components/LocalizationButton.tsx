'use client'
import React, { useState } from "react";
import Globe from "./icons/Globe";
import Chevron from "./icons/Chevron";
import USFlagIcon from "./icons/flags/USFlagIcon";
import FrenchFlagIcon from "./icons/flags/FrenchFlagIcon";
import SpanishFlagIcon from "./icons/flags/SpanishFlagIcon";

export default function LocalizationButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState("English");

    const toggleDropDown = () => { 
        setIsOpen(!isOpen);
    };

    const selectLanguage = (selectedLanguage: string) => {
        setLanguage(selectedLanguage);
        setIsOpen(false); // Close the dropdown after selection
    };

    return (
        <div className="relative inline-block">
            {isOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-40 bg-white shadow-lg rounded-md z-10">
                    <div
                        onClick={() => selectLanguage("English")}
                        className="flex items-center px-2 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer space-x-2"
                    >
                        <USFlagIcon width={35} height={25} />
                        <span>English</span>
                    </div>
                    <div
                        onClick={() => selectLanguage("Español")}
                        className="flex items-center px-2 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                    >
                        <SpanishFlagIcon width={45} height={35} />
                        <span>Español</span>
                    </div>
                    <div
                        onClick={() => selectLanguage("Français")}
                        className="flex items-center px-2 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer space-x-2"
                    >
                        <FrenchFlagIcon width={35} height={22} />
                        <span>Français</span>
                    </div>
                </div>
            )}
            <button 
                onClick={toggleDropDown}
                className="flex items-center bg-orange-light text-white px-4 py-2 rounded-lg space-x-2"
            >
                <Globe />
                <span>{language}</span>
                <div  className="transform scale-y-[-1]">
                    <Chevron />
                </div>
            </button>
        </div>
    );
}
