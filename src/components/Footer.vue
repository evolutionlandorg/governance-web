<template>
  <div class="content">
    <div class="rights-box">
      <p>© 2020 Evolution Land All Rights Reserved</p>
    </div>
    <div class="social-box">
      <div class="links">
        <a target="_blank"
          ><img src="../assets/components/footer/icon-wechat.png"
        /></a>
        <a target="_blank"
          ><img src="../assets/components/footer/icon-weibo.png"
        /></a>
        <a target="_blank"
          ><img src="../assets/components/footer/icon-github.png"
        /></a>
        <a target="_blank"
          ><img src="../assets/components/footer/icon-discord.png"
        /></a>
        <a target="_blank"
          ><img src="../assets/components/footer/icon-telegram.png"
        /></a>
        <a target="_blank"
          ><img src="../assets/components/footer/icon-twitter.png"
        /></a>
        <a target="_blank"
          ><img src="../assets/components/footer/icon-medium.png"
        /></a>
        <a target="_blank"
          ><img src="../assets/components/footer/icon-mail.png"
        /></a>
      </div>

      <el-dropdown class="language" trigger="click">
        <div class="language-select">
          <img
            class="language-icon"
            src="../assets/components/footer/icon-language.png"
          />
          <span class="el-dropdown-link">
            English<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>简体中文</el-dropdown-item>
          <el-dropdown-item>English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {},
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
