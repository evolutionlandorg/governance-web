import { theGraphApolloClient } from './apollo/client';
import { SUBGRAPH_STAKE_HISTORY, SUBGRAPH_TOTAL_DIVIDENDS } from './apollo/queries';

export async function apiGetStakeHistory(address, stakedHistoryType) {
  const result = await theGraphApolloClient.query({
    query: SUBGRAPH_STAKE_HISTORY(address, stakedHistoryType),
    fetchPolicy: "no-cache"
  });
  return result;
}

export async function apiGetTotalDividends(address) {
  const result = await theGraphApolloClient.query({
    query: SUBGRAPH_TOTAL_DIVIDENDS(address),
    fetchPolicy: "no-cache"
  });
  return result;
}

