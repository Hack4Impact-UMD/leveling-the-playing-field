'use client';

import BasketballIcon from "@/components/icons/sports/BasketballIcon";
import CricketIcon from "@/components/icons/sports/CricketIcon";
import FootballIcon from "@/components/icons/sports/FootballIcon";
import GolfIcon from "@/components/icons/sports/GolfIcon";
import SoccerIcon from "@/components/icons/sports/SoccerIcon";
import SwimmingIcon from "@/components/icons/sports/SwimmingIcon";
import TennisIcon from "@/components/icons/sports/TennisIcon";
import VolleyballIcon from "@/components/icons/sports/VolleyballIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import LocalizationButton from "@/components/LocalizationButton";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { getGoogleRedirectResult, signInWithGoogleRedirect } from "@/lib/firebase/googleAuthentication";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/firebaseConfig";
import { Locale, getDict } from "@/lib/i18n/dictionaries";
import Loading from "@/components/Loading";

export default function LoginPage({ lang }: { lang: Locale }) {
    const [user, setUser] = useState<User | null>(null);
    const [dict, setDict] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    const handleGoogleSignIn = async () => {
      await signInWithGoogleRedirect();
      router.push(`/${lang}/d/organization-profile`)
    };

    useEffect(() => {
      loadData()
    }, []);

    const loadData = async () => {
      setLoading(true)
      const dict = await getDict(lang);
      setDict(dict);


      
      const checkRedirectResult = async () => {
        console.log("Checking for Google Redirect Result...");
        try {
          const result = await getGoogleRedirectResult();
          console.log("Redirect Result:", result);
          if (result) {
            setUser(result.user);
          }
        } catch (error) {
          console.error("Error with redirect result:", error);
        }
      };

      checkRedirectResult();

      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("Auth State Changed. Current User:", currentUser);
        setUser(currentUser);
      });
      setLoading(false)
      return () => unsubscribe();
    }

    if (loading) {
      return <Loading />
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-center relative font-cabin-condensed">
      {/* Title at the Top */}
      <h1 className="absolute top-1 text-6xl font-bree-serif text-black">{dict.loginPage.title.text}</h1>

      {/* Decorative Smaller Semi-Circles */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 bg-teal-light2 opacity-30"
        style={{ clipPath: "ellipse(70% 50% at 100% 0)" }}
      ></div>

      <div 
        className="absolute bottom-0 left-0 w-32 h-32 bg-teal-light2 opacity-30"
        style={{ clipPath: "ellipse(70% 50% at 0 100%)" }}
      ></div>

      {/* Centered Login Button */}
      <div className="relative bg-teal-light2 p-6 rounded-full w-72 h-72 flex flex-col items-center justify-center">
      <button className="flex items-center justify-center bg-gray-200 text-gray-800 rounded-md shadow-md px-4 py-2 w-80 border-2 border-teal-700 text-3xl" onClick={handleGoogleSignIn}>
          <GoogleIcon />
          <span>{dict.loginPage.loginButton.text}</span>
        </button>
        
        {/* Surrounding Icons */}
        <div className="absolute top-4 left-24">
          <BasketballIcon />
        </div>
        <div className="absolute top-4 right-24">
          <FootballIcon />
        </div>
        <div className="absolute bottom-12 left-9">
          <SoccerIcon/>
        </div>
        <div className="absolute bottom-12 right-9">
          <TennisIcon/>
        </div>
        <div className="absolute top-12 left-9">
          <CricketIcon />
        </div>
        <div className="absolute top-12 right-9">
          <GolfIcon/>
        </div>
        <div className="absolute bottom-4 left-24">
          <SwimmingIcon/>
        </div>
        <div className="absolute bottom-4 right-24">
          <VolleyballIcon />
        </div>
      </div>

      {/* Organization Application Button */}
      <button className="mt-6 px-6 py-2 rounded-full bg-teal-700 text-white text-lg" onClick={() => router.push("https://form.jotform.com/232446768208059")}>
        {dict.loginPage.application.text}
      </button>

      {/* Language Selector */}
      <div className="absolute bottom-32 right-4 flex items-center px-3 py-1 rounded-full h-8">
        <LocalizationButton />
      </div>
    </div>
  );
}
