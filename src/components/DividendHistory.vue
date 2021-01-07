<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('locked')" name="locked">
        <el-table class="history-table" :data="_evolutionTeller_staked_history.Locked" style="width: 100%">
          <el-table-column prop="id" :label="$t('txhash')" min-width="450">
            <template slot-scope="scope">
              <a :href="handleExplorerURL( scope.row.id )" target="_blank">{{ellipseAddress(scope.row.id, 25)}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="amount" :label="$t('history value', { token: 'KTON' })" width="150">
            <template slot-scope="scope">
              <span>{{fromWei(scope.row.amount)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('time')" width="150">
            <template slot-scope="scope">
              <span>{{dateFormat(scope.row.createTime)}}</span>
            </template>
          </el-table-column>
          <div slot="empty">
            <TableEmpty/>
          </div>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('unlocked')" name="unlocked">
        <el-table class="history-table" :data="_evolutionTeller_staked_history.Unlocked" style="width: 100%">
          <el-table-column prop="id" :label="$t('txhash')" min-width="450">
            <template slot-scope="scope">
              <a :href="handleExplorerURL( scope.row.id )" target="_blank">{{ellipseAddress(scope.row.id, 25)}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="amount" :label="$t('history value', { token: 'KTON' })" width="150">
            <template slot-scope="scope">
              <span>{{fromWei(scope.row.amount)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('time')" width="150">
            <template slot-scope="scope">
              <span>{{dateFormat(scope.row.createTime)}}</span>
            </template>
          </el-table-column>
          <div slot="empty">
            <TableEmpty/>
          </div>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('dividend')" name="dividend">
        <el-table class="history-table" :data="_evolutionTeller_staked_history.Dividend" style="width: 100%">
          <el-table-column prop="id" :label="$t('txhash')" min-width="450">
            <template slot-scope="scope">
              <a :href="handleExplorerURL( scope.row.id )" target="_blank">{{ellipseAddress(scope.row.id, 25)}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="amount" :label="$t('history value', { token: 'RING' })" width="150">
            <template slot-scope="scope">
              <span>{{fromWei(scope.row.amount)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('time')" width="150">
            <template slot-scope="scope">
              <span>{{dateFormat(scope.row.createTime)}}</span>
            </template>
          </el-table-column>
          <div slot="empty">
            <TableEmpty/>
          </div>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TableEmpty from "@/components/TableEmpty"
import { mapActions, mapGetters } from "vuex";
import emitter from "@/helpers/eventBus";

import { SUBSCRIBE_HAS_CHANGED, SUBSCRIBE_TX_CONFIRMED } from "@/components/Web3Modal/constants";
import { handleExplorerURL, dateFormat, ellipseAddress } from "@/helpers/utilities";
import {
  convertFixedAmountFromRawNumber,
  fromWei,
} from "@/helpers/bignumber";

export default {
  name: "DividendHistory",
  components: {
    TableEmpty
  },
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
    emitter.on(SUBSCRIBE_TX_CONFIRMED, this.web3ChangeHandle);
    this._dividends_fetch_history([this._web3Modal_get_value.address, 'Locked']);
    this._dividends_fetch_history([this._web3Modal_get_value.address, 'Unlocked']);
    this._dividends_fetch_history([this._web3Modal_get_value.address, 'Dividend']);
  },
  beforeDestroy: function() {
    emitter.off(SUBSCRIBE_HAS_CHANGED, this.web3ChangeHandle)
    emitter.off(SUBSCRIBE_TX_CONFIRMED, this.web3ChangeHandle)
  },
  methods: {
    ...mapActions([
      "_dividends_fetch_history"
    ]),
    handleClick(tab, event) {

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
  span {
    /* min-width: 150px; */
   
  }
  color: #f9f9f9;
}
</style>
