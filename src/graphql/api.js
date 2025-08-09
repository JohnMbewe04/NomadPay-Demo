import { erc20Client, uniswapV2Client } from './clients';
import { GET_ERC20_BALANCES, GET_SWAP_EVENTS } from './queries';

export async function fetchErc20Balances(ownerAddress) {
  const { data } = await erc20Client.query({
    query: GET_ERC20_BALANCES,
    variables: { owner: ownerAddress.toLowerCase() },
  });
  return data.accounts;
}

export async function fetchSwapEvents() {
  const { data } = await uniswapV2Client.query({
    query: GET_SWAP_EVENTS,
    variables: { first: 10 },
  });
  return data.swaps;
}
