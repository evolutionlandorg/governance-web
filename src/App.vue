<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <el-row :gutter="0">
          <el-col style="height: 1px;" :xs="0" :sm="1" :md="2" :lg="3" :xl="3">
            <div></div>
          </el-col>
          <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="18">
            <Nav />
          </el-col>
          <el-col style="height: 1px;" :xs="0" :sm="1" :md="2" :lg="3" :xl="3">
            <div></div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer class="footer">
        <el-row :gutter="0">
          <el-col style="height: 1px;" :xs="0" :sm="1" :md="2" :lg="3" :xl="3">
            <div></div>
          </el-col>
          <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="18">
            <Footer />
          </el-col>
          <el-col style="height: 1px;" :xs="0" :sm="1" :md="2" :lg="3" :xl="3">
            <div></div>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  // @ is an alias to /src
  import {
    Nav,
    Footer
  } from "@/components/index";
  import emitter from "@/helpers/eventBus";
  import {
    mapActions,
    mapGetters
  } from "vuex";
  import {
    SUBSCRIBE_HAS_CHANGED,
    SUBSCRIBE_TX_CONFIRMED
  } from "@/components/Web3Modal/constants";
  import getBrowserLocale from "@/helpers/i18n/get-browser-locale";
  import {
    supportedLocalesInclude
  } from "@/helpers/i18n/supported-locales";
  import {
    getLandFromRoute
  } from "@/helpers/utilities";
  import { getEnv } from '@/helpers/config';
  import { providers as web3Providers, networkSupportedProviders } from '@/helpers/web3Providers';

  export default {
    name: "App",
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
        "_i18n_get_value"
      ]),
      landId: function() {
        if(this.$route.params &&  this.$route.params.landId) {
          return this.$route.params.landId
        }

        return '1' 
      },
    },
    created: function() {
      emitter.on(SUBSCRIBE_HAS_CHANGED, this.web3ChangeHandle);
      emitter.on(SUBSCRIBE_TX_CONFIRMED, this.web3ChangeHandle);
      const startingLocale = this.getStartingLocale();
      this.$i18n.locale = startingLocale;

      const land = getLandFromRoute(this.$route.params?.landId || '1');

      let providers = {};

      land?.networks?.forEach((network) => {
        networkSupportedProviders[network] && networkSupportedProviders[network].map((providerName) => {
          providers[providerName] = web3Providers[providerName]
        })
      })
      console.log(111111, providers)
      this.$web3Modal.init(providers, {
        network: getEnv().web3ModalNetwork,
      }, land?.networks, emitter);
    },
    mounted: function() {
      this.web3ChangeHandle()
    },
    beforeDestroy: function() {
      emitter.all.clear();
    },
    methods: {
      ...mapActions(["_common_init_address_info", "_proposal_fetch_info"]),
      web3ChangeHandle() {
        this._common_init_address_info({
          $web3Modal: this.$web3Modal,
          params: [this._web3Modal_get_value.address],
          landId: this.landId
        });
        this._proposal_fetch_info(this.$route.params?.landId)
      },
      getStartingLocale() {
        const browserLocale = this._i18n_get_value;
        if (supportedLocalesInclude(browserLocale)) {
          return browserLocale
        } else {
          return process.env.VUE_APP_I18N_LOCALE || "en"
        }
      }
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
    height: 70px !important;
  }
  .footer {
    display: flex;
    align-items: center;
    border-top: $--border-dark;
    .el-row {
      flex: 1;
    }
    .rights-box {
      padding: 10px;
    }
    .social-box {
      padding: 10px;
    }
  }
  @media screen and (max-width: $--md) {
    .header {
      height: 50px !important;
      display: flex;
      align-items: center;
      &>div{
        flex: 1;
      }
    }
    .footer {
      height: 118px !important;
    }
  }
</style>
