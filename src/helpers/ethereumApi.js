import axios from 'axios'

const api = axios.create({
  baseURL: 'https://ethereum-api.xyz',
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function apiGetAccountAssets(
  address,
  chainId
){
  const response = await api.get(
    `/account-assets?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export async function apiGetAccountTransactions(
  address,
  chainId
) {
  const response = await api.get(
    `/account-transactions?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export const apiGetAccountNonce = async (
  address,
  chainId
) => {
  const response = await api.get(
    `/account-nonce?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export const apiGetBlockNumber = async (
  address,
  chainId
) => {
  const response = await api.get(
    `/block-number?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export const apiGetGasPrices = async () => {
  const response = await api.get(`/gas-prices`)
  const { result } = response.data
  return result
}