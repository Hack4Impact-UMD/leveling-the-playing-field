"use client";

import SearchIcon from "./icons/SearchIcon";
import ProfileIcon from "./icons/ProfileIcon";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import AppointmentsIcon from "./icons/AppointmentsIcon";
import ReceiptIcon from "./icons/ReceiptIcon";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type IconButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
};

function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <div
      className={`group flex flex-col items-center justify-center p-4 rounded-mini hover:bg-teal-light`}
      onClick={onClick}
    >
      <button className="group-hover:text-white-dark">
        {icon}
      </button>
    </div>
  );
}

export default function Navbar() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const router = useRouter();

  const handleIconClick = (label: string) => {
    setSelectedIcon((prevSelected) => (prevSelected === label ? null : label));
  };

  return (
    <div className="bg-teal fixed bottom-0 w-full flex flex-row pb-2 pt-2 justify-around items-center rounded-t-xl" >
      <IconButton
        icon={
          <ProfileIcon
            size={50}
            viewBoxSize={75}
            showCircle={selectedIcon === "Profile"}
          />
        }
        onClick={() => {handleIconClick("Profile"); router.push('/en/organization-profile')}}
      />

      <IconButton
        icon={
          <SearchIcon
            size={50}
            viewBoxSize={60}
            transform="translate(5,5)"
            showCircle={selectedIcon === "Search"}
          />
        }
        onClick={() => {handleIconClick("Search"); router.push("/en/search");}}
      />

      <IconButton
        icon={
          <AppointmentsIcon
            size={60}
            viewBoxSize={75}
            showCircle={selectedIcon === "Appointments"}
            transform={"translate(12,12)"}
          />
        }
        onClick={() => {handleIconClick("Appointments"); router.push("/en/appointments");}}
        />

      <IconButton
        icon={
          <ReceiptIcon
            size={50}
            viewBoxSize={65}
            transform="translate(7,7)"
            showCircle={selectedIcon === "Receipts"}
          />
        }
        onClick={() => {handleIconClick("Receipts"); router.push("/en/receipts");}}
      />
    </div>
  );
}
