<template>
  <div class="table-empty-content">
    <img src="@/assets/table-empty.png" />
    <p>{{ $t("nodata") }}</p>
  </div>
</template>

<script>
  export default {
    name: "TableEmpty",
    props: {},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/styles/theme-chalk/src/common/var.scss";
  .table-empty-content {
    padding: 40px 30px 30px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 144px;
      height: 100px;
      line-height: 1;
    }
    p {
      padding: 0;
      margin: 0;
      line-height: 40px;
      margin-top: 10px;
    }
  }
</style>
