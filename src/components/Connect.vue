<template>
  <div class="connect">
    <div class="un-connect" v-if="!_web3Modal_get_value.address">
      <div class="avatar-box">
        <img class="default-avatar" src="../assets/components/connect/profile.png" />
      </div>
      <div class="connect-info">
        <el-button size="small" type="primary" @click="connect">{{$t('connect.connect')}}</el-button>
      </div>
    </div>
    <div class="connected" v-else>
      <div class="avatar-box">
        <img class="default-avatar" src="../assets/components/connect/profile.png" />
      </div>
      <div class="connect-info">
        <p class="name-info">
          <span class="hidden-sm-and-down">{{  _web3Modal_get_value.address }}</span>
          <span class="hidden-md-and-up">{{ ellipseAddress(_web3Modal_get_value.address, 5) }}</span>
          <el-button size="small" @click="change">{{$t('connect.view more')}}</el-button>
        </p>
      </div>
      <div class="connect-pending" v-if="this.getPendingAmount()">
        <el-button size="small" @click="change">
          <span>{{$t('connect.pending')}} </span>
          <span>{{this.getPendingAmount()}}</span>
          <img class="status status-pending" src="@/assets/components/connect/pending.svg" alt="Pending transaction" />
        </el-button>
      </div>
    </div>
    <el-dialog :title="$t('connect.account')" class="account-dialog" :visible="visible" width="500px" :before-close="handleClose" center>
      <el-form size="small" :label-position="labelPosition" label-width="120px">
        <div class="line"></div>
        <div class="account-box">
          <p class="connect-tip">{{$t('connect.connect with')}}</p>
          <div class="account-info">
            <div class="address">
              <img src="@/assets/components/connect/profile.png" />
              <p>{{ ellipseAddress(_web3Modal_get_value.address, 7) }}</p>
            </div>
            <el-button size="mini" v-if="_web3Modal_get_value.address" @click="disconnect">{{$t('connect.disconnect')}}</el-button>
            <el-button size="mini" v-else @click="connect">{{$t('connect.connect')}}</el-button>
          </div>
          <div>
            <div class="explorer">
              <div v-clipboard="_web3Modal_get_value.address" class="copy"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span style="margin-left: 4px;">{{$t('connect.copy address')}}</span>
              </div>
              <a target="_blank" rel="noopener noreferrer" :href="handleAccountExplorerURL()" class="explorer-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span style="margin-left: 4px;">{{$t('connect.view on expolorer', {explorer: this.getExpolorerName()})}}</span>
              </a>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="tx-queue">
          <div class="queue-header">
            <span>{{$t('connect.recent transaction')}}</span>
            <a @click="clearAll()">{{$t('connect.clear all')}}</a>
          </div>
          <div class="queue">
            <div class="queue-item" v-for="item in _web3Modal_get_tx_queue" :key="item.result">
              <p><a target="_blank" rel="noopener noreferrer" :href="handleExplorerURL(item.result)">{{ellipseAddress(item.result, 10)}}</a> <span class="hidden-xs-only">{{item.action}}</span></p>
              <img v-if="item.status === 'pending'" class="status status-pending" src="@/assets/components/connect/pending.svg" alt="Pending transaction" />
              <img v-else-if="item.status === 'success'" class="status" src="@/assets/components/connect/success.svg" alt="Confirmed transaction" />
              <img v-else class="status" src="@/assets/components/connect/fail.svg" alt="Failed transaction" />
            </div>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  import {
    ellipseAddress,
    handleExplorerURL,
    handleAccountExplorerURL,
    getLandFromRoute,
    getChainData
  } from "@/helpers/utilities";
  import _ from 'lodash';
  export default {
    name: "Connect",
    data: () => {
      return {
        visible: false,
        labelPosition: "left",
      }
    },
    props: {
      msg: String,
    },
    computed: {
      ...mapGetters([
        '_web3Modal_get_value',
        '_web3Modal_get_tx_queue',
      ])
    },
    methods: {
      ...mapActions([
        '_web3Modal_clear_txqueue'
      ]),
      connect() {
        const land = getLandFromRoute(this.$route.params?.landId);

        this.$web3Modal.connect(land.networks);
      },
      disconnect() {
        this.$web3Modal.disconnect();
      },
      change() {
        this.visible = true;
      },
      handleClose() {
        this.visible = false;
      },
      handleExplorerURL: function(hash) {
        const {
          chainId
        } = this._web3Modal_get_value;
        return handleExplorerURL(chainId, hash);
      },
      handleAccountExplorerURL: function() {
        const {
          chainId,
          address
        } = this._web3Modal_get_value;
        return handleAccountExplorerURL(chainId, address);
      },
      clearAll: function() {
        this._web3Modal_clear_txqueue();
      },
      getPendingAmount: function() {
        const queue = this._web3Modal_get_tx_queue;
        return _.filter(queue, {
          status: 'pending'
        }).length;
      },
      getExpolorerName: function() {
        const {
          chainId
        } = this._web3Modal_get_value;
        const chainData = getChainData(chainId)
        return chainData.explorerName
      },
      ellipseAddress
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/theme-chalk/src/common/var.scss";
  .connect {
    p {
      margin: 0;
    }
  }
  .avatar-box {
    width: 44px;
    height: 44px;
  }
  .default-avatar {
    width: 100%;
    height: 100%;
  }
  .connect-info {
    flex: 1;
    margin-left: 10px;
    .name-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        font-size: 20px;
        color: $--color-primary;
        font-weight: 600;
        margin-right: 30px;
      }
    }
  }
  .un-connect,
  .connected {
    display: flex;
    align-items: center;
    .connect-pending {
      button>span {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          margin-left: 5px;
          width: 10px;
          height: 10px;
          position: relative;
          top: 1px;
        }
      }
    }
  }
  .account-dialog {
    .line {
      border-bottom: $--border-dark;
    }
    .account-box {
      padding: 15px 0px;
      .account-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .address {
          margin: 15px 0;
          display: flex;
          align-items: center;
          img {
            width: 30px;
            height: 30px;
          }
          p {
            font-size: 20px;
            font-weight: bold;
            margin-left: 10px;
          }
        }
      }
      .connect-tip {
        color: $--color-info;
        font-size: 14px;
      }
      .explorer {
        display: flex;
        justify-content: flex-start;
        .explorer-link,
        .copy {
          display: flex;
          align-items: center;
          color: $--color-info;
          text-decoration: none;
          cursor: pointer;
          padding-right: 20px;
        }
      }
    }
  }
  .tx-queue {
    .queue-header {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin: 15px 0;
      a {
        cursor: pointer;
        color: $--color-primary;
      }
    }
    .queue-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      color: $--color-primary;
      a {
        color: $--color-primary;
      }
    }
    /* .status {
        height: 18px;
        width: 18px;
      }
      .status-pending {
        animation: 2s linear 0s infinite normal none running GoRound;
      } */
    padding-bottom: 15px;
  }
  .status {
    height: 18px;
    width: 18px;
  }
  .status-pending {
    animation: 2s linear 0s infinite normal none running GoRound;
  }
   ::v-deep .el-dialog--center .el-dialog__body {
    padding: 0px 25px 0px;
  }
   ::v-deep #WEB3_CONNECT_MODAL_ID {
    div {
      z-index: 3000;
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
    .avatar-box {
      width: 30px;
      height: 30px;
    }
    .connect-info {
      .name-info {
        span {
          font-size: 18px;
        }
      }
    }
    .account-dialog {
      .account-box {
        .account-info {
          .address {
            p {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
</style>
