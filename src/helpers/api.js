import axios from 'axios';
import {getApi, API_SNAPSHOT_DOMAIN, API_GRAPH_DOMAIN} from '@/helpers/constants';

const api = axios.create({
  baseURL: getApi(API_SNAPSHOT_DOMAIN).domain,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const graphApi = axios.create({
  baseURL: getApi(API_GRAPH_DOMAIN).domain,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function apiGetProposals(){
  const response = await api.get(
    `/api/evolutionland/proposals`
  );
  return response.data;
}


export async function apiGetStakeHistory(){
  const response = await graphApi.post(
    `/subgraphs/name/freehere107/alphaevo`
  );
  return response.data;
}
