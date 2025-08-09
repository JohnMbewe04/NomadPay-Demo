import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POOLS } from "../queries";

function PoolList() {
  const { loading, error, data } = useQuery(GET_POOLS);
  const [tokenDetails, setTokenDetails] = useState({});

  useEffect(() => {
    if (data?.pools) {
      // Fetch token metadata for all tokens in pools using Token API
      const tokens = [...data.pools.flatMap(pool => [pool.token0, pool.token1])];
      tokens.forEach((token) => {
        fetch(`https://api.thegraph.com/token-api/tokens?network=mainnet&address=${token.id}`)
          .then(res => res.json())
          .then(json => {
            setTokenDetails(prev => ({ ...prev, [token.id]: json.data[0] }));
          })
          .catch(() => {
            // fallback or error handling
            setTokenDetails(prev => ({ ...prev, [token.id]: null }));
          });
      });
    }
  }, [data]);

  if (loading) return <p>Loading pools...</p>;
  if (error) return <p>Error loading pools: {error.message}</p>;

  return (
    <div>
      <h2>Top 5 Uniswap V3 Pools</h2>
      <ul>
        {data.pools.map(pool => (
          <li key={pool.id} style={{ marginBottom: 20 }}>
            <div><strong>Pool ID:</strong> {pool.id}</div>
            <div>
              <strong>Token 0:</strong> {pool.token0.symbol} - {pool.token0.name} <br />
              {tokenDetails[pool.token0.id] && (
                <>
                  <small>Decimals: {tokenDetails[pool.token0.id].decimals}</small><br />
                  <small>Price (USD): ${tokenDetails[pool.token0.id].priceUSD ?? "N/A"}</small>
                </>
              )}
            </div>
            <div>
              <strong>Token 1:</strong> {pool.token1.symbol} - {pool.token1.name} <br />
              {tokenDetails[pool.token1.id] && (
                <>
                  <small>Decimals: {tokenDetails[pool.token1.id].decimals}</small><br />
                  <small>Price (USD): ${tokenDetails[pool.token1.id].priceUSD ?? "N/A"}</small>
                </>
              )}
            </div>
            <div><strong>Volume USD:</strong> ${parseFloat(pool.volumeUSD).toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PoolList;
