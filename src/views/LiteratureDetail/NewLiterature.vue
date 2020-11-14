<template>
  <div class="new-literature">
    <Banner :title="'添加文献'" />
    <div class="big-container" @click="$refs.child.journalShow = false">
      <div class="doc-container">
        <div>
          <p>作者：</p>
          <Input v-model="doc.author" maxlength="100" style="width: 400px" />
        </div>
        <div class="doc-title">
          <p>文献名称：</p>
          <div>
            <Input
              v-model="doc.title"
              maxlength="255"
              style="width: 400px; font-weight: bold"
            />
          </div>
        </div>
         <div class="submit-select">
          <div>
            <p>上传稿件：</p>
            <div>
              选择文件
              <input
                type="file"
                accept=".text,.txt,.doc,.docx"
                @change="getFile($event)"
              />
            </div>
            <!-- <Upload
              multiple
              type="drag"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <div style="padding: 20px 0">
                <Icon
                  type="ios-cloud-upload"
                  size="52"
                  style="color: #3399ff"
                ></Icon>
                <p>Click or drag files here to upload</p>
              </div>
            </Upload> -->
            <p v-show="file" class="file-name">{{ file.name }}</p>
          </div>
        </div>
        <div>
          <ExtraMessage
            ref="child"
            :extraMessage="doc"
            @getMessageList="getAllMessage"
            :Width="400"
          />
        </div>
      </div>
      <div class="doc-container second-container">
        <div>
          <p>联系电话：</p>
          <Input v-model="doc.phone" style="width: 400px" />
        </div>
        <div class="submit-title">
          <p>电子邮箱：</p>
          <Input v-model="doc.email" style="width: 400px" />
        </div>
        <div class="message-add">
          <div class="keywords">
            <p>关键词：</p>
            <div class="tags">
              <Tag
                color="primary"
                v-for="item in countTags"
                :key="item.index"
                :name="item"
                type="border"
                closable
                @on-close="handleClose"
              >
                {{ item }}
              </Tag>
              <Input
                class="input-new-tag"
                maxlength="25"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                placeholder="回车以确定"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @on-blur="handleInputConfirm"
              />
              <Button
                v-else
                type="primary"
                icon="ios-add"
                size="small"
                @click="handleAdd"
              >
                添加标签
              </Button>
            </div>
          </div>
        </div>
         <div>
          <p>摘要：</p>
          <Input
            style="width: 400px;"
            type="textarea"
            maxlength="300"
            :autosize="{ maxRows: 6, minRows: 6 }"
            v-model="doc.abstractText"
          />
        </div>
      </div>
    </div>
    <div style="text-align: center; margin-top: 80px">
      <Button @click="returnBack" style="margin-right: 20px">返回</Button>
      <Button @click="clear" type="error" ghost style="margin-right: 20px"
        >清空</Button
      >
      <Button @click="submitDoc" type="primary">确认</Button>
    </div>
  </div>
</template>

<script>
import Banner from "../../components/Banner/Banner";
import ExtraMessage from "../../components/ReviewLiterature/ExtraMessage";

export default {
  name: "NewLiterature",
  components: {
    Banner,
    ExtraMessage,
  },
  data() {
    return {
      doc: {
        author: "",
        phone: "",
        email: "",
        publishTime: "",
        fromJournal: "",
        paperType: "",
        keyword: "",
        title: "",
        abstractText: "",
        periodicalId: "",
      },
      periodicalId: "",
      file: "", //文件
      countTags: [], //标签组
      inputVisible: false, //是否显示输入框
      inputValue: "", //输入框的内容
      modal1: false,
    };
  },
  methods: {
    //清空所有字段
    clear() {
      for (let item in this.doc) {
        this.doc[item] = "";
      }
      this.file = "";
      this.periodicalId = "";
      if (this.countTags.length) {
        this.countTags.splice(0, this.countTags.length);
      }
    },

    //得到所有的信息
    getAllMessage(time, fromJournal, paperType, periodicalId) {
      console.log(time, fromJournal, paperType, periodicalId);
      this.doc.publishTime = time;
      this.doc.fromJournal = fromJournal;
      this.doc.paperType = paperType;
      this.periodicalId = periodicalId;
    },

    //返回文献管理
    returnBack() {
      this.$router.replace("/Literature");
    },

    //获取文件
    getFile(event) {
      this.file = event.target.files[0];
    },

    //检查参数
    checkParams() {
      let state = true;
      let arr = []; //含错误字段的数组
      if (!this.doc.author) {
        arr.push("作者名");
        state = false;
      }
      if (!this.doc.keyword) {
        state = false;
        arr.push("关键词");
      }
      if (!this.doc.fromJournal) {
        arr.push("收录");
        state = false;
      }
      if (!this.doc.paperType) {
        arr.push("类别");
        state = false;
      }
      if (!this.isPhone(this.doc.phone) || !this.doc.phone) {
        state = false;
        arr.push("电话");
      }
      if (!this.isEmail(this.doc.email) || !this.doc.email) {
        state = false;
        arr.push("邮箱");
      }
      if (!this.doc.publishTime) {
        arr.push("刊期");
        state = false;
      }
      if (!this.doc.abstractText) {
        arr.push("摘要");
        state = false;
      }
      if (!this.file) {
        state = false;
        arr.push("文件选择");
      }
      let sum = "";
      arr.forEach((item, index) => {
        sum += `${item}、`;
      });
      if (!state) this.$Message.error(sum.slice(0, -1) + "有误"); //提示

      return state;
    },

    //提交文献
    submitDoc() {
      let state = this.checkParams();
      if (!state) {
        return false;
      }
      //表单数据
      let data = new FormData();
      data.append("title", this.doc.title);
      data.append("keyword", this.doc.keyword);
      data.append("author", this.doc.author);
      data.append("email", this.doc.email);
      data.append("phone", this.doc.phone);
      data.append("abstractText", this.doc.abstractText);
      //文件上传
      let fileData = new FormData();
      //后缀名
      let suffix = this.file.name.slice(
        this.file.name.indexOf("."),
        this.file.name.length
      );
      //修改文件名
      let newfile = new File([this.file], this.doc.title + suffix);
      fileData.append("file", newfile);

      this.$http
        .post(this.domain + "con/stc", data)
        .then((res) => {
          console.log(res, "上传文件");
          if (res.data.code != 1) {
            return false;
          }

          //上传文件
          //配置请求头
          let config = {
            headers: { "Content-Type": "multipart/form-data" },
          };
          return this.$http.post(this.domain + "con/fu", fileData, config);
        })
        .then((res) => {
          console.log(res, "投稿");
          if (res.data.code != 1) {
            //失败状态
            return false;
          }
          return this.$http.post(
            this.domain + `cons/${true}/${this.doc.title}/${this.doc.email}`
          );
        })
        .then((res) => {
          console.log(res, "审核");
          if (res.data.code != 1) {
            //失败状态
            return false;
          }
          let data = new FormData();
          data.append("title", this.doc.title); //标题
          data.append("author", this.doc.author); //作者
          data.append("keyword", this.doc.keyword); //关键词
          data.append("publishTime", this.doc.publishTime); //刊期
          data.append("fromJournal", this.doc.fromJournal); //收录
          data.append("paperType", this.doc.paperType); //类别
          data.append("abstractText", this.doc.abstractText); //摘要
          data.append("periodicalId", this.periodicalId); //期刊id
          return this.$http.post(this.domain + "docs", data);
        })
        .then((res) => {
          console.log(res, "添加");
          if (res.data.code == 1) {
            this.$Message.success("已添加文献");
            setTimeout(() => {
              this.returnBack();
            }, 1000);
          } else {
            this.$Messsage.error("添加失败");
          }
        })
        .catch((err) => {
          console.log(err);
          this.$Message.error("服务器连接失败");
        });
    },

    //点击添加标签
    handleAdd() {
      //输入框出现
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //删除标签
    handleClose(event, name) {
      const index = this.countTags.indexOf(name);
      this.countTags.splice(index, 1);
    },
    //生成标签
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        //添加到数组里
        this.countTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    //校验邮箱
    isEmail(email) {
      let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
      if (!reg.test(email)) return false;
      else return true;
    },
    //检查电话
    isPhone(phone) {
      let reg = /^1[0-9]{10}$/;
      if (!reg.test(phone)) return false;
      else return true;
    },
  },
  watch: {
    countTags(newVal, oldVal) {
      this.doc.keyword = this.countTags.join(",");
      //   console.log(this.doc.keyword);
    },
    deep: true,
  },
};
</script>

<style lang="scss" scoped>
.big-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .doc-container {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 50px;
      width: 100%;
      margin: 15px 0;

      //   &:last-child {
      //     margin-top: 50px;
      //     justify-content: center;
      //   }

      > p {
        font-weight: bold;
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .second-container {
    justify-content: flex-start;
  }
}
@import "./NewLiterature.scss";
</style>