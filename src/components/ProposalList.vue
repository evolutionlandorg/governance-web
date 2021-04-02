<template>
  <div class="content">
    <ProposalItem class="proposal" v-for="item in data" :key="item.id" :proposal="item"/>
    <TableEmpty v-if="isEmpty"/>
  </div>
</template>

<script>
import ProposalItem from "./ProposalItem";
import TableEmpty from "./TableEmpty"

export default {
  name: "Content",
  components: {
    ProposalItem,
    TableEmpty
  },
  props: {
    data: Array,
  },
  computed: {
    isEmpty : function() {
      return !this.data || this.data.length === 0
    }
  },
  mounted: function() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";
.proposal:not(:last-child) {
  border-bottom: $--border-dark;

}
</style>
