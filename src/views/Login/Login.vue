<template>
  <div class="login-container">
    <div class="login-pane">
      <div class="login-title">
        <span>期刊发表网</span>
        <p>管理员端</p>
      </div>
      <div class="login-main">
        <div class="login" v-if="!flag">
          <Input
            v-model="email"
            prefix="ios-mail"
            placeholder="请输入邮箱"
            style="width: 320px; height: 40px"
          />
          <Input
            v-model="l_pwd"
            type="password"
            password
            prefix="md-lock"
            placeholder="请输入您的密码"
            style="width: 320px"
          >
          </Input>
          <button class="login-btn" @click="login">登录</button>
          <span @click="flag = true">找回密码</span>
        </div>
        <div class="login" v-else>
          <Input
            v-model="email"
            prefix="ios-mail"
            placeholder="请输入邮箱"
            style="width: 320px; height: 40px"
          />
          <!-- <Input
            v-model="verify"
            suffix="md-flag"
            placeholder="请输入验证码"
            style="width: 320px"
          >
            <Icon slot="prepend" type="md-flag" />
            <Button slot="append" @click="sendVerify" id="login-verify">{{
              clock
            }}</Button>
          </Input> -->
          <div class="verify">
            <Input
              v-model="verify"
              prefix="md-flag"
              placeholder="请输入验证码"
              style="width: 220px"
            />
            <Button @click="sendVerify" id="login-verify">{{ clock }}</Button>
          </div>
          <Input
            v-model="r_pwd1"
            type="password"
            password
            prefix="md-lock"
            placeholder="请输入您的新密码"
            style="width: 320px; height: 40px"
          />
          <Input
            v-model="r_pwd2"
            type="password"
            password
            prefix="md-lock"
            placeholder="请再次输入新密码"
            style="width: 320px; height: 40px"
          />
          <button class="login-btn" @click="changePwd">修改密码</button>
          <span @click="flag = false">返回登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      flag: false,
      email: "",
      l_pwd: "",
      r_pwd1: "",
      r_pwd2: "",
      verify: "",
      clock: "发送验证码",
    };
  },
  methods: {
    // 验证邮箱格式
    isEmailValid(){
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      return reg.test(this.email);
    },
    // 登录
    login() {
      if (this.isEmailValid() && this.l_pwd) {
        let data = new FormData();
        data.append("username", this.email);
        data.append("password", this.l_pwd);
        this.$http
          .post("http://39.98.41.126:30007/user/login", data)
          .then((res) => {
            if (res.data.code === 1) {
              this.$Message.success("登录成功！");
              sessionStorage.setItem("token", res.data.data.token);
              sessionStorage.setItem("nickname",res.data.data.nickname);
              sessionStorage.setItem("email",this.email);
              setTimeout(() => {
                window.location.href = "/Journal";
              }, 1000);
            } else {
              this.$Message.warning("邮箱与密码不匹配，请检查后重试");
            }
          })
          .catch((err) => {
            this.$Message.error("服务器连接失败");
          });
      } else {
        this.$Message.warning("请检查邮箱格式或密码");
      }
    },
    // 发送验证码
    sendVerify() {
      if (this.isEmailValid()) {
        this.clock = 120;
        let btn = document.getElementById("login-verify");
        btn.setAttribute("disabled", "");
        let timer = setInterval(() => {
          this.clock -= 1;
          if (this.clock == 0) {
            this.clock = "发送验证码";
            btn.removeAttribute("disabled");
            clearInterval(timer);
          }
        }, 1000);

        let formdata = new FormData();
        formdata.append("email",this.email);
        this.$http.post("http://39.98.41.126:30007/user/getCode",formdata)
        .then(res=>{
            this.$Message.success("验证码已发送，请查收(两分钟内有效)");  
        })
        .catch((err) => {
            this.$Message.error("服务器连接失败");
          });
      } else {
        this.$Message.warning("请检查邮箱格式");
      }
    },
    // 修改密码
    changePwd() {
      if(this.isEmailValid() && (this.r_pwd1 == this.r_pwd2)){
        if(this.verify != ''){
          let data = new FormData();
          data.append('email',this.email);
          data.append('code',this.verify);
          data.append('password',this.r_pwd2);
          this.$http.post('http://39.98.41.126:30007/user/fp',data)
          .then(res=>{
            if(res.data.code == 1){
              this.$Message.success("修改密码成功！"); 
              this.flag = false;
            }else{
              this.$Message.warning(res.data.msg);
            }
          })
        }else{
          this.$Message.warning('请填写验证码！');
        }
      }else{
        this.$Message.warning('请检查邮箱格式或两次密码是否一致');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: #00b4db;
  background: -webkit-linear-gradient(to right, #0083b0, #00b4db);
  background: linear-gradient(to right, #0083b0, #00b4db);
  display: flex;
  justify-content: center;
  align-items: center;

  .login-pane {
    width: 400px;
    height: 600px;
    background-color: #fff;
    padding: 40px 8px 16px;
    margin-bottom: 64px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    .login-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > span {
        font-size: 32px;
        line-height: 1.2;
        color: #262626;
      }
      > p {
        color: #595959;
        margin-top: 8px;
        font-size: 18px;
      }
    }
    .login-main {
      margin: 20px 0;
      width: 100%;
      height: 350px;
      .login {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        > span {
          color: #096dd9;
          cursor: pointer;
          &:hover {
            opacity: 0.5;
          }
        }
      }
      .login-btn {
        font-size: 16px;
        background-color: #00b4db;
        width: 320px;
        height: 40px;
        color: #fff;
        border: none;
        cursor: pointer;
        outline: none;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}

.verify {
  width: 320px;
  display: flex;
  justify-content: space-between;
  #login-verify {
    width: 80px;
  }
}
</style>