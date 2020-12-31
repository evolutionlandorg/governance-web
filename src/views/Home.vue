<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <Connect class="connector"/>
        <PageTab/>
        <Content title="Power">
          <div class="power-box" slot="content">
            <div>
              <Power :power="_evolutionTeller_get_power.totalPower"/>
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
                      >{{convertFixedAmountFromRawNumber(_evolutionTeller_get_power.stakingPower)}}</p>
                    </div>
                  </div>
                  <div class="asset-buttons">
                    <div class="item">
                      <p>Balance: {{convertFixedAmountFromRawNumber(_kton_get_value.balanceOf)}}</p>
                      <el-button size="small" type="primary" v-if="!_evolutionTeller_is_approve_kton" @click="approveKtonToEvolutionTeller">Authorize</el-button>
                      <el-button size="small" type="primary" v-else @click="toggleLockKtonDialogVisible">Lock</el-button>
                    </div>
                    <div class="item">
                      <p>Locked: {{convertFixedAmountFromRawNumber(_evolutionTeller_get_value.balanceOfStaking)}}</p>
                      <el-button size="small" type="primary" @click="toggleUnlockKtonDialogVisible">Unlock</el-button>
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
                      >{{formatFixedDecimals(_evolutionTeller_get_power.landPower)}}</p>
                    </div>
                  </div>
                  <div class="asset-buttons">
                    <div class="item">
                      <p>My Land: {{formatFixedDecimals(_evolutionTeller_get_value.balanceOfLandOwner)}}</p>
                      <el-button size="small" type="primary" @click="openUrl('https://www.evolution.land.l2me.com/land/1?goUrl=%2Flandmarket%2Fsearch')">Buy</el-button>
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
                      >{{formatFixedDecimals(_evolutionTeller_get_power.apostlePower)}}</p>
                    </div>
                  </div>
                  <div class="asset-buttons">
                    <div class="item">
                      <p>My Apostle: {{formatFixedDecimals(_evolutionTeller_get_value.balanceOfApostleOwner)}}</p>
                      <el-button size="small" type="primary" @click="openUrl('https://www.evolution.land.l2me.com/land/1?goUrl=%2Fapostle')">Buy</el-button>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </Content>
        <Content title="Proposal List">
          <div class="proposal-box" slot="content">
            <ProposalList :data="_proposal_get_value"/>
          </div>
        </Content>
      </el-col>
    </el-row>
    <LockKtonDialog 
    :visible="lockKtonDialogVisible" 
    :confirm="toggleLockKtonDialogVisible"
    :cancel="toggleLockKtonDialogVisible"
     />

    <UnlockKtonDialog 
    :visible="unlockKtonDialogVisible" 
    :confirm="toggleUnlockKtonDialogVisible"
    :cancel="toggleUnlockKtonDialogVisible"
     />
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
  LockKtonDialog,
  UnlockKtonDialog
} from "@/components/index";
import { EVO_TELLER_BALANCE_OF } from "@/helpers/constants";
import {
  convertFixedAmountFromRawNumber,
  formatFixedDecimals,
  toWei
} from "@/helpers/bignumber";
import { mapActions, mapGetters } from "vuex";
import { openUrl } from "@/helpers/utilities";
import { getStakeHistory } from '@/helpers/graphApi';

export default {
  name: "Home",
  components: {
    Connect,
    PageTab,
    Content,
    Power,
    ProposalList,
    LockKtonDialog,
    UnlockKtonDialog
  },
  data: () => {
    return {
      lockKtonDialogVisible: false,
      unlockKtonDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters([
      "_evolutionTeller_get_value",
      "_kton_get_value",
      "_evolutionTeller_get_power",
      "_evolutionTeller_is_approve_kton",
      "_proposal_get_value",
      "_web3Modal_get_value"
    ]),
  },
  mounted: async function() {
    console.log('graph', await getStakeHistory('0x4ad6e21bef59268f2ccf10bfa18c20c8c13ed859'))
  },
  updated: async function() {},
  methods: {
    ...mapActions([
      "_web3Modal_set_value",
      "_web3Modal_reset_value",
      "_test_set_value",
      "_web3Modal_before_txqueue",
      "_kton_approve_to_evolutionTeller",
    ]),
    approveKtonToEvolutionTeller: function() {
      this._kton_approve_to_evolutionTeller({$web3Modal: this.$web3Modal});
    },
    toggleLockKtonDialogVisible: function() {
      this.lockKtonDialogVisible = !this.lockKtonDialogVisible;
    },
    toggleUnlockKtonDialogVisible: function() {
      this.unlockKtonDialogVisible = !this.unlockKtonDialogVisible;
    },
    convertFixedAmountFromRawNumber,
    formatFixedDecimals,
    openUrl
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
