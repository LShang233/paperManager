<template>
  <div>
    <Poptip title="选择表情" width="300px">
      <div slot="content">
        <div class="emotion-box">
          <div class="emotion-box-line" v-for="(line, i) in list" :key="i">
            <emotion
              class="emotion-item"
              v-for="(item, i) in line"
              :key="i"
              @click.native="clickHandler(item)"
            >{{item}}</emotion>
          </div>
        </div>
      </div>
      <div class="chat-icon">
      <svg t="1603718157457" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4965" width="25" height="25"><path d="M512 938.666667C277.333333 938.666667 85.333333 746.666667 85.333333 512S277.333333 85.333333 512 85.333333s426.666667 192 426.666667 426.666667-192 426.666667-426.666667 426.666667z m0-768c-187.733333 0-341.333333 153.6-341.333333 341.333333s153.6 341.333333 341.333333 341.333333 341.333333-153.6 341.333333-341.333333-153.6-341.333333-341.333333-341.333333z" p-id="4966"></path><path d="M682.666667 469.333333c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666666 42.666667-17.066667 42.666667-42.666666 42.666666z m-341.333334 0c-25.6 0-42.666667-17.066667-42.666666-42.666666s17.066667-42.666667 42.666666-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666666zM341.333333 554.666667c0 93.866667 76.8 170.666667 170.666667 170.666666s170.666667-76.8 170.666667-170.666666H341.333333z" p-id="4967"></path></svg>
      </div>
    </Poptip>
  </div>
</template>
<script>
import Emotion from "./Emotion";
export default {
  name: "Emoji",
  components: {
    Emotion
  },
  data() {
    return {
      list: [
        ["微笑", "撇嘴", "色", "发呆", "得意", "流泪", "害羞", "闭嘴","睡", "大哭", "尴尬", "发怒", "调皮", "呲牙", "惊讶", "难过"],
        ["酷", "冷汗", "抓狂", "吐", "偷笑", "可爱", "白眼", "傲慢","饥饿", "困", "惊恐", "流汗", "憨笑", "大兵", "奋斗", "咒骂"],
        ["疑问", "嘘", "晕", "折磨", "衰", "骷髅", "敲打", "再见","擦汗", "抠鼻", "鼓掌", "糗大了", "坏笑", "左哼哼", "右哼哼", "哈欠"],
        ["鄙视", "委屈", "快哭了", "阴险", "亲亲", "吓", "可怜", "菜刀","西瓜", "啤酒", "篮球", "乒乓", "咖啡", "饭", "猪头", "玫瑰"],
        ["凋谢", "示爱", "爱心", "心碎", "蛋糕", "闪电", "炸弹", "刀","足球", "瓢虫", "便便", "月亮", "太阳", "礼物", "拥抱", "强"],
        ["弱", "握手", "胜利", "抱拳", "勾引", "拳头", "差劲", "爱你","NO", "OK", "爱情", "飞吻", "跳跳", "发抖", "怄火", "转圈"],
      ]
    };
  },
  methods: {
    clickHandler(i) {
      let emotion = `#${i};`;
      this.$emit("emotion", emotion);
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin: 0 5px;
  &:hover{
            opacity: 0.5;
          }
}
.emotion-box {
  margin: 0 auto;
  width: 500px;
  box-sizing: border-box;
  padding: 5px;
  overflow: hidden;
  overflow-y: auto;
}
.emotion-box-line {
  display: flex;
}
.emotion-item {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
</style>