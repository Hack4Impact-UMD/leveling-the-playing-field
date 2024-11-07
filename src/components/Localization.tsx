'use client'
import React, { useState } from "react";
import Globe from "./icons/Globe";
import Chevron from "./icons/Chevron";
import USFlag from "./icons/Flag_of_the_United_States";
import FrenchFlag from "./icons/Flag_of_France";
import SpanishFlag from "./icons/Flag_of_Spain";

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
                <div className="absolute bottom-full mb-2 w-40 bg-white shadow-lg rounded-md z-10">
                    <div
                        onClick={() => selectLanguage("English")}
                        className="flex items-center px-2 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer space-x-2"
                    >
                        <USFlag width={35} height={25} />
                        <span>English</span>
                    </div>
                    <div
                        onClick={() => selectLanguage("Español")}
                        className="flex items-center px-2 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                    >
                        <SpanishFlag width={45} height={35} />
                        <span>Español</span>
                    </div>
                    <div
                        onClick={() => selectLanguage("Français")}
                        className="flex items-center px-2 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer space-x-2"
                    >
                        <FrenchFlag width={35} height={22} />
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
                <Chevron />
            </button>
        </div>
    );
}
