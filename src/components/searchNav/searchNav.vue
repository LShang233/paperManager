<template>
  <div class="search-nav">
    <div class="search-nav-title">期刊大全</div>
    <ul>
      <li v-for="(item, index) in allList" :key="index">
        <a v-for="i in 3" :key="i">{{ item[i - 1] }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "searchNav",

  data() {
    return {
      allList: [
        ["OA期刊", "基础", "社科"],
        ["自然", "医药", "生物"],
        ["环境", "核能", "化学"],
        ["理学", "文化", "艺术"],
        ["文学", "经济", "哲学"],
        ["政法", "农业", "工业"],
        ["机械", "建筑", "交通"],
        ["油气", "天文", "军事"],
        ["航空", "金属", "冶金"],
        ["矿业", "电气", "水利"],
        ["动力", "计算机", "电子"],
      ],
    };
  },

  methods: {
    getJournalType() {
      let that = this;
      let jTypeA = document.querySelector('.search-nav').getElementsByTagName('a');
      let i;
      for(i = 0; i < jTypeA.length; i++) {
        jTypeA[i].onclick = function() {
          /* console.log(this.innerHTML); */
          that.$emit('toJCS', this.innerHTML)
        }
      }
    }
  },

  mounted() {
    this.getJournalType();
  },
};
</script>

<style scoped lang="scss">
@import "searchNav.scss";
</style>