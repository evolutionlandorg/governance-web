import { theGraphApolloClient } from './apollo/client';
import { SUBGRAPH_STAKE_HISTORY } from './apollo/queries';

export async function apiGetStakeHistory(address, stakedHistoryType) {
  const result = await theGraphApolloClient.query({
    query: SUBGRAPH_STAKE_HISTORY(address, stakedHistoryType)
  });
  return result;
}


