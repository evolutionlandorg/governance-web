import ApolloClient from 'apollo-boost'
import {getApi, API_GRAPH_DOMAIN} from '@/helpers/constants';

export function theGraphApolloClient(landId) {
  return new ApolloClient({
    uri: getApi(API_GRAPH_DOMAIN, landId).domain,
    // cache: 'cache-and-network'
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
    },
  })
}