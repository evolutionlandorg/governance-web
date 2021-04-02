import gql from 'graphql-tag'

// stakedHistoryType = Locked | Unlocked | Dividend
// StakedHistory = {id | owner | amount | createTime | historyType}
export const SUBGRAPH_STAKE_HISTORY = (address, stakedHistoryType = 'Locked' ) => {
  const queryString = `
    query history {
      stakedHistories(orderBy: createTime, orderDirection: desc, first: 200,where:{historyType:${stakedHistoryType},owner:"${address}"}) {
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

export const SUBGRAPH_TOTAL_DIVIDENDS = (address) => {
  const queryString = `
    query totalDividends {
      stakedRewards(first: 1,where:{owner: "${address}"}) {
        id
        amount
      }
    }
  `;

  return gql(queryString);
} 