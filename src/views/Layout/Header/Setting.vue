<template>
  <div class="setting" @click="value = true">
    设置
    <div>
      <Drawer title="Create" v-model="value" width="200">
        <div class="setting-btn">
          <Button type="primary" @click="modal = true">修改个人信息</Button>
          <Button type="error" @click="exit">退出管理登录</Button>
        </div>
      </Drawer>
      <Modal v-model="modal" title="个人信息修改">
        <div class="setting-pane">
          <div class="left-box">
            <span>昵称:</span>
            <span>原密码:</span>
            <span>新密码:</span>
            <span>确认密码:</span>
          </div>
          <div class="right-box">
            <Input placeholder="请输入昵称" />
            <Input type="password" password placeholder="请输入旧密码" />
            <Input type="password" password placeholder="请输入新密码" />
            <Input type="password" password placeholder="请再次输入新密码" />
          </div>
        </div>
        <div slot="footer">
          <Button type="primary" @click="changeInfos">修改个人信息</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  name: "Setting",
  data() {
    return {
      value: false,
      modal: false,
    };
  },
  methods: {
    cancel() {
      let flag = confirm("确定退出修改个人信息吗？");
      if (flag) {
        this.$Message.success("取消修改！");
      } else {
        this.modal = true;
      }
    },
    changeInfos() {
      let flag = confirm("确定修改个人信息吗？");
      if (flag) {
        this.modal = false;
        this.$Message.success("修改成功！");
      } else {
        this.$Message.warning("取消修改！");
      }
    },
    exit() {
      let flag = confirm("确定退出登录吗？");
      if (flag) {
        this.$Message.success("退出成功！");
      } else {
        this.$Message.warning("取消退出！");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.setting-btn {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.setting-pane {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .left-box {
    margin-top: 20px;
    width: 20%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 16px;
  }
  .right-box {
    margin-top: 20px;
    width: 50%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>