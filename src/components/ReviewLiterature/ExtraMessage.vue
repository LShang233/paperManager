<template>
  <div class="extra-message">
    <div>
      <div class="extra-name">刊期：</div>
      <Row>
          <Col span="12">
            <DatePicker
              type="date"
              placeholder="选择日期"
              @on-change="findDate"
              format="yyyy-MM-dd"
              :style="lineProgress"
              v-model="time"
            ></DatePicker>
          </Col>
        </Row>
    </div>
    <div>
      <div class="extra-name">类别：</div>
      <Select v-model="paperType" @on-change="passToParent" :style="lineProgress">
          <Option
            v-for="item in paperTypes"
            :value="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
    </div>
    <div>
      <div class="extra-name">收录：</div>
      <Input
          v-model="fromJournal"
          :style="lineProgress"
          placeholder="请填写有效信息"
          @on-change="passToParent"
        />
    </div>
  </div>
</template>

<script>
import { getDate, getTime } from "./util";

export default {
  name: "ExtraMessage",
  props: ["extraMessage","Width"],
  data() {
    return {
      fromJournal: "", //收录
      time: "", //时间
      paperType: "", //类别
      paperTypes: [
        {
          label: "OA期刊",
          value: "OA期刊",
        },
        {
          label: "基础",
          value: "基础",
        },
        {
          label: "社科",
          value: "社科",
        },
        {
          label: "自然",
          value: "自然",
        },
        {
          label: "医药",
          value: "医药",
        },
        {
          label: "生物",
          value: "生物",
        },
        {
          label: "环境",
          value: "环境",
        },
        {
          label: "核能",
          value: "核能",
        },
        {
          label: "化学",
          value: "化学",
        },
        {
          label: "理学",
          value: "理学",
        },
        {
          label: "文化",
          value: "文化",
        },
        {
          label: "艺术",
          value: "艺术",
        },
        {
          label: "文学",
          value: "文学",
        },
        {
          label: "经济",
          value: "经济",
        },
        {
          label: "哲学",
          value: "哲学",
        },
        {
          label: "政法",
          value: "政法",
        },
        {
          label: "农业",
          value: "农业",
        },
        {
          label: "工业",
          value: "工业",
        },
        {
          label: "机械",
          value: "机械",
        },
        {
          label: "建筑",
          value: "建筑",
        },
      ],
    };
  },
  methods: {
    //得到日期
    findDate(value) {
      this.time = value;
      this.passToParent();
    },

    //传值给父组件
    passToParent() {
      if (this.time) this.time = getDate("yyyy-MM-dd", this.time);
      this.$emit(
        "getMessageList",
        this.time,
        this.fromJournal,
        this.paperType,
        this.DocIndex
      );
    },

    //检查参数
    checkParams() {},

    //赋值
    postAll(extraMessage, index) {
      // console.log(index);
      this.DocIndex = index;
      this.time = extraMessage.publishTime;
      this.paperType = extraMessage.paperType;
      this.fromJournal = extraMessage.fromJournal;
    },

    //清空值
    clearAll() {
      this.time = "";
      this.fromJournal = "";
      this.paperType = "";
      // this.passToParent();
    },
  },

  mounted() {
    this.passToParent();
    // console.log(this.extraMessage);
  },

  watch: {
    extraMessage: {
      handler(val, oldVal) {
        // console.log('一变化');
        this.time = this.extraMessage.publishTime;
        this.paperType = this.extraMessage.paperType;
        this.fromJournal = this.extraMessage.fromJournal;
      },
      deep: true,
      immediate: true,
    },


    // fromJournal(val,oldVal){

    // },

    // paperType(val,oldVal){
    //     return val;
    // },

    // time(val,oldVal){
    //     return val;
    // }
  },
    computed: {
    lineProgress() {
      let style = {};
      style.width = this.Width + "px";
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.extra-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 100%;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 15px auto;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    .extra-name {
      font-weight: bold;
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>