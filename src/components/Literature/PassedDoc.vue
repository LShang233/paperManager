<template>
  <div class="PassedDoc">
    <Table :columns="columns1" :data="passedDoc">
    <template slot-scope="{index}" slot="action">
        <Button type="success" size="small" @click="publish(index)">发布</Button>
        <Modal 
        v-model="publishModal"
        title="发布文献">
        <div class="edit-panel">
            <EditPanel :docMessage="passedDoc[index]"/>
        </div>
        </Modal>
    </template>
    </Table>
  </div>
</template>

<script>

import EditPanel from './EditPanel';

export default {
  name: 'PassedDoc',
  components: {
    EditPanel
  },
//   props:["title"],
  data(){
    return {
        publishModal: false,
        columns1: [
            {
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '作者',
                    key: 'author'
                },
                {
                    title: '关键词',
                    key: 'keyword'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
        ],
        passedDoc: [
          {
              author: 'xhw',
              phone: '18407112001',
              email: '18291210@qq.com',
              title: '如何从菜鸟变为大神',
              keyword: '励志,大神',
              abstractText: '这是菜鸡变为大神的一个故事,我是你爸爸afafafafafaf',
          },
          {
              author: 'xhw',
              phone: '18407112001',
              email: '18291210@qq.com',
              title: '如何从菜鸟变为大神',
              keyword: '励志,大神',
              abstractText: '这是菜鸡变为大神的一个故事,我是你爸爸afafafafafaf',
          },
          {
              author: 'xhw',
              phone: '18407112001',
              email: '18291210@qq.com',
              title: '如何从菜鸟变为大神',
              keyword: '励志,大神',
              abstractText: '这是菜鸡变为大神的一个故事,我是你爸爸afafafafafaf',
          },
          {
              author: 'xhw',
              phone: '18407112001',
              email: '18291210@qq.com',
              title: '如何从菜鸟变为大神',
              keyword: '励志,大神',
              abstractText: '这是菜鸡变为大神的一个故事,我是你爸爸afafafafafaf',
          },
      ],

    }
  },
  methods: {
    //发布
    publish(index){
        this.publishModal = true;
    },
    //展示对应哪个按钮
    showWBtn(title){
    if(title == '已通过审核的文献') return 1;
    else return 0;
    }
  }
}
</script>

<style lang="scss" scoped>
  .PassedDoc {
    margin: 5px 0 20px;
  }
</style>