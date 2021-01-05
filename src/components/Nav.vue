<template>
  <div class="content">
    <div class="logo-box">
      <router-link to="/">
      <img src="../assets/evolution-land-logo.png" alt="evo logo" />
      </router-link>
    </div>
    <div class="nav">
      <a target="_blank" rel="noopener noreferrer" href="https://www.evolution.land/">{{$t('nav.game')}}</a>
      <a target="_blank" rel="noopener noreferrer" :href="renderVoteUrl()">{{$t('nav.vote')}}</a>
      <!-- <router-link :to="renderVoteUrl()">Vote</router-link> -->
      <a target="_blank" rel="noopener noreferrer" href="https://talk.darwinia.network/">{{$t('nav.forum')}}</a>
      <a target="_blank" rel="noopener noreferrer" href="https://docs.evolution.land/">{{$t('nav.docs')}}</a>
    </div>
  </div>
</template>

<script>
import { getApi, API_SNAPSHOT_DOMAIN } from '@/helpers/constants'

export default {
  name: "Nav",
  props: {},
  methods: {
    renderVoteUrl() {
      return `${getApi(API_SNAPSHOT_DOMAIN).page}/#/evolutionland`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
}
.logo-box {
  width: 185px;
  height: 30px;
  img {
    width: 100%;
    height: 100%;
  }
}

.nav {
  a {
    font-size: $--font-size-medium;
    color: $--color-primary;
    font-weight: bold;
    text-decoration: none;
    margin-left: 20px;
    &.router-link-exact-active {
      /* color: #42b983; */
    }
  }
}
</style>
