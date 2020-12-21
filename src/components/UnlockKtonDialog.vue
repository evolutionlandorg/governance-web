<template>
  <div class="content">
    <el-dialog
      title="Unlock KTON"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
      :show-close="false"
      center
    >
      <el-form size="small" :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
        <div class="line"></div>
        <el-form-item class="form-content" label="Current locked:">
          <p>18390.93 KTON</p>
        </el-form-item>
        <el-form-item class="form-content" label="Unlock:">
          <el-input v-model="formLabelAlign.region">
            <span slot="suffix" class="input-suffix">KTON</span>
          </el-input>
        </el-form-item>
        <div class="line"></div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small">Unlock</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UnlockKtonDialog",
  props: {
    visiable: Boolean
  },
  data() {
      return {
        labelPosition: 'left',
        dialogVisible: this.visiable,
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    },
    methods: {
      handleClose(done) {
       console.log('close');
       done();
      },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";

.content {
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
}

::v-deep .el-dialog--center .el-dialog__body {
  padding: 0px 25px 0px
}
</style>
