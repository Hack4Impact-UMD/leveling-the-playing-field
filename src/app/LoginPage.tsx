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
      {/* Title at the Top */}
      <h1 className="absolute top-8 text-4xl font-bree-serif text-black">Welcome!</h1>

      {/* Decorative Smaller Semi-Circles */}
      <div 
        className="absolute top-0 right-0 w-32 h-32"
        style={{ backgroundColor: '#70A8AB', opacity: 0.3, clipPath: "ellipse(70% 50% at 100% 0)" }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-32 h-32"
        style={{ backgroundColor: '#70A8AB', opacity: 0.3, clipPath: "ellipse(70% 50% at 0 100%)" }}
      ></div>

      {/* Centered Login Button */}
      <div className="relative" style={{ backgroundColor: '#70A8AB', padding: '1.5rem', borderRadius: '50%', width: '18rem', height: '18rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <button className="flex items-center justify-center bg-gray-200 text-gray-800 rounded-md shadow-md px-4 py-2 w-80" style={{ fontFamily: 'Cabin Condensed, sans-serif', fontSize: '1.75rem', border: '2px solid #2C7A7B' }}>
          <Image src="/google-logo.png" alt="Google Logo" width={28} height={28} className="mr-2" />
          <span className="font-semibold">Login with Google</span>
        </button>
        
        {/* Surrounding Icons */}
        <div className="absolute -top-10 left-16">
          <BasketballIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute -top-10 right-16">
          <FootballIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute bottom-10 left-16">
          <SoccerIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute bottom-10 right-16">
          <TennisIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute top-20 left-0">
          <CricketIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute top-20 right-0">
          <GolfIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute bottom-20 left-0">
          <SwimmingIcon className="w-6 h-6 fill-white" />
        </div>
        <div className="absolute bottom-20 right-0">
          <VolleyballIcon className="w-6 h-6 fill-white" />
        </div>
      </div>

      {/* Organization Application Button */}
      <button className="mt-6 px-6 py-2 rounded-full bg-teal-700 text-white text-lg">
        Organization Application
      </button>

      {/* Language Selector */}
      <div className="absolute bottom-4 right-4 flex items-center" style={{ backgroundColor: '#F49066', opacity: 0.9, color: 'white', padding: '0.2rem 0.75rem', borderRadius: '2rem', height: '32px' }}>
        <Image src="/globe-icon.png" alt="Globe Icon" width={20} height={20} className="mr-2" />
        <span>English</span>
        <span className="ml-2">▼</span>
      </div>
    </div>
  );
}
