
export const API_SNAPSHOT_DOMAIN = {
  dev: {
    domain: 'http://107.167.191.203:8880',
    page: 'http://107.167.191.203:8008'
  },
  prod: {
    domain: 'https://hub.snapshot.page',
    page: 'https://snapshot.page/#/evoland.eth'
  }
}

export const API_GRAPH_DOMAIN = {
  dev: {
    domain: 'https://api.thegraph.com/subgraphs/name/freehere107/alphaevo',
    page: ''
  },
  prod: {
    domain: 'https://api.thegraph.com/subgraphs/name/evolutionlandorg/evolutionland',
    page: ''
  }
}

export function getApi(config) {
  const BUILD_ENV = process.env.VUE_APP_BUILD_ENV;

  return config[BUILD_ENV];
}