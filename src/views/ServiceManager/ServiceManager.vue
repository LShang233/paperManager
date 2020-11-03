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
        <p>{{ tips }}</p>
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
      tips: "",
    };
  },
  methods: {
    // 删除客服
    remove(index) {
      alert(this.dataList[index].id);
      if (confirm("是否确认删除？")) {
        // 未完成，未测试接口，默认密码，header权限
        let formdata = new FormData();
        formdata.append("id", this.dataList[index].id);
        this.$http
          .post("http://39.98.41.126:30007/user/delete", formdata)
          .then((res) => {
            if (res.data.code == 1) {
              alert("删除成功！");
            } else {
              alert(res.data.msg);
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
        this.tips = "请输入用户邮箱！";
        return;
      }
      if (this.nickname == "") {
        this.tips = "请输入用户昵称！";
        return;
      }
      this.tips = "";

      // 未完成，未测试接口，默认密码，header权限
      let formdata = new FormData();
      formdata.append("username", this.username);
      formdata.append("nickname", this.nickname);
      this.$http
        .post("http://39.98.41.126:30007/user/addServer", formdata)
        .then((res) => {
          if (res.data.code == 1) {
            alert("注册成功，初始密码为 000000");
            this.nickname = "";
            this.username = "";
          } else {
            alert(res.data.msg);
          }
        });
    },

    // 获取客服信息
    getServiceList() {
      this.$http.get("http://39.98.41.126:30007/user/getList").then((res) => {
        if (res.data.code == 1) {
          let list = res.data.data;
          for (let item in list) {
            this.dataList.push({
              name: list[item].nickname,
              mail: list[item].mail,
              id: list[item].id,
            });
          }
        }
      });
    },
  },
  mounted() {
    this.getServiceList();
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
    p {
      margin-bottom: 12px;
      color: red;
      font-size: 14px;
    }
  }
}
</style>