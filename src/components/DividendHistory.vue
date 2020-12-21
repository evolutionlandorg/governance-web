<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Locked" name="locked">
        <el-table class="history-table" :data="tableData" style="width: 100%">
          <el-table-column prop="hash" label="Txhash" width="550">
            <template slot-scope="scope">
              <a :href="renderTxLink( scope.row.hash )" target="_blank">{{scope.row.hash}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="Value" width="180">
          </el-table-column>
          <el-table-column prop="date" label="Time" width="150"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Unlocked" name="unlocked">unlocked</el-tab-pane>
      <el-tab-pane label="Dividend" name="dividend">dividend</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "DividendHistory",
  props: {},
  data() {
    return {
      activeName: "locked",
      tableData: [
        {
          date: "2016-05-02",
          hash:
            "0xff5fe1d8ca8e107382cbec346eba1cb6adc310386bbbaa8428a08f3f19294d4c",
          value: "45828.57",
        },
        {
          date: "2016-05-05",
          hash:
            "0xff5fe1d8ca8e107382cbec346eba1cb6adc310386bbbaa8428a08f3f19294d4c",
          value: "45828.57",
        },
        {
          date: "2016-05-06",
          hash:
            "0xff5fe1d8ca8e107382cbec346eba1cb6adc310386bbbaa8428a08f3f19294d4c",
          value: "45828.57",
        },
        {
          date: "2016-05-07",
          hash:
            "0xff5fe1d8ca8e107382cbec346eba1cb6adc310386bbbaa8428a08f3f19294d4c",
          value: "45828.57",
        },
        {
          date: "2016-05-02",
          hash:
            "0xff5fe1d8ca8e107382cbec346eba1cb6adc310386bbbaa8428a08f3f19294d4c",
          value: "45828.57",
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    renderTxLink(hash) {
      return  `https://etherscan.io/tx/${hash}`
    }
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
