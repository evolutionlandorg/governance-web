<template>
  <div class="content"></div>
</template>

<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import { mapActions, mapGetters } from "vuex";
import { Web3ApiMapping } from "@/helpers/web3api";
import { SUBSCRIBE_CLOSE, SUBSCRIBE_ACCOUNTS_CHANGED, SUBSCRIBE_CHAIN_CHANGED, SUBSCRIBE_NETWORK_CHANGED, SUBSCRIBE_HAS_CHANGED} from './constants';

const INITIAL_STATE = {
  fetching: false,
  address: "",
  web3: null,
  provider: null,
  connected: false,
  chainId: 1,
  networkId: 1,
  assets: [],
  showModal: false,
  pendingRequest: false,
  result: null,
};

export default {
  name: "Web3Modal",
  props: {},
  data() {
    return {
      context: INITIAL_STATE,
      web3: null,
      web3Modal: null,
      emitter: null
    };
  },
  computed: {
    ...mapGetters(["_web3Modal_get_value"]),
  },
  mounted: function() {},
  methods: {
    ...mapActions([
      "_web3Modal_set_value",
      "_web3Modal_reset_value",
      "_test_set_value",
      "_web3Modal_before_txqueue"
    ]),
    init: function(providerOptions = {}, web3ModalOptions = {}, emitter) {
      console.log("web3Modal - mounted");

      const mixinProviderOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
          },
        },
        fortmatic: {
          package: Fortmatic,
          options: {
            key: "pk_test_391E26A3B43A3350",
          },
        },
        ...providerOptions
      };

      const web3Modal = new Web3Modal({
        network: "ropsten",
        cacheProvider: true,
        disableInjectedProvider: false,
        theme: "dark",
        mixinProviderOptions,
        ...web3ModalOptions
      });

      this.web3Modal = web3Modal;
      this.emitter = emitter;

      if (this.web3Modal.cachedProvider) {
        this.onConnect();
      }
    },
    onConnect: async function() {
      const provider = await this.web3Modal.connect();

      await this.subscribeProvider(provider);

      const web3 = this.initWeb3(provider);

      const accounts = await web3.eth.getAccounts();

      const address = accounts[0];

      const networkId = await web3.eth.net.getId();

      const chainId = await web3.eth.chainId();

      this._test_set_value(1);

      this._web3Modal_set_value({
        connected: true,
        address,
        chainId,
        networkId,
      });

      this.web3 = web3;
      this.provider = provider;
      this.emitter && this.emitter.emit(SUBSCRIBE_HAS_CHANGED);

      // await this.getAccountAssets();
    },

    initWeb3: function(provider) {
      const web3 = new Web3(provider);

      web3.eth.extend({
        methods: [
          {
            name: "chainId",
            call: "eth_chainId",
            outputFormatter: web3.utils.hexToNumber,
          },
        ],
      });

      return web3;
    },
    subscribeProvider: async function(provider) {
      if (!provider.on) {
        return;
      }

      provider.on(SUBSCRIBE_CLOSE, () => {
        this.resetApp()
      });

      provider.on(SUBSCRIBE_ACCOUNTS_CHANGED, async (accounts) => {
        this._web3Modal_set_value({ address: accounts[0] });
        this.emitter && this.emitter.emit(SUBSCRIBE_ACCOUNTS_CHANGED, { address: accounts[0] });
        this.emitter && this.emitter.emit(SUBSCRIBE_HAS_CHANGED, { address: accounts[0] });
      });

      provider.on(SUBSCRIBE_CHAIN_CHANGED, async (chainId) => {
        const networkId = await this.web3.eth.net.getId();

        this._web3Modal_set_value({ chainId, networkId });
        this.emitter && this.emitter.emit(SUBSCRIBE_CHAIN_CHANGED, { chainId, networkId });
        this.emitter && this.emitter.emit(SUBSCRIBE_HAS_CHANGED, { chainId, networkId });
      });

      provider.on(SUBSCRIBE_NETWORK_CHANGED, async (networkId) => {
        const chainId = await this.web3.eth.chainId();

        this._web3Modal_set_value({ chainId, networkId });
        this.emitter && this.emitter.emit(SUBSCRIBE_NETWORK_CHANGED, { chainId, networkId });
        this.emitter && this.emitter.emit(SUBSCRIBE_HAS_CHANGED, { chainId, networkId });
      });
    },
    getWeb3Modal: function() {
      return {
        provider: this.provider,
        web3: this.provider,
        web3Modal: this.web3Modal,
      };
    },
    resetApp: async function() {
      if (
        this.web3 &&
        this.web3.currentProvider &&
        this.web3.currentProvider.close
      ) {
        await this.web3.currentProvider.close();
      }
      await this.web3Modal.clearCachedProvider();

      this.provider = null;
      this.web3 = null;

      this._web3Modal_reset_value();
    },
    contractCall: async function(functionSig, params, options) {
      const { address, chainId } = this._web3Modal_get_value;
      const contractCall = Web3ApiMapping[functionSig];

      if (!contractCall) {
        return;
      }

      try {
        // open modal
        // this.toggleModal();

        // toggle pending request indicator
        // this.setState({ pendingRequest: true });

        // send transaction
        const result = await contractCall.func(address, chainId, this.web3, params, options);

        // format displayed result
        const formattedResult = {
          action: functionSig,
          result,
        };

        if(contractCall.type === 'tx') {
          this._web3Modal_before_txqueue(formattedResult);
        }

        // display result
        // this.setState({
        //   web3,
        //   pendingRequest: false,
        //   result: formattedResult || null
        // });
        return formattedResult;
      } catch (error) {
        console.error(error); // tslint:disable-line
        // this.setState({ web3, pendingRequest: false, result: null });
      }

      // console.log(Web3ApiMapping[functionSig], web3ModalValue)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
</style>
