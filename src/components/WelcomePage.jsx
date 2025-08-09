import React from "react";
import bg from "../assets/Welcome-page-BG.jpg";
import LoginButton from "./LoginButton";

export default function WelcomePage({ onLogin }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to NomadPay</h1>
      <p className="mb-6 text-lg">Your secure international payment solution</p>
      
      {/* Login Button component */}
      <LoginButton onLogin={onLogin} />
    </div>
  );
}
