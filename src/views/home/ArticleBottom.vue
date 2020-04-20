<template>
  <div class="layout">
    <Layout>
      <div class="log-neighbor clearfix">
        <a
          v-if="articleIndex - 1 > -1"
          @click="
            gotoContent(
              articleIndex - 1,
              articleList[articleIndex - 1].types,
              articleList[articleIndex - 1].idIndex
            )
          "
          ><span>上一篇：</span
          >{{
            articleList[articleIndex - 1]
              ? articleList[articleIndex - 1].title
              : ""
          }}</a
        ><a
          v-if="articleList[articleIndex + 1] == 'undefined' ? false : true"
          @click="
            gotoContent(
              articleIndex + 1,
              articleList[articleIndex + 1].types,
              articleList[articleIndex + 1].idIndex
            )
          "
          ><span>下一篇：</span
          >{{
            articleList[articleIndex + 1]
              ? articleList[articleIndex + 1].title
              : ""
          }}</a
        >
      </div>
      <div class="log-readmore">
        <h5 class="page-header">继续阅读</h5>
        <ul>
          <li v-for="(item, index) in keepList" :key="index">
            <span class="page-dot"></span><a>{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </Layout>
  </div>
</template>

<script>
import AdHeader from "./AdHeader";
import AdBanner from "./AdBanner";

import AdFooter from "./AdFooter";
import ArticleRight from "./ArticleRight";
import VueMarkdown from "vue-markdown";
import Bus from "@/assets/event-bus.js";

export default {
  name: "ArticleBottom",
  components: {
    AdHeader,
    AdBanner,

    AdFooter,
    ArticleRight,
    VueMarkdown
  },
  props: ["articleList", "articleIndex"],
  data() {
    return {
      // isCollapsed: false,
      // value3: 0,
      // showArticle: false,
      articleObj: {},
      random: [],
      nextidIndex: "",
      nextname: "",
      preidIndex: "",
      prename: "",
      keepList: []
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    gotoContent(articleIndex, types, idIndex) {
      const { href } = this.$router.resolve({
        path: "/articleContent",
        query: {
          articleIndex: articleIndex,
          types: types,
          idIndex: idIndex
        }
      });
      window.open(href, "_blank");
    },
    getArticleKeep(types, index) {
      this.axios
        .get(`${this.baseUrl}/articles/getKeep`, {
          params: {
            userName: "longwei",
            flag: types
          }
        })
        .then(res => {
          console.log(res.data, 9898989899898989898989);
          this.keepList = res.data.resulet;
        })
        .catch(err => {
          console.log("err", err);
        });
    }
    // 增加阅读量
    // submit() {
    //   // 如果id存在就是修改，如果id不存在就是新增
    //   // 拼装article数据
    //   let article = {};
    //   article[this.articleObj.types] = [this.articleObj];
    //   // console.log(article);
    //   this.axios
    //     .post(`${this.baseUrl}/articles/post`, {
    //       data: {
    //         userName: "longwei",
    //         types: this.articleObj.types,
    //         id: this.articleObj.id,
    //         article: article
    //       }
    //     })
    //     .then(res => {
    //       if (res.data.status == "0") {
    //         // this.$message.success('发布成功');
    //       } else {
    //         // this.$message.error('发布失败' + res.data.msg);
    //       }
    //     })
    //     .catch(err => {
    //       // this.$message.error('发布失败' + err);
    //     });
    // }
  },
  mounted() {
    console.log(this.articleList, 88888888);
    this.getArticleKeep("baidu", this.articleList[this.articleIndex].idIndex);
    Bus.$on("postNextPre", (nextidIndex, nextname, preidIndex, prename) => {
      console.log(nextidIndex, nextname, preidIndex, prename, 999999999);
      this.nextidIndex = nextidIndex;
      this.nextname = nextname;
      this.preidIndex = preidIndex;
      this.prename = prename;
    });
  }
};
</script>

<style lang="less" scoped>
// 内容区
.ad-content {
  margin-top: 40px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 10px;
  padding-left: 10px;
  //  vue 媒体查询方式，注意从小到的顺序
  @media screen and (min-width: 576px) {
    width: 540px;
  }
  @media screen and (min-width: 768px) {
    width: 720px;
  }
  @media screen and (min-width: 992px) {
    width: 960px;
  }
  @media screen and (min-width: 1200px) {
    width: 1140px;
  }
  .ad-content-div {
    // height: 2111px;
    margin-right: -10px;
    margin-left: -10px;
    .ad-content-left {
      float: left;
      width: 100%;
      min-height: 1px;
      padding-right: 10px;
      padding-left: 10px;
      @media screen and (min-width: 992px) {
        width: 640px;
      }
      @media screen and (min-width: 1200px) {
        width: 820px;
      }
      .content-box {
        margin-right: 0;
        margin-bottom: 20px;
        margin-left: 0;
        padding: 30px;
        background-color: #fff;
        // 标题
        .log-title {
          color: #212529;
          font-weight: 700;
          margin-bottom: 10px;
          @media screen and (min-width: 992px) {
            font-size: 24px;
          }
        }
        // 标记，时间，作者
        .log-meta {
          font-size: 12px;
          margin-bottom: 20px;
          color: #868e96;
          @media screen and (min-width: 992px) {
            margin-bottom: 30px;
          }
          span {
            float: left;
            margin-right: 10px;
          }
        }
        .clearfix::after {
          display: block;
          clear: both;
          content: "";
        }
        .content-page {
          // word-break: break-all !important;
          // @media screen and (min-width: 992px) {
          //   margin-right: 0;
          //   margin-left: 0;
          //   padding: 40px;
          // }
          // 对文档的特殊标签进行处理
          /deep/ code {
            display: inline-block;
            word-break: break-all !important;
            // @media screen and (min-width: 576px) {
            //   width: 400px;
            // }
            // @media screen and (min-width: 768px) {
            //   width: 720px;
            // }
          }
          /deep/ img {
            margin: 0 auto;
            max-width: 80%;
          }
        }
      }
    }
  }
}
</style>
