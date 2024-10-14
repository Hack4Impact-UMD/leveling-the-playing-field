import React from "react";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white-dark">
      <h1 className="font-bree-serif text-[130px] font-normal leading-[140px] text-teal">404</h1>
      <p className="font-bree-serif text-[30px] font-normal leading-[40.74px] text-black opacity-100 mb-[20px]">Page Not Found</p>
      <Link href="/">
        <button className="flex items-center justify-between w-[213px] h-[47px] bg-teal rounded-[10px] hover:bg-teal-dark transition-all px-4">
          <span className="font-cabin-condensed text-[25px] font-normal leading-[30.38px] text-white flex-grow text-center">
            Go Back
          </span>
          <img
            src="/_images/eva_arrow-back-outline.png"
            alt="Arrow"
          />
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
