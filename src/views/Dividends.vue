<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <Connect class="connector" />

        <PageTab />

        <Content title="Dividends">
          <div class="dividends-box" slot="content">
            <div class="image-box">
              <img src="../assets/dividends-banner-1.png" alt="" />
            </div>
            <div class="info-box">
              <p class="title">Total dividends</p>
              <p class="value">2342.65 RING</p>
              <div class="claim-info">
                <p class="subtitle">Unclaimed : 374.38 RING</p>
                <el-button size="mini">Claim</el-button>
              </div>
            </div>
          </div>
        </Content>

        <Content title="KTON Balance">
          <div class="balance-box" slot="content">
            <TokenBalance />
          </div>
        </Content>

        <Content title="History">
          <div class="history-box" slot="content">
            <DividendHistory/>
          </div>
        </Content>
      </el-col>
    </el-row>

    <UnlockKtonDialog :visiable="true"/>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  Connect,
  PageTab,
  Content,
  TokenBalance,
  DividendHistory,
  UnlockKtonDialog
} from "@/components/index";

export default {
  name: "Home",
  components: {
    Connect,
    PageTab,
    Content,
    TokenBalance,
    DividendHistory,
    UnlockKtonDialog
  },
  data: () => {
    return {
    };
  },
};
</script>

<style lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
.connector {
  margin-bottom: 20px;
}

.dividends-box {
  display: flex;
  align-items: center;
  .image-box {
    height: 177px;
    overflow: hidden;
    img {
      height: 211px;
      margin-top: -17px;
      margin-left: -17px;
    }
  }
  .info-box {
    p {
      margin: 0;
    }
    .title {
      font-size: $--font-size-base;
      color: $--color-subtitle;
    }
    .value {
      font-size: 37px;
      font-weight: bold;
      text-shadow: 0px 0px 24px rgba(248, 231, 28, 0.22);
      background: linear-gradient(180deg, #fad961 0%, #f7861c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      font-size: $--font-size-medium;
      font-weight: bold;
      margin-right: 20px;
    }
    .claim-info {
      display: flex;
      align-items: center;
    }
  }
}

.history-box{
  padding: 20px;
}
</style>
