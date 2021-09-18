import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";

const INFURA_API_KEY = process.env.VUE_APP_INFURA_ID;
const FORTMATIC_ID = process.env.VUE_APP_FORTMATIC_ID;

export const providers = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_API_KEY,
    },
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: FORTMATIC_ID,
    },
  },
};


export const networkSupportedProviders = {
  1: ['walletconnect', 'fortmatic'],
}