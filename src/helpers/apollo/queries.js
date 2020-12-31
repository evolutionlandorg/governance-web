import gql from 'graphql-tag'

// stakedHistoryType = Locked | Unlocked | Dividend
// StakedHistory = {id | owner | amount | createTime | historyType}
export const SUBGRAPH_STAKE_HISTORY = (address, stakedHistoryType = 'Dividend' ) => {
  const queryString = `
    query history {
      stakedHistories(first: 200,where:{historyType:${stakedHistoryType},owner:"${address}"}) {
        id
        owner
        amount
        createTime
        historyType
      }
    }
  `;

  return gql(queryString);
} 