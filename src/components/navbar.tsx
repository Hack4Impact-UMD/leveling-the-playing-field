import SearchIcon from "./svgs/search";
import ProfileIcon from "./svgs/profile";
import AppointmentsIcon from "./svgs/appointments";
import ReceiptsIcon from "./svgs/receipts";
import React from "react";

type IconButtonProps = {
    icon: React.ReactNode; 
    label: string;
};

function IconButton({ icon, label }: IconButtonProps) {
    return (
        <div className="group text-white flex flex-col items-center p-4 rounded-mini hover:bg-teal-light">
            <div className="group-hover:text-white-dark">
                {icon}
            </div>
            <h1 className="text-sm mt-2 group-hover:text-white-dark">{label}</h1>
        </div>
    );
}


export default function NavBar() {
    return (
        <div className="bg-teal fixed bottom-0 w-full flex flex-row pb-2 pt-2 justify-around items-center  rounded-t-custom">
            <IconButton 
                icon={<ProfileIcon />}
                label="Profile"
            />

            <IconButton 
                icon={<SearchIcon />}
                label="Search"
            />

            <IconButton 
                icon={<AppointmentsIcon />}
                label="Appointments"
            />

            <IconButton 
                icon={<ReceiptsIcon />}
                label="Receipts"
            />
        </div>
    );
}





