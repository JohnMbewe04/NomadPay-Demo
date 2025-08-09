import React, { useEffect } from "react";
import logo from "../assets/nomadpay-logo.png";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000); // 2s
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0b1a3d]">
      <img src={logo} alt="NomadPay Logo" className="w-40 h-40 animate-pulse" />
    </div>
  );
}
