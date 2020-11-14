<template>
  <div @click="$refs.child.journalShow = false">
    <Banner :title="'修改文献'" />
    <div class="big-container">
      <div class="doc-container">
        <div>
          <p>作者：</p>
          <Input v-model="doc.author" maxlength="100" style="width: 400px" />
        </div>
        <div class="doc-title">
          <p
            title="改文献名会导致无法查看文件"
            style="color: red; cursor: default"
          >
            *文献名称：
          </p>
          <div>
            <Button type="warning" size="small" ghost @click="look"
              >查看文献</Button
            >
            <Input
              v-model="doc.title"
              style="width: 400px; font-weight: bold"
              disabled
            />
          </div>
        </div>
        <div>
          <p>关键词：</p>
          <Input v-model="doc.keyword" style="width: 400px" maxlength="255"/>
        </div>
        <div>
          <EditMessage
            ref="child"
            :extraMessage="doc"
            @getMessageList="getAllMessage"
            :Width="400"
          />
        </div>
        <div>
          <p>摘要</p>
          <Input
            style="width: 400px"
            type="textarea"
            maxlength="300" 
            show-word-limit
            :autosize="{ maxRows: 5, minRows: 5 }"
            v-model="doc.abstractText"
          />
        </div>
        <div>
          <Button @click="returnBack" style="margin-right: 20px">返回</Button>
          <Button @click="publishDoc" type="primary">确认</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../../components/Banner/Banner";
import EditMessage from "../../components/ReviewLiterature/ExtraMessage";
export default {
  name: "LiteratureDetail",
  components: {
    EditMessage,
    Banner,
  },
  data() {
    return {
      doc: {
        author: "",
        publishTime: "",
        fromJournal: "",
        paperType: "",
        keyword: "",
        title: "",
        abstractText: "",
        periodicalId: ""
      },
    };
  },

  methods: {
    //得到所有的信息
    getAllMessage(time, fromJournal, paperType, periodicalId) {
      if (time) {
        console.log(time, fromJournal, paperType, periodicalId);
        this.doc.publishTime = time;
        this.doc.fromJournal = fromJournal;
        this.doc.paperType = paperType;
        this.doc.periodicalId = periodicalId;
      }
    },

    //查看文件
    look() {
      this.$http.get(this.domain + "cons/" + this.doc.title).then((res) => {
        console.log(res);
        // window.location.href = res.request.responseURL;
        window.open(res.request.responseURL,'top');
        // console.log(res.request.responseURL);
      });
    },

    //获取要修改的文献
    getTheDoc() {
      let id = this.$route.query.id;
      //   console.log(id);
       const docsmsg = this.$Message.loading({
        content: "Loading...",
        duration: 0,
      });
      this.$http.get(this.domain + `doc/${id}`).then((res) => {
        setTimeout(docsmsg, 0);
        console.log(res.data);
        if(res.data.code == 1){
          this.$Message.success("获取成功");
           this.doc = res.data.data;
        } else {
          this.$Message.error('获取失败');
        }
       
      }).catch(err=>{
        console.log(err);
        setTimeout(docsmsg, 0);
      });
    },

    //返回文献管理
    returnBack() {
      this.$router.replace("/Literature");
    },

    //提交并修改文献
    publishDoc() {
      //检查参数
      let state = this.checkParams();
      if (!state) {
        return false;
      }
      this.$http
        .put(
          this.domain +
            `docs?id=${this.doc.id}&title=${this.doc.title}&keyword=${this.doc.keyword}&author=${this.doc.author}&publishTime=${this.doc.publishTime}&fromJournal=${this.doc.fromJournal}&paperType=${this.doc.paperType}&periodicalId=${this.doc.periodicalId}&abstractText=${this.doc.abstractText}`,
          {},
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$Message.success("修改成功");
            this.doc = "";
            setTimeout(() => {
              this.$router.replace("/Literature");
            }, 1000);
          } else {
            this.$Message.error("修改失败");
          }
        })
        .catch((err) => {
          console.log(err);
          this.$Message.error("修改失败");
        });
    },

    //检查参数
    checkParams() {
      let state = true;
      let arr = []; //含错误字段的数组
      if (!this.doc.author) {
        arr.push("作者名");
        state = false;
      }
      if (!this.doc.keyword) {
        state = false;
        arr.push("关键词");
      }
      if (!this.doc.fromJournal) {
        arr.push("收录");
        state = false;
      }
      if (!this.doc.paperType) {
        arr.push("类别");
        state = false;
      }
      if (!this.doc.publishTime) {
        arr.push("刊期");
        state = false;
      }
      if(!this.doc.abstractText) {
        arr.push("摘要");
        state = false;
      }
      let sum = "";
      arr.forEach((item, index) => {
        sum += `${item}、`;
      });
      if (!state) this.$Message.error(sum.slice(0, -1) + "为空"); //提示

      return state;
    },
  },

  mounted() {
    this.getTheDoc();
  },
};
</script>

<style lang="scss" scoped>
.big-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .doc-container {
    margin: 100px 0 15px;
    padding: 0 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 50px;
      width: 100%;
      margin: 15px 0;

      &:last-child {
        margin-top: 50px;
        justify-content: center;
      }

      > p {
        font-weight: bold;
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>