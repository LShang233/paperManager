<template>
  <div>
    <Banner :title="title" :icon="'md-list'" />
    <div class="journal-main">
      <div class="jm-buttom">
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
      this.$http
        .post("http://39.98.41.126:30001/journal/searchJournal", formdata)
        .then((res) => {
          if (res.data.code == 1) {
            this.dataList = res.data.data.list;
            this.total = res.data.data.total;
          }
        });
    },

    // 处理子组件传来的期刊类别
    getSearchNavMsg(data) {
      if (data) this.realLabels.journalType = data;
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
      this.hideSearchNav();
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