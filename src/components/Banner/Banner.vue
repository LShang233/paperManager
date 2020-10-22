<template>
  <div class="banner-div">
    <Icon type="md-list" size="24" class="banner-svg" />
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: ["title"],
};
</script>

<style lang="scss" scoped>
.banner-div {
  width: 100%;
  height: 72px;
  line-height: 72px;
  overflow: hidden;
  border-bottom: 1px solid rgba($color: grey, $alpha: 0.3);
  box-shadow: 0 0 10px rgba($color: grey, $alpha: 0.3);
  background-color: white;
  padding: 0 24px;
  p {
    display: inline-block;
    font-size: 20px;
    margin: 0 16px;
    font-weight: 600;
  }
  .banner-svg {
    margin-top: -8px;
  }
}
</style>