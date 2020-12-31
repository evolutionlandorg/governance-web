import ApolloClient from 'apollo-boost'
import {getApi, API_GRAPH_DOMAIN} from '@/helpers/constants';

export const theGraphApolloClient = new ApolloClient({
  uri: getApi(API_GRAPH_DOMAIN).domain,
})