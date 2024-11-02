import React from "react";
import Globe from "./icons/Globe";
import Chevron from "./icons/Chevron";

export default function LocalizationButton() {
    return (
        <button className="flex items-center bg-orange-light text-white px-4 py-2 rounded-lg space-x-2">
            <Globe />
            <span>English</span>
            <Chevron />
        </button>
    );
}
