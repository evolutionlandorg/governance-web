/* eslint-disable no-async-promise-executor */
import {
  KTON_CONTRACT, EVO_TELLER_CONTRACT,
  KTON_BALANCE_OF, EVO_TELLER_BALANCE_OF, EVO_TELLER_BALANCE_OF_STAKING, EVO_TELLER_BALANCE_OF_APOSTLEOWNER,
  EVO_TELLER_BALANCE_OF_LANDOWNER, 
  KTON_ALLOWANCE, EVO_TELLER_VOTE_RATE, EVO_TELLER_STAKE, KTON_APPROVE, EVO_TELLER_WITHDRAW, EVO_TELLER_DIVIDENDS,
  EVO_TELLER_GET_REWARD
} from './constants';

export function getKtonContract(chainId, web3) {
  const contract = new web3.eth.Contract(
    KTON_CONTRACT[chainId].abi,
    KTON_CONTRACT[chainId].address
  )
  return contract
}

export function getEvoTellerContract(chainId, web3) {
  const contract = new web3.eth.Contract(
    EVO_TELLER_CONTRACT[chainId].abi,
    EVO_TELLER_CONTRACT[chainId].address
  )
  return contract
}

function call(contract, method, params, options) {
  return new Promise(async(resolve, reject) =>{
    await contract.methods[method](...params)
    .call(
      { from: '0x0000000000000000000000000000000000000000', ...options },
      (err, data) => {
        if (err) {
          reject(err)
        }

        resolve(data)
      }
    )
  })
}

function send(address, contract, method, params, options) {
  return new Promise(async(resolve, reject) =>{
    await contract.methods[method](...params)
    .send(
      { from: address, ...options },
      (err, data) => {
        if (err) {
          reject(err)
        }

        resolve(data)
      }
    )
  })
}

// ------------------------ Kton ------------------------ //

export function callKtonBalanceOf(address, chainId, web3, params = [], options = {}) {
  return new Promise(async (resolve, reject) => {
    const contract = getKtonContract(chainId, web3)

    await contract.methods
      .balanceOf(...params)
      .call(
        { from: '0x0000000000000000000000000000000000000000', ...options },
        (err, data) => {
          if (err) {
            reject(err)
          }

          resolve(data)
        }
      )
  })
}

export function callKtonAllowance(address, chainId, web3, params = [], options = {}) {
  return new Promise(async (resolve, reject) => {
    const contract = getKtonContract(chainId, web3)

    await contract.methods
      .allowance(...params)
      .call(
        { from: '0x0000000000000000000000000000000000000000', ...options },
        (err, data) => {
          if (err) {
            reject(err)
          }

          resolve(data)
        }
      )
  })
}

export function callKtonTransfer(address, chainId, web3, params = [], options = {}) {
  return new Promise(async (resolve, reject) => {
    const contract = getKtonContract(chainId, web3);
    await send(address, contract, 'transfer', params, options);
  })
}

export function callKtonApprove(address, chainId, web3, params = [], options = {}) {
  return new Promise(async (resolve, reject) => {
    const contract = getKtonContract(chainId, web3)
    await send(address, contract, 'approve', params, options)
  })
}

// ------------------ Evolution Teller ------------------ //

export function callEvolutionTellerBalanceOf(address, chainId, web3, params = [], options = {}) {
  return new Promise(async (resolve, reject) => {
    const contract = getEvoTellerContract(chainId, web3)

    await contract.methods
      .balanceOf(...params)
      .call(
        { from: '0x0000000000000000000000000000000000000000', ...options },
        (err, data) => {
          if (err) {
            reject(err)
          }

          resolve(data)
        }
      )
  })
}

export function callEvolutionTellerBalanceOfStaking(address, chainId, web3, params = [], options = {}) {
  return new Promise(async (resolve, reject) => {
    const contract = getEvoTellerContract(chainId, web3)

    await contract.methods
      .balanceOfStaking(...params)
      .call(
        { from: '0x0000000000000000000000000000000000000000', ...options },
        (err, data) => {
          if (err) {
            reject(err)
          }

          resolve(data)
        }
      )
  })
}

export function callEvolutionTellerBalanceOfApostleOwner(address, chainId, web3, params = [], options = {}) {
  return new Promise(async (resolve, reject) => {
    const contract = getEvoTellerContract(chainId, web3)

    await contract.methods
      .balanceOfApostleOwner(...params)
      .call(
        { from: '0x0000000000000000000000000000000000000000', ...options },
        (err, data) => {
          if (err) {
            reject(err)
          }

          resolve(data)
        }
      )
  })
}

export function callEvolutionTellerBalanceOfLandOwner(address, chainId, web3, params = [], options = {}) {
  return new Promise(async (resolve, reject) => {
    const contract = getEvoTellerContract(chainId, web3)

    await contract.methods
      .balanceOfLandOwner(...params)
      .call(
        { from: '0x0000000000000000000000000000000000000000', ...options },
        (err, data) => {
          if (err) {
            reject(err)
          }

          resolve(data)
        }
      )
  })
}

export function callEvolutionTellerVoteRate(address, chainId, web3, params = [], options = {}) {
  const contract = getEvoTellerContract(chainId, web3)
  const promises = [
    call(contract, 'tokenVoteRate', params, options),
    call(contract, 'landVoteRate', params, options),
    call(contract, 'apostleVoteRate', params, options),
  ];
  return Promise.all(promises);
}

export function callEvolutionTellerDividends(address, chainId, web3, params = [], options = {}) {
  const contract = getEvoTellerContract(chainId, web3)
  const promises = [
    call(contract, 'earned', params, options),
    call(contract, 'rewards', params, options),
  ];
  return Promise.all(promises);
}

export function callEvolutionTellerStake(address, chainId, web3, params = [], options = {}) {
  const contract = getEvoTellerContract(chainId, web3)
  return send(address, contract, 'stake', params, options)
}

export function callEvolutionTellerWithdraw(address, chainId, web3, params = [], options = {}) {
    const contract = getEvoTellerContract(chainId, web3)
    return send(address, contract, 'withdraw', params, options)
}

export function callEvolutionTellerGetReward(address, chainId, web3, params = [], options = {}) {
    const contract = getEvoTellerContract(chainId, web3)
    return send(address, contract, 'getReward', params, options)
}

export const Web3ApiMapping = {
  [KTON_BALANCE_OF]: {
    type: 'call',
    func: callKtonBalanceOf,
  },
  [KTON_ALLOWANCE]: {
    type: 'call',
    func: callKtonAllowance,
  },
  [KTON_APPROVE]: {
    type: 'tx',
    func: callKtonApprove,
  },
  [EVO_TELLER_BALANCE_OF]: {
    type: 'call',
    func: callEvolutionTellerBalanceOf,
  },
  [EVO_TELLER_BALANCE_OF_STAKING]: {
    type: 'call',
    func: callEvolutionTellerBalanceOfStaking,
  },
  [EVO_TELLER_BALANCE_OF_APOSTLEOWNER]: {
    type: 'call',
    func: callEvolutionTellerBalanceOfApostleOwner,
  },
  [EVO_TELLER_BALANCE_OF_LANDOWNER]: {
    type: 'call',
    func: callEvolutionTellerBalanceOfLandOwner,
  },
  [EVO_TELLER_VOTE_RATE]: {
    type: 'call',
    func: callEvolutionTellerVoteRate,
  },
  [EVO_TELLER_STAKE]: {
    type: 'tx',
    func: callEvolutionTellerStake
  },
  [EVO_TELLER_WITHDRAW]: {
    type: 'tx',
    func: callEvolutionTellerWithdraw
  },
  [EVO_TELLER_DIVIDENDS]:{
    type: 'call',
    func: callEvolutionTellerDividends
  },
  [EVO_TELLER_GET_REWARD]:{
    type: 'tx',
    func: callEvolutionTellerGetReward
  }
}