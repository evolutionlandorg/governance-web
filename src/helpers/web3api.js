/* eslint-disable no-async-promise-executor */
import {
  KTON_CONTRACT, EVO_TELLER_CONTRACT,
  KTON_BALANCE_OF, EVO_TELLTER_BALANCE_OF, EVO_TELLTER_BALANCE_OF_STAKING, EVO_TELLTER_BALANCE_OF_APOSTLEOWNER,
  EVO_TELLTER_BALANCE_OF_LANDOWNER, 
  KTON_ALLOWANCE
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
    const contract = getKtonContract(chainId, web3)

    await contract.methods
      .transfer(...params)
      .send({ from: address, ...options }, (err, data) => {
        if (err) {
          reject(err)
        }

        resolve(data)
      })
  })
}

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

export const Web3ApiMapping = {
  [KTON_BALANCE_OF]: {
    type: 'call',
    func: callKtonBalanceOf,
  },
  [KTON_ALLOWANCE]: {
    type: 'call',
    func: callKtonAllowance,
  },
  [EVO_TELLTER_BALANCE_OF]: {
    type: 'call',
    func: callEvolutionTellerBalanceOf,
  },
  [EVO_TELLTER_BALANCE_OF_STAKING]: {
    type: 'call',
    func: callEvolutionTellerBalanceOfStaking,
  },
  [EVO_TELLTER_BALANCE_OF_APOSTLEOWNER]: {
    type: 'call',
    func: callEvolutionTellerBalanceOfApostleOwner,
  },
  [EVO_TELLTER_BALANCE_OF_LANDOWNER]: {
    type: 'call',
    func: callEvolutionTellerBalanceOfLandOwner,
  }
}