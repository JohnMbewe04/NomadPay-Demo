import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createClient = (uri) =>
  new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });

export const erc20Client = createClient(import.meta.env.VITE_SUBGRAPH_ERC20);
export const uniswapV2Client = createClient(import.meta.env.VITE_SUBGRAPH_UNISWAP_V2);
export const kyberSwapClient = createClient(import.meta.env.VITE_SUBGRAPH_KYBERSWAP);
