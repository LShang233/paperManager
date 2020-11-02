<template>
    <div class="doc-container">
        <div>
            <p>作者：</p>
            <Input v-model="author" style="width:200px;" @on-change="passToParent"/>
        </div>
        <div class="doc-title">
            <p title="改文献名会导致无法查看文件" style="color:red;cursor:default;">*文献名称：</p> 
            <div>
                <Button type="warning" size="small" ghost @click="look">查看文献</Button>
                <Input v-model="docMessage.title" @on-change="passToParent" style="width:200px;font-weight:bold;" disabled/>
            </div>
        </div>
        <div>
            <p>关键词：</p> 
            <Input v-model="docMessage.keyword" style="width:200px;" @on-change="passToParent"/>
        </div>
        <div>
            <EditMessage :extraMessage="docMessage" @getMessageList="getExtraMessage" @change.native="passToParent"/>
        </div>
    </div>
</template>

<script>
import EditMessage from '../ReviewLiterature/ExtraMessage'
import {getDate} from '../ReviewLiterature/util'

export default {
    name: 'editPanel',
    props: ['docMessage'],
    components: {
        EditMessage
    },
    data(){
        return {
            title: this.docMessage.title,
            author: this.docMessage.author,
            // phone: '13103401',
            // email: '234024',
            keyword: this.docMessage.keyword,
            // abstractText: 'afkafk',
            // docMessage: {
                // title: 'fjaf',
                // author: 'xhad',
                // phone: '13103401',
                // email: '234024',
                // keyword: 'falfj',
                // abstractText: 'afkafk',
            // }
        }
    },
    methods: {
         //查看文件
        look(){
            this.$Message.success('查看文献');
            /*
            this.$http.get('http://39.98.41.126:30001/con/' + this.docMessage.title).then(res=>{
                console.log(res);
                window.location.href = res.request.responseURL;
                // console.log(res.request.responseURL);
            })
            */
        },

        //得到子组件extra传来的值
        getExtraMessage(time,fromJournal,paperType){
            this.docMessage.publishTime = time;
            // console.log(time,fromJournal,paperType);
            this.docMessage.fromJournal = fromJournal;
            this.docMessage.paperType = paperType;
        },

        //传递给父组件
        passToParent(){
            console.log('传给父');
            this.$emit('getEditMessage',this.docMessage);
        }
        
    },

    watch:{
        // docMessage:{
            // handler(val,oldVal) {
            // },
            // deep: true,
            // immediate: true,
        // }
    }
}
</script>

<style lang="scss" scoped>
.doc-container {
        margin: 30px 0 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 18px;

        // .doc-panel {
        //     font-size: 18px;
        //     width: 400px;
        //     overflow: hidden;
        // }

        >div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 50px;
            width: 100%;
            margin: 15px 0;

            >p {
                font-weight: bold;
                max-width:200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            //     &.doc-title{
                    
            //         span {
            //             display: inline-block;
            //             max-width:200px;
            //             white-space: nowrap;
            //             overflow: hidden;
            //             text-overflow: ellipsis;
            //             vertical-align: bottom;
            //         }
            //     }

            //     strong {
            //         display: inline-block;
            //         min-width: 90px;
            //         text-align: left;
            //     }

            //     span {
            //         margin: 0 15px;
            //         display: inline-block;
            //         width: calc(100% - 135px);
            //         white-space: nowrap;
            //         overflow: hidden;
            //         text-overflow: ellipsis;
            //         vertical-align: bottom;
            //     }

            //     &.text-content{
            //         display: flex;

            //         div {
            //             margin-left: 18px;
            //             width: 300px;
            //             max-height: 300px;
            //             overflow-y: auto; 
            //             scrollbar-width: none;
            //             text-indent: 10px;
            //         }
            //     }
                
            }
    }
</style>