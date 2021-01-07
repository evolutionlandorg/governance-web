<template>
  <div class="content">
    <el-dropdown class="language" trigger="click" @command="changeLanguage">
      <div class="language-select">
        <img class="language-icon" src="@/assets/components/footer/icon-language.png" />
        <span class="el-dropdown-link">
          {{getCurrentLanguage()}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in supportedLocales" :key="item.code" :command="item.code">{{item.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
  export default {
    name: "Language",
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
