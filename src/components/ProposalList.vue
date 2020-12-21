<template>
  <div class="content">
    <ProposalItem class="proposal" v-for="item in data" :key="item.id" :proposal="item"/>
  </div>
</template>

<script>
import ProposalItem from "./ProposalItem";
export default {
  name: "Content",
  components: {
    ProposalItem,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
.proposal:not(:last-child) {
  border-bottom: $--border-dark;

}
</style>
