const supportedChains = [
  {
    name: "Ethereum Mainnet",
    short_name: "eth",
    chain: "ETH",
    network: "mainnet",
    explorer: "https://etherscan.io",
    explorerName: 'Etherscan',
    chain_id: 1,
    network_id: 1,
    rpc_url: "https://mainnet.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  },
  {
    name: "Ethereum Ropsten",
    short_name: "rop",
    chain: "ETH",
    network: "ropsten",
    explorer: "https://ropsten.etherscan.io",
    explorerName: 'Etherscan',
    chain_id: 3,
    network_id: 3,
    rpc_url: "https://ropsten.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  },
  {
    name: "Polygon",
    short_name: "mainnet",
    chain: "smartchain",
    network: "polygon",
    explorer: "https://polygonscan.com",
    explorerName: 'Polygonscan',
    chain_id: 137,
    network_id: 137,
    rpc_url: "https://polygonscan.com/",
    native_currency: {
      symbol: "MATIC",
      name: "MATIC",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  },
  {
    name: "Polygon Mumbai",
    short_name: "mumbai",
    chain: "smartchain",
    network: "mumbai",
    explorer: "https://mumbai.polygonscan.com",
    explorerName: 'Polygonscan',
    chain_id: 80001,
    network_id: 80001,
    rpc_url: "https://mumbai.polygonscan.com/",
    native_currency: {
      symbol: "MATIC",
      name: "MATIC",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  }
];

export default supportedChains;