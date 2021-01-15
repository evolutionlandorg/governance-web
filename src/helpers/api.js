import axios from 'axios';
import {getApi, API_SNAPSHOT_DOMAIN} from '@/helpers/constants';

const api = axios.create({
  baseURL: getApi(API_SNAPSHOT_DOMAIN).domain,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function apiGetProposals(){
  const response = await api.get(
    `api/evoland.eth/proposals`
  );

  try {
    JSON.parse(response.data);
  } catch (error) {
    console.log(error);
    return {}
  }

  return {} || response.data;
}
