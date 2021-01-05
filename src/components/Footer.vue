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
      <el-dropdown class="language" trigger="click" @command="changeLanguage">
        <div class="language-select">
          <img class="language-icon" src="../assets/components/footer/icon-language.png" />
          <span class="el-dropdown-link">
              {{getCurrentLanguage()}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in supportedLocales" :key="item.code" :command="item.code">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex";
  import {
    getSupportedLocales, supportedLocalesInclude
  } from "@/helpers/i18n/supported-locales";
  import supportedLocales from "@/helpers/i18n/supported";

  export default {
    name: "Footer",
    props: {},
    computed: {
      ...mapGetters(["_i18n_get_value"]),
      supportedLocales: function() {
        return getSupportedLocales();
      }
    },
    methods: {
      ...mapActions([
        "_i18n_set_language",
      ]),
      changeLanguage(lng) {
        this._i18n_set_language(lng);
        this.$i18n.locale = lng;
      },
      getCurrentLanguage() {
        if (supportedLocalesInclude(this._i18n_get_value)) {
          return supportedLocales[this._i18n_get_value]
        } else {
          return "English"
        }
      }
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
  .language {
    .language-select {
      display: flex;
      align-self: center;
      .language-icon {
        width: 20px;
        height: 20px;
        padding: 0 5px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .el-dropdown-link {
      cursor: pointer;
    }
  }
</style>
