<template>
  <div class="layout">
    <Modal
      title="Title"
      v-model="modalRelay"
      :mask-closable="false"
      @on-ok="relaySubmit"
    >
      <Form :model="Relaylist" label-position="left" :label-width="100">
        <FormItem label="昵称">
          <Input v-model="Relaylist.autor" placeholder="必填"> </Input>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="Relaylist.mail" placeholder="选填"></Input>
        </FormItem>
        <FormItem label="个人主页">
          <Input v-model="Relaylist.mypage" placeholder="选填"></Input>
        </FormItem>
        <FormItem label="内容">
          <Input v-model="Relaylist.context" placeholder="必填"></Input>
        </FormItem>
        <FormItem>
          <!-- <Button @click="handleReset()" style="margin-left: 8px"
                >Reset</Button
              > -->
        </FormItem>
      </Form>
    </Modal>
    <div class="main-box">
      <h4 class="page-header">评论</h4>
      <a name="comments"></a>
      <!-- 评论 -->
      <div
        class="comment-list"
        id="comment-4499"
        v-for="(item, index) in commentObj"
        :key="index"
      >
        <a name="4499"></a>
        <div class="clearfix">
          <div class="comment-left">
            <img :src="item.headPic" />
          </div>
          <div class="commnet-right">
            <div class="comment-cont">
              <div class="comment-body">
                <h5>
                  <a target="_blank" rel="nofollow">{{ item.autor }}</a>
                </h5>
                {{ item.context }}
              </div>
              <p class="comment-info clearfix">
                <span class="float-left mr-small">{{ item.times }}</span
                ><a @click="commentReply(index)">回复</a>
              </p>
            </div>
          </div>
        </div>
        <div
          v-for="(item1, index1) in item.Reply"
          :key="index1"
          class="comment-list comment-children"
          id="comment-4500"
        >
          <a name="4500"></a>
          <div class="clearfix">
            <div class="comment-left">
              <img :src="item1.headPic" />
            </div>
            <div class="commnet-right">
              <div class="comment-cont">
                <div class="comment-body">
                  <h5>
                    <a
                      href="http://www.shukoe.com/"
                      target="_blank"
                      rel="nofollow"
                      >{{ item1.autor }}</a
                    >
                  </h5>
                  @百万链：{{ item1.context }}
                </div>
                <p class="comment-info clearfix">
                  <span class="float-left mr-small">{{ item1.times }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="comment-place">
        <div class="comment-post" id="comment-post">
          <div
            class="cancel-reply text-right"
            id="cancel-reply"
            style="display:none"
          >
            <a href="javascript:void(0);" onclick="cancelReply()">取消回复</a>
          </div>
          <h4 class="page-header">发表评论</h4>
          <a name="respond"></a>
          <Form :model="commentList" label-position="left" :label-width="100">
            <FormItem label="昵称">
              <Input v-model="commentList.autor" placeholder="必填"> </Input>
            </FormItem>
            <FormItem label="邮箱">
              <Input v-model="commentList.mail" placeholder="选填"></Input>
            </FormItem>
            <FormItem label="个人主页">
              <Input v-model="commentList.mypage" placeholder="选填"></Input>
            </FormItem>
            <FormItem label="内容">
              <Input v-model="commentList.context" placeholder="必填"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit()">Submit</Button>
              <Button @click="handleReset()" style="margin-left: 8px"
                >Reset</Button
              >
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "@/assets/event-bus.js";
export default {
  name: "Comment",
  components: {},
  data() {
    return {
      commentObj: [],
      commentList: {
        autor: "",
        mail: "",
        mypage: "",
        context: ""
      },
      articleObj: {}, //文章内容
      modalRelay: false, //回复框
      Relaylist: {
        autor: "",
        mail: "",
        mypage: "",
        context: ""
      },
      indexs: "", //评论的位置
      RelayArry: [] //获取到的用户的回复
    };
  },
  computed: {},
  methods: {
    // 提交评论
    handleSubmit() {
      this.axios
        .post(`${this.baseUrl}/comments/postComments`, {
          data: {
            ids: this.articleObj.id,
            types: this.articleObj.types, //文章类型,例如baidu,360,可能同时属于多个标签
            title: this.articleObj.title, //文章标题
            list: {
              idIndex: this.articleObj.idIndex, //文章id
              tops: 0, //是否置顶，置顶1，不置顶0
              show: 0, //是否显示，1为是，0为否
              autor: this.commentList.autor, //用户名
              headPic:
                "http://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=monsterid&r=g", //头像
              mypage: this.commentList.mypage, //个人主页
              mail: this.commentList.mail, //邮箱
              times: "2012 04:56", //时间
              context: this.commentList.context //内容
            }
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            this.$Message.success("发布成功，待审核");
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 回复
    commentReply(index) {
      this.modalRelay = true;
      this.indexs = index;
    },
    // 提交回复
    relaySubmit() {
      this.axios
        .post(`${this.baseUrl}/comments/postRelay`, {
          data: {
            base: { indexs: this.indexs, ids: this.articleObj.id }, //文章id
            Reply: {
              show: 0, //是否显示，1为是，0为否
              autor: this.Relaylist.autor, //用户名
              headPic:
                "http://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=monsterid&r=g", //头像
              mypage: this.Relaylist.mypage, //个人主页
              mail: this.Relaylist.mail, //邮箱
              times: "2012 04:56", //时间
              context: this.Relaylist.context //内容
            }
          }
        })
        .then(res => {
          if (res.data.status == "0") {
           this.$Message.success("回复成功，待审核");
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 重置
    handleReset() {},
    // 获取评论
    getComment(ids) {
      this.axios
        .get(`${this.baseUrl}/comments/getComment`, {
          params: {
            ids: ids
          }
        })
        .then(res => {
          this.commentObj = res.data.resulet.list;
        })
        .catch(err => {
          
        });
    }
  },
  beforeDestroy() {
    Bus.$off("postArticleList");
  },
  mounted() {
    // 接收
    Bus.$on("postArticleList", data => {
      this.articleObj = data;
      // 获取评论
      this.getComment(this.articleObj.id);
    });
  }
};
</script>

<style lang="less" scoped>
.page-header {
  font-size: 16px;
  line-height: 2;
  position: relative;
  margin-bottom: 20px;
  border-bottom: 1px solid #f1f3f5;
}
.page-header:after {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 88px;
  height: 1px;
  content: "";
  background-color: #4c6ef5;
}
a {
  cursor: pointer;
  text-decoration: none;
  color: #212529;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}
.comment-list {
  padding-bottom: 20px;
}
.comment-list .comment-left {
  position: relative;
  float: left;
  width: 40px;
  margin-right: -40px;
}
.comment-list .comment-left img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}
img {
  vertical-align: middle;
  border-style: none;
}
.comment-list .comment-cont {
  margin-left: 56px;
}
.comment-list .comment-body {
  display: inline-block;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 16px;
  background-color: #f1f3f5;
}
.comment-list .comment-body h5 {
  font-weight: 700;
  margin-bottom: 10px;
}
h5 {
  font-size: 14px;
}
.comment-list .comment-info {
  font-size: 12px;
  padding-bottom: 10px;
  color: #868e96;
}
p {
  margin-top: 0;
  margin-bottom: 0;
}
.mr-small {
  margin-right: 10px !important;
}
.float-left {
  float: left !important;
}
.comment-list .comment-info a {
  color: #868e96;
}
.clearfix::after {
  display: block;
  clear: both;
  content: "";
}
.comment-children {
  padding-left: 56px;
}

.comment-list {
  padding-bottom: 20px;
}
.text-right {
  text-align: right !important;
}
</style>
