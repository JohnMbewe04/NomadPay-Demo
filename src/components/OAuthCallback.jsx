import React, { useEffect } from "react";
import { jwtToAddress } from "@mysten/sui/zklogin";

export default function OAuthCallback({ onLogin }) {
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const jwt = hashParams.get("id_token");

    if (jwt) {
      const userAddress = jwtToAddress(jwt, "sub", "Google");
      console.log("zkLogin Sui Address:", userAddress);

      if (onLogin) {
        onLogin({ address: userAddress, jwt });
      }
    } else {
      console.error("No JWT found in callback");
    }
  }, [onLogin]);

  return <div>Finishing login...</div>;
}
