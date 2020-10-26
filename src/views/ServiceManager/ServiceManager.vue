<template>
  <div>
    <Banner :title="title" :icon="'md-list'"></Banner>
    <div class="SM-main">
      <ServiceRegistered></ServiceRegistered>
    </div>
  </div>
</template>

<script>
import Banner from "../../components/Banner/Banner";
import ServiceRegistered from "../../components/ServiceRegistered/ServiceRegistered";

export default {
  name: "ServiceManager",
  components: { Banner, ServiceRegistered },
  data() {
    return {
      title: "客服管理",
      servicePerson: [
        {a: "mingzi", b:'zhanghao', c:'mima'},
        {a: "mingzi111", b:'zhangha111o', c:'mi111ma'},
        {a: "mingz222i", b:'zhan222ghao', c:'mim222a'},
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
.SM-main {
  position: relative;
  width: 100%;
  padding: 24px;
  height: calc(100% - 72px);
  overflow: auto;
}
</style>