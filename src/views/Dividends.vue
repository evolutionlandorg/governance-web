<template>
  <div class="home">
    <el-row :gutter="0">
      <el-col style="height: 1px;" :xs="0" :sm="1" :md="2" :lg="3" :xl="3">
        <div></div>
      </el-col>
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="18">
        <Connect class="connector" />
        <PageTab />
        <Content :title="$t('module.staking')">
          <div class="staking-box" slot="content">
            <div class="image-box">
              <img src="../assets/rewards-banner-1.png" alt="" />
            </div>
            <div class="info-box">
              <p class="title">{{$t('claimed rewards')}}</p>
              <p class="value">{{convertFixedAmountFromRawNumber(getTotalDividends())}} RING</p>
              <div class="claim-info">
                <p class="subtitle">{{$t('unclaimed')}}: {{convertFixedAmountFromRawNumber(_evolutionTeller_get_value.earned)}} RING</p>
                <el-button class="is-fixed" size="small" @click="handleCliam()" :disabled="_evolutionTeller_get_value.earned === '0'">{{$t('claim')}}</el-button>
              </div>
            </div>
          </div>
        </Content>
        <Content :title="$t('module.kton balance')">
          <div class="balance-box" slot="content">
            <TokenBalance />
          </div>
        </Content>
        <Content :title="$t('module.history')">
          <div class="history-box" slot="content">
            <DividendHistory/>
          </div>
        </Content>
      </el-col>
      <el-col style="height: 1px;" :xs="0" :sm="1" :md="2" :lg="3" :xl="3">
        <div></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // @ is an alias to /src
  import {
    Connect,
    PageTab,
    Content,
    TokenBalance,
    DividendHistory,
  } from "@/components/index";
  import {
    mapActions,
    mapGetters
  } from "vuex";
  import {
    convertFixedAmountFromRawNumber,
    formatFixedDecimals,
    toWei,
    toBigNumber
  } from "@/helpers/bignumber";
  export default {
    name: "Home",
    components: {
      Connect,
      PageTab,
      Content,
      TokenBalance,
      DividendHistory,
    },
    data: () => {
      return {};
    },
    computed: {
      ...mapGetters([
        "_evolutionTeller_get_value",
        "_web3Modal_get_value",
      ]),
      landId: function() {
        if(this.$route.params &&  this.$route.params.landId) {
          return this.$route.params.landId
        }

        return '1' 
      },
    },
    mounted: function() {
      this._common_init_address_info({
        $web3Modal: this.$web3Modal,
        params: [this._web3Modal_get_value.address],
        landId: this.landId
      });
    },
    methods: {
      ...mapActions([
        "_evolutionTeller_getReward",
        "_common_init_address_info"
      ]),
      getTotalDividends: function() {
        // TODO: 
        return toBigNumber(this._evolutionTeller_get_value.totalDividends);
      },
      handleCliam: async function() {
        try {
          await this._evolutionTeller_getReward({
            $web3Modal: this.$web3Modal
          });
        } catch (e) {
          console.log('error handleConfirm: ', e);
        }
        console.log('close');
      },
      convertFixedAmountFromRawNumber
    }
  };
</script>

<style lang="scss">
  @import "@/styles/theme-chalk/src/common/var.scss";
  .connector {
    margin-bottom: 20px;
  }
  .staking-box {
    display: flex;
    align-items: center;
    .image-box {
      height: 177px;
      overflow: hidden;
      img {
        height: 211px;
        margin-top: -17px;
        margin-left: -17px;
      }
    }
    .info-box {
      p {
        margin: 0;
      }
      .title {
        font-size: $--font-size-base;
        color: $--color-subtitle;
      }
      .value {
        font-size: 37px;
        font-weight: bold;
        text-shadow: 0px 0px 24px rgba(248, 231, 28, 0.22);
        background: linear-gradient(180deg, #fad961 0%, #f7861c 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .subtitle {
        font-size: $--font-size-medium;
        font-weight: bold;
        margin-right: 20px;
      }
      .claim-info {
        display: flex;
        align-items: center;
      }
    }
  }
  .history-box {
    padding: 20px;
  }
  @media screen and (max-width: $--sm) {
    .staking-box {
      padding-left: 10px;
      padding-right: 10px;
      flex-direction: column;
      .image-box {
        height: auto;
      }
      .info-box {
        justify-content: stretch;
        align-self: stretch;
        text-align: center;
        .claim-info {
          display: block;
          .is-fixed {
            margin-top: 20px;
            margin-bottom: 20px;
            width: 100%;
          }
        }
        .value {
          font-size: 32px;
        }
      }
    }
  }

    @media screen and (max-width: 400px) {
    .staking-box {
      .image-box img {
        width: 100%;
        height: auto;
        margin-top: 0;
        margin-left: 0;
      }
    }
  }
</style>
