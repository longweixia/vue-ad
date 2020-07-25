<template>
  <div class="layout">
    <Home1 :isBanner="false" :isAdTipRow="false" adTip="content">
      <Content
        slot="articleContent"
        :style="{ minHeight: '220px' }"
        class="ad-content"
      >
        <div class="ad-content-div">
          <div class="ad-content-left">
            <div class="content-box">
              <!-- 文章标题 -->
              <div>
                <h2 class="log-title">{{ articleObj.title }}</h2>
                <div class="log-meta clearfix">
                  <span>{{ articleObj.autor }}</span>
                  <span>{{ articleObj.times }}</span>
                  <span>{{ articleObj.Pageview }}次浏览</span>
                </div>
              </div>
              <!-- 文章内容 -->
              <!-- <div
                class="content-page"
                v-html="articleObj.content"
              ></div> -->
              <mavon-editor
                class="content-page"
                :value="articleObj.content"
                :subfield="false"
                :defaultOpen="'preview'"
                :toolbarsFlag="false"
                :editable="false"
                :scrollStyle="false"
                :ishljs="true"
              ></mavon-editor>

              <div class="mb-default clearfix">
                <a
                  class="float-left btn btn-outline-default mr-small"
                  
                  >{{bigType | bigTypes}}</a
                >
              </div>
              <!-- 文章底部 上一篇，下一篇 -->
              <div class="log-neighbor clearfix">
                <a v-if="nextPre.nextidIndex > -1" @click="gotoContent()"
                  ><span>上一篇：</span>{{ nextPre.nextname }}</a
                ><a v-if="nextPre.preidIndex !== -1" @click="gotoContent()"
                  ><span>下一篇：</span>{{ nextPre.prename }}</a
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

              <!-- 底部评论 -->
              <Comment></Comment>
            </div>
          </div>
          <div>
            <!-- <ArticleRight :random="random"></ArticleRight> -->
          </div>
        </div>
      </Content>
    </Home1>
  </div>
</template>

<script>
import Home1 from "./Home1";
// import ArticleBottom from "./ArticleBottom";
import Comment from "./Comment";
import VueMarkdown from "vue-markdown";
import Bus from "@/assets/event-bus.js";
export default {
  name: "ArticleContent",
  components: {
    Home1,
    // ArticleBottom,

    VueMarkdown,
    Comment
  },
  data() {
    return {
      bigType:"",
      articleObj: {},
      random: [],
      articleIndex: "",
      keepList: [],
      nextPre: {} //上一页，下一篇数据
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    // 继续阅读
    getArticleKeep(types, index) {
      this.axios
        .get(`${this.baseUrl}/articles/getKeep`, {
          params: {
            userName: "longwei",
            flag: types
          }
        })
        .then(res => {
          this.keepList = res.data.resulet;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    getArticle(types, idIndex) {
      this.axios
        .get(`${this.baseUrl}/articles/get`, {
          params: {
            userName: "longwei",
            flag: types, //all表示所有文章
            idIndex: idIndex
          }
        })
        .then(res => {
          this.articleObj = res.data.resulet;
          Bus.$emit("postArticleList", this.articleObj);

          this.articleObj.Pageview = res.data.resulet.Pageview + 1;
          this.submit();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 增加阅读量
    submit() {
      // 如果id存在就是修改，如果id不存在就是新增
      // 拼装article数据
      let article = {};
      article[this.articleObj.types] = [this.articleObj];
      article[this.articleObj.types];

      this.axios
        .post(`${this.baseUrl}/articles/post`, {
          data: {
            userName: "longwei",
            types: this.articleObj.types,
            id: this.articleObj.id,
            article: article
          }
        })
        .then(res => {
          if (res.data.status == "0") {
          } else {
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    // Bus.$emit('hiddenBanner')
    this.bigType = this.$route.query.types
    console.log(this.$route.query.types)
    this.getArticle(
      this.$route.query.types, //大类
      Number(this.$route.query.idIndex) //id标志
    );
    this.nextPre = JSON.parse(decodeURIComponent(this.$route.query.nextPre));
    this.getArticleKeep("tb", "tb1");
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
          // font-size: 16px;
          color: black;
          padding: 0 10px;
          line-height: 1.6;
          word-spacing: 0px;
          letter-spacing: 0px;
          word-break: break-word;
          word-wrap: break-word;
          text-align: left;
          /deep/ img {
            border-radius: 0px 0px 5px 5px;
            display: block;
            margin: 20px auto;
            width: 85%;
            height: 100%;
            object-fit: contain;
            box-shadow: #84a1a8 0px 10px 15px;
            @media screen and (min-width: 576px) {
              width: 85%;
            }
            @media screen and (min-width: 768px) {
              width: 60%;
            }
            @media screen and (min-width: 992px) {
              width: 60%;
            }
          }

          // word-break: break-all !important;
          // @media screen and (min-width: 992px) {
          //   margin-right: 0;
          //   margin-left: 0;
          //   padding: 40px;
          // }
          // 对文档的特殊标签进行处理
          // /deep/ code {
          //   display: inline-block;
          //   word-break: break-all !important;
          //   // @media screen and (min-width: 576px) {
          //   //   width: 400px;
          //   // }
          //   // @media screen and (min-width: 768px) {
          //   //   width: 720px;
          //   // }
          // }
          // /deep/ img {
          //   margin: 0 auto;
          //   max-width: 80%;
          // }
        }
      }
    }
  }
}
.mb-default {
  margin-top: 20px;
  margin-bottom: 20px !important;
}
.btn:not(:disabled) {
  cursor: pointer;
  border: 1px solid #ddd;
}

.mr-small {
  margin-right: 10px !important;
}
.float-left {
  float: left !important;
}
.btn-outline-default {
  color: #868e96;
  border-color: #868e96;
}
.btn {
  font: inherit;
  font-size: 14px;
  line-height: 33px;
  display: inline-block;
  overflow: visible;
  height: 35px;
  margin: 0;
  padding: 0 20px;
  transition: 0.2s ease-in-out;
  transition-property: color, background-color, border-color;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  text-transform: none;
  border: 1px solid transparent;
  border-radius: 2px;
}
.clearfix::after {
  display: block;
  clear: both;
  content: "";
}
// 去掉md的滚动条
/deep/ .v-show-content{
     height: inherit!important;
}
/deep/ .v-note-wrapper{
     z-index: 0!important;
}
/deep/ .content-page{
    padding: 0!important;
}
</style>
