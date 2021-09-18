<template>
  <div class="content">
    <div class="header-left">
      <div class="logo-box">
        <router-link to="/">
          <img src="../assets/evolution-land-logo.png" alt="evo logo" />
        </router-link>
      </div>
        <el-dropdown class="" trigger="click" @command="toLand">
          <span>{{$t(`for lands`, {
              land: $t(`lands.${getLandInfo().name}`)
            })}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in EVO_LANDS_ARRAY" :key="item.landId" :command="item.landId">
              {{$t(`lands.${item.name}`)}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
    <div class="nav hidden-xs-only">
      <a target="_blank" rel="noopener noreferrer" href="https://www.evolution.land/">{{$t('nav.game')}}</a>
      <a target="_blank" rel="noopener noreferrer" :href="renderVoteUrl()">{{$t('nav.vote')}}</a>
      <!-- <router-link :to="renderVoteUrl()">Vote</router-link> -->
      <a target="_blank" rel="noopener noreferrer" href="https://talk.darwinia.network/">{{$t('nav.forum')}}</a>
      <a target="_blank" rel="noopener noreferrer" href="https://docs.evolution.land/">{{$t('nav.docs')}}</a>
    </div>
    <div class="menu-box hidden-sm-and-up">
      <img @click="drawer = true" src="@/assets/menu-icon.svg" alt="menu" />
    </div>
    <el-drawer class="menu-drawer" title="MENU" :visible.sync="drawer" :direction="direction" size="265px">
      <div class="menu-ul-box">
        <ul>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://www.evolution.land/">{{$t('nav.game')}}</a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" :href="renderVoteUrl()">{{$t('nav.vote')}}</a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://talk.darwinia.network/">{{$t('nav.forum')}}</a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://docs.evolution.land/">{{$t('nav.docs')}}</a>
          </li>
        </ul>
        <div class="language-box">
          <Language></Language>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import {
    getApi,
    API_SNAPSHOT_DOMAIN,
    EVO_LANDS
  } from '@/helpers/constants'

  import Language from "./Language.vue";
  import { getLandFromRoute } from "@/helpers/utilities"
  import _ from "lodash"

  const EVO_LANDS_ARRAY = _.flatMap(EVO_LANDS, (value, key) => {
    return {landId: key, ...value}
  })

  export default {
    name: "Nav",
    components: {
      Language
    },
    computed: {
      landId: function() {
        if(this.$route.params &&  this.$route.params.landId) {
          return this.$route.params.landId
        }

        return '1' 
      },
    },
    props: {},
    data: function() {
      return {
        drawer: false,
        direction: 'rtl',
        EVO_LANDS_ARRAY: EVO_LANDS_ARRAY
      }
    },
    methods: {
      renderVoteUrl() {
        return `${getApi(API_SNAPSHOT_DOMAIN, this.landId).page}`;
      },
      getLandInfo() {
        if(!getLandFromRoute(parseInt(this.landId))) {
          return {
            name: 'unknown'
          }
        }
        return getLandFromRoute(parseInt(this.landId))
      },
      toLand(landId) {
        window.location.href = `/#/land/${landId}/dao`
        window.location.reload()
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
  .header-left{
    display: flex;
    color: $--color-primary;
    font-size: 14px;
    align-items: center;
    span {
      cursor: pointer;
      background: linear-gradient(180deg, #ffffff, $--color-primary);
      color: #000;
      display: inline-block;
      padding: 1px 7px;
      font-size: 12px;
      font-weight: bold;
      border-radius: 3px;
    }
  }
  .logo-box,
  .menu-box {
    display: flex;
    align-items: center;
  }
  .logo-box {
    width: 185px;
    height: 30px;
    img {
      width: 100%;
      height: 100%;
    }
    margin-right: 8px;
  }
  .nav {
    a {
      font-size: $--font-size-medium;
      color: $--color-primary;
      font-weight: bold;
      text-decoration: none;
      margin-left: 20px;
    }
  }
  .menu-drawer {
    ul {
      padding-left: 0;
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      li {
        text-align: center;
        list-style: none;
        margin: 10px 0;
        a {
          color: #fff;
          text-decoration: none;
          font-weight: bold;
          font-size: 20px;
          display: block;
          padding: 8px;
        }
      }
    }
  }
  .menu-ul-box {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-self: stretch;
    justify-content: center;
  }
  .language-box {
    display: flex;
    justify-content: center;
    padding: 8px;
    background-color: $--color-white;
  }
   ::v-deep .el-drawer__body {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  @media screen and (max-width: $--md) {
    .content {
      padding-top: 8px;
      padding-bottom: 8px;
    }
    .logo-box {
      width: 148px;
      height: 24px;
      a {
        height: 24px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
