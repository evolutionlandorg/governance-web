export const ENV = {
  dev: {
    web3ModalNetwork: 'pangolin'
  },
  prod: {
    web3ModalNetwork: 'mainnet'
  }
}

export function getEnv() {
  const BUILD_ENV = process.env.VUE_APP_BUILD_ENV;

  return ENV[BUILD_ENV];
}
