import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_SWAPS = gql`
  query GetSwaps {
    swaps(first: 5, orderBy: timestamp, orderDirection: desc) {
      id
      transaction {
        id
      }
      sender
      amount0
      amount1
      timestamp
    }
  }
`;

export default function OnChainData() {
  const { loading, error, data } = useQuery(GET_SWAPS);

  if (loading) return <p>Loading on-chain data...</p>;
  if (error) return <p>Error loading data :(</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Uniswap Swaps</h2>
      <ul>
        {data.swaps.map((swap) => (
          <li key={swap.id} className="mb-2">
            <strong>Transaction:</strong> {swap.transaction.id.slice(0, 10)}... <br />
            <strong>Sender:</strong> {swap.sender.slice(0, 10)}... <br />
            <strong>Amount0:</strong> {swap.amount0} <br />
            <strong>Amount1:</strong> {swap.amount1} <br />
            <small>Timestamp: {new Date(swap.timestamp * 1000).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
