import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import OAuthCallback from "./components/OAuthCallback";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();
const networks = {
  testnet: { url: getFullnodeUrl("testnet") },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/oauth-callback" element={<OAuthCallbackWrapper />} />
            </Routes>
          </Router>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// Wrapper to pass login handler from somewhere
function OAuthCallbackWrapper() {
  // Optionally, you can lift the user state up to context or another global state,
  // for simplicity here we just redirect back after login.

  // For example: You can use React context or global state management
  // For now, just render OAuthCallback and redirect to home on success.

  const handleLogin = (userData) => {
    console.log("Login success:", userData);
    // Save user info somewhere (localStorage, context, global state)

    // Redirect to dashboard or home page after login
    window.location.href = "/";
  };

  return <OAuthCallback onLogin={handleLogin} />;
}
