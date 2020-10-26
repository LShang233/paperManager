<template>
  <Table border :columns="columns" :data="dataList">
    <template slot-scope="{ row }" slot="name">
      <strong>{{ row.name }}</strong>
    </template>
    <template slot-scope="{ index }" slot="action">
      <Button
        type="primary"
        size="small"
        style="margin-right: 5px"
        @click="show(index)"
        >修改</Button
      >
      <Button type="error" size="small" @click="remove(index)">删除</Button>
    </template>
  </Table>
</template>

<script>
export default {
  name: "JournalTable",

  props: ["journalList"],

  data() {
    return {
      columns: [
        {
          title: "期刊名称",
          slot: "name",
        },
        {
          title: "级别",
          key: "journalLevel",
        },
        {
          title: "所属行业",
          key: "journalType",
        },
        {
          title: "影响因子",
          key: "impactFactor",
        },
        {
          title: "出版周期",
          key: "releaseCycle",
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
    };
  },

  methods: {
    show(index) {
      let id = this.dataList[index].id;
      
    },

    // 删除杂志
    remove(index) {
      if (confirm("是否确认删除？")) {
        let formdata = new FormData();
        formdata.append("id", this.dataList[index].id);
        alert(this.dataList[index].id);
        this.$http
          .post("http://39.98.41.126:30004/journal/deleteJournal", formdata)
          .then((res) => {
            if (res.data.code == 1) {
              alert("删除成功");
            }
          });
      }
    },
  },

  mounted() {
    console.log(this.journalList);
  },
};
</script>

<style lang="scss" scoped>
</style>