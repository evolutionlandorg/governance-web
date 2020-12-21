<template>
  <div class="content">

    <div class="title-box">
      <p class="title-text">{{ title }}</p>
    </div>

    <div class="content-box">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  props: {
    title: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/theme-chalk/src/common/var.scss";

.title-text {
  font-size: 20px;
  color: $--color-primary;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
}

.content-box {
  border: $--border-dark;
  border-radius: $--border-radius-base;
}
</style>
