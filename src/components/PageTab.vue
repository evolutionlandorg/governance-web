<template>
  <div class="pagetab">
    <router-link tag="div" :class="{'tab-item': true, 'active': isGovernance}" to="/">
      <img src="../assets/home-tab-icon-1.png" alt="" />
      <span>{{$t('nav.governance')}}</span>
    </router-link>
    <router-link tag="div" :class="{'tab-item': true, 'active': isDividends}" to="/dividends">
      <img src="../assets/home-tab-icon-2.png" alt="" />
      <span>{{$t('nav.dividends')}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PageTab",
  props: {
  },
  computed: {
    isGovernance: function() {
      return this.$route.path === '/'
    },
    isDividends: function() {
      return this.$route.path === '/dividends'
    },
  },
  mounted: function (){

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
.pagetab {
  display: flex;
  align-items: center;
}

.tab-item {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  border: 1px solid $--color-primary;
  border-radius: $--border-radius-base;
  padding: 14px 20px;
  cursor: pointer;
  span {
    color: $--color-primary;
    font-weight: 600;
  }
  img {
    margin-left: 10px;
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
}

.tab-item:not(.active):first-child {
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  opacity: 0.5;
}

.tab-item:not(.active):last-child {
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  opacity: 0.5;
}

</style>
