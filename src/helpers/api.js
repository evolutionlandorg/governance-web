import axios from 'axios';
import {getApi, API_SNAPSHOT_DOMAIN} from '@/helpers/constants';

export const api = axios.create({
  // baseURL: getApi(API_SNAPSHOT_DOMAIN).domain,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function apiGetProposals(landId) {
  const apiInfo = getApi(API_SNAPSHOT_DOMAIN, landId)
  console.log(apiInfo)
  const response = await api.get(
    `${apiInfo.domain}${apiInfo.getProposals}`
  );

  try {
    JSON.stringify(response.data);
  } catch (error) {
    console.log(error);
    return {}
  }

  return response.data;
}
