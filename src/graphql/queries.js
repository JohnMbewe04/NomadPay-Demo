import { gql } from '@apollo/client';

export const GET_ERC20_BALANCES = gql`
  query getBalances($owner: String!) {
    accounts(where: { id: $owner }) {
      id
      tokens {
        token {
          id
          symbol
        }
        balance
      }
    }
  }
`;

export const GET_SWAP_EVENTS = gql`
  query getSwaps($first: Int!) {
    swaps(first: $first, orderBy: timestamp, orderDirection: desc) {
      id
      pair {
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
      amount0In
      amount1In
      amount0Out
      amount1Out
      sender
      to
      timestamp
      transaction {
        id
      }
    }
  }
`;
