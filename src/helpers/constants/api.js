
export const API_SNAPSHOT_DOMAIN = {
  dev: {
    domain: 'http://107.167.191.203:8880',
    page: 'http://107.167.191.203:8008'
  },
  prod: {
    domain: 'https://hub.snapshot.page',
    page: 'https://snapshot.page'
  },
  1: {
    domain: 'https://snapshot-hub.evolution.land',
    pageDomain: 'https://snapshot.page',
    page: 'https://snapshot.page/#/evoland.eth',
    getProposals: '/api/evoland.eth/proposals',
    proposalLink: '/#/evoland.eth/proposal/'
  },
  101: {
    domain: '',
    pageDomain: 'https://snapshot.page',
    page: '',
    getProposals: '/api/evoland.eth/proposals',
    proposalLink: '/#/evoland.eth/proposal/'
  },
  5: {
    domain: 'https://snapshot-hub.evolution.land',
    pageDomain: 'https://snapshot.evolution.land',
    page: 'https://snapshot.evolution.land/#/evoland-polygon-mainnet',
    getProposals: '/api/evoland-polygon-mainnet/proposals',
    proposalLink: '/#/evoland-polygon-mainnet/proposal/'
  },
  105: {
    domain: 'https://snapshot-hub.evolution.land',
    pageDomain: 'https://snapshot.evolution.land',
    page: 'https://snapshot.evolution.land/#/evoland-polygon-mainnet',
    getProposals: '/api/evoland-polygon-mainnet/proposals',
    proposalLink: '/#/evoland-polygon-mainnet/proposal/'
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
  },
  1: {
    domain: 'https://api.thegraph.com/subgraphs/name/evolutionlandorg/evolutionland',
    page: ''
  },
  101: {
    domain: 'https://api.thegraph.com/subgraphs/name/freehere107/alphaevo',
    page: ''
  },
  5: {
    domain: 'https://api.thegraph.com/subgraphs/name/evolutionlandorg/evolutionlandorgpolygon',
    page: ''
  },
  105: {
    domain: 'https://api.thegraph.com/subgraphs/name/evolutionlandorg/evolutionlandmumbai',
    page: ''
  }
}

export function getApi(config, landId) {
  return config[parseInt(landId)];
}