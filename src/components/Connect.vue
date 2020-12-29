<template>
  <div class="connect">
    <div class="un-connect" v-if="!_web3Modal_get_value.address">
      <div class="avatar-box">
        <img
          class="default-avatar"
          src="../assets/components/connect/profile.png"
        />
      </div>
      <div class="connect-info">
        <el-button size="small" type="primary" @click="connect"
          >Connect</el-button
        >
      </div>
    </div>
    <div class="connected" v-else>
      <div class="avatar-box">
        <img
          class="default-avatar"
          src="../assets/components/connect/profile.png"
        />
      </div>
      <div class="connect-info">
        <p>Test Name<el-button size="mini" round @click="disconnect">Exit</el-button>
</p>
        <p>{{ _web3Modal_get_value.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Connect",
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters([
      '_web3Modal_get_value',
    ])
  },
  methods: {
    connect() {
      this.$web3Modal.connect();
    },
    disconnect() {
      this.$web3Modal.disconnect();
    }
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

.un-connect, .connected {
  display: flex;
  align-items: center;
}

.connected {
  p {
    margin: 0;
  }
}

</style>
