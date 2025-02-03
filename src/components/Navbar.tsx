"use client";

import SearchIcon from "./icons/SearchIcon";
import ProfileIcon from "./icons/ProfileIcon";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import ReceiptIcon from "./icons/ReceiptIcon";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/lib/i18n/dictionaries";
import AppointmentsIcon from "./icons/AppointmentsIcon";

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

enum NavbarPages {
  ORG_PROFILE = "organization-profile",
  SEARCH = "search",
  APPOINTMENTS = "appointments",
  RECEIPTS = "receipts",
}

export default function Navbar() {
  const router = useRouter();
  const pathSegments = usePathname().split('/');
  const locale: Locale = pathSegments[1] as Locale;
  const currPage: NavbarPages = pathSegments[3] as NavbarPages;

  const handleIconClick = (label: NavbarPages) => {
    router.push(`/${locale}/d/${label}`)
  };

  return (
    <div className="bg-teal fixed bottom-0 w-full flex flex-row pb-2 pt-2 justify-around items-center rounded-t-xl">
      <IconButton
        icon={
          <ProfileIcon
            size={50}
            viewBoxSize={75}
            showCircle={currPage === NavbarPages.ORG_PROFILE}
          />
        }
        onClick={() => handleIconClick(NavbarPages.ORG_PROFILE)}
      />

      <IconButton
        icon={
          <SearchIcon
            size={50}
            viewBoxSize={60}
            transform="translate(5,5)"
            showCircle={currPage === NavbarPages.SEARCH}
          />
        }
        onClick={() => handleIconClick(NavbarPages.SEARCH)}
      />

      <IconButton
        icon={
          <AppointmentsIcon 
            size={50}
            viewBoxSize={67}
            transform="translate(7,7)"
            showCircle={currPage === NavbarPages.APPOINTMENTS}
          />
        }
        onClick={() => handleIconClick(NavbarPages.APPOINTMENTS)}
      />

      <IconButton
        icon={
          <ReceiptIcon
            size={50}
            viewBoxSize={65}
            transform="translate(7,7)"
            showCircle={currPage === NavbarPages.RECEIPTS}
          />
        }
        onClick={() => handleIconClick(NavbarPages.RECEIPTS)}
      />
    </div>
  );
}
