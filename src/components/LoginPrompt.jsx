import React, { useState } from "react";

export default function LoginPrompt({ onLogin }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulate login with Google or demo skip
  const handleGoogleLogin = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      // Simulate successful login
      onLogin({ address: "0x123", name: "Demo User" });
      setLoading(false);
    }, 1500);
  };

  const handleSkip = () => {
    onLogin({ address: "0x123", name: "Demo User" });
  };

  return (
    <div className="bg-[#12254a] rounded-lg p-8 shadow-lg max-w-sm w-full text-white text-center">
      <h2 className="text-2xl font-semibold mb-6">Sign In</h2>

      {error && <p className="mb-4 text-red-400">{error}</p>}

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full bg-cyan-600 hover:bg-cyan-500 transition rounded py-3 mb-4 text-white font-semibold disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
}
