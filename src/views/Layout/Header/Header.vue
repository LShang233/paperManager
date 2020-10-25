<template>
  <div id="header-container">
    <div class="header-logo">我是logo</div>
    <ul>
      <li>
        <router-link to="/Journal">期刊管理</router-link>
      </li>
      <li>
        <router-link to="/Literature">文献管理</router-link>
      </li>
      <li>
        <router-link to="/ReviewLiterature">审核文献</router-link>
      </li>
      <li>
        <router-link to="/CustomerServiceChat">客服聊天</router-link>
      </li>
      <li>
        <router-link to="/ServiceManager">客服管理</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
#header-container {
  z-index: 999;
  top: 0;
  position: fixed;
  width: 300px;
  height: 100%;
  background-color: rgb(52, 152, 219);
  color: white;
  font-size: 12px;
  box-shadow: 0 0 10px rgba($color: grey, $alpha: 0.5);

  .header-logo {
      text-align: center;
      background-color: pink;
      height: 72px;
      line-height: 72px;
  }

  ul {
    width: 100%;
    text-align: center;
    li {
      height: 64px;
      line-height: 64px;
      vertical-align: middle;
      a {
        font-size: 18px;
        color: white;
      }
    }
    li:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>