<template>
<div class="reviewliterature">
    <Banner :title="'审核文献'"/>
    <div class="message-container">
        <div class="docMessage-list" v-for="(item, index) in docMessage" :key="index">
            <div class="doc-intro">
                <strong>{{item.author}}(作者)</strong>
                的投稿文献
                <strong>《{{item.title}}》</strong> 
            </div>
            <DocDetail :docMessage="item"/>
        </div>
    </div>
</div>
</template>

<script>
import Banner from '../../components/Banner/Banner';
import DocDetail from '../../components/ReviewLiterature/DocDetail'

export default {
    name: 'ReviewLiterature',

    data(){
        return {
            docMessage: [
                // {
                //     author: 'xhw',
                //     phone: '18407112001',
                //     email: '18291210@qq.com',
                //     title: '如何从菜鸟变为大神',
                //     keyword: '励志,大神',
                //     abstractText: '这是菜鸡变为大神的一个故事,我是你爸爸afafafafafaf',
                // },
                // '','','','','','','','',''
            ],
        }
    },
    components: {
        Banner,
        DocDetail
    },
    methods: {
        //获取审核消息
        getDocMessage(){
            this.$http.get('http://39.98.41.126:30004/con').then(res=>{
                
                this.docMessage = res.data.data;
                console.log(this.docMessage);
            })
        },

        //删除数据
        deleteDoc(title){
            let index = this.getIndex(title);
            this.docMessage.splice(index,1);
        },

        //根据标题找索引
        getIndex(title){
            let Num;
            this.docMessage.forEach((item,index)=>{
                if(item.title == title) {
                    Num = index;
                }
            });
            return parseInt(Num);
        }
    },
    mounted(){
        this.getDocMessage();
    },
    watch: {
        docMessage(val,oldVal){
            return val;
        }
    }
        
    
}
</script>

<style lang="scss" scoped>
.reviewliterature {
    .message-container {
        padding: 20px 40px;


        .docMessage-list {
            margin: 20px 0;
            padding: 5px 20px;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            background: #fff;
            box-shadow: 2px 2px 10px rgba(128,128,128,0.3);
            overflow: hidden;

            .doc-intro {
                font-size: 16px;
                flex: 1;
            }
        }
    }

    .message-page {
        text-align: center;
    }
}
</style>