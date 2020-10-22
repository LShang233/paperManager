<template>
  <div id="layout">
      <Header />
      <router-view id="router"></router-view>
  </div>
</template>

<script>
import Header from "./Header/Header"
export default {
    name: "Layout",
    components: {
        Header,
    }
}
</script>

<style lang="scss" scoped>
#layout {
  width: 100%;
  #router {
    width: calc(100% - 300px);
    margin-left: 300px;
  }
}
</style>