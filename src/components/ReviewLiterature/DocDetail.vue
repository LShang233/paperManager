<template>
  <div class="doc-detail">
    <Button type="primary" @click="docModal = true">详细信息</Button>
    <Modal v-model="docModal" width="40%">
      <p slot="header" style="font-weight: bold; font-size: 16px">
        《{{ docMessage.title }}》投稿的详细信息
      </p>
      <div class="doc-container">
        <div class="doc-panel">
          <div>
            <strong>作者：</strong>
            <span>{{ docMessage.author }}</span>
          </div>
          <div>
            <strong>电话：</strong>
            <span>{{ docMessage.phone }}</span>
          </div>
          <div>
            <strong>邮箱：</strong>
            <span>{{ docMessage.email }}</span>
          </div>
          <div>
            <strong>文献名称：</strong>
            <span :title="docMessage.title">《{{ docMessage.title }}》</span>
            <Button type="warning" size="small" ghost @click="look"
              >查看文献</Button
            >
          </div>
          <div>
            <strong>关键词：</strong>
            <span>{{ docMessage.keyword }}</span>
          </div>
          <div class="text-content">
            <strong>摘要：</strong>
            <span>{{ docMessage.abstractText }}</span>
          </div>
        </div>
      </div>
      <p slot="footer" style="text-align: center">
        <Button type="error" size="large" @click="review(false)">拒绝</Button>
        <Button type="success" size="large" @click="review(true)">通过</Button>
        <Modal
          v-model="publishModal"
          title="添加文献额外信息"
          :closable="false"
          :mask-closable="false"
          width="500"
        >
          <div class="extra-message">
            <ExtraMessage
              :extraMessage="docMessage"
              @getMessageList="getExtraMessage"
              ref="myChild"
              :Width="250"
            />
            <!-- <div>
                        <strong>刊期：</strong>
                        <Row>
                            <Col span="12">
                                <DatePicker 
                                type="date" 
                                placeholder="选择日期" 
                                style="width: 200px"
                                @on-change="findDate"
                                v-model="time"
                                ></DatePicker>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <strong>类别：</strong>
                        <Select v-model="paperType" style="width:200px">
                            <Option 
                            v-for="item in paperTypes" 
                            :value="item.value" 
                            :key="item.value"
                            >
                            {{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div>
                        <strong>收录：</strong>
                        <Input v-model="fromJournal" placeholder="有多个请分隔开" style="width:200px"/>
                    </div> -->
          </div>
          <p slot="footer">
            <Button type="primary" @click="addDoc">确认</Button>
          </p>
        </Modal>
      </p>
    </Modal>
  </div>
</template>

<script>
import ExtraMessage from "../ReviewLiterature/ExtraMessage";

export default {
  neme: "docDetail",

  props: ["docMessage"],

  components: {
    ExtraMessage,
  },

  data() {
    return {
      docModal: false, //详细信息面板
      publishModal: false, //发布面板
      fromJournal: "", //收录
      time: "", //时间
      paperType: "", //类被
      periodicalId: 0, //期刊id
      paperTypes: [
        {
          label: "OA期刊",
          value: "OA期刊",
        },
        {
          label: "基础",
          value: "基础",
        },
        {
          label: "社科",
          value: "社科",
        },
        {
          label: "自然",
          value: "自然",
        },
        {
          label: "医药",
          value: "医药",
        },
        {
          label: "生物",
          value: "生物",
        },
        {
          label: "环境",
          value: "环境",
        },
        {
          label: "核能",
          value: "核能",
        },
        {
          label: "化学",
          value: "化学",
        },
        {
          label: "理学",
          value: "理学",
        },
        {
          label: "文化",
          value: "文化",
        },
        {
          label: "艺术",
          value: "艺术",
        },
        {
          label: "文学",
          value: "文学",
        },
        {
          label: "经济",
          value: "经济",
        },
        {
          label: "哲学",
          value: "哲学",
        },
        {
          label: "政法",
          value: "政法",
        },
        {
          label: "农业",
          value: "农业",
        },
        {
          label: "工业",
          value: "工业",
        },
        {
          label: "机械",
          value: "机械",
        },
        {
          label: "建筑",
          value: "建筑",
        },
      ],
    };
  },
  methods: {
    //审核文献是否通过（status为状态）
    review(status) {
      let data = new FormData();
      data.append("isAccess", status);
      data.append("title", this.docMessage.title);
      data.append("email", this.docMessage.email);

      this.$http
        .post(this.domain + "cons", data, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.$Message.error(res.data.msg);
          } else {
            if (!status) {
              //拒绝后通知面板消失
              this.docModal = false;
              this.$Message.info("已拒绝");
              //删除对应的项
              this.$parent.deleteDoc(this.docMessage.title);
            }
            this.publishModal = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //查看文件
    look() {
      // let data = new FormData();
      // data.append("name",this.docMesssage.title);
      this.$http.get(this.domain + 'cons/fd',{
        params: {
          name: this.docMessage.title
        },
        headers: {'token' : sessionStorage.getItem('token')},
        responseType: "blob",
      })
      .then((res) => {
          console.log(res);
          // window.location.href = res.request.responseURL;

          // window.open(res.request.responseURL, "top");
          const content = res.data;
          const blob = new Blob([content]);
          const fileName = this.doc.title + ".doc";
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        });
        /*
      this.$http
        .get(this.domain + "cons/fd" + this.docMessage.title, data,{
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          // window.location.href = res.request.responseURL;

          window.open(res.request.responseURL, "top");
          // console.log(res.request.responseURL);
        });
        */
    },

    //获取子组件传来的值
    getExtraMessage(time, fromJournal, paperType, periodicalId) {
      this.time = time; //刊期
      this.fromJournal = fromJournal; //收录
      this.paperType = paperType; //类别
      if (!periodicalId) {
        periodicalId = 0;
      }
      this.periodicalId = periodicalId; //期刊id
      // console.log(time + ' ' + fromJournal + ' ' + paperType);
    },

    //添加文献
    addDoc() {
      let state = this.checkParams();
      if (!state) {
        return false;
      }
      let data = new FormData();
      data.append("title", this.docMessage.title); //标题
      data.append("author", this.docMessage.author); //作者
      data.append("keyword", this.docMessage.keyword); //关键词
      data.append("publishTime", this.time); //刊期
      data.append("fromJournal", this.fromJournal); //收录
      data.append("paperType", this.paperType); //类别
      data.append("abstractText", this.docMessage.abstractText); //摘要
      data.append("periodicalId", this.periodicalId); //期刊id
      this.$http
        .post(this.domain + "docs", data)
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 1) {
            this.$Message.success("已添加文献");
            this.publishModal = false;
            this.docModal = false;
            //清空输入框
            this.$refs.myChild.clearAll();
            this.getExtraMessage();
            //删除对应的项
            this.$parent.deleteDoc(this.docMessage.title);
          } else {
            this.$Message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);

          if (this.periodicalId == 0) {
            this.$Message.error("请选择有效的期刊收录");
          } else {
            this.$Message.error("服务器连接失败");
          }
        });
    },

    //检查参数
    checkParams() {
      let state = true;
      let arr = [];
      let str = "";
      if (!this.time) {
        state = false;
        arr.push("刊期");
      }
      if (!this.paperType) {
        state = false;
        arr.push("类别");
      }

      if (!this.fromJournal) {
        state = false;
        arr.push("收录");
      }
      arr.forEach((item, index) => {
        str += item + "，";
      });
      if (!state) this.$Message.error(str.slice(0, -1) + "为空");
      return state;
    },
  },
};
</script>

<style lang="scss" scoped>
.doc-container {
  margin: 30px 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  .doc-panel {
    font-size: 18px;
    width: 400px;
    overflow: hidden;

    > div {
      margin: 5px 0;

      &:nth-child(4) {
        span {
          display: inline-block;
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: bottom;
        }
      }

      strong {
        display: inline-block;
        min-width: 90px;
        text-align: left;
      }

      span {
        margin: 0 15px;
        display: inline-block;
        width: calc(100% - 135px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: bottom;
      }

      &.text-content {
        display: flex;

        div {
          margin-left: 18px;
          width: 300px;
          max-height: 300px;
          overflow-y: auto;
          scrollbar-width: none;
          text-indent: 10px;
        }
      }
    }
  }
}

.extra-message {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 0 30px;
  font-size: 16px;
}
</style>