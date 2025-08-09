import React from "react";
import { gql, useQuery } from "@apollo/client";

// This is the GraphQL query — it asks for the top 5 tokens by trading volume
const TOP_TOKENS_QUERY = gql`
  query TopTokens {
    tokens(first: 5, orderBy: volumeUSD, orderDirection: desc) {
      id
      symbol
      name
      volumeUSD
    }
  }
`;

export default function TokenList() {
  // This runs the query and fetches data
  const { loading, error, data } = useQuery(TOP_TOKENS_QUERY);

  if (loading) return <p>Loading tokens...</p>; // Shows while waiting for data
  if (error) return <p>Error loading tokens: {error.message}</p>; // Shows if there’s a problem

  // Once data is loaded, it shows a list of tokens with their volume
  return (
    <ul>
      {data.tokens.map(({ id, symbol, name, volumeUSD }) => (
        <li key={id}>
          {symbol} ({name}): ${parseFloat(volumeUSD).toFixed(2)}
        </li>
      ))}
    </ul>
  );
}
