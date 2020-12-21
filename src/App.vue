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

export default {
  name: "Home",
  components: {
    Nav,
    Footer
  },
  data: () => {
    return {};
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
