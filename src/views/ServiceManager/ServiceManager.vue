<template>
  <div>
    <Banner :title="title" :icon="'md-list'"></Banner>
    <div class="SM-main">
      <!-- <ServiceRegistered></ServiceRegistered> -->
      <div class="SM-buttom">
        <button @click="appearAddNew">添加客服</button>
      </div>
      <Table border :columns="columns" :data="dataList">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ index }" slot="action">
          <Button type="error" size="small" @click="remove(index)"
            >删 除</Button
          >
        </template>
      </Table>
    </div>
    <!-- 添加客服 -->
    <div class="add-new-service" style="display: none">
      <div class="add-new-main">
        <div><span @click="hideAddNew">x</span></div>
        <Input
          v-model="nickname"
          placeholder="请输入管理员昵称..."
          size="large"
          class="add-input"
        />
        <Input
          v-model="username"
          placeholder="请输入管理员邮箱..."
          size="large"
          class="add-input"
          type="email"
        />
        <Button type="primary" class="add-button" @click="addNewService">
          注 册
        </Button>
      </div>
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
      columns: [
        {
          title: "昵称",
          slot: "name",
          width: 250,
        },
        {
          title: "邮箱",
          key: "mail",
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      dataList: [],
      nickname: "",
      username: "",
    };
  },
  methods: {
    // 判断最高管理员
    isMainManager() {
      this.$http
        .post(
          this.domain + `user/isAdmin`,
          {},
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.$Message.info("无权限！");
            window.location.replace("/Journal");
          }
        });
    },

    // 删除客服
    remove(index) {
      if (confirm("是否确认删除？")) {
        this.$http
          .delete(this.domain + `user/delete/${this.dataList[index].id}`, {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.data.code == 1) {
              this.$Message.info("删除成功！");
              location.reload();
            } else {
              this.$Message.info(res.data.msg + "邮箱或密码错误");
            }
          });
      }
    },

    // 添加客服隐藏显示
    hideAddNew() {
      document.querySelector(".add-new-service").style.display = "none";
    },
    appearAddNew() {
      document.querySelector(".add-new-service").style.display = "";
    },

    // 添加客服
    addNewService() {
      if (this.username == "") {
        this.$Message.error("请输入用户邮箱！");
        return;
      }
      if (this.nickname == "") {
        this.$Message.error("请输入用户昵称！");
        return;
      }
      this.tips = "";

      let formdata = new FormData();
      formdata.append("mail", this.username);
      formdata.append("nickname", this.nickname);
      this.$http
        .post(this.domain + "user/re", formdata, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$Message.info("注册成功，初始密码为 000000");
            location.reload();
          } else {
            this.$Message.info(res.data.msg);
          }
        });
    },

    // 获取客服信息
    getServiceList() {
      const getServiceListMsg = this.$Message.loading({
        content: "Loading...",
        duration: 0,
      });
      this.$http
        .get(this.domain + "user/getList", {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          setTimeout(getServiceListMsg, 0);
          if (res.data.code == 1) {
            this.$Message.success("获取成功");
            let list = res.data.data;
            for (let item in list) {
              this.dataList.push({
                name: list[item].nickname,
                mail: list[item].mail,
                id: list[item].id,
              });
            }
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
  },
  mounted() {
    this.getServiceList();
  },
  created() {
    this.isMainManager();
  },
};
</script>

<style lang="scss" scoped>
.SM-main {
  width: 100%;
  padding: 24px;
  height: calc(100% - 72px);
  overflow: auto;

  .SM-buttom {
    width: 100%;
    text-align: left;
    margin-bottom: 24px;
    position: relative;

    button {
      padding: 8px 16px;
      outline: none;
      border-radius: 5px;
      border: none;
      background-color: rgb(52, 152, 219);
      color: white;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: rgba(52, 152, 219, 0.8);
      }
    }
  }
}

.add-new-service {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba($color: black, $alpha: 0.1);
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  display: flex;

  > div {
    width: 460px;
    margin: auto auto;
    align-self: center;
    background-color: white;
    border-radius: 5px;
    padding: 6px 12px;
  }

  .add-new-main {
    > div {
      text-align: right;
      padding: 3px 18px;
      margin-bottom: 12px;
      width: 100%;
      &:first-child {
        margin-bottom: 0;
      }
    }
    span {
      font-size: 24px;
      text-align: right;
      cursor: pointer;
    }
    input {
      padding: 3px 6px;
    }
    .add-button {
      font-size: 14px;
      margin-bottom: 12px;
    }
  }
}
</style>