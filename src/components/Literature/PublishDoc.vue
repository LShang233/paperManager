<template>
  <div class="PublishDoc">
    <div class="title">
      已发布的文献
      <span>({{ AllDoc }}篇)</span>
    </div>
    <Table :columns="columns1" :data="docList" :key="reflush">
      <template slot-scope="{ index }" slot="action">
        <Button type="error" size="small" @click="remove(index)">删除</Button>
        <Button type="primary" size="small" @click="revise(index)">修改</Button>
      </template>
    </Table>
    <Modal
      v-model="editPanelModal"
      title="修改文献"
      @on-ok="submitDoc"
      @on-cancel="cancelDoc"
    >
      <!-- <EditPanel :docMessage="docList[index]" @getEditMessage="getAllMessage"/> -->
      <div class="doc-container">
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
      </div>
    </Modal>
    <Page class="page" :total="AllDoc" @on-change="changePage" />
  </div>
</template>

<script>
import EditPanel from "./EditPanel";
import EditMessage from "../ReviewLiterature/ExtraMessage";
import { getDate } from "../ReviewLiterature/util";

export default {
  name: "publishDoc",
  // props:["title"],

  components: {
    EditPanel,
    EditMessage,
  },

  data() {
    return {
      columns1: [
        {
          title: "标题",
          key: "title",
        },
        {
          title: "作者",
          key: "author",
        },
        {
          title: "关键词",
          key: "keyword",
        },
        {
          title: "时间",
          key: "publishTime",
          render: (h, params) => {
            return h("div", getDate("yyyy-MM-dd", params.row.publishTime));
          },
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      docList: [
        {
          title: "菜鸡变fsf",
          author: "xhwfsf",
          publishTime: "2020-01-12",
          keyword: "菜鸡，变",
          phone: "18407112001",
          email: "18291210@qq.com",
          fromJournal: "我家",
          paperType: "基础",
          abstractText: "这是菜鸡神的一个故事,我是你爸爸afafafafafaf",
        },
        {
          title: "菜鸡神",
          author: "xhw",
          publishTime: "2020-01-22",
          keyword: "菜鸡",
          phone: "18407112001",
          email: "18291210@qq.com",
          fromJournal: "我家gsgs",
          paperType: "基础",
          abstractText: "这是鸡大神的一个故事,我是你爸爸afafafafafaf",
        },
        //  {
        //     title: '菜鸡变大神',
        //     author: 'xhw',
        //     time: '2020-01-12',
        //     keyword: '菜鸡，变强',
        //     phone: '18407112001',
        //     email: '18291210@qq.com',
        //     fromJournal: '我家',
        //     paperType: '基础',
        //     abstractText: '这是菜鸡变为大神的一个故事,我是你爸爸afafafafafaf',
        // },
        //  {
        //     title: '菜鸡变大神',
        //     author: 'xhw',
        //     time: '2020-01-12',
        //     keyword: '菜鸡，变强',
        //     phone: '18407112001',
        //     email: '18291210@qq.com',
        //     fromJournal: '我家',
        //     paperType: '基础',
        //     abstractText: '这是菜鸡变为大神的一个故事,我是你爸爸afafafafafaf',
        // },
      ],
      editPanelModal: false,
      publishDoc: "",
      AllDoc: 0,
      theDoc: {
        author: "",
        publishTime: "",
        keyword: "",
        title: "",
        fromJournal: "",
        paperType: "",
      },
      newDoc: [
        {
          title: "菜鸡变fsf",
          author: "xhwfsf",
          publishTime: "2020-01-12",
          keyword: "菜鸡，变",
          phone: "18407112001",
          email: "18291210@qq.com",
          fromJournal: "我家",
          paperType: "基础",
          abstractText: "这是菜鸡神的一个故事,我是你爸爸afafafafafaf",
        },
        {
          title: "菜鸡神",
          author: "xhw",
          publishTime: "2020-01-22",
          keyword: "菜鸡",
          phone: "18407112001",
          email: "18291210@qq.com",
          fromJournal: "我家gsgs",
          paperType: "基础",
          abstractText: "这是鸡大神的一个故事,我是你爸爸afafafafafaf",
        },
      ],
      DocIndex: "", //要修改的值
      reflush: true,
    };
  },
  methods: {
    //获取已发布文献
    getPublishDoc(pageNum) {
      this.$http
        .get(this.domain + "doc", {
          params: {
            pageNum: parseInt(pageNum),
            pageSize: 9,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.AllDoc = res.data.data.total;
          this.docList = res.data.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //删除文献
    remove(index) {
      this.$Modal.confirm({
        title: "删除文献",
        content: `<p>确定删除《${this.docList[index].title}》</p>`,
        onOk: () => {
          //删除文献
          this.docList.splice(index, 1);
          this.$Message.success("已删除");
          this.$http
            .delete(this.domain + `docs?${this.docList[index].id}`)
            .then((res) => {
              console.log(res);
            });
        },
        onCancel: () => {
          this.$Message.info("已取消");
        },
      });
    },

    //修改文献
    revise(index) {
      // console.log(index);
      // this.$router.replace('/LiteratureDetail');
      this.$router.push({
        name: 'LiteratureDetail',
        params: {
          id: this.docList[index].id
        }
      })
      this.DocIndex = index;
      this.editPanelModal = true;
      this.theDoc = this.newDoc[index];
      // this.theDoc = this.newDoc = this.docList[index];
      this.$http
        .get(this.domain + `doc/${this.docList[index].id}`)
        .then((res) => {
          this.theDoc = res.data.data;
        });
      // console.log(this.theDoc);
      // this.$refs.child.postAll(this.theDoc, index);
    },

    //得到所有的信息
    getAllMessage(time, fromJournal, paperType, DocIndex) {
      if (time) {
        console.log(time, fromJournal, paperType, DocIndex);
        this.newDoc[DocIndex].publishTime = time;
        this.newDoc[DocIndex].fromJournal = fromJournal;
        this.newDoc[DocIndex].paperType = paperType;
      }
    },

    //点击确认后,修改文献
    submitDoc() {
      console.log(this.docList[this.DocIndex], this.theDoc, "修改前");
      this.docList[this.DocIndex] = this.theDoc;
      console.log(this.docList[this.DocIndex], this.theDoc, "修改后");
      this.$http
        .put(this.domain + "doc", {
          id: this.theDoc.id,
          title: this.theDoc.title,
          author: this.theDoc.author,
          keyword: this.theDoc.keyword,
          publishTime: this.theDoc.publishTime,
          fromJournal: this.theDoc.fromJournal,
          paperType: this.theDoc.paperType,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    cancelDoc() {
      console.log("nihao");
      this.newDoc = this.docList;
      // this.docList = this.newDoc;
      console.log(this.theDoc);
    },

    /* 分页 */
    changePage(index) {
      index = parseInt(index);

      this.getPublishDoc(parseInt(index));
    },
  },
  mounted() {
    this.getPublishDoc(1);
  },
  watch: {
    docList: {
      handler(val, oldVal) {
        // console.log('一变化');
        for (let i = 0; i < val.length; i++) {
          if (oldVal[i] != val[i]) {
            // console.log(newValue);
            this.reflush = !this.reflush;
          }
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.PublishDoc {
  margin: 5px 0 20px;

  .title {
    padding: 3px;
    font-size: 18px;
    font-weight: bold;
    color: #808080;
    border-bottom: 1px dashed #808080;
  }

  .page {
    text-align: center;
    margin-top: 30px;
  }
}

.doc-container {
  margin: 30px 0 15px;
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

    > p {
      font-weight: bold;
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>