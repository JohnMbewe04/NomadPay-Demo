import React, { useEffect, useState } from "react";

export default function WelcomeMessage({ user, onComplete }) {
  const message = `Weelcome to NomadPay`;
  const [displayed, setDisplayed] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < message.length) {
        setDisplayed((prev) => prev + message[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 1000); // Hold for 1 sec then fade out
      }
    }, 100);

    return () => clearInterval(interval);
  }, [message]);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800); // fadeout duration matches CSS transition
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onComplete]);

  return (
    <div
      className={`flex items-center justify-center min-h-screen text-white text-4xl font-bold bg-[#0b1a3d] transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <span>{displayed}</span>
      <span className="blinking-cursor">|</span>

      <style>{`
        .blinking-cursor {
          font-weight: 100;
          font-size: 4rem;
          color: white;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from, to { color: transparent }
          50% { color: white; }
        }
      `}</style>
    </div>
  );
}
