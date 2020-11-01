<template>
  <div>
    <Banner :title="title" :icon="'md-list'"></Banner>
    <div class="JD-main">
      <div>
        <div>
          <input
            class="img-input"
            name="file"
            type="file"
            accept="image/png,image/gif,image/jpeg"
            @change="update($event)"
          />
        </div>
        <div>
          期刊名称：
          <Input v-model="dataList.name" size="large" placeholder="请输入……" />
        </div>
      </div>
      <div>
        主管单位：
        <Input
          v-model="dataList.competentAuthority"
          size="large"
          placeholder="请输入……"
        />
      </div>
      <div>
        主办单位：
        <Input v-model="dataList.sponsor" size="large" placeholder="请输入……" />
      </div>
      <div>
        国内刊号：
        <Input
          v-model="dataList.homeNumber"
          size="large"
          placeholder="请输入……"
        />
      </div>
      <div>
        国际刊号：
        <Input
          v-model="dataList.interNumber"
          size="large"
          placeholder="请输入……"
        />
      </div>
      <div>
        期刊类型：
        <div class="ivu-input ivu-input-large" @click="toggSearchNav">
          {{ dataList.journalType }}
        </div>
        <div class="searchNav" style="display: none">
          <div class="searchNav-delete" @click="toggSearchNav">x</div>
          <searchNav @toJCS="getSearchNavMsg"></searchNav>
        </div>
      </div>
      <div>
        主要栏目：
        <Input
          v-model="dataList.mainSection"
          size="large"
          placeholder="请输入……"
        />
      </div>
      <div>
        影响因子：
        <Input
          v-model="dataList.impactFactor"
          size="large"
          placeholder="请输入……"
        />
      </div>
      <div>
        总被引频次：
        <Input
          v-model="dataList.totalUsed"
          size="large"
          placeholder="请输入……"
        />
      </div>
      <div>
        审稿周期：
        <Input
          v-model="dataList.reviewCycle"
          size="large"
          placeholder="请输入……"
        />
      </div>
      <div>
        发行周期：
        <Select v-model="dataList.releaseCycle">
          <Option
            v-for="(item, index) in journalOption[1]"
            :value="item"
            :key="index"
            >{{ item }}</Option
          >
        </Select>
      </div>
      <div>
        期刊级别：
        <Select v-model="dataList.journalLevel">
          <Option
            v-for="(item, index) in journalOption[0]"
            :value="item"
            :key="index"
            >{{ item }}</Option
          >
        </Select>
      </div>
      <div>
        收录网站：
        <Input
          v-model="dataList.receiveWebsite"
          size="large"
          placeholder="请输入……"
        />
      </div>
      <div>
        订阅价格（每年）：
        <Input
          v-model="dataList.subscriptionPrice"
          size="large"
          type="number"
          placeholder="请输入……"
        />
      </div>
      <div>
        期刊荣誉：
        <Input
          v-model="dataList.journalHonors"
          type="textarea"
          placeholder="请输入……"
        />
      </div>
      <div>
        期刊简介：
        <Input
          v-model="dataList.journalIntroduction"
          type="textarea"
          :rows="4"
          placeholder="请输入……"
        />
      </div>
    </div>
    <div class="JD-btn">
      <p class="jd-tips">{{ tips }}</p>
      <Button type="primary" @click="submitList">提 交</Button>
    </div>
  </div>
</template>

<script>
import searchNav from "../../components/searchNav/searchNav";
import Banner from "../../components/Banner/Banner";
export default {
  name: "JournalDetail",
  components: { Banner, searchNav },
  data() {
    return {
      title: "期刊详细信息",
      tips: "",
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
      ],
      dataList: {
        name: "",
        competentAuthority: "",
        sponsor: "",
        homeNumber: "",
        interNumber: "",
        impactFactor: "",
        totalUsed: "",
        journalIntroduction: "",
        journalHonors: "",
        mainSection: "",
        journalLevel: "",
        reviewCycle: "",
        receiveWebsite: "",
        releaseCycle: "",
        journalType: "请选择期刊类型",
        journalPhoto: "",
        subscriptionPrice: "",
      },
    };
  },
  methods: {
    // 期刊类型组件隐藏与显示
    toggSearchNav() {
      let searchNav = document.querySelector(".searchNav");
      if (searchNav.style.display == "") searchNav.style.display = "none";
      else searchNav.style.display = "";
    },

    // 处理子组件传来的期刊类别
    getSearchNavMsg(data) {
      if (data) this.dataList.journalType = data;
    },

    // 回写
    getDetailData() {
      let id = this.$route.params.jid;
      // 判断是否需要回写
      if (id == 0) return;
      var data = new FormData();
      data.append("id", id);
      // 未完成  未测试
      this.$http
        .post("http://39.98.41.126:30004/journal/getJournalById", data)
        .then((res) => {
          if (res.data.code == 1) {
            console.log(res.data.data);
          } else {
            alert(res.data.msg);
          }
        });
    },

    // 写入图片
    update(e) {
      this.dataList.journalPhoto = e.target.files[0];
    },

    // 点击提交
    submitList() {
      if (this.getTips() == 1) return;
      let url;
      // 判断是新建还是更新
      let id = this.$route.params.jid;
      if (id == 0) url = "http://39.98.41.126:30004/journal/addJournal";
      else url = "http://39.98.41.126:30004/journal/updateJournal";
      // 写入数据
      var data = new FormData();
      data.append("name", this.dataList.name);
      data.append("competentAuthority", this.dataList.competentAuthority);
      data.append("sponsor", this.dataList.sponsor);
      data.append("homeNumber", this.dataList.homeNumber);
      data.append("interNumber", this.dataList.interNumber);
      data.append("impactFactor", this.dataList.impactFactor);
      data.append("totalUsed", this.dataList.totalUsed);
      data.append("journalIntroduction", this.dataList.journalIntroduction);
      data.append("journalHonors", this.dataList.journalHonors);
      data.append("mainSection", this.dataList.mainSection);
      data.append("journalLevel", this.dataList.journalLevel);
      data.append("reviewCycle", this.dataList.reviewCycle);
      data.append("receiveWebsite", this.dataList.receiveWebsite);
      data.append("releaseCycle", this.dataList.releaseCycle);
      data.append("journalType", this.dataList.journalType);
      data.append("journalPhoto", this.dataList.journalPhoto);
      data.append("subscriptionPrice", this.dataList.subscriptionPrice);
      if (id != 0) data.append("id", id);
      // 未完成
      this.$http.post(url, data).then((res) => {
        if (res.data.code == 1) {
          if (id == 0) alert("添加成功！");
          else alert("修改成功！");
        } else {
          alert(res.data.msg);
        }
      });
    },

    // 提示框
    getTips() {
      this.tips = "";
      if (!this.dataList.name) this.tips += "期刊名称、";
      if (!this.dataList.competentAuthority) this.tips += "主管单位、";
      if (!this.dataList.sponsor) this.tips += "主办单位、";
      if (!this.dataList.homeNumber) this.tips += "国内刊号、";
      if (!this.dataList.interNumber) this.tips += "国际刊号、";
      if (this.dataList.journalType == "请选择期刊类型")
        this.tips += "期刊类型、";
      if (!this.dataList.mainSection) this.tips += "主要栏目、";
      if (!this.dataList.impactFactor) this.tips += "影响因子、";
      if (!this.dataList.totalUsed) this.tips += "总被引频次、";
      if (!this.dataList.reviewCycle) this.tips += "审稿周期、";
      if (!this.dataList.releaseCycle) this.tips += "发行周期、";
      if (!this.dataList.journalLevel) this.tips += "期刊级别、";
      if (!this.dataList.receiveWebsite) this.tips += "收录网站、";
      if (!this.dataList.subscriptionPrice) this.tips += "订阅价格、";
      if (!this.dataList.journalHonors) this.tips += "期刊荣誉、";
      if (!this.dataList.journalIntroduction) this.tips += "期刊简介、";
      if (this.tips) {
        this.tips = "请输入" + this.tips.slice(0, this.tips.length - 1) + "！";
      }
      if (!this.dataList.journalPhoto) this.tips = "请选择图片！" + this.tips;

      // 判断
      if (this.tips == "") return 0;
      else return 1;
    },
  },
  mounted() {
    this.getDetailData();
  },
};
</script>

<style lang="scss" scoped>
@import "journalDetail";
</style>