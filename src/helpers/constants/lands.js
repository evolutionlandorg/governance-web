const prod = {
  1: {
    name: 'atlantis',
    networks: [1]
  },
  5: {
    name: 'eden',
    networks: [137]
  },
}

const dev  = {
  ...prod,
  101: {
    name: 'atlantis testnet',
    networks: [3]
  },
  105: {
    name: 'eden testnet',
    networks: [80001]
  },
}

const BUILD_ENV = process.env.VUE_APP_BUILD_ENV;

export const EVO_LANDS = (BUILD_ENV === 'prod' ? prod : dev);


