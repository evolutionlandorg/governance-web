<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <el-row :gutter="20">
          <el-col :span="16" :offset="4">
            <Nav />
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <router-view />
      </el-main>

      <el-footer>
        <el-row :gutter="20">
          <el-col :span="16" :offset="4">
            <Footer />
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { Nav, Footer } from "@/components/index";
import emitter from "@/helpers/eventBus";
import { mapActions, mapGetters } from "vuex";
import { SUBSCRIBE_HAS_CHANGED } from "@/components/Web3Modal/constants";

export default {
  name: "Home",
  components: {
    Nav,
    Footer,
  },
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters([
      '_web3Modal_get_value',
    ])
  },
  created: function() {
    emitter.on(SUBSCRIBE_HAS_CHANGED, this.web3ChangeHandle);

    this.$web3Modal.init({}, {}, emitter);
  },
  beforeDestroy: function() {
    emitter.all.clear();
    // emitter.off(SUBSCRIBE_HAS_CHANGED, this.web3ChangeHandle)
  },
  methods: {
    ...mapActions(["_common_init_address_info"]),
    web3ChangeHandle() {
      this._common_init_address_info({$web3Modal: this.$web3Modal, params: this._web3Modal_get_value.address});
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}

.header {
  border-bottom: $--border-dark;
}
</style>
