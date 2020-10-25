<template>
  <div>
    <Banner :title="title"></Banner>
    <div class="SM-main">ServiceManager</div>
  </div>
</template>

<script>
import Banner from "../../components/Banner/Banner";
export default {
  name: "ServiceManager",
  components: { Banner },
  data() {
    return {
      title: "客服管理",
    };
  },
};
</script>

<style lang="scss" scoped>
.SM-main {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
}
</style>