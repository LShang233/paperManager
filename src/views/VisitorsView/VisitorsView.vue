<template>
  <div class="visitors-container">
    <Banner :title="'游客管理'" :icon="'md-list'" />
    <div class="visitors-content">
      <Table :columns="columns1" :data="visitorsList">
      </Table>
      <Page
        class="page"
        :total="visitorsNum"
        page-size="15"
        @on-change="changePage"
      />
    </div>
  </div>
</template>

<script>
import Banner from "../../components/Banner/Banner";

export default {
  name: "VisitorsView",
  components: {
    Banner,
  },
  data() {
    return {
      //表格头
      columns1: [
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "电话",
          key: "telephone",
        },
        {
          title: "地址",
          key: "address",
        },
        {
          title: "工作单位",
          key: "workPlace",
        },
        {
          title: "身份证号码",
          key: "card",
        },
        {
          title: "推广次数",
            key: 'count'
        },
      ],
      //游客数量
      visitorsNum: 0,
      //游客数据
      visitorsList: [],
    };
  },
  methods: {
    //获取游客数据信息
    getVisitors(pageNum) {
      let data = new FormData();
      data.append("pageNum", pageNum);
      data.append("pageSize", 4);
        //加载
      const loadingMsg = this.$Message.loading({
        content: "Loading...",
        duration: 0,
      });
    //发送请求
      this.$http
        .post(this.domain + "user/getVisitors", data, {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          const {code,data} = res.data;
          if(code == 1){
              this.$Message.success('获取成功');
              const {list,total} = data;
              this.visitorsNum = total;  //游客总数
              this.visitorsList = list;  //游客列表
          } else {
              this.$Message.error('获取失败');
          }
        })
        .catch((err) => {
          console.log(err);
          this.$Message.error('服务器连接失败');
        })
        .finally(() => {
            setTimeout(loadingMsg, 0); //隐藏loading
        });
    },
    //换页
    changePage(index) {
      index = parseInt(index);
      this.getVisitors(index);
    },
  },
  mounted() {
    this.getVisitors(1); //获取游客数据
  },
};
</script>

<style lang="scss" scoped>
.visitors-container {
  .visitors-content {
    padding: 20px;
    text-align: center;
  }
}
</style>