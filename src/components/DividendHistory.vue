<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Locked" name="locked">
        <el-table class="history-table" :data="_evolutionTeller_staked_history.Locked" style="width: 100%">
          <el-table-column prop="id" label="Txhash">
            <template slot-scope="scope">
              <a :href="handleExplorerURL( scope.row.id )" target="_blank">{{ellipseAddress(scope.row.id, 25)}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="Value (KTON)" width="150">
            <template slot-scope="scope">
              <span>{{fromWei(scope.row.amount)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="Time" width="150">
            <template slot-scope="scope">
              <span>{{dateFormat(scope.row.createTime)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Unlocked" name="unlocked">
        <el-table class="history-table" :data="_evolutionTeller_staked_history.Unlocked" style="width: 100%">
          <el-table-column prop="id" label="Txhash">
            <template slot-scope="scope">
              <a :href="handleExplorerURL( scope.row.id )" target="_blank">{{ellipseAddress(scope.row.id, 25)}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="Value (KTON)" width="150">
            <template slot-scope="scope">
              <span>{{fromWei(scope.row.amount)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="Time" width="150">
            <template slot-scope="scope">
              <span>{{dateFormat(scope.row.createTime)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Dividend" name="dividend">
        <el-table class="history-table" :data="_evolutionTeller_staked_history.Dividend" style="width: 100%">
          <el-table-column prop="id" label="Txhash">
            <template slot-scope="scope">
              <a :href="handleExplorerURL( scope.row.id )" target="_blank">{{ellipseAddress(scope.row.id, 25)}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="Value (RING)" width="150">
            <template slot-scope="scope">
              <span>{{fromWei(scope.row.amount)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="Time" width="150">
            <template slot-scope="scope">
              <span>{{dateFormat(scope.row.createTime)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import emitter from "@/helpers/eventBus";
import { SUBSCRIBE_HAS_CHANGED } from "@/components/Web3Modal/constants";
import { handleExplorerURL, dateFormat, ellipseAddress } from "@/helpers/utilities";
import {
  convertFixedAmountFromRawNumber,
  fromWei,
} from "@/helpers/bignumber";

export default {
  name: "DividendHistory",
  props: {},
  data() {
    return {
      activeName: "locked",
    };
  },
  computed: {
    ...mapGetters([
      "_evolutionTeller_get_value",
      "_evolutionTeller_staked_history",
      "_web3Modal_get_value"
    ]),
  },
  mounted: function() {
    emitter.on(SUBSCRIBE_HAS_CHANGED, this.web3ChangeHandle);
    this._dividends_fetch_history([this._web3Modal_get_value.address, 'Locked']);
  },
  beforeDestroy: function() {
    console.log('DividendHistory::beforeDestroy')
    emitter.off(SUBSCRIBE_HAS_CHANGED, this.web3ChangeHandle)
  },
  methods: {
    ...mapActions([
      "_dividends_fetch_history"
    ]),
    handleClick(tab, event) {

    },
    renderTxLink(hash) {
      return  `https://etherscan.io/tx/${hash}`
    },
    web3ChangeHandle() {
        this._dividends_fetch_history([this._web3Modal_get_value.address, 'Locked']);
        this._dividends_fetch_history([this._web3Modal_get_value.address, 'Unlocked']);
        this._dividends_fetch_history([this._web3Modal_get_value.address, 'Dividend']);
    },
    handleExplorerURL(hash) {
      const {
        chainId
      } = this._web3Modal_get_value;
      return handleExplorerURL(chainId, hash);
    },
    convertFixedAmountFromRawNumber,
    dateFormat,
    fromWei,
    ellipseAddress
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
.history-table{
  a{
    color: $--color-primary;
  }

  color: #f9f9f9;
}
</style>
