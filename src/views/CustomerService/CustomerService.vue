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
        <div class="chat-icon" @click="addModel = true">
          <svg
            t="1604055294598"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3850"
            width="40"
            height="40"
          >
            <path
              d="M338.226 641.175h-31.357l-18.292-65.328h-57.489l-18.292 65.328h-31.357l65.328-213.242h26.131l65.328 213.242z m-56.183-88.748l-20.905-75.189h-2.613l-20.905 75.189h44.423zM495.015 579.544c0 19.722-5.451 35.342-16.332 46.84-10.901 11.517-28.091 17.256-51.609 17.256s-40.729-5.739-51.609-17.256c-10.902-11.498-16.333-27.118-16.333-46.84V430.398h30.051v149.146c0 13.982 3.471 24.248 10.453 30.815 6.961 6.587 16.107 9.861 27.438 9.861 11.31 0 20.456-3.274 27.438-9.861 6.961-6.567 10.453-16.833 10.453-30.815V430.398h30.051v149.146zM660.949 453.818h-52.263v187.357h-30.052V453.818h-52.263v-23.419h134.577v23.419zM833.416 535.17c0 38.635-6.328 66.369-18.944 83.201-12.638 16.853-30.276 25.269-52.917 25.269-22.66 0-40.503-8.416-53.569-25.269-13.065-16.832-19.599-44.566-19.599-83.201 0-38.615 6.533-66.137 19.599-82.585 13.066-16.428 30.909-24.652 53.569-24.652 22.641 0 40.279 8.224 52.917 24.652 12.616 16.448 18.944 43.97 18.944 82.585z m-31.357 0c0-34.513-3.92-57.104-11.759-67.793-7.84-10.67-17.435-16.024-28.745-16.024-11.33 0-21.129 5.354-29.397 16.024-8.288 10.689-12.412 33.28-12.412 67.793 0 34.514 4.124 57.316 12.412 68.41 8.269 11.094 18.067 16.641 29.397 16.641 11.311 0 20.905-5.547 28.745-16.641 7.839-11.093 11.759-33.896 11.759-68.41z"
              p-id="3851"
            ></path>
            <path
              d="M939.766 727.858H84.235V344.949h855.53v382.909zM896.005 388.71H127.997v295.388h768.008V388.71z"
              fill="#1E1E1E"
              p-id="3852"
            ></path>
          </svg>
        </div>
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
      <Tabs value="name1">
        <TabPane label="在线游客" name="name1">
          <ul id="on-users">
            <User
              v-for="(item, key) in on_users"
              :key="key"
              :username="item"
              @click.native="getClientId(item)"
            />
          </ul>
        </TabPane>
        <TabPane label="离线游客" name="name2">
          <ul id="off-users">
            <User
              v-for="(item, key) in off_users"
              :key="key"
              :username="item"
              @click.native="getClientId(item)"
            />
          </ul>
        </TabPane>
      </Tabs>
    </div>

    <!-- 聊天模板添加 -->
    <Modal v-model="addModel" title="设置自动发送模板" @on-ok="setAuto">
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
      on_users: [],
      off_users: [],
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
        if (chat) {
          chat.scrollTop = chat.scrollHeight;
        }
      });
    },
    // 获取聊天id
    getServerId() {
      let data = new FormData();
      data.append("chat", sessionStorage.getItem("chat"));
      this.$http
        .post("http://39.98.41.126:30001/chat/chatId", data, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            console.log(res.data);
            this.serverId = res.data.data;
            sessionStorage.setItem("chat", res.data.data);
            console.log("获取客服id成功!");
          }
        })
        .then(() => {
          this.initWebSocket();
          this.getAuto();
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
              this.on_users = res.data.data.users;
            }
          });

        this.$http
          .post(
            `http://39.98.41.126:30001/chat/admin/${this.serverId}/offlineUser`,
            {
              pageNum: "1",
              pageSize: "10",
            }
          )
          .then((res) => {
            if (res.data.code == 1) {
              this.off_users = res.data.data.users;
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
              if (chat) {
                chat.scrollTop = chat.scrollHeight;
              }
            });
          });
      }
    },
    // 点击用户名称，获取用户id
    getClientId(id) {
      let that = this;
      this.clientId = id;
      this.customerName = "游客" + id;
      this.getHistory();
      // 发送自动问候语
      // if (this.newModel) {
      //   let formdata = new FormData();
      //   formdata.append("content", this.newModel);
      //   this.$http
      //     .post(
      //       `http://39.98.41.126:30001/chat/${this.serverId}/sendTo/${this.clientId}`,
      //       formdata
      //     )
      //     .then((res) => {
      //       console.log("发送成功！");
      //     });
      // }
      //接收用户消息
      window.socket.subscribe("/user/queue/chat/" + this.clientId, (res) => {
        let data = JSON.parse(res.body);
        that.$Message.info(data.sender.username + "发来消息");
        that.history.push({
          type: 1,
          name: data.sender.username,
          date: data.time.slice(0, 10),
          time: data.time.slice(11, 19),
          content: data.content,
        });
        setTimeout(() => {
          let chat = document.getElementById("chat-history");
          if (chat) {
            chat.scrollTop = chat.scrollHeight;
          }
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
          // 当有新游客进来时
          window.socket.subscribe("/user/queue/chat/newUserIn", (res) => {
            that.getUsers();
          });
          // 当有游客下线
          window.socket.subscribe("/user/queue/chat/userOff", (res) => {
            console.log('下线')
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
    setAuto() {
      if (this.newModel) {
        let data = new FormData();
        data.append("auto", this.newModel);
        this.$http
          .post("http://39.98.41.126:30001/chat/admin/setAutoSend", data, {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.data.code == 1) {
              console.log(res.data);
            }
          });
      }
    },
    // 获取自动回复模板
    getAuto() {
      this.$http
        .post(
          `http://39.98.41.126:30001/chat/admin/${this.serverId}/getAutoSend`
        )
        .then((res) => {
          if (res.data.code === 1) {
            this.newModel = res.data.data;
          } else {
            this.$Message.warning(res.data.msg);
          }
        });
    },
  },
  created() {
    this.getServerId();
    // 浏览器离开，断开连接
    window.addEventListener("beforeunload", (e) => {
      this.closeSocket();
    });
  },
};
</script>
<style lang="scss" scoped>
@import "./CustomerService.scss";
</style>