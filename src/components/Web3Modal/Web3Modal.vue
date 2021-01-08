<template>
  <div class="web3-modal">
    <el-dialog class="web3-dialog" title="" :visible.sync="centerDialogVisible" width="400" center>
      <div class="dialog-body-before-send" v-if="status === 'send'">
        <div class="status-icon-box">
          <img class="status-icon" src="./static/blue-loader.svg" alt="loader" />
        </div>
        <span class="status-text">{{$t('connect.waiting for confirmation')}}</span>
        <span class="functionsig-text">{{functionSig}}</span>
        <span class="sub-text">{{$t('connect.confirm this transaction in your wallet')}}</span>
      </div>
      <div class="dialog-body-reject" v-if="status === 'reject'">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FF6871" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke-width: 1.5;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        <span>{{$t('connect.transaction rejected')}}</span>
      </div>
      <div class="dialog-body-broadcast" v-if="status === 'broadcast'">
        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="#3FF9E7" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>
        <span>{{$t('connect.transaction submitted')}}</span>
        <a target="_blank" rel="noopener noreferrer" :href="this.handleExplorerURL(txHash)" class="sc-dxgOiQ ejZAHb">
          <div class="">{{$t('connect.view on etherscan')}}</div>
        </a>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Web3 from "web3";
  import Web3Modal from "web3modal";
  import WalletConnectProvider from "@walletconnect/web3-provider";
  import Fortmatic from "fortmatic";
  import {
    handleExplorerURL
  } from "@/helpers/utilities";
  import {
    mapActions,
    mapGetters
  } from "vuex";
  import {
    Web3ApiMapping
  } from "@/helpers/web3api";
  import {
    SUBSCRIBE_CLOSE,
    SUBSCRIBE_ACCOUNTS_CHANGED,
    SUBSCRIBE_CHAIN_CHANGED,
    SUBSCRIBE_NETWORK_CHANGED,
    SUBSCRIBE_HAS_CHANGED,
    SUBSCRIBE_TX_CONFIRMED
  } from './constants';
  import {
    setTimeout,
    clearTimeout
  } from 'timers';
  const INITIAL_STATE = {
    fetching: false,
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
    props: {
      // t: Function
    },
    data() {
      return {
        context: INITIAL_STATE,
        web3: null,
        web3Modal: null,
        emitter: null,
        centerDialogVisible: false,
        // send , pending , reject, fail, success, broadcast
        status: "send",
        functionSig: "",
        txHash: "",
        checkTxQueueStatusTimer: null
      };
    },
    computed: {
      ...mapGetters([
        "_web3Modal_get_value",
        "_web3Modal_get_tx_queue"
      ]),
    },
    mounted() {
    },
    beforeDestroy: function() {
      this.checkTxQueueStatusTimer && clearTimeout(this.checkTxQueueStatusTimer);
    },
    methods: {
      ...mapActions([
        "_web3Modal_set_value",
        "_web3Modal_reset_value",
        "_web3Modal_before_txqueue",
        "_web3Modal_set_tx_queue_status"
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
          providerOptions: mixinProviderOptions,
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
        this.startCheckQueueStatus();
      },
      initWeb3: function(provider) {
        const web3 = new Web3(provider);
        web3.eth.extend({
          methods: [{
            name: "chainId",
            call: "eth_chainId",
            outputFormatter: web3.utils.hexToNumber,
          }, ],
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
        provider.on(SUBSCRIBE_ACCOUNTS_CHANGED, async(accounts) => {
          this._web3Modal_set_value({
            address: accounts[0]
          });
          this.emitter && this.emitter.emit(SUBSCRIBE_ACCOUNTS_CHANGED, {
            address: accounts[0]
          });
          this.emitter && this.emitter.emit(SUBSCRIBE_HAS_CHANGED, {
            address: accounts[0]
          });
        });
        provider.on(SUBSCRIBE_CHAIN_CHANGED, async(chainId) => {
          const networkId = await this.web3.eth.net.getId();
          this._web3Modal_set_value({
            chainId,
            networkId
          });
          this.emitter && this.emitter.emit(SUBSCRIBE_CHAIN_CHANGED, {
            chainId,
            networkId
          });
          this.emitter && this.emitter.emit(SUBSCRIBE_HAS_CHANGED, {
            chainId,
            networkId
          });
        });
        provider.on(SUBSCRIBE_NETWORK_CHANGED, async(networkId) => {
          const chainId = await this.web3.eth.chainId();
          this._web3Modal_set_value({
            chainId,
            networkId
          });
          this.emitter && this.emitter.emit(SUBSCRIBE_NETWORK_CHANGED, {
            chainId,
            networkId
          });
          this.emitter && this.emitter.emit(SUBSCRIBE_HAS_CHANGED, {
            chainId,
            networkId
          });
        });
      },
      getWeb3Modal: function() {
        return {
          provider: this.provider,
          web3: this.web3,
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
        const {
          address,
          chainId
        } = this._web3Modal_get_value;
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
          if (contractCall.type === 'tx') {
            this.centerDialogVisible = true;
            this.functionSig = functionSig;
            this.status = "send";
          }
          const result = await contractCall.func(address, chainId, this.web3, params, options);
          // format displayed result
          const formattedResult = {
            action: functionSig,
            result,
            status: 'pending'
          };
          console.log('web3Modal:: contractcall: ', formattedResult)
          if (contractCall.type === 'tx') {
            this.status = "broadcast";
            this.txHash = result;
            this._web3Modal_before_txqueue([formattedResult]);
          }
          // display result
          // this.setState({
          //   web3,
          //   pendingRequest: false,
          //   result: formattedResult || null
          // });
          return formattedResult;
        } catch (error) {
          this.status = "reject";
          this.functionSig = "";
          console.error('web3Modal::contractCall:', error); // tslint:disable-line
          // this.setState({ web3, pendingRequest: false, result: null });
        }
        // console.log(Web3ApiMapping[functionSig], web3ModalValue)
      },
      handleExplorerURL: function(hash) {
        const {
          chainId
        } = this._web3Modal_get_value;
        return handleExplorerURL(chainId, hash);
      },
      getTransactionReceipt: function(hash, callback) {
        this.web3.eth.getTransactionReceipt(hash, (err, result) => {
          if (err) {
            console.log('web3Modal:: getTransactionReceipt: err ', err);
            callback && callback(null);
            return;
          }
          callback && callback(result);
        });
      },
      checkTxQueueStatus: function() {
        const txqueue = this._web3Modal_get_tx_queue;
        // console.log('web3Modal:: checkTxQueueStatus', txqueue);
        if (!txqueue || txqueue.length === 0) {
          this.checkTxQueueStatusTimer && clearTimeout(this.checkTxQueueStatusTimer);
          this.checkTxQueueStatusTimer = setTimeout(() => {
            this.startCheckQueueStatus();
          }, 30000);
          return;
        }
        txqueue.forEach((item) => {
          if (item.status === 'pending') {
            this.getTransactionReceipt(item.result, (res) => {

              if (!res) {
                return;
              }
              this._web3Modal_set_tx_queue_status({
                hash: item.result,
                status: res.status ? 'success' : 'fail'
              });
              this.txStatusNotice(item, res.status);
            });
          }
        })
        this.checkTxQueueStatusTimer && clearTimeout(this.checkTxQueueStatusTimer);
        this.checkTxQueueStatusTimer = setTimeout(() => {
          this.startCheckQueueStatus();
        }, 30000);
      },
      startCheckQueueStatus: function() {
        this.checkTxQueueStatus();
      },
      txStatusNotice: function(formattedResult, status) {
        if (status) {
          this.$notify({
            title: this.$t('connect.confirmed transaction'),
            dangerouslyUseHTMLString: true,
            message: `<a target="_blank" rel="noopener noreferrer" href="${this.handleExplorerURL(formattedResult.result)}">${formattedResult.action}</a>`,
            type: 'success'
          });
           this.emitter && this.emitter.emit(SUBSCRIBE_TX_CONFIRMED);
        } else {
          this.$notify({
            title: this.$t('connect.failed transaction'),
            dangerouslyUseHTMLString: true,
            message: `<a target="_blank" rel="noopener noreferrer" href="${this.handleExplorerURL(formattedResult.result)}">${formattedResult.action}</a>`,
            type: 'error'
          });
        }
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/theme-chalk/src/common/var.scss";
  .web3-modal {
    .dialog-body-before-send {
      display: flex;
      flex-direction: column;
      .status-icon-box {
        display: flex;
        flex-direction: column;
        -webkit-box-pack: start;
        justify-content: flex-start;
        width: 100%;
        -webkit-box-align: center;
        align-items: center;
        padding: 60px 0px;
        .status-icon {
          animation: 2s linear 0s infinite normal none running GoRound;
          height: 90px;
          width: 90px;
        }
      }
      .status-text {
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 16px;
        text-align: center;
      }
      .functionsig-text {
        margin: 0px;
        min-width: 0px;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        margin: 6px;
      }
      .sub-text {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-size: 12px;
        color: rgb(86, 90, 105);
        text-align: center;
      }
    }
    .dialog-body-reject {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      padding: 2rem 0px;
      span {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 16px;
        color: rgb(255, 104, 113);
        text-align: center;
        margin-top: 24px;
      }
    }
    .dialog-body-broadcast {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      padding: 2rem 0px;
      span {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 16px;
        text-align: center;
        margin-top: 24px;
      }
      a {
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 14px;
        color: rgb(33, 114, 229);
        margin-top: 12px;
        text-decoration: none;
      }
    }
    @keyframes GoRound {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @media screen and (max-width: $--sm) {
       ::v-deep .el-dialog {
        width: 90% !important;
      }
    }
  }
</style>
