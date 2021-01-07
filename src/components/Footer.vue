<template>
  <div class="content">
    <div class="rights-box">
      <p>© 2020 Evolution Land All Rights Reserved</p>
    </div>
    <div class="social-box">
      <div class="links">
        <a target="_blank" rel="noopener noreferrer"><img src="../assets/components/footer/icon-wechat.png" /></a>
        <a href="http://weibo.com/evolutionland" target="_blank" rel="noopener noreferrer"><img src="../assets/components/footer/icon-weibo.png" /></a>
        <a href="https://github.com/evolutionlandorg/" target="_blank" rel="noopener noreferrer"><img src="../assets/components/footer/icon-github.png" /></a>
        <a href="https://discord.gg/NfvyV69" target="_blank" rel="noopener noreferrer"><img src="../assets/components/footer/icon-discord.png" /></a>
        <a href="https://t.me/evolutionland9" target="_blank" rel="noopener noreferrer"><img src="../assets/components/footer/icon-telegram.png" /></a>
        <a href="https://twitter.com/evolutionland9" target="_blank" rel="noopener noreferrer"><img src="../assets/components/footer/icon-twitter.png" /></a>
        <a href="https://medium.com/@evolutionland9" target="_blank" rel="noopener noreferrer"><img src="../assets/components/footer/icon-medium.png" /></a>
        <a href="mailto:hello@evolution.land" target="_blank" rel="noopener noreferrer"><img src="../assets/components/footer/icon-mail.png" /></a>
      </div>
      <div class="hidden-xs-only" ><Language/></div>
    </div>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex";
  import {
    getSupportedLocales,
    supportedLocalesInclude
  } from "@/helpers/i18n/supported-locales";
  import supportedLocales from "@/helpers/i18n/supported";
  import Language from "@/components/Language"
  export default {
    name: "Footer",
    props: {},
    components: {
      Language
    },
    methods: {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/theme-chalk/src/common/var.scss";
  .content {
    display: flex;
    justify-content: space-between;
    align-self: center;
    p{
      margin: 0;
    }
  }
  .rights-box {
    color: #a3a3a3;
  }
  .social-box {
    display: flex;
    justify-content: space-between;
    align-self: center;
    .links {
      display: inline-flex;
      align-self: center;
      a {
        display: inline-flex;
        align-self: center;
        width: 20px;
        height: 20px;
        padding: 0 5px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  @media screen and (max-width: $--md) {
    .content {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
    }
  }
</style>
