import { gql } from "@apollo/client";

export const GET_POOLS = gql`
  query GetPools {
    pools(first: 5) {
      id
      token0 {
        id
        symbol
        name
      }
      token1 {
        id
        symbol
        name
      }
      volumeUSD
    }
  }
`;
