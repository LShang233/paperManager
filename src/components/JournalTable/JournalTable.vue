<template>
  <Table border :columns="columns" :data="journalList">
    <template slot-scope="{ row }" slot="name">
      <strong>{{ row.name }}</strong>
    </template>
    <template slot-scope="{ index, row }" slot="action">
      <Button
        type="primary"
        size="small"
        style="margin-right: 5px"
        :to="'/JournalDetail/' + row.id"
        >修改
      </Button>
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
    // 删除杂志
    remove(index) {
      if (confirm("是否确认删除？")) {
        this.$http
          .delete(this.domain + `journals/deleteJournal/${this.journalList[index].id}`,{
            headers : {
              "token" : sessionStorage.getItem('token')
            }
          })
          .then((res) => {
            if (res.data.code == 1) {
              this.$Message.info("删除成功！");
              location.reload();
            } else {
              this.$Message.info(res.data.msg);
            }
          });
      }
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>