<template>
  <div>
    <div class="token-balance">
      <div class="info-box">
        <div class="token-image">
          <img src="../assets/kton.png" alt="">
        </div>
        <div class="balance-box">
          <p>{{$t('balance')}}</p>
          <h2>{{convertFixedAmountFromRawNumber(_kton_get_value.balanceOf)}}</h2>
        </div>
        <div class="balance-box">
          <p>{{$t('locked')}}</p>
          <h2>{{convertFixedAmountFromRawNumber(_evolutionTeller_get_value.balanceOfStaking)}}</h2>
        </div>
      </div>
      <div class="buttons-box">
        <!-- <el-button class="is-fixed" size="small" v-if="!_evolutionTeller_is_approve_kton" @click="approveKtonToEvolutionTeller">{{$t('approve')}}</el-button>
        <el-button class="is-fixed" size="small" v-else @click="toggleLockKtonDialogVisible">{{$t('lock')}}</el-button> -->
        <el-button class="is-fixed" size="small" @click="toggleUnlockKtonDialogVisible">{{$t('unlock')}}</el-button>
      </div>
    </div>
    <div>
      <LockKtonDialog :visible="lockKtonDialogVisible" :confirm="toggleLockKtonDialogVisible" :cancel="toggleLockKtonDialogVisible" />
      <UnlockKtonDialog :visible="unlockKtonDialogVisible" :confirm="toggleUnlockKtonDialogVisible" :cancel="toggleUnlockKtonDialogVisible" />
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import {
    convertFixedAmountFromRawNumber,
    formatFixedDecimals,
    toWei,
  } from "@/helpers/bignumber";
  import UnlockKtonDialog from "./UnlockKtonDialog.vue";
  import LockKtonDialog from "./LockKtonDialog.vue";
  export default {
    name: "TokenBalance",
    components: {
      LockKtonDialog,
      UnlockKtonDialog,
    },
    props: {},
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
      ]),
    },
    methods: {
      ...mapActions(["_kton_approve_to_evolutionTeller"]),
      approveKtonToEvolutionTeller: function() {
        this._kton_approve_to_evolutionTeller({
          $web3Modal: this.$web3Modal
        });
      },
      toggleLockKtonDialogVisible: function() {
        this.lockKtonDialogVisible = !this.lockKtonDialogVisible;
      },
      toggleUnlockKtonDialogVisible: function() {
        this.unlockKtonDialogVisible = !this.unlockKtonDialogVisible;
      },
      convertFixedAmountFromRawNumber,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/theme-chalk/src/common/var.scss";
  .token-balance {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    p,
    h2 {
      margin: 0;
    }
    .token-image {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info-box {
      display: flex;
      align-items: center;
      .balance-box {
        margin-left: 40px;
        p {
          font-size: $--font-size-base;
          color: $--color-subtitle;
        }
        h2 {
          font-size: 30px;
        }
      }
    }
    .buttons-box {
      justify-self: flex-end;
    }
  }
  @media screen and (max-width: $--sm) {
    .token-balance {
      padding: 20px 10px;
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;
      .info-box {
        flex-wrap: wrap;
        .balance-box {
          margin-left: 20px;
        }
        .balance-box+.balance-box {
          flex-basis: 50%;
          margin-left: 90px;
        }
      }
      .buttons-box {
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;
        display: flex;
        button {
          margin-top: 10px;
          width: auto;
        }
        button+button {
          margin-left: 0px;
        }
      }
    }
  }
</style>
