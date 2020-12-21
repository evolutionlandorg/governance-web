<template>
  <div class="content">
    <div class="info-box">
      <div class="token-image">
        <img src="../assets/kton.png" alt="" />
      </div>

      <div class="balance-box">
        <p>Balance</p>
        <h2>41343.23</h2>
      </div>

      <div class="balance-box">
        <p>Locked</p>
        <h2>23.11</h2>
      </div>
    </div>
    <div class="buttons-box">
      <el-button size="mini">Lock</el-button>
      <el-button size="mini">Unlock</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TokenBalance",
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;

  p,
  h2 {
    margin: 0;
  }
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
    p{
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
</style>
