<template>
  <div class="power">
    <div class="power-icon">
      <img src="../assets/components/power/power-3.png" alt="power" />
    </div>
    <div class="power-info">
      <p class="title">Total Power</p>
      <p class="value">{{ power.toString() }}</p>
    </div>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";

export default {
  name: "Power",
  props: {
    power: BigNumber,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.power {
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
