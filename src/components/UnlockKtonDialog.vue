<template>
  <div class="content">
    <el-dialog
      title="Unlock KTON"
      :visible="visible"
      width="35%"
      :before-close="handleClose"
      :show-close="false"
      center
    >
      <el-form
        size="small"
        :label-position="labelPosition"
        label-width="120px"
        :model="unlockForm"
      >
        <div class="line"></div>
        <el-form-item class="form-content" label="Locked:">
          <p>{{convertFixedAmountFromRawNumber(_evolutionTeller_get_value.balanceOfStaking)}} KTON</p>
        </el-form-item>
        <el-form-item class="form-content" label="Unlock:">
          <el-input v-model="unlockForm.unlockValue" type="number">
            <span slot="suffix" class="input-suffix">KTON</span>
          </el-input>
        </el-form-item>
        <div class="line"></div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel" size="small">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm" size="small">Unlock</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  convertFixedAmountFromRawNumber,
  formatFixedDecimals,
  toWei
} from "@/helpers/bignumber";

export default {
  name: "UnlockKtonDialog",
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
    };
  },
  computed: {
    ...mapGetters([
      "_evolutionTeller_get_value",
      "_kton_get_value",
    ]),
  },
  watch: {
    visible: function() {
      this.unlockForm.unlockValue = ""
    }
  },
  methods: {
     ...mapActions([
      "_evolutionTeller_withdraw"
    ]),
    handleCancel() {
      this.cancel && this.cancel();
    },
    handleConfirm() {
      this.evolutionTellerStake();

      this.confirm && this.confirm();
    },
    handleClose(done) {
      this.beforeClose && this.beforeClose();
      done();
    },
    evolutionTellerStake: function() {
      this._evolutionTeller_withdraw({$web3Modal: this.$web3Modal, params: [toWei(this.unlockForm.unlockValue)]});
    },
    convertFixedAmountFromRawNumber,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";

.content {
  padding: 0!important;
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

  .dialog-footer{
    button {
      width: 130px;
    }
  }
}

::v-deep .el-dialog--center .el-dialog__body {
  padding: 0px 25px 0px;
}
</style>
