import Image from "next/image";
import { useState } from 'react';
import "./styles.css";

export default function Home() {
  return (
    <div className="container">
      {/* Decorative Circles */}
      <div className="circle top-left"></div>
      <div className="circle top-right"></div>
      <div className="circle bottom-left"></div>
      <div className="circle bottom-right"></div>

      {/* Login Text at the Top */}
      <h1 className="login-title">Login</h1>

      {/* Centered Login Button */}
      <div className="login-button">
      <Image src="/_images/logo.png" alt="LPF Logo" width={32} height={32} />
        <div>
          <p className="text-xs font-semibold leading-none">LPF</p>
          <p className="text-[10px] leading-none">LEVELING THE PLAYING FIELD</p>
        </div>
        <span className="ml-2">Login with Salesforce</span>
      </div>

      {/* Create Account Button at the Bottom */}
      <button className="create-button">
        Create Account
      </button>
    </div>
  );
}
