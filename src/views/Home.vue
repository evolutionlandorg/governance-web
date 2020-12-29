<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <Connect class="connector"/>
        <PageTab/>
        <Content title="Power">
          <div class="power-box" slot="content">
            <div>
              <Power :power="_evolutionTeller_get_value.balanceOf"/>
            </div>
            <el-row :gutter="20">
              <el-col class="power-item" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <div class="asset-item">
                  <div class="asset-show">
                    <div class="asset-icon">
                      <img src="../assets/kton.png" alt="kton">
                    </div>
                    <div class="asset-info">
                      <p class="title">KTON Power</p>
                      <p
                        class="value"
                      >{{convertFixedAmountFromRawNumber(_evolutionTeller_get_value.balanceOfStaking)}}</p>
                    </div>
                  </div>
                  <div class="asset-buttons">
                    <div class="item">
                      <p>Balance: {{convertFixedAmountFromRawNumber(_kton_get_value.balanceOf)}}</p>
                      <el-button size="small" type="primary">Authorize</el-button>
                    </div>
                    <div class="item">
                      <p>Locked: {{convertFixedAmountFromRawNumber(_evolutionTeller_get_value.balanceOfStaking)}}</p>
                      <el-button size="small" type="primary">Unlock</el-button>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col class="power-item" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <div class="asset-item">
                  <div class="asset-show">
                    <div class="asset-icon">
                      <img src="../assets/land.png" alt="land">
                    </div>
                    <div class="asset-info">
                      <p class="title">Land Power</p>
                      <p
                        class="value"
                      >{{convertFixedAmountFromRawNumber(_evolutionTeller_get_value.balanceOfLandOwner)}}</p>
                    </div>
                  </div>
                  <div class="asset-buttons">
                    <div class="item">
                      <p>My Land: 0</p>
                      <el-button size="small" type="primary">Buy</el-button>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col class="power-item" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <div class="asset-item">
                  <div class="asset-show">
                    <div class="asset-icon">
                      <img src="../assets/apostle.png" alt="apostle">
                    </div>
                    <div class="asset-info">
                      <p class="title">Apostle Power</p>
                      <p
                        class="value"
                      >{{convertFixedAmountFromRawNumber(_evolutionTeller_get_value.balanceOfApostleOwner)}}</p>
                    </div>
                  </div>
                  <div class="asset-buttons">
                    <div class="item">
                      <p>My Apostle: 0</p>
                      <el-button size="small" type="primary">Buy</el-button>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </Content>
        <Content title="Proposal List">
          <div class="proposal-box" slot="content">
            <ProposalList :data="proposals"/>
          </div>
        </Content>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import BigNumber from "bignumber.js";
import {
  Connect,
  PageTab,
  Content,
  Power,
  ProposalList,
} from "@/components/index";
import { EVO_TELLTER_BALANCE_OF } from "@/helpers/constants";
import { convertFixedAmountFromRawNumber } from "@/helpers/bignumber";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Connect,
    PageTab,
    Content,
    Power,
    ProposalList,
  },
  data: () => {
    return {
      totalPower: new BigNumber(12342.68),
      proposals: [
        {
          id: "001",
          title:
            "Test poll with link Test poll with link Test poll with link, Test poll with link Test poll with link Test poll with link, Test poll with link Test poll with link Test poll with link",
          power: new BigNumber(1000.12),
          time: 1608477531,
        },
        {
          id: "002",
          title:
            "Test poll with link Test poll with link Test poll with link, Test poll with link Test poll with link Test poll with link, Test poll with link Test poll with link Test poll with link",
          power: new BigNumber(1000.12),
          time: 1608477531,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["_evolutionTeller_get_value", "_kton_get_value"]),
  },
  mounted: async function() {
    // const power = await this.$web3Modal.contractCall(EVO_TELLTER_BALANCE_OF);
    // console.log('home::mounted:power', power)
  },
  updated: async function() {},
  methods: {
    ...mapActions([
      "_web3Modal_set_value",
      "_web3Modal_reset_value",
      "_test_set_value",
      "_web3Modal_before_txqueue",
    ]),

    convertFixedAmountFromRawNumber: convertFixedAmountFromRawNumber,
  },
};
</script>

<style lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
.connector {
  margin-bottom: 20px;
}

.power-box {
  padding: 30px;
  .power-item {
    margin-top: 20px;
  }
}

.asset-item {
  display: flex;
  flex-direction: column;
  border: $--border-dark;
  border-radius: $--border-radius-base;
  overflow: hidden;
  .asset-show {
    display: flex;
    align-items: stretch;
    padding: 30px 20px 20px;

    .asset-icon {
      width: 70px;
      height: 70px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .asset-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      p {
        margin: 0;
      }
      .title {
        font-size: 14px;
        color: $--color-subtitle;
      }
      .value {
        font-size: 30px;
        font-weight: bold;
      }
    }
  }

  .asset-buttons {
    min-height: 120px;
    background: #282442;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .item {
      padding: 5px 20px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        margin: 0;
        font-size: 14px;
      }
    }
  }
}
</style>
