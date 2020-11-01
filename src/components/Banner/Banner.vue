<template>
  <div class="banner-div">
    <Icon :type="icon" size="24" class="banner-svg" />
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: ["title","icon"],
};
</script>

<style lang="scss" scoped>
.banner-div {
  width: 100%;
  height: 72px;
  line-height: 72px;
  overflow: hidden;
  border-right: 1px solid rgba($color: grey, $alpha: 0.3);
  border-bottom: 1px solid rgba($color: grey, $alpha: 0.3);
  background-color: rgb(255, 255, 255);
  padding: 0 24px;
  p {
    display: inline-block;
    font-size: 20px;
    margin: 0 16px;
    font-weight: 500;
    user-select: none;
  }
  .banner-svg {
    margin-top: -8px;
  }
}
</style>