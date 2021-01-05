<template>
  <div class="power">
    <div class="total-power">
      <div class="power-icon">
        <img v-if="smallerThanOrEqual(power, '100000000000000000000')" src="../assets/components/power/power-1.png" alt="power" />
        <img v-else-if="smallerThan(power, '1000000000000000000000')" src="../assets/components/power/power-2.png" alt="power" />
        <img v-else-if="greaterThanOrEqual(power, '1000000000000000000000')" src="../assets/components/power/power-3.png" alt="power" />
      </div>
      <div class="power-info">
        <p class="title">Total Power</p>
        <p class="value">{{ convertFixedAmountFromRawNumber(power) }}</p>
      </div>
    </div>
    <div>
      <el-popover
        title="Total Power"
        width="300"
        trigger="hover"
        content="Total Power Total PowerTotal PowerTotal PowerTotal PowerTotal Power,Total PowerTotal Power">
        <img slot="reference" width="22px" height="22px" src="@/assets/help-icon.png"/>
      </el-popover>
    </div>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";
import { convertFixedAmountFromRawNumber, smallerThan, smallerThanOrEqual, greaterThanOrEqual } from '@/helpers/bignumber'

export default {
  name: "Power",
  props: {
    power: String,
  },
  methods: {
    convertFixedAmountFromRawNumber,
    smallerThan,
    smallerThanOrEqual,
    greaterThanOrEqual
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.power {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total-power {
  display: flex;
}

.power-icon {
  width: 66px;
  height: 66px;
  img {
    width: 100%;
    height: 100%;
  }
}

.power-info {
  p {
    margin: 0;
  }
  .title {
    font-size: 14px;
    color: #f8b140;
  }
  .value {
    font-size: 37px;
    font-weight: bold;
    color: #ffffff;
    line-height: 50px;
    text-shadow: 0px 0px 24px rgba(248, 231, 28, 0.22);
    background: linear-gradient(180deg, #fad961 0%, #f7861c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
