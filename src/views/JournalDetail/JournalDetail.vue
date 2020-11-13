<template>
  <div>
    <Banner :title="title" :icon="'md-list'"></Banner>
    <div class="JD-main">
      <div>
        <div :style="'background-image: url(' + dataList.journalPhoto + ');'">
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
        <InputNumber
          v-model="dataList.impactFactor"
          type="number"
          :active-change="false"
          min="0"
          max="10"
          size="large"
          placeholder="请输入……"
        />
      </div>
      <div>
        总被引频次：
        <InputNumber
          v-model="dataList.totalUsed"
          type="number"
          size="large"
          :active-change="false"
          min="0"
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
        <InputNumber
          v-model="dataList.subscriptionPrice"
          size="large"
          type="number"
          :active-change="false"
          min="0"
          placeholder="请输入……"
        />
      </div>
      <div>
        期刊荣誉：
        <Input
          v-model="dataList.journalHonors"
          :rows="4"
          type="textarea"
          placeholder="请输入……"
          show-word-limit
          maxlength="255"
        />
      </div>
      <div>
        期刊简介：
        <Input
          v-model="dataList.journalIntroduction"
          type="textarea"
          :rows="4"
          placeholder="请输入……"
          show-word-limit
          maxlength="255"
        />
      </div>
    </div>
    <div class="JD-btn">
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
        journalPhoto: "/photo/286897d69191493f94f1cc3b9253d215.jpg", // 数据回写，页面显示
        subscriptionPrice: "",
      },
      myPhoto: "", // 图片文件，真实路径
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
      if (data) {
        this.dataList.journalType = data;
        this.toggSearchNav();
      }
    },

    // 回写
    getDetailData() {
      let id = this.$route.params.jid;
      // 判断是否需要回写
      if (id == 0) return;
      const loadingMsg = this.$Message.loading({
        content: "Loading...",
        duration: 0,
      });
      var data = new FormData();
      data.append("id", id);
      this.$http
        .post(this.domain + "journal/getJournalById", data)
        .then((res) => {
          setTimeout(loadingMsg, 0);
          if (res.data.code == 1) {
            this.dataList = res.data.data;
            this.myPhoto = res.data.data.journalPhoto;
            this.$Message.success("获取成功");
            // console.log(this.dataList);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },

    // 写入图片    未完成
    update(e) {
      // 显示
      let _this = this;
      let files = e.target.files[0];
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function () {
        _this.dataList.journalPhoto = this.result;
      };
      // 写入页面
      this.myPhoto = e.target.files[0];
      // 图片上传
      var data = new FormData();
      data.append("file", this.myPhoto);
      this.$http
        .post(this.domain + "journal/upload", data, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.myPhoto = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        });
    },

    // 点击提交
    submitList() {
      if (this.getTips() == 1) return;
      let url;
      // 判断是新建还是更新
      let id = this.$route.params.jid;
      if (id == 0) url = this.domain + "journals/addJournal";
      else url = this.domain + "journals/updateJournal";
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
      data.append("journalPhoto", this.myPhoto);
      data.append("subscriptionPrice", this.dataList.subscriptionPrice);
      if (id != 0) data.append("id", id);

      this.$http
        .post(url, data, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            if (id == 0) this.$Message.info("添加成功！");
            else this.$Message.info("修改成功！");
            history.back();
          } else {
            this.$Message.info(res.data.msg);
          }
        });
    },

    // 提示框 1有问题
    getTips() {
      if (this.isError(this.dataList.name.length, 255, "期刊名称")) return 1;
      if (
        this.isError(this.dataList.competentAuthority.length, 255, "主管单位")
      )
        return 1;
      if (this.isError(this.dataList.sponsor.length, 255, "主办单位")) return 1;
      if (this.isError(this.dataList.homeNumber.length, 100, "国内刊号"))
        return 1;
      if (this.isError(this.dataList.interNumber.length, 100, "国际刊号"))
        return 1;
      if (this.isError(this.dataList.journalType.length, 50, "期刊类型")) {
        return 1;
      } else if (this.dataList.journalType == "请选择期刊类型") {
        this.$Message.error("期刊类型不能为空！");
        return 1;
      }
      if (this.isError(this.dataList.mainSection.length, 255, "主要栏目"))
        return 1;
      if (this.isError(this.dataList.impactFactor.length, 5, "影响因子"))
        return 1;
      if (this.isError(this.dataList.reviewCycle.length, 100, "审稿周期"))
        return 1;
      if (this.isError(this.dataList.releaseCycle.length, 50, "发行周期"))
        return 1;
      if (this.isError(this.dataList.journalLevel.length, 255, "期刊级别"))
        return 1;
      if (this.isError(this.dataList.receiveWebsite.length, 255, "收录网站"))
        return 1;
      if (this.isError(this.dataList.journalHonors.length, 255, "期刊荣誉"))
        return 1;
      if (
        this.isError(this.dataList.journalIntroduction.length, 255, "期刊简介")
      )
        return 1;
      // 新建时未上传图片
      if (!this.myPhoto && this.$route.params.jid == 0) {
        this.$Message.error("请选择图片！");
        return 1;
      }
    },

    // 判断字符串长度函数 有问题返回1
    isError(l, n, tips) {
      if (l == 0) {
        this.$Message.error(tips + "不能为空！");
        return 1;
      }
      if (l >= n) {
        this.$Message.error(tips + "最大长度为" + n);
        return 1;
      }
      return 0;
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