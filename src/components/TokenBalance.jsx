import React from "react";
import { gql, useQuery } from "@apollo/client";

const USER_TOKEN_BALANCES = gql`
  query UserTokenBalances($user: String!) {
    user(id: $user) {
      id
      balances {
        token {
          id
          symbol
          name
        }
        value
      }
    }
  }
`;

export default function TokenBalance({ userAddress, clientName }) {
  const USER_TOKEN_BALANCES_ERC20 = gql`
    query UserTokenBalancesERC20($user: String!) {
        user(id: $user) {
        id
        balances {
            token {
            id
            symbol
            name
            }
            value
        }
        }
    }
    `;

    const USER_TOKEN_BALANCES_UNISWAP = gql`
    query UserTokenBalancesUniswap($user: String!) {
        someOtherUserType(id: $user) {
        id
        tokenBalances {
            token {
            id
            symbol
            name
            }
            amount
        }
        }
    }
    `;

  const query =
    clientName === "uniswapV2"
      ? USER_TOKEN_BALANCES_UNISWAP
      : USER_TOKEN_BALANCES_ERC20;

  const { loading, error, data } = useQuery(query, {
    variables: { user: userAddress.toLowerCase() },
  });

  if (loading) return <p>Loading token balances...</p>;
  if (error) return <p>Error loading token balances: {error.message}</p>;

  if (!data?.user || data.user.balances.length === 0)
    return <p>No tokens found for this address.</p>;

  return (
    <ul>
      {data.user.balances.map(({ token, value }) => (
        <li key={token.id}>
          {token.symbol} ({token.name}): {parseFloat(value).toFixed(4)}
        </li>
      ))}
    </ul>
  );
}
