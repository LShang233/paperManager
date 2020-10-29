<template>
  <div>
    <Banner :title="'设置'" :icon="'md-settings'" />
    <div class="setting-container">
      <div class="setting-pane">
        <div class="setting-box">
          <span class="setting-head">信息修改</span>
          <hr />
          <div>
            <div class="setting-form">
              <div class="setting-info">
                <span>昵称:</span>
                <input type="text" />
              </div>
              <div class="setting-info">
                <span>原密码:</span>
                <input type="password"  />
              </div>
              <div class="setting-info">
                <span>新密码:</span>
                <input type="password" />
              </div>
              <div class="setting-info">
                <span>确认密码:</span>
                <input type="password" />
              </div>
              <div class="setting-info2">
                <button class="setting-btn" @click="changeInfos">修改</button>
              </div>
            </div>
          </div>
        </div>
        <div class="setting-box">
          <span class="setting-head">退出登录</span>
          <hr />
          <div>
              <button class="setting-btn" @click="exit">退出登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from "../../components/Banner/Banner";
export default {
  name: "Setting",
  data() {
    return {};
  },
  methods: {
    changeInfos(){
      let flag = confirm("确定修改个人信息吗？");
      if(flag){
        this.$Message.success("修改成功！")
      }else{
        this.$Message.warning("取消修改！")
      }
    },
    exit(){
      let flag = confirm("确定退出登录吗？")
      if(flag){
        this.$Message.success("退出成功！")
      }else{
        this.$Message.warning("取消退出！")
      }
    }
  },
  components: {
    Banner,
  },
};
</script>
<style lang="scss" scoped>
.setting-container {
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;

  .setting-pane {
    width: 800px;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .setting-box {
      
      > div {
        margin-top: 20px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .setting-form {
          width: 500px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: space-between;
          .setting-info {
            font-size: 16px;
            margin: 10px;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            >span{
              width: 100px;
            }
            >input{
                width: 250px;
                outline: none;
                padding: 0 10px;
            }
          }
          .setting-info2{
            font-size: 16px;
            margin: 10px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        

        .setting-btn{
            margin: 10px;
            width: 200px;
            height: 50px;
            cursor: pointer;
        }
      }
      .setting-head {
        font-size: 24px;
      }
    }
  }
}
</style>