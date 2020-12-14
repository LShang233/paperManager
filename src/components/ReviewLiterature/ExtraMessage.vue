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
      <Select
        v-model="paperType"
        @on-change="passToParent"
        :style="lineProgress"
      >
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
      <div class="fromJournal-container">
        <Input
          v-model="fromJournal"
          :style="lineProgress"
          maxlength="255"
          placeholder="输入有效信息，自动搜索有关的收录期刊"
          @on-change="delaySearch"
          @on-blur="journalShow = false"
        />
        <transition name="close">
          <ul
            v-show="journalShow"
            :style="lineProgress"
            class="fromJournal-panel"
          >
            <li
              v-for="(item, index) in journal"
              :key="item.index"
              @click="addJournal(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { getDate, getTime, debounce } from "./util";

export default {
  name: "ExtraMessage",
  props: ["extraMessage", "Width"],
  data() {
    return {
      journalShow: false, //搜索面板是否出现
      fromJournal: "", //收录
      time: "", //时间
      paperType: "", //类别
      journal: [], //模糊搜索到的期刊
      periodicalId: this.extraMessage.periodicalId, //期刊id
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
        {
          label: "交通",
          value: "交通",
        },
        {
          label: "油气",
          value: "油气",
        },
        {
          label: "天文",
          value: "天文",
        },
        {
          label: "军事",
          value: "军事",
        },
        {
          label: "航空",
          value: "航空",
        },
        {
          label: "金属",
          value: "金属",
        },
        {
          label: "冶金",
          value: "冶金",
        },
        {
          label: "矿业",
          value: "矿业",
        },
        {
          label: "电器",
          value: "电器",
        },
        {
          label: "水利",
          value: "水利",
        },
        {
          label: "动力",
          value: "动力",
        },
        {
          label: "计算机",
          value: "计算机",
        },
        {
          label: "电子",
          value: "电子",
        },
        {
          label: "语言",
          value: "语言",
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
        this.periodicalId
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

    //添加收录期刊
    addJournal(index) {
      this.fromJournal = this.journal[index].name;
      this.periodicalId = this.journal[index].id;
      this.passToParent();
    },

    //根据字段模糊搜索期刊
    searchJournal() {
      let data = new FormData();
      data.append("name", this.fromJournal);
      this.$http
        .post(this.domain + "journal/list", data)
        .then((res) => {
          console.log(res);
          this.journal = res.data.data;
          this.journalShow = true;
          this.passToParent();
        });
    },

    //防抖
    delaySearch: debounce(function () {
      this.searchJournal();
    }, 1000),
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
        this.periodicalId = this.extraMessage.periodicalId;
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

    .fromJournal-container {
      position: relative;

      .fromJournal-panel {
        position: absolute;
        left: 0;
        top: 32px;
        padding: 10px 0;
        max-height: 110px;
        // width: 400px;
        font-size: 12px;
        color: #515a6e;
        background: rgb(255, 255, 255);
        box-sizing: border-box;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        overflow: auto;
        z-index: 10;

        li {
          list-style: none;
          height: 30px;
          line-height: 30px;
          text-indent: 10px;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;

          &:hover {
            background: #f3f3f3;
          }
        }
      }
    }
  }
}

.close-leave-active,
.close-enter-active {
  transition: all .5s;
}
.close-leave-to,
.close-enter {
  opacity: 0;
}
</style>