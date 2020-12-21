<template>
  <div class="content">
    <div class="proposal-info">
      <p class="title">{{ proposal.title }}</p>
      <p class="subtitle">
        Avaliable Power: {{ proposal.power }} Time: {{ proposal.time }}
      </p>
    </div>
    <div class="proposal-buttons">
      <el-button size="mini">Vote</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProposalItem",
  props: {
    proposal: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
.content {
  display: flex;
  align-items: center;
  padding: 20px;

  .proposal-info {
    min-width: 0;
    margin-right: 20px;
    p {
      margin: 0;
    }

    .title {
      font-size: 16px;
      white-space: nowrap;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-bottom: 3px;
    }

    .subtitle {
      font-size: 14px;
      color: $--color-subtitle;
    }
  }

  .proposal-buttons {
    flex-basis: 200px;
    display: flex;
    justify-content: flex-end;
    button {
      width: 100px;
    }
  }
}
</style>
