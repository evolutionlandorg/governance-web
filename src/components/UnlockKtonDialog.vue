<template>
  <div class="content">
    <el-dialog
      class="dialog"
      :title="$t('unlock kton')"
      :visible="visible"
      width="320"
      :before-close="handleClose"
      :show-close="false"
      center
    >
      <el-form size="small" :label-position="labelPosition" label-width="120px" :model="unlockForm">
        <div class="line"></div>
        <el-form-item class="form-content" :label="`${$t('locked')}:`">
          <p>{{convertFixedAmountFromRawNumber(_evolutionTeller_get_value.balanceOfStaking)}} KTON</p>
        </el-form-item>
        <el-form-item class="form-content input-content" :label="`${$t('unlock')}:`">
          <el-input v-model="unlockForm.unlockValue" type="number">
            <span slot="suffix" class="input-suffix">KTON</span>
          </el-input>
        </el-form-item>
        <count-down
          v-on:start_callback="countDownS_cb(1)"
          :currentTime="parseInt(currentBlockTimestamp)"
          :startTime="parseInt(stakeLock)"
          :tipText="$t('unlockable countdown')"
          :dayTxt="':'"
          :hourTxt="':'"
          :minutesTxt="':'"
          :secondsTxt="''"
        ></count-down>
      </el-form>
      <div class="line"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel" size="small">{{$t('common.cancel')}}</el-button>
        <el-button :disabled="!isUnlock" type="primary" @click="handleConfirm" size="small">{{$t('unlock')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  convertFixedAmountFromRawNumber,
  formatFixedDecimals,
  toWei,
  greaterThan,
} from "@/helpers/bignumber";
import Countdown from "@/components/Countdown.vue";
import * as Methods from "@/helpers/constants";

export default {
  name: "UnlockKtonDialog",
  components: {
    "count-down": Countdown,
  },
  props: {
    visible: Boolean,
    cancel: Function,
    confirm: Function,
    beforeClose: Function,
  },
  data() {
    return {
      labelPosition: "left",
      unlockForm: {
        unlockValue: "",
      },
      stakeLock: '0',
      currentBlockTimestamp: '0',
    };
  },
  computed: {
    ...mapGetters([
      "_evolutionTeller_get_value",
      "_kton_get_value",
      "_web3Modal_get_value",
    ]),
    isUnlock: function() {
      return greaterThan(this.currentBlockTimestamp, this.stakeLock);
    }
  },
  watch: {
    visible: function(newValue, oldValue) {
      this.unlockForm.unlockValue = "";
      if (newValue) {
        this.getStakeLock();
        this.getCurrentTimestamp();
      }
    },
  },
  mounted: function() {},
  methods: {
    ...mapActions(["_evolutionTeller_withdraw"]),
    async getStakeLock() {
      const result = await this.$web3Modal.contractCall(
        Methods.EVO_TELLER_GET_STAKING_LOCK,
        [this._web3Modal_get_value.address]
      );
      this.stakeLock = result.result;
    },
    async getCurrentTimestamp() {
      const { web3 } = this.$web3Modal.getWeb3();
      const blocknumber = await web3.eth.getBlockNumber();
      const block = await web3.eth.getBlock(blocknumber);
      if (block.timestamp) {
        this.currentBlockTimestamp = block.timestamp;
      }
    },
    handleCancel() {
      this.cancel && this.cancel();
    },
    async handleConfirm() {
      try {
        if (!this.checkForm()) {
          return;
        }
        const result = await this._evolutionTeller_withdraw({
          $web3Modal: this.$web3Modal,
          params: [toWei(this.unlockForm.unlockValue)],
        });
        if (result) {
          this.confirm && this.confirm();
        }
      } catch (e) {
        console.log("error handleConfirm: ", e);
      }
    },
    handleClose(done) {
      this.beforeClose && this.beforeClose();
      done();
    },
    checkForm: function() {
      try {
        toWei(this.unlockForm.unlockValue);
      } catch (e) {
        this.$message({
          message: this.$t("form.form input error"),
          type: "error",
        });
        return false;
      }
      if (
        greaterThan(
          toWei(this.unlockForm.unlockValue),
          this._evolutionTeller_get_value.balanceOfStaking
        )
      ) {
        this.$message({
          message: this.$t(`form.kton's balance is insufficient`),
          type: "error",
        });
        return false;
      }
      return true;
    },
    countDownS_cb: function(x) {
      this.getStakeLock();
      this.getCurrentTimestamp();
    },
    convertFixedAmountFromRawNumber,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
.content {
  padding: 0 !important;
  p {
    margin: 0;
  }
  .form-content {
    text-align: right;
    font-weight: bold;
  }
  .input-suffix {
    font-weight: bold;
    color: $--color-text-primary;
  }
  .line {
    border-bottom: $--border-dark;
    margin-bottom: 15px;
  }
  .dialog-footer {
    button {
      width: 130px;
    }
  }
}
::v-deep .el-dialog--center .el-dialog__body {
  padding: 0px 25px 0px;
}
@media screen and (max-width: $--sm) {
  ::v-deep .el-dialog {
    width: 90%;
  }
  ::v-deep .dialog .input-content .el-form-item__content {
    margin-left: 0 !important;
  }
  .content {
    .dialog-footer {
      display: flex;
      flex-direction: column-reverse;
      justify-content: stretch;
      button {
        width: auto;
        margin-top: 10px;
      }
      button + button {
        margin-left: 0;
      }
    }
  }
}
</style>
