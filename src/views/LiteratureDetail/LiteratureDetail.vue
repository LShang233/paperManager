<template>
  <div>
    <Banner :title="'修改文献'" />
    <div class="big-container">
      <div class="doc-container">
        <div>
          <p>作者：</p>
          <Input v-model="doc.author" style="width: 400px" />
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
          <Input v-model="doc.keyword" style="width: 400px" />
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
          <Button @click="returnBack" style="margin-right: 20px">返回</Button>
          <Button @click="publishDoc" type="primary">确认</Button>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="doc-container">
        <div>
          <p>作者：</p>
          <Input v-model="theDoc.author" style="width: 200px" />
        </div>
        <div class="doc-title">
          <p
            title="改文献名会导致无法查看文件"
            style="color: red; cursor: default"
          >
            *文献名称：
          </p>
          <div>
            <Button type="warning" size="small" ghost>查看文献</Button>
            <Input
              v-model="theDoc.title"
              style="width: 200px; font-weight: bold"
              disabled
            />
          </div>
        </div>
        <div>
          <p>关键词：</p>
          <Input v-model="theDoc.keyword" style="width: 200px" />
        </div>
        <div>
          <EditMessage
            :extraMessage="theDoc"
            ref="child"
            @getMessageList="getAllMessage"
          />
        </div>
      </div> -->
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
      },
    };
  },

  methods: {
    //得到所有的信息
    getAllMessage(time, fromJournal, paperType, DocIndex) {
      if (time) {
        // console.log(time, fromJournal, paperType, DocIndex);
        this.doc.publishTime = time;
        this.doc.fromJournal = fromJournal;
        this.doc.paperType = paperType;
      }
    },

    //查看文件
    look() {
      this.$axios
        .get("http://39.98.41.126:30001/con/" + this.doc.title)
        .then((res) => {
          console.log(res);
          window.location.href = res.request.responseURL;
          // console.log(res.request.responseURL);
        });
    },

    //获取要修改的文献
    getTheDoc() {
      let id = this.$route.params.id;
      //   console.log(id);

      this.$axios.get(`http://39.98.41.126:30001/doc/${id}`).then((res) => {
        console.log(res.data);
        this.doc = res.data.data;
      });
    },

    //返回文献管理
    returnBack() {
      this.$router.replace("/Literature");
    },

    //提交并修改文献
    publishDoc() {
      this.$axios
        .put(
          `http://39.98.41.126:30001/doc?id=${this.doc.id}&title=${this.doc.title}&keyword=${this.doc.keyword}&author=${this.doc.author}&publishTime=${this.doc.publishTime}&fromJournal=${this.doc.fromJournal}&paperType=${this.doc.paperType}`
        )
        .then((res) => {
          console.log(res);
          this.$Message.success("已成功");
        })
        .catch((err) => {
          console.log(err);
        });
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