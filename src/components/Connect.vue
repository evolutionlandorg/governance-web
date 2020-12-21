<template>
  <div class="connect">
    <div class="un-connect">
      <div class="avatar-box">
        <img
          class="default-avatar"
          src="../assets/components/connect/profile.png"
        />
      </div>
      <div class="connect-info">
        <el-button size="small" type="primary">Connect</el-button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Connect",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.avatar-box {
  width: 54px;
  height: 54px;
}

.default-avatar {
  width: 100%;
  height: 100%;
}

.connect-info {
  margin-left: 20px;
}

.un-connect {
  display: flex;
  align-items: center;
}
</style>
