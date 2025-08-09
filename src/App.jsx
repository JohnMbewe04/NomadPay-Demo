import React, { useState } from "react";
import bgImage from "./assets/Welcome-page-BG.jpg"; // adjust path if needed

import SplashScreen from "./components/SplashScreen";
import LoginPrompt from "./components/LoginPrompt";
import WelcomeMessage from "./components/WelcomeMessage";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [step, setStep] = useState("splash");
  const [user, setUser] = useState(null);

  const handleSplashEnd = () => setStep("login");

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setStep("welcome");
  };

  const handleWelcomeComplete = () => {
    setStep("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setStep("login");
  };

  return (
    <>
      {step === "splash" && <SplashScreen onFinish={handleSplashEnd} />}

      {step === "login" && (
        <div
          className="relative min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 backdrop-blur-md" />
          <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
            <LoginPrompt onLogin={handleLoginSuccess} />
          </div>
        </div>
      )}

      {step === "welcome" && user && (
        <WelcomeMessage user={user} onComplete={handleWelcomeComplete} />
      )}

      {step === "dashboard" && user && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </>
  );
}
