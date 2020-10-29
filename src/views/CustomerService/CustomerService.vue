<template>
  <div class="customer-service">
    <div class="chat-pane">
      <Header :title="customerName" :icon="'ios-chatboxes'"></Header>
      <div class="chat-history">
        <ul id="chat-history">
          <message
            v-for="(item, key) in history"
            :key="key"
            :class="item.type == 1 ? 'chat-customer' : 'chat-server'"
            :content="item.content"
            :date="item.date"
            :time="item.time"
            :name="item.name"
          />
        </ul>
      </div>
      <div class="chat-utils">
        <emoji @emotion="handleEmotion" />
        <Poptip width="500px">
          <div slot="title" class="chat-pop-title">
            <h3>请选择模板</h3>
            <div class="chat-icon" @click="addModel = true">
              <svg
                t="1603717925375"
                class="icon"
                viewBox="0 0 1026 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3910"
                width="20"
                height="20"
              >
                <path
                  d="M511.17819 1023.449171C232.458621 1030.059121-1.643784 782.185986 0.008703 508.974708 1.661191 236.865089 239.068571-1.64395 516.135653 0.008538c271.55879 1.652488 510.618658 239.059868 508.966171 516.12695C1023.449336 787.694278 787.694443 1031.711609 511.17819 1023.449171zM491.34834 97.505304c-195.544362-1.652488-418.630184 188.383583-394.944528 457.188227 15.974046 181.222803 190.03607 398.249504 459.942373 374.013019 181.773632-16.524876 396.046187-190.586899 371.809703-459.391544C911.080182 278.177278 730.408208 79.327941 491.34834 97.505304z"
                  p-id="3911"
                ></path>
                <path
                  d="M560.201988 362.454144c0 27.541459 0.550829 55.082919 0 82.624378-0.550829 15.423217 5.508292 20.38068 20.38068 19.829851 55.082919-0.550829 110.165838 0 165.248757-0.550829 15.974046 0 22.583997 4.406634 21.482338 20.931509-1.101658 18.728192-1.101658 37.456385 0 55.633748 0.550829 14.872388-5.508292 19.279022-19.279022 18.728192-55.082919-0.550829-110.165838 0-165.248757-0.550829-16.524876 0-23.134826 4.957463-22.583997 22.033168 1.101658 54.53209 0 108.51335 0.550829 163.04544 0.550829 17.626534-6.059121 23.134826-22.583997 22.033168-17.075705-1.101658-34.702239-1.101658-51.777944 0-15.974046 1.101658-21.482338-4.957463-21.482338-21.482338 0.550829-53.430431-0.550829-107.411692 0.550829-160.842123 0.550829-20.38068-6.60995-25.888972-25.888972-25.338143-53.430431 1.101658-107.411692 0-160.842123 0.550829-14.872388 0-21.482338-4.406634-20.38068-19.829851 1.101658-18.728192 1.101658-37.456385 0-55.633748-1.101658-15.974046 5.508292-19.829851 20.38068-19.829851 54.53209 0.550829 108.51335-0.550829 163.04544 0.550829 17.626534 0.550829 24.236484-4.406634 23.685655-23.134826-1.101658-54.53209 0-108.51335-0.550829-163.04544 0-16.524876 5.508292-22.033168 21.482338-21.482338 17.626534 1.101658 35.803897 1.101658 53.430431 0 14.872388-0.550829 20.931509 4.406634 20.38068 19.829851C559.651159 306.269567 560.201988 334.361856 560.201988 362.454144z"
                  p-id="3912"
                ></path>
              </svg>
            </div>
          </div>
          <div slot="content">
            <ul class="chat-model">
              <li
                v-for="(item, key) in chatModels"
                :key="key"
                @click="content = item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="chat-icon">
            <svg
              t="1603717334088"
              class="icon"
              viewBox="0 0 1025 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3089"
              width="25"
              height="25"
            >
              <path
                d="M12.98964 96.615106c0 52.883721 31.765403 95.759822 70.956589 95.759821 39.183193 0 70.956589-42.8761 70.956589-95.759821 0-52.883721-31.773397-95.759822-70.956589-95.759822-39.191186 0-70.956589 42.8761-70.956589 95.759822zM1006.357907 0.855284H284.985901c-10.135514 0-16.897852 11.398456-16.897851 22.796912v145.917826c0 13.684542 8.448926 22.804906 16.897851 22.804905h721.372006c10.135514 0 16.897852-11.398456 16.897852-22.804905V23.66019c0-13.676549-8.448926-22.796912-16.897852-22.796913zM1.167538 502.459298c0 52.875728 31.765403 95.751828 70.948596 95.751829 39.191186 0 70.956589-42.8761 70.956589-95.759822 0-52.883721-31.765403-95.759822-70.956589-95.759822-39.183193 0-70.948596 42.8761-70.948596 95.759822zM992.849218 406.699477H271.461225c-10.135514 0-16.897852 11.390463-16.897851 22.788919v145.925818c0 13.676549 8.448926 22.796912 16.897851 22.796913h721.372006c10.135514 0 16.897852-11.398456 16.897852-22.796913V429.480402c0-11.398456-6.762338-22.796912-16.897852-22.796912zM1.167538 926.528232c0 52.883721 31.765403 95.759822 70.948596 95.759822 39.191186 0 70.956589-42.8761 70.956589-95.759822 0-52.883721-31.765403-95.759822-70.956589-95.759822-39.183193 0-70.948596 42.8761-70.948596 95.759822z m991.68168-95.759822H271.461225c-10.135514 0-16.897852 11.398456-16.897851 22.804906v145.917825c0 13.676549 8.448926 22.796912 16.897851 22.796913h721.372006c10.135514 0 16.897852-11.398456 16.897852-22.796913v-145.917825c0-11.40645-6.762338-22.804906-16.897852-22.804906z"
                p-id="3090"
              ></path>
            </svg>
          </div>
        </Poptip>
      </div>
      <textarea
        type="text"
        class="chat-area"
        id="chat-area"
        v-model="content"
        @keyup.enter="sendMsg"
      ></textarea>
      <div class="chat-footer">
        <Poptip v-model="visible">
          <Button icon="md-arrow-round-up" type="primary" @click="sendMsg"
            >发送</Button
          >
          <div slot="content" class="poptip">{{ alert }}</div>
        </Poptip>
      </div>
    </div>
    <div class="user-list">
      <Header :title="'游客列表'" :icon="'ios-people'"></Header>
      <Tabs value="name1" >
        <TabPane label="在线游客" name="name1"
          ><ul id="user-list">
            <User
              v-for="(item, key) in users"
              :key="key"
              :username="item"
              @click.native="getClientId(item)"
            /></ul
        ></TabPane>
        <TabPane label="离线游客" name="name2">标签二的内容</TabPane>
      </Tabs>
    </div>

    <!-- 聊天模板添加 -->
    <Modal
      v-model="addModel"
      title="添加聊天模板"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <input type="text" class="add-model" v-model="newModel" />
    </Modal>
  </div>
</template>
<script>
import Header from "../../components/Banner/Banner";
import Emoji from "./Emoji/Emoji";
import Message from "./Message/Message";
import User from "../../components/CustomerService/User";
import SockJs from "sockjs-client";
import Stomp from "stompjs";
export default {
  name: "CutomerService",
  data() {
    return {
      users: [],
      customerName: "请选择游客",
      alert: "发送成功！",
      content: "",
      // 聊天历史，1为用户，2为客服，3为消息提示
      history: [],
      clientId: "",
      serverId: "",
      serverName: "",
      // 提示框
      visible: false,
      token: "b8f2de65-116c-4e72-bea8-c224e800a472",
      // 聊天模板
      chatModels: [
        "您好，请问您需要咨询什么问题?",
        "您好。",
        "如有其他问题，请咨询电话:138xxxxxxx。",
        "很高兴为您服务，请问您需要什么帮助？",
        "和你聊天很愉快，拜拜",
      ],
      // 聊天模板添加
      addModel: false,
      newModel: "",
    };
  },
  components: {
    Header,
    Emoji,
    Message,
    User,
  },
  methods: {
    handleEmotion(val) {
      let chatArea = document.getElementById("chat-area");
      let startPos = chatArea.selectionStart;
      let endPos = chatArea.selectionEnd;
      if (startPos === undefined || endPos === undefined) return;
      this.content =
        this.content.substring(0, startPos) +
        this.emotion(val) +
        this.content.substring(endPos);
      // 重新定义光标的位置
      chatArea.focus();
      chatArea.selectionStart = startPos + val.length;
      chatArea.selectionEnd = startPos + val.length;
    },
    // 将文字匹配成图片
    // 将匹配结果替换表情图片
    emotion(res) {
      let word = res.replace(/\#|\;/gi, "");
      const list = [
        "微笑",
        "撇嘴",
        "色",
        "发呆",
        "得意",
        "流泪",
        "害羞",
        "闭嘴",
        "睡",
        "大哭",
        "尴尬",
        "发怒",
        "调皮",
        "呲牙",
        "惊讶",
        "难过",
        "酷",
        "冷汗",
        "抓狂",
        "吐",
        "偷笑",
        "可爱",
        "白眼",
        "傲慢",
        "饥饿",
        "困",
        "惊恐",
        "流汗",
        "憨笑",
        "大兵",
        "奋斗",
        "咒骂",
        "疑问",
        "嘘",
        "晕",
        "折磨",
        "衰",
        "骷髅",
        "敲打",
        "再见",
        "擦汗",
        "抠鼻",
        "鼓掌",
        "糗大了",
        "坏笑",
        "左哼哼",
        "右哼哼",
        "哈欠",
        "鄙视",
        "委屈",
        "快哭了",
        "阴险",
        "亲亲",
        "吓",
        "可怜",
        "菜刀",
        "西瓜",
        "啤酒",
        "篮球",
        "乒乓",
        "咖啡",
        "饭",
        "猪头",
        "玫瑰",
        "凋谢",
        "示爱",
        "爱心",
        "心碎",
        "蛋糕",
        "闪电",
        "炸弹",
        "刀",
        "足球",
        "瓢虫",
        "便便",
        "月亮",
        "太阳",
        "礼物",
        "拥抱",
        "强",
        "弱",
        "握手",
        "胜利",
        "抱拳",
        "勾引",
        "拳头",
        "差劲",
        "爱你",
        "NO",
        "OK",
        "爱情",
        "飞吻",
        "跳跳",
        "发抖",
        "怄火",
        "转圈",
        "磕头",
        "回头",
        "跳绳",
        "挥手",
        "激动",
        "街舞",
        "献吻",
        "左太极",
        "右太极",
      ];
      let index = list.indexOf(word);
      return `$${index}&`;
    },
    // 发送消息
    sendMsg() {
      if (this.content == "") {
        this.alert = "消息不能为空！";
        setTimeout(() => {
          this.visible = false;
        }, 2000);
        return;
      } else if (this.clientId == "") {
        this.alert = "请选择游客！";
        setTimeout(() => {
          this.visible = false;
        }, 2000);
        return;
      } else {
        this.alert = "发送成功！";
        setTimeout(() => {
          this.visible = false;
        }, 2000);
      }
      // 转换表情包
      this.content = this.content.replace(
        /\$/gi,
        '<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/'
      );
      this.content = this.content.replace(/\&/gi, '.gif" align="middle">');
      // 获取日期
      let date = new Date();
      this.history.push({
        type: 2,
        name: "我",
        date: date.getMonth() + 1 + "-" + date.getDate(),
        time:
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        content: this.content,
      });
      // 发送至服务端
      let formdata = new FormData();
      formdata.append("content", this.content);
      this.$http
        .post(
          `http://39.98.41.126:30001/chat/${this.serverId}/sendTo/${this.clientId}`,
          formdata
        )
        .then((res) => {
          console.log("发送成功！");
        });
      this.content = "";
      document.getElementById("chat-area").focus();
      setTimeout(() => {
        let chat = document.getElementById("chat-history");
        chat.scrollTop = chat.scrollHeight;
      });
    },
    // 获取聊天id
    getServerId() {
      let data = new FormData();
      data.append("chat", localStorage.getItem("chat"));
      this.$http
        .post("http://39.98.41.126:30001/chat/chatId", data, {
          headers: {
            // token: localStorage.getItem("token"),
            token: this.token,
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            console.log(res.data);
            this.serverId = res.data.data;
            localStorage.setItem("chat", res.data.data);
            console.log("获取客服id成功!");
          }
        })
        .then(() => {
          this.initWebSocket();
        });
    },
    // 获取用户列表
    getUsers() {
      if (this.serverId) {
        this.$http
          .post(
            `http://39.98.41.126:30001/chat/admin/${this.serverId}/onlineUser`,
            {
              pageNum: "1",
              pageSize: "10",
            }
          )
          .then((res) => {
            if (res.data.code == 1) {
              this.users = res.data.data.users;
            }
          });
      }
    },
    // 获取历史记录
    getHistory() {
      this.history = [];
      if (this.serverId) {
        this.$http
          .post(
            `http://39.98.41.126:30001/chat/${this.clientId}/history/${this.serverId}`
          )
          .then((res) => {
            console.log(res.data);
            let data = res.data.data;
            for (let i = 0; i < data.length; i++) {
              if (data[i].sender.roleType == 1) {
                this.history.push({
                  type: 1,
                  name: data[i].sender.username,
                  date: data[i].time.slice(0, 10),
                  time: data[i].time.slice(11, 19),
                  content: data[i].content,
                });
              } else {
                this.history.push({
                  type: 2,
                  name: "我",
                  date: data[i].time.slice(0, 10),
                  time: data[i].time.slice(11, 19),
                  content: data[i].content,
                });
              }
            }
          })
          .then(() => {
            setTimeout(() => {
              let chat = document.getElementById("chat-history");
              chat.scrollTop = chat.scrollHeight;
            }, 1000);
          });
      }
    },
    // 点击用户名称，获取用户id
    getClientId(id) {
      let that = this;
      this.clientId = id;
      this.customerName = "游客" + id;
      this.getHistory();
      window.socket.subscribe("/user/queue/chat/" + this.clientId, (res) => {
        let data = JSON.parse(res.body);
        console.log(data);
        that.history.push({
          type: 1,
          name: that.serverName,
          date: data.time.slice(0, 10),
          time: data.time.slice(11, 19),
          content: data.content,
        });
      });
    },
    // 启动连接
    initWebSocket() {
      if (!window.socket) {
        let that = this;
        let socket = new SockJs(
          "http://39.98.41.126:30001/ws-websocket?" + this.serverId
        );
        // 获取Stomp子协议的客户端对象
        window.socket = Stomp.over(socket);
        // 发起websocket连接
        window.socket.connect({}, function (res) {
          console.log("连接成功！");
          that.getUsers();
          window.socket.subscribe("/user/queue/chat/newUserIn", (res) => {
            that.getUsers();
          });
        });
      }
    },
    // 关闭连接
    closeSocket() {
      window.socket.disconnet(() => {
        console.log("链接已经断开！");
      });
      window.socket = null;
    },
    //   添加模板
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
  },
  created() {
    this.getServerId();
  },
  destroyed() {
    this.closeSocket();
  },
};
</script>
<style lang="scss" scoped>
@import "./CustomerService.scss";
</style>