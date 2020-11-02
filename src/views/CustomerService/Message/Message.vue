<template>
  <li class="">
    <p class="name">
      <span>{{name}}</span>
      <span>{{date}}</span>
      <span>{{time}}</span>
    </p>
    <p v-html="content"></p>
  </li>
</template>
<script>
export default {
  name: "ServerMsg",
  props: ["content","date","time","name"],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.chat-server {
  margin: 10px;
  .name {
    font-weight: 600;
    color: rgb(95, 217, 88);

  }
}
.chat-customer {
  margin: 10px;
  .name {
    font-weight: 600;
    color: rgb(6, 128, 178);

  }
}
</style>