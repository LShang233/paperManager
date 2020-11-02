<template>
  <div id="header-container">
    <div class="header-logo">期刊管理平台</div>
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
        <router-link to="/CustomerService">客服聊天</router-link>
      </li>
      <li>
        <router-link to="/ServiceManager">客服管理</router-link>
      </li>
    </ul>
    <Setting/>
  </div>
</template>
<script>
import Setting from "./Setting"
export default {
  name: "Header",
  components : {
    Setting
  }
};
</script>
<style lang="scss" scoped>
#header-container {
  position: relative;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: rgb(53, 64, 82);
  color: white;
  font-size: 12px;
  box-shadow: 0 0 10px rgba($color: grey, $alpha: 0.5);

  .header-logo {
    text-align: center;
    font-size: 24px;
    background-color: rgb(25, 28, 37);
    height: 72px;
    line-height: 72px;
    font-weight: 600;
  }

  a {
    color: white;
    display: block;
    width: 100%;
    padding: 16px 0;
    text-align: center;
    font-size: 18px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .setting {
    position: absolute;
    bottom: 52px;
    font-size: 20px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    user-select: none;
    cursor: pointer;
  }
}
</style>