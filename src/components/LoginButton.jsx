import React, { useState } from "react";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { generateNonce } from "@mysten/sui/zklogin";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

console.log("ENV Vars:", import.meta.env);
console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
console.log("Sui Network:", import.meta.env.VITE_SUI_NETWORK);


export default function LoginButton({ onLogin, demoOnly = false }) {
  const [error, setError] = useState(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleLogin = async () => {
    try {
      setError(null);

      const suiClient = new SuiClient({ url: getFullnodeUrl(import.meta.env.VITE_SUI_NETWORK) });
      const { epoch } = await suiClient.getLatestSuiSystemState();
      console.log("Current Epoch:", epoch);

      const keypair = new Ed25519Keypair();
      const publicKey = keypair.getPublicKey();

      const nonce = generateNonce(publicKey, BigInt(epoch));
      console.log("Generated Nonce:", nonce);

      const redirectUri = `${window.location.origin}/oauth-callback`;
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=id_token&scope=openid&nonce=${nonce}&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location.href = googleAuthUrl;
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message);
    }
  };


  return (
    <div> 
      {!demoOnly && (
        <button onClick={handleLogin} /* ... */>
          Sign in with Google (zkLogin)
        </button>
      )}
      <button
        onClick={() => onLogin({ address: "0x123", name: "Demo User" })}
        /* ... */
      >
        Skip Login (Demo)
      </button>
    </div>
  );
}
