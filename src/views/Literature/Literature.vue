<template>
  <div class="Literature">
    <Banner :title="'文献管理'" />
    <div class="literature-container">
      <!-- <PublishDoc /> -->
      <div class="title">
        <div>已发布的文献({{ AllDoc }}篇)</div>
        <div>
          <router-link to="/NewLiterature">
          <Button type="primary" ghost>+添加文献</Button>
        </router-link>
        </div>
      </div>
      <Table :columns="columns1" :data="docList">
        <template slot-scope="{ index }" slot="action">
          <Button type="error" size="small" @click="remove(index)">删除</Button>
          <Button type="primary" size="small" @click="revise(index)"
            >修改</Button
          >
        </template>
      </Table>
      <Page class="page" :total="AllDoc" @on-change="changePage" />
    </div>
  </div>
</template>

<script>
import Banner from "../../components/Banner/Banner";

export default {
  name: "Literature",
  components: {
    Banner,
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
          //   render: (h, params) => {
          //     return h("div", getDate("yyyy-MM-dd", params.row.publishTime));
          //   },
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      docList: [],
      publishDoc: "",
      AllDoc: 0,
    };
  },

  methods: {
    //获取已发布文献
    getPublishDoc(pageNum) {
      const docsmsg = this.$Message.loading({
        content: "Loading...",
        duration: 0,
      });
      this.$http
        .get(this.domain + "doc", {
          params: {
            pageNum: parseInt(pageNum),
            pageSize: 9,
          },
        })
        .then((res) => {
          setTimeout(docsmsg, 0);
          // console.log(res.data);
          if (res.data.code == 1) {
            this.$Message.success("获取成功");
            this.AllDoc = res.data.data.total;
            this.docList = res.data.data.list;
          } else {
            this.$Message.error('获取失败');
          }
        })
        .catch((err) => {
          setTimeout(docsmsg, 0);
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
          this.$http
            .delete(this.domain + `docs/${this.docList[index].id}`, {
              headers: {
                token: sessionStorage.getItem("token"),
              },
            })
            .then((res) => {
              console.log(res);
              this.docList.splice(index, 1);
              this.$Message.success("已删除");
            });
        },
        onCancel: () => {
          this.$Message.info("已取消");
        },
      });
    },

    //修改文献
    revise(index) {
      this.$router.push({
        path: "LiteratureDetail",
        query: {
          id: this.docList[index].id,
          title: this.docList[index].title,
        },
      });
      this.$http
        .get(this.domain + `docs/${this.docList[index].id}`)
        .then((res) => {
          this.theDoc = res.data.data;
        });
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
};
</script>

<style lang="scss" scoped>
.Literature {
  .literature-container {
    padding: 20px;

    .title {
      display: flex;
      justify-content: space-between;
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
}
</style>