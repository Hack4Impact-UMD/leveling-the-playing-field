// src/app/LoginPage.tsx

import Image from "next/image";
import BasketballIcon from "@/components/icons/sports/BasketballIcon";
import CricketIcon from "@/components/icons/sports/CricketIcon";
import FootballIcon from "@/components/icons/sports/FootballIcon";
import GolfIcon from "@/components/icons/sports/GolfIcon";
import SoccerIcon from "@/components/icons/sports/SoccerIcon";
import SwimmingIcon from "@/components/icons/sports/SwimmingIcon";
import TennisIcon from "@/components/icons/sports/TennisIcon";
import VolleyballIcon from "@/components/icons/sports/VolleyballIcon";
import "./styles.css";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-center relative font-cabin-condensed">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-teal-600 rounded-full"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-600 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-600 rounded-full"></div>

      {/* Title */}
      <h1 className="text-4xl font-bree-serif mb-8 text-balance">Welcome!</h1>

      {/* Centered Login Button */}
      <div className="relative bg-teal-600 p-4 rounded-full w-80 h-80 flex flex-col items-center justify-center">
        <div className="bg-white p-4 rounded-md shadow-md w-64 text-center">
          <Image src="/_images/logo.png" alt="LPF Logo" width={32} height={32} className="mx-auto mb-2" />
          <div>
            <p className="text-xs font-semibold leading-none">LPF</p>
            <p className="text-[10px] leading-none">LEVELING THE PLAYING FIELD</p>
          </div>
          <span className="block mt-4 font-semibold">Login with Salesforce</span>
        </div>
        
        {/* Surrounding Icons */}
        <div className="absolute -top-8 -left-10">
          <BasketballIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute -top-8 -right-10">
          <FootballIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute -bottom-8 -left-10">
          <SoccerIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute -bottom-8 -right-10">
          <TennisIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute top-16 -left-24">
          <CricketIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute top-16 -right-24">
          <GolfIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute bottom-16 -left-24">
          <SwimmingIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute bottom-16 -right-24">
          <VolleyballIcon className="w-6 h-6 fill-white" />
        </div>
      </div>

      {/* Create Account Button */}
      <button className="mt-8 px-6 py-2 rounded-full bg-teal-800 text-white text-lg">
        Create Account
      </button>
    </div>
  );
}
