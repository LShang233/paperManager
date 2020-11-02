<template>
  <div class="Literature">
    <Banner :title="'文献管理'" />
    <div class="literature-container">
      <!-- <PublishDoc /> -->
      <div class="title">
        已发布的文献
        <span>({{ AllDoc }}篇)</span>
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
      this.$axios
        .get("http://39.98.41.126:30001/doc", {
          params: {
            pageNum: parseInt(pageNum),
            pageSize: 9,
          },
        })
        .then((res) => {
        //   console.log(res.data);
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
          this.$axios
            .delete(`http://39.98.41.126:30001/doc/${this.docList[index].id}`)
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
        name: "LiteratureDetail",
        params: {
          id: this.docList[index].id,
        },
      });
      this.$axios
        .get(`http://39.98.41.126:30007/doc/${this.docList[index].id}`)
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