<template>
  <div>
    <Banner :title="title" :icon="'md-list'" />
    <div class="journal-main">
      <div class="jm-buttom">
        <div class="dropdown">
          <Input
            placeholder="输入期刊名称..."
            clearable
            class="dd-Input"
            v-model="inputName"
            @keyup.enter.native="searchInput()"
          />
        </div>
        <div class="dropdown" @click="toggSearchNav">
          {{ realLabels.journalType }}
          <span @click="deleteRealLabel">x</span>
        </div>
        <div class="searchNav" style="display: none">
          <div class="searchNav-delete" @click="toggSearchNav">x</div>
          <searchNav @toJCS="getSearchNavMsg"></searchNav>
        </div>
        <div class="dropdown">
          <select class="drop-down" v-model="realLabels.journalLevel">
            <option disabled selected>期刊级别</option>
            <option
              v-for="(item, index) in journalOption[0]"
              :value="item"
              :key="index"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div class="dropdown">
          <select class="drop-down" v-model="realLabels.releaseCycle">
            <option disabled selected>发行周期</option>
            <option
              v-for="(item, index) in journalOption[1]"
              :value="item"
              :key="index"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div class="dropdown">
          <select class="drop-down" v-model="realLabels.impactFactor">
            <option disabled selected>影响因子</option>
            <option
              v-for="(item, index) in journalOption[2]"
              :value="item"
              :key="index"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <router-link to="/JournalDetail/0">
          <button>添加期刊</button>
        </router-link>
      </div>
      <JournalTable :journalList="dataList"></JournalTable>
      <Page :total="total / 2" class="journal-page" @on-change="change" />
    </div>
  </div>
</template>

<script>
import Banner from "../../components/Banner/Banner";
import searchNav from "../../components/searchNav/searchNav";
import JournalTable from "../../components/JournalTable/JournalTable";

export default {
  name: "Journal",
  components: { Banner, searchNav, JournalTable },
  data() {
    return {
      title: "期刊管理",
      dataList: [],
      total: 0,
      journalOption: [
        [
          "不限",
          "核心（南大）",
          "国家级",
          "国际级",
          "省级",
          "核心（北大）",
          "核心（北大.南大）",
          "未分级",
        ],
        [
          "不限",
          "年刊",
          "半年刊",
          "季刊",
          "双月刊",
          "月刊",
          "半月刊",
          "旬刊",
          "周刊",
          "其他",
        ],
        [
          "不限",
          "0.5以上",
          "1.0以上",
          "2.0以上",
          "3.0以上",
          "4.0以上",
          "5.0以上",
          "6.0以上",
          "7.0以上",
          "8.0以上",
        ],
      ],
      realLabels: {
        journalType: "期刊类别",
        journalLevel: "期刊级别",
        releaseCycle: "发行周期",
        impactFactor: "影响因子",
        pageNum: 1,
        pageSize: 20,
      },
      inputName: "",
    };
  },
  methods: {
    // 获取数据
    getData() {
      let formdata = new FormData();
      formdata.append(
        "journalType",
        this.getRealData(this.realLabels.journalType)
      );
      formdata.append(
        "journalLevel",
        this.getRealData(this.realLabels.journalLevel)
      );
      formdata.append(
        "releaseCycle",
        this.getRealData(this.realLabels.releaseCycle)
      );
      formdata.append(
        "impactFactor",
        this.getRealData(this.realLabels.impactFactor)
      );
      formdata.append("pageNum", this.realLabels.pageNum);
      formdata.append("pageSize", this.realLabels.pageSize);
      const loadingMsg = this.$Message.loading({
        content: "Loading...",
        duration: 0,
      });
      this.$http
        .post(this.domain + "journal/searchJournal", formdata, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          setTimeout(loadingMsg, 0);
          if (res.data.code == 1) {
            this.$Message.success("获取成功");
            this.dataList = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.$Message.error("数据加载失败");
          }
        });
    },

    // 搜索框搜索
    searchInput() {
      let formdata = new FormData();
      formdata.append("name", this.inputName);
      formdata.append("pageNum", this.realLabels.pageNum);
      formdata.append("pageSize", this.realLabels.pageSize);
      formdata.append(
        "journalType",
        this.getRealData(this.realLabels.journalType)
      );
      const loadingMsg = this.$Message.loading({
        content: "Loading...",
        duration: 0,
      });
      this.$http
        .post(this.domain + "journal/searchRecommendJournal", formdata, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          setTimeout(loadingMsg, 0);
          if (res.data.code == 1) {
            this.$Message.success("获取成功");
            this.dataList = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.$Message.error("数据加载失败");
          }
        });
    },

    // 处理子组件传来的期刊类别
    getSearchNavMsg(data) {
      if (data) {
        this.realLabels.journalType = data;
        this.toggSearchNav();
      }
    },

    // 期刊类型组件隐藏与显示
    toggSearchNav() {
      let searchNav = document.querySelector(".searchNav");
      if (searchNav.style.display == "") searchNav.style.display = "none";
      else searchNav.style.display = "";
    },

    // 期刊类别点击x清空
    deleteRealLabel() {
      this.realLabels.journalType = "期刊类别";
      this.toggSearchNav();
    },

    // 处理筛选数据
    getRealData(str) {
      if (
        str == "期刊级别" ||
        str == "不限" ||
        str == "期刊类别" ||
        str == "发行周期" ||
        str == "影响因子"
      )
        return "";
      return str;
    },

    // 分页
    change(page) {
      this.realLabels.pageNum = page;
    },
  },
  mounted() {
    this.getData();
  },

  // 监控筛选框
  watch: {
    realLabels: {
      handler(val, oldVal) {
        this.getData();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./Journal.scss";
</style>